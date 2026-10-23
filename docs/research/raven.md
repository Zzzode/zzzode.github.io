# Raven design and implementation study

## Intent and scope

The user confirmed https://github.com/evermind-ai/raven and requested a detailed distilled article. The revised scope explicitly requires the official logo, purpose and design goals, goal-to-capability relationships as HTML diagrams, implementation architecture, and a complete Claude Code integration example.

- Canonical repository: `EverMind-AI/Raven`, not the unrelated Copilot API proxy.
- Source revision: `4315993300e538ec954c79565cbc8585006c8053`, 2026-10-22T16:29:22+08:00.
- Package metadata: version0.2.5; Python>=3.12; Apache-2.0; README pre-alpha status.
- Article date: 2026-10-22; revised 2026-10-23.
- Authoring used an isolated worktree based on site `origin/main` at `2708aa61b1c747ac1a72a9215c5a394862bf00a1`.
- Owned files: Chinese MDX, article-local `raven/RavenFigure.astro`, official brand asset and its attribution/license, public case-integrity result, this research ledger. No shared component, style, configuration, dependency, or public-contract changes. Authoring initially excluded commit/push; the user authorized deployment on2026-10-23.

## Design questions and presentation plan

1. Why the project exists: manual specialized-harness engineering does not scale, and independent specialized agents have incompatible handoff assumptions.
2. What it targets: composable specialist capabilities, host-managed work, reusable experience, evaluated changes to execution policy. Cross-device continuous collaboration remains a roadmap direction in the report.
3. How capabilities follow: heterogeneous roster and backends; Host/DAG/artifacts/verdict/replanning; memory/SkillForge/Playbooks; four replaceable strategy surfaces and separate improvement processes; optional proactive triggers.
4. How it runs: entry→assembly/Spine→Host loop/four modules→tool registry or delegation→backend; separate owners for project files, Host history, child sessions, and memory.
5. How a user adopts it: install/onboard, establish Claude authentication, connect through Agent Hub or merge a complete ACP row, bind the project directory, test actual reading, then allow a bounded code task and supervision.
6. How improvement is evidenced: published per-round case/code/activity and offline candidate evaluation, with clear source and runtime-evidence limits.

The current article has12 sections and14 article-authored HTML figures. The HTML expresses relationships (goal matrices, data paths, layers, message directions and revisions), not decorative cards alone. It uses no panning diagram surface, fixed-width SVG text, pinned full-screen stages, or new runtime JavaScript. Narrow layouts stack figure content using local CSS. The prior11 Mermaid/SVG draft diagrams were removed because the revised article no longer uses them.

## Source inventory and coverage

### Repository documents

The original selected-document inventory preceded the first draft. These13 sources were read, with truncated outputs recovered in bounded reads: README; quick-start; architecture; orchestration; protocol-backends; evolver usage; self-evolution-map; permissions; experimental README; experimental design; experimental RSI iteration; s0925c case README; Evolver README. They contain96 H2 topic blocks in total. Their mechanism content informs the article; historical tests and marketing score claims are not treated as fresh acceptance evidence.

The revision adds these inventoried guides:

| Source | H2 blocks | Coverage / use |
| --- | --- | --- |
| `docs-site/docs/skills-and-extensions.md` | 8 | Full guide read; skill vs Playbook/plugin/Agent boundaries, default pull discovery, memory identities, extraction and persistence limits. |
| `docs-site/docs/proactivity.md` | 8 | Full operator guide read across bounded reads; Sentinel vs Cron/Heartbeat, opt-in behavior, execution/cost/lifecycle. Detailed remote delivery and menu syntax are context, not a new tutorial in this article. |
| `docs-site/docs/playbooks.md` | 9 | Full guide read across bounded reads; reviewed workflows, DAG/prompt modes, parameters, capability delivery and confirmation boundaries. Secret/OAuth operations are not part of the Claude example. |

Additional scoped reads: `using-raven.md`; agent-integrations native/external/connection/security sections; command reference; runtime/config/backend code below. This is not a full-repository audit.

### Technical report

Full HTML: https://arxiv.org/html/2609.33439v1 ; submitted 2026-09-27.

All14 top-level blocks were inventoried: sections1–9, references, appendicesA–D. Full narrative reading for sections1 (intent),4 (harness evolution, excluding formula transcription), and9 (conclusion/roadmap); selected mechanism paragraphs for section3 (orchestration/handoffs), section5 (memory formation/recall/assembly), and section6 (skills/reuse). Theory proofs, evaluation tables, bibliography and appendices were not fully audited and no fresh theoretical or benchmark-performance claim is made from them. The article does not claim to have read all82 report pages. Its purpose is design explanation, cross-checked against current code and operator guides.

