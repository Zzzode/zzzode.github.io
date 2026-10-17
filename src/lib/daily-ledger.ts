import { z } from 'zod';
import { dailyCategories } from './post-schema.ts';
import { evidenceRange, newsTimestamp, timeEvidenceSchema, windowRelation } from './news-evidence.ts';

const text = z.string().min(1);
const ids = z.array(text);
const category = z.enum(dailyCategories);
const sourceSchema = z.object({
  id: text, title: text, url: z.url(), publisherKind: z.enum(['primary', 'secondary', 'community']),
  access: z.enum(['fetched', 'access_failed', 'search_only']), retrievedAt: newsTimestamp,
  publication: timeEvidenceSchema.optional(), evidence: text,
});
const querySchema = z.object({
  id: text, actor: text, query: text, executedAt: newsTimestamp,
  method: z.enum(['search', 'open', 'metadata']),
  focus: z.array(z.enum([...dailyCategories, 'open-discovery'])).min(1),
  language: text, resultUrls: z.array(z.url()), notes: text,
});
const candidateSchema = z.object({
  id: text, title: text, category, entity: text,
  releaseStatus: z.enum(['released', 'preview', 'beta', 'announced', 'research', 'unknown']),
  queryIds: ids.min(1), sourceIds: ids.min(1), eventTime: timeEvidenceSchema.optional(),
  decision: z.enum(['include', 'watch', 'exclude', 'pending']),
  reasonCode: z.enum(['selected', 'outside_window', 'duplicate', 'insufficient_evidence', 'time_uncertain', 'low_significance', 'unresolved_identity']),
  reason: text, importance: text, duplicateOf: text.optional(),
});

