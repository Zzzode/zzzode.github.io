-- Teaching blueprint, not a deployed control plane or a production migration.
-- IDs are supplied by the application. Timestamps are UTC-aware.
-- Authorization, DAG validation, budget accounting and external reconciliation
-- require service logic; these constraints alone do not implement the company.

CREATE TABLE projects (
  id text PRIMARY KEY,
  policy_version text NOT NULL,
  policy_document jsonb NOT NULL,
  current_harness_version text NOT NULL,
  max_active_attempts integer NOT NULL CHECK (max_active_attempts > 0),
  revision bigint NOT NULL DEFAULT 1
);

CREATE TABLE goals (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id),
  source jsonb NOT NULL,
  desired_outcome text NOT NULL,
  priority integer NOT NULL DEFAULT 0,
  policy_version text NOT NULL,
  state text NOT NULL CHECK (state IN
    ('CANDIDATE','PLANNING','ACTIVE','NEEDS_DECISION','DEFERRED','DONE','CANCELLED')),
  revision bigint NOT NULL DEFAULT 1
);

CREATE TABLE tasks (
  id text PRIMARY KEY,
  goal_id text NOT NULL REFERENCES goals(id),
  contract jsonb NOT NULL,
  state text NOT NULL CHECK (state IN
    ('BLOCKED','READY','RUNNING','VERIFYING','REVIEWING','REWORK','DONE','CANCELLED')),
  revision bigint NOT NULL DEFAULT 1
);

CREATE TABLE task_dependencies (
  task_id text NOT NULL REFERENCES tasks(id),
  prerequisite_id text NOT NULL REFERENCES tasks(id),
  PRIMARY KEY (task_id, prerequisite_id),
  CHECK (task_id <> prerequisite_id)
);
-- Longer cycles and cross-goal dependency rules are validated in a locked
-- plan-admission transaction, not by this single-row CHECK constraint.

CREATE TABLE jobs (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id),
  goal_id text REFERENCES goals(id),
  task_id text REFERENCES tasks(id),
  kind text NOT NULL CHECK (kind IN
    ('OWNER','PLAN','DIAGNOSE','IMPLEMENT','VERIFY','REVIEW','INTEGRATE','DELIVER','IMPROVE')),
  payload jsonb NOT NULL,
  dedupe_key text NOT NULL,
  state text NOT NULL CHECK (state IN
    ('BLOCKED','READY','RUNNING','SUCCEEDED','FAILED','CANCELLED')),
  priority integer NOT NULL DEFAULT 0,
  available_at timestamptz NOT NULL DEFAULT now(),
  generation bigint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, kind, dedupe_key)
);
CREATE INDEX jobs_ready ON jobs(project_id, priority DESC, created_at)
  WHERE state = 'READY';

CREATE TABLE attempts (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id),
  job_id text NOT NULL REFERENCES jobs(id),
  generation bigint NOT NULL,
  state text NOT NULL CHECK (state IN
    ('STARTING','RUNNING','STOPPING','SUCCEEDED','FAILED','LOST','CANCELLED')),
  repository_writer boolean NOT NULL DEFAULT false,
  sandbox_id text,
  baseline_revision text NOT NULL,
  policy_version text NOT NULL,
  harness_version text NOT NULL,
  lease_until timestamptz NOT NULL,
  heartbeat_at timestamptz,
  progress_at timestamptz,
  result jsonb,
  UNIQUE (job_id, generation)
);
CREATE UNIQUE INDEX attempts_one_active_per_job ON attempts(job_id)
  WHERE state IN ('STARTING','RUNNING','STOPPING');
CREATE UNIQUE INDEX attempts_one_repository_writer ON attempts(project_id)
  WHERE repository_writer AND state IN ('STARTING','RUNNING','STOPPING');
-- The writer constraint is the conservative starting profile. A later parallel
-- profile needs explicit ownership locks. LOST does not prove the process dead:
-- revoke/fence and isolate it before admitting a replacement writer.

CREATE TABLE events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id),
  source_key text NOT NULL,
  kind text NOT NULL,
  entity_ref text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  dispatched_at timestamptz,
  UNIQUE (project_id, source_key)
);

CREATE TABLE evidence (
  id text PRIMARY KEY,
  attempt_id text NOT NULL REFERENCES attempts(id),
  candidate_revision text NOT NULL,
  requirements_version text NOT NULL,
  gate_id text NOT NULL,
  runner_identity text NOT NULL,
  environment_digest text NOT NULL,
  verifier_version text NOT NULL,
  artifact_ref text NOT NULL,
  artifact_hash text NOT NULL,
  result jsonb NOT NULL
);

CREATE TABLE reviews (
  id text PRIMARY KEY,
  task_id text NOT NULL REFERENCES tasks(id),
  attempt_id text NOT NULL REFERENCES attempts(id),
  candidate_revision text NOT NULL,
  requirements_version text NOT NULL,
  verdict text NOT NULL CHECK (verdict IN
    ('PASS','REWORK','NEEDS_EVIDENCE','PLAN_CONFLICT')),
  findings jsonb NOT NULL
);
CREATE TABLE review_evidence (
  review_id text NOT NULL REFERENCES reviews(id),
  evidence_id text NOT NULL REFERENCES evidence(id),
  PRIMARY KEY (review_id, evidence_id)
);

CREATE TABLE decisions (
  id text PRIMARY KEY,
  goal_id text NOT NULL REFERENCES goals(id),
  expected_policy_version text NOT NULL,
  state text NOT NULL CHECK (state IN ('PENDING','ANSWERED','STALE','CANCELLED')),
  packet jsonb NOT NULL,
  answer jsonb
);

CREATE TABLE effect_intents (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id),
  operation_key text NOT NULL,
  state text NOT NULL CHECK (state IN
    ('PREPARED','EXECUTING','UNKNOWN','CONFIRMED','FAILED','CANCELLED')),
  expected_target_revision text,
  intent jsonb NOT NULL,
  receipt jsonb,
  UNIQUE (project_id, operation_key)
);
-- A timeout changes an external effect to UNKNOWN, not automatically FAILED.
-- Inspect the actual external resource before retrying. No exactly-once promise.