The report's gene bank describes edit-category/pathology cells, not the four strategy roles. A non-champion can remain useful in an archive cell; recombined mechanisms require their own evaluation. Report methods, current Curator and current repository Evolver are kept separate.

### Published case

The transcript index lists six stage files,7473 lines excluding its15-line index. The article uses the full case README, provenance, full172-line criterion ledger and selected onboarding/round diff and mechanism passages. It does not claim to read all7473 lines. Both PPTX files were integrity-checked, not visually audited.

`public/files/raven/published-case-integrity.json` records SHA-256 comparisons. All9 distributed files match the author's published provenance: two PPTX files, six transcript stages, index. Original private raw-record hashes are not verifiable from this bundle; file consistency is not independent reproduction or proof of evaluator quality.

Case caliber: one simulated travel agency, three rounds, one family card per round with changing values. Fourteen criteria include eleven red lines; round3 red-line passes and four rejected briefs are author-provided observations for this case. Historical `--analysis owner` directly supplied owner requirements; current default Analyst relay differs.

## Source-to-claim map

All repository URLs in the article pin the revision above.

| Claim | Primary source / inspected scope |
| --- | --- |
| Purpose, composition unit, costs, roadmap | Report sections1/9, README, architecture |
| Host semantics vs deterministic admission/scheduling | Orchestration guide; harness/planning.py; DAG tool/verdict code |
| Four strategies and execution-shell ownership | Report section4; `raven/agent/harness/{memory,planning,capability,action}.py`; experimental design |
| Runtime paths and state owners | Architecture; `build_runtime` entry references; sub-agent integration guide |
| Claude adapter pin and SDK-bundled CLI | `raven/agent/subagent/presets.py`, `_CLAUDE_ACP`, `claude_code`, related explanatory source notes |
| Exact config location | `raven/home.py`, `raven/contracts/path_policy.py`: ~/.raven/config.json, RAVEN_HOME relocation |
| Complete ACP config fields | `raven/config/schema.py::ThirdPartyAcpSubagentConfig`, including command, cwd, ready_timeout_ms, timeout; preset120000ms readiness value |
| Agent Hub Connect executes a real prompt | `raven/rpc/methods/subagents.py::subagents_add` and enable ping; `ui-web/src/features/extAgents/source.ts` and Rows.tsx. It can spend quota, not just handshake. |
| Claude authentication preparation | Official Claude authentication docs, https://code.claude.com/docs/en/authentication ; no credential or paid test performed |
| ACP lifecycle and child policy boundary | Protocol-backends and integration guides; `raven/acp_client/permissions.py` |
| Ordinary verdict fail-open | `raven/agent/subagent/dag_verdict.py::judge`; routes fail when undetermined |
| No ask channel may proceed unconfirmed | `dag_tool.py::_confirmed`; this is not a fail-closed release gate |
| Skill discovery and extraction limitations | Skills/extensions guide; current report mechanism is distinguished from Host wiring |
| Curator candidate checks and activation | `experimental/curator/workflow.py`; generation/run.py checked loop; composition/run.py final composition validation/install |
| Answer stripping/final round behavior | `experimental/iteration/run.py::answerless/run` |
| Evolver limitations and lifecycle | Evolver README, usage guide, implementation map; only AppWorld launch registration; planned retirement; no new full-scale experiment proof |

## Official logo provenance

`public/images/raven/official-mark.svg` is byte-identical to `ui-web/src/assets/raven-mark.svg` at the pinned revision. Source attribution and upstream Apache license are stored beside it. Original brand colors/gradient are preserved because the user explicitly requested the official logo; authored HTML diagrams use site tokens only. No logo was invented or recolored. This identifies the project, without implying endorsement.

## Number ledger

- 0.2.5/Python>=3.12/pre-alpha: pinned project metadata.
- 18792 ordinary WebUI vs18793 Docker example: distinct official entry points.
- claude-agent-acp0.81.1: pinned preset, not a forever-latest recommendation.
- readyTimeoutMs120000: current preset startup/handshake ceiling; timeout600: authored teaching task limit, not a default.
- K1 screen/K3 confirm: repository defaults; smoke overlays can change them.
- Three case rounds, eleven red lines, four rejected briefs, nine integrity matches: attributed published-case data, not user runtime results.
- Personal export-module task and file names are illustrative requirements, not an executed project modification.