/** Audit evidence, not a certificate of exhaustive discovery or independent judgment. */
export const dailyLedgerSchema = z.object({
  version: z.literal(2), runId: text, author: text, issueDate: z.iso.date(),
  windowStart: newsTimestamp, cutoff: newsTimestamp, startedAt: newsTimestamp, completedAt: newsTimestamp,
  queries: z.array(querySchema).min(1), sources: z.array(sourceSchema).min(1),
  checks: z.array(z.object({
    id: text, target: text, category,
    status: z.enum(['checked_no_update', 'candidate', 'access_failed', 'uncovered']),
    checkedAt: newsTimestamp.optional(), queryIds: ids, sourceIds: ids, candidateIds: ids, notes: text,
  })),
  candidates: z.array(candidateSchema),
  coverage: z.array(z.object({ category, status: z.enum(['reviewed', 'partial', 'uncovered']), queryIds: ids, checkIds: ids, assessment: text })),
  discovery: z.object({ queryIds: ids.min(1), assessment: text }),
  review: z.object({
    reviewer: text, reviewedAt: newsTimestamp, candidateIds: ids, queryIds: ids.min(1),
    verdict: z.enum(['pass', 'pass_with_limits', 'blocked']), report: text,
    findings: z.array(z.object({ detail: text, severity: z.enum(['blocking', 'note']), resolution: z.enum(['fixed', 'disclosed', 'open']) })),
  }),
  article: z.object({ slug: text, includedCandidateIds: ids, watchCandidateIds: ids, limitations: text, originalDate: newsTimestamp.optional(), sha256: z.string().regex(/^[a-f0-9]{64}$/).optional() }),
}).superRefine((run, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: 'custom', message });
  if (Date.parse(run.windowStart) >= Date.parse(run.cutoff)) fail('Invalid reporting window');
  if (Date.parse(run.startedAt) > Date.parse(run.completedAt)) fail('Invalid execution interval');
  if (run.article.slug !== `${run.issueDate}-ai-daily`) fail('Canonical issue slug required');
  const maps = {
    query: new Map(run.queries.map((x) => [x.id, x])),
    source: new Map(run.sources.map((x) => [x.id, x])),
    candidate: new Map(run.candidates.map((x) => [x.id, x])),
    check: new Map(run.checks.map((x) => [x.id, x])),
  };
  for (const [name, entries] of Object.entries(maps)) {
    const list = name === 'query' ? run.queries : name === 'source' ? run.sources : name === 'candidate' ? run.candidates : run.checks;
    if (entries.size !== list.length) fail(`Duplicate ${name} id`);
  }
  const refs = (kind: keyof typeof maps, values: string[]) => {
    if (new Set(values).size !== values.length) fail(`Repeated ${kind} reference`);
    for (const value of values) if (!maps[kind].has(value)) fail(`Unknown ${kind}: ${value}`);
  };
  const actualTime = (time: string) => {
    if (Date.parse(time) < Date.parse(run.startedAt) || Date.parse(time) > Date.parse(run.completedAt)) fail(`Action outside recorded execution interval: ${time}`);
  };
  for (const query of run.queries) actualTime(query.executedAt);
  for (const source of run.sources) actualTime(source.retrievedAt);
  for (const check of run.checks) {
    refs('query', check.queryIds); refs('source', check.sourceIds); refs('candidate', check.candidateIds);
    if (check.status !== 'uncovered' && (!check.checkedAt || !check.queryIds.length || !check.sourceIds.length)) fail(`Executed check needs query, source and timestamp: ${check.id}`);
    if (check.checkedAt) actualTime(check.checkedAt);
    if (check.status === 'uncovered' && check.checkedAt) fail(`Uncovered is not an executed check: ${check.id}`);
    if (check.status === 'candidate' && !check.candidateIds.length) fail(`Candidate check needs candidates: ${check.id}`);
    if (check.status === 'checked_no_update' && (check.candidateIds.length || !check.sourceIds.some((id) => maps.source.get(id)?.access === 'fetched'))) fail(`No-update requires fetched evidence without an event candidate: ${check.id}`);
    if (check.status === 'access_failed' && !check.sourceIds.some((id) => maps.source.get(id)?.access === 'access_failed')) fail(`Access failure needs failed-source evidence: ${check.id}`);
  }
  for (const candidate of run.candidates) {
    refs('query', candidate.queryIds); refs('source', candidate.sourceIds);
    const relation = candidate.eventTime ? windowRelation(candidate.eventTime, run.windowStart, run.cutoff) : undefined;
    if (candidate.reasonCode === 'outside_window' && relation !== 'outside') fail(`Outside-window exclusion needs disjoint time evidence: ${candidate.id}`);
    if (candidate.reasonCode === 'duplicate') {
      if (!candidate.duplicateOf || candidate.duplicateOf === candidate.id) fail(`Duplicate needs another candidate: ${candidate.id}`);
      else refs('candidate', [candidate.duplicateOf]);
    }
    if (candidate.decision === 'include' || candidate.decision === 'watch') {
      if (relation !== (candidate.decision === 'include' ? 'inside' : 'overlap')) fail(`Incorrect publication time bucket: ${candidate.id}`);
      const primary = candidate.sourceIds.some((id) => {
        const source = maps.source.get(id);
        return source?.access === 'fetched' && source.publisherKind === 'primary' && source.publication && evidenceRange(source.publication).earliest <= Date.parse(run.cutoff);
      });
      if (!primary) fail(`Publishable candidate needs fetched primary publication evidence: ${candidate.id}`);
      for (const url of candidate.eventTime?.sourceUrls ?? []) if (!candidate.sourceIds.some((id) => maps.source.get(id)?.url === url && maps.source.get(id)?.access === 'fetched')) fail(`Unfetched event time provenance: ${candidate.id}`);
    }
  }
  if (new Set(run.coverage.map((x) => x.category)).size !== dailyCategories.length || run.coverage.length !== dailyCategories.length) fail('Record every topic category once');
  for (const coverage of run.coverage) {
    refs('query', coverage.queryIds); refs('check', coverage.checkIds);
    if (coverage.status === 'uncovered') fail(`Uncovered topic blocks release: ${coverage.category}`);
    if (!coverage.queryIds.some((id) => maps.query.get(id)?.method === 'search' && maps.query.get(id)?.focus.includes(coverage.category)) || !coverage.checkIds.some((id) => maps.check.get(id)?.category === coverage.category && maps.check.get(id)?.status !== 'uncovered')) fail(`Topic needs executed search and check evidence: ${coverage.category}`);
    if (coverage.status === 'partial' && run.review.verdict !== 'pass_with_limits') fail(`Partial coverage requires reviewer limits: ${coverage.category}`);
  }
  refs('query', run.discovery.queryIds);
  if (!run.discovery.queryIds.some((id) => maps.query.get(id)?.method === 'search' && maps.query.get(id)?.focus.includes('open-discovery'))) fail('Open discovery beyond named sources is required');
  refs('candidate', run.review.candidateIds); refs('query', run.review.queryIds);
  if (run.review.reviewer === run.author) fail('Use a separate reviewer');
  if (run.review.candidateIds.length !== run.candidates.length) fail('Independent review must read every candidate, including exclusions');
  if (!run.review.queryIds.some((id) => maps.query.get(id)?.method === 'search' && maps.query.get(id)?.actor === run.review.reviewer && maps.query.get(id)?.focus.includes('open-discovery'))) fail('Independent review needs its own supplementary discovery');
  if (run.review.verdict === 'blocked' || run.review.findings.some((x) => x.severity === 'blocking' && x.resolution !== 'fixed')) fail('Resolve blocking review findings before release');
  actualTime(run.review.reviewedAt);
  for (const [decision, selected] of [['include', run.article.includedCandidateIds], ['watch', run.article.watchCandidateIds]] as const) {
    refs('candidate', selected);
    const expected = run.candidates.filter((x) => x.decision === decision).map((x) => x.id);
    if (selected.length !== expected.length || selected.some((id) => !expected.includes(id))) fail(`Article must account for all ${decision} decisions`);
  }
});
export type DailyLedger = z.infer<typeof dailyLedgerSchema>;