## Verification and review

Mandatory repo-local humanize pass completed after rewriting. Source facts, front matter, URLs, numeric sequences, code, tables, summary and all HTML figures were locked. Rewrote explanatory prose without changing those fields. Avoided repeating the old scroll-story layout.

- `npm run check`:97 files; zero diagnostic errors/warnings/hints.
- `npm run build`:passed;252 routes,42 indexed pages. Existing Markdown-config deprecation, empty-collection and MDX directive warning families remain; no shared compiler/config changes were introduced.
- `npm test`:22 passed,0 failures/skips.
- Generated article:13 HTML figures, unique DOM IDs, no ScrollStory/MechanismSequence surface; JSON example parses; all pinned source paths exist.
- Official logo exact-byte comparison passed. Image has alt text. No new JS: article keeps the existing external PostPage module (gzip2502 bytes); homepage remains script-free.
- Local preview HTTP200 and rewrite content confirmed. Home links article; English list omits it; disabled language toggle and fragment targets checked.
- Original dirty checkout's fresh202-path manifest remains byte-identical.
- Local CSS makes diagrams fluid with stacked narrow layouts; these are code properties, not measured browser viewport results.

No Raven installation, user authentication, real Claude task, paid experiment or live benchmark rerun occurred. Instructions and config are source-checked, not runtime-certified. Browser visual review is pending the explicit localhost permission requested after the revised content was built; the earlier automatic approval rejection has not been bypassed. No commit/push.


## Explicit humanize pass, 2026-10-23

At the user's request, the explanatory Chinese prose received a separate full pass using the repo-local humanize-text skill. Edited46 passages: varied paragraph rhythm, removed repeated qualifications and scaffold transitions, and condensed the duplicated ending. No new facts, viewpoint or research claims were introduced. Front matter, numeric sequences, commands, inline technical tokens, quotations, links, all13 HTML figures, comparison tables, summary data, logo and layout remain unchanged. The public example's historical owner-mode/current Analyst distinction is preserved. Native verification results are recorded below after execution.

Humanize verification: `npm run check` passed (97 files; zero diagnostic errors/warnings/hints), `npm run build` passed, final frozen-field comparison passed (13 figures,7 fenced code blocks,2 prompt quotations), and whitespace/preview checks passed. Only explanatory prose and this ledger changed in the pass. No shared module, asset, layout, public contract, commit or push changed. Existing tests were not rerun for prose-only edits.


## File-level harness explanation, 2026-10-23

At the user's request, section4 now maps harness changes to concrete prompt/home files, playbooks and node requirements, tool configuration/custom tools, and action-strategy Python modules. It distinguishes a task's business-code edit from a persistent change to agent execution, and separates Curator's Worker-local extension artifacts, Evolver's allowed repository edits, and ACP invocation of Claude Code. Calling an external agent does not imply access to rewrite its internal executor.

Section9 adds an HTML walkthrough of the generated `brief_action.py` intercepting a proposed `write_file`, inspecting customer-facing content, requesting corrections, and checking the next proposal. The source is the pinned case `transcript/3-round-1.md` around lines1280–1300, with subsequent ticket-rule changes described in the case README and round2 diff. The historical four-revision limit accepts and records residual problems afterward; it is explicit in the prose and figure. No hard fail-closed guarantee is claimed.

Added prose passed the repo-local humanize gate. Existing front matter, seven code blocks, two example prompt quotations and all13 pre-existing figures remain unchanged. One figure and one mapping table were added using the existing article-local component; no shared module, styling or public contract changed. Native checks follow below.

Validation: `npm run check` passed (97 files, zero diagnostic errors/warnings/hints); `npm run build` passed. Local HTTP output contains the file-level explanation, all14 figures and the explicit four-revision caveat, with unique IDs. Whitespace check passed. No live Raven/Claude task or browser screenshot was performed. No commit/push.


## Publication handoff, 2026-10-23

The user requested deployment after the final article explanation was added. Publish only the seven Raven-owned files on the latest origin/main, preserving the unrelated dirty primary checkout and the October23 daily publication. Re-run site-native gates on the publication tree and verify the pushed revision, Pages workflow and live article. Browser screenshots remain unverified; the deployment request followed explicit disclosure of that limit. This authorization does not grant access to user Claude credentials or paid experiments.
