# Personal agent company: sources, design and verification

Research date: 2026-10-21; architecture revision: 2026-10-22. User request: a Chinese distilled article explaining
how a personal coding-agent system can operate as an independent company. Humans
set direction and make major decisions; agents discover, prioritize, decompose,
dispatch, supervise and deliver ordinary work. This is a design/research article,
not authorization to deploy an unattended service or publish this site.

## Scope and working plan

Owner: one Chinese MDX post, its Mermaid/SVG assets, JSON/SQL design templates,
and this English ledger. No shared component, stylesheet, route or contract edits.
Isolated worktree: codex/personal-agent-company, baseline a5ad48fc884754981a0ae3867affb93bad29dd54.
Original dirty checkout and the DeepInfer/Recipe drafts remain separate.

Stages: inventory primary sources; distinguish deployed product claims/research/
proposed design; author the company operating model and a complete example;
render mechanism diagrams; apply humanize-text with factual/structured locks;
run native check/build/tests and supplemental artifact review. No commit/push.
Earlier automatic localhost browser approval rejection remains in force: do not
bypass it with another browser or headless webpage renderer. Local diagram
rendering is separate. Webpage visual/responsive/reduced-motion review may remain
unverified and must be disclosed.

## Source inventory before outline

Core sources below were fully read in the specified scope. Site navigation,
related posts, duplicated mobile markup and commercial footers are excluded.
No vendor performance multiple is used to rank the products.

| Source | Inventoried content | Use |
|---|---|---|
| Cognition, Managed Devins,2026-03-19 |3 blocks: architecture/delegation; five management capabilities; five usage examples |Model-led dispatch, monitoring, correction; all3 used; examples grouped rather than reproduced |
| Anthropic,long-running apps,2026-03-24 |5 blocks: naive failures; frontend evaluation; full-stack roles/contracts and model-version revision; outlook; generated-plan appendix |All5 used: evaluator calibration, structured handoff, plan-to-task bridge, model-dependent simplification; appendix is context for concrete specs |
| Cursor,agent swarm economics,2026-07-20 |11 main headings: tree roles,memory,VCS,failure modes,review lenses,Field Guide,SQLite setup,model-mix results,run diagnosis,economics,specs |All11 read;6 used directly (roles,memory,ownership failures,review,Field Guide,specification);5 scaling/benchmark topics retained as context for boundaries,with performance and cost figures intentionally omitted |
| Symphony README at be10a1b79df723d6d7612b5651c8522704dafb2e |4 blocks: description/demo,preview status,requirements,implementation options |All4 used; engineering preview,not a complete autonomous company |
| Symphony SPEC at same pin |Selected contract scope:1-3 problem/goals/layers;7 orchestration states;8-9 dispatch/workspace;14 failure/restart;16 reference scheduling |Read these scopes;spec is Draft v1,not runtime proof;separate scheduler state from tracker/business completion |
| Symphony WORKFLOW at same pin |Entire329-line workflow;bootstrap,validation,PR feedback,human review,merge and rework |Actual example retains Human Review;does not authorize every agent-created follow-up for execution |
| Symphony orchestrator.ex at same pin |Inspected process exits,normal continuation,retry/reconciliation and dispatch |Implementation inspection,not execution;normal process exit can trigger active-state continuation |
| Harness2 README at1cfe254e8d25b15f37048c3730134686abe60335 |Two recursion levels,eight editable surfaces,setup,budgets/network/resume |Frozen weights;retain evidenced experience;research framework,not turnkey company;prior deterministic demo not evidence for autonomous company operation |
| GEPA README at8f287de942f41a6d1e0e7e5b2d576247c4bedee9 |Selected scope:What is GEPA,optimization API,How it works,adapter |Trace feedback and candidate selection;no claim of local optimization or paid run |
| autoresearch README/program at228791fb499afffb54b46200aca536f79142f117 |README scope/design and complete program114lines:setup,editable/fixed boundary,metric,logging,loop,timeout/crashes |Human-authored program vs agent-edited training code;fixed evaluator;not proof of recursively evolving optimizer |
| LangGraph persistence docs |3 blocks:checkpoint/store distinction;quickstart;four troubleshooting items |All3 read;current state vs reusable knowledge,RAM restart and retention used;thread-ID limits and subgraph specifics omitted as implementation detail outside this design |
| DGM official blog,2025-05-30 |Context only:agent code mutation,benchmark evaluation,archive of alternatives |Lineage,not a fresh full-paper distillation or independent result replication |

URLs:
- https://cognition.com/blog/devin-can-now-manage-devins
- https://www.anthropic.com/research/harness-design-long-running-apps
- https://cursor.com/blog/agent-swarm-model-economics
- https://github.com/openai/symphony
- https://github.com/google-research/harness2
- https://github.com/gepa-ai/gepa
- https://github.com/karpathy/autoresearch
- https://docs.langchain.com/oss/python/langgraph/persistence
- https://sakana.ai/dgm/

Web reader and direct HTML/raw-source fetches used. GitHub unauthenticated API
hit rate limit; git ls-remote plus pinned raw files succeeded. Original guessed
Sakana repository name did not resolve; DGM blog's actual source link is
https://github.com/jennyzzt/dgm . No claim that the project is unavailable.
OpenAI harness-engineering direct HTML fetch403;web reader available,but that
article is supplementary and no unsupported source-wide inventory claim is made.

## Presentation and teaching plan

Twelve chapters:company definition/current evidence;mission and major decisions;
roles with bounded contexts;self-generated backlog;task contracts and dependency
DAG;persistent runtime and restart;independent evidence-based supervision;full
operating example;RSI generations;knowledge and evaluation;implementation path;
operating dashboard and graduation. Company metaphor is a responsibility model,
not proof of legal/economic autonomy or an instruction to imitate large orgs.

Ten Mermaid diagrams:overview,authority,roles,intake,dependencies,lifecycle,
recovery,review,day-in-operation,RSI. Diagrams express decisions/data/state paths,
not decorative org badges. Use existing canvas/Prose/CompareTable and direct
MechanismSequence import;no shared barrel/style changes. Four downloadable JSON
examples:charter,task contract,major-decision packet,RSI experiment. They are
proposed schemas,not plug-and-play configs for any named product.

## Number and evidence rules

No claim of a universal leading product or comparable cross-product score.
Dates identify source versions. All run IDs,goals,case outcomes,budgets,limits and
RSI checkpoints in the operating example are explicitly synthetic. Version
labels H0-H4 identify teaching changes,not measured skill growth. Agent count
and budget examples are starting settings,not empirically optimal values.
Examples do not contain real account IDs,secrets,existing project incidents or
live release receipts. A budget is a cap,not a promise to spend or deliver.
Verification of JSON/Mermaid/MDX establishes artifact consistency only;it does not
validate agent judgment,autonomous recovery or software delivery quality.

## Initial-draft verification (2026-10-21)

- Authored one Chinese distilled MDX article,12 chapters,12500 CJK characters
  (including headings/table text),12 comparison tables and10 Mermaid/SVG assets.
  Existing canvas components and direct MechanismSequence import reused;one
  sequence has two rows for lifecycle/recovery. No new browser runtime or style.
- Four downloadable JSON examples parse successfully and explicitly declare
  example-only provenance. Charter grants no actual release permission. Task,
  mission and decision IDs agree;the RSI result is NOT_RUN. Both JSON excerpts
  in the article are exact subsets of their corresponding download artifacts.
- All10 Mermaid sources rendered successfully. All10 PNG artifacts visually
  inspected for label clipping,arrows and ordering. Final SVG XML checked for
  token colors,unique IDs,working marker/ARIA references,no embedded script,
  foreignObject,gradient,filter or animation. This is diagram artifact review,
  not webpage responsiveness verification.
- The authority diagram was corrected before finalization to distinguish
  irrelevant/unsupported proposals (archive) from worthwhile proposals requiring
  changed authorization (major decision). Failed execution can return to planning
  in the lifecycle diagram. These avoid making the person a routine dispatcher.
- Mandatory humanize-text pass applied after full draft review:10 prose edits.
  Sources/front matter,all numeric tokens,code fences and CompareTable markup
  held fixed within the pass. No new factual claim introduced by prose polishing.
- Native npm run check:95 files,0 errors,0 warnings,0 hints. Native npm run build:
  exit0,including Pagefind. Existing deprecated markdown API,empty academic
  collection notices and zh-cn stemming limitation remain unchanged.
- Native npm test:22 passed,0 failed,0 skipped. No new tests that merely mirror
  prose were added. Supplementary XML/JSON/HTML checks do not claim autonomous
  company behavior has been validated.
- Built HTML:12 sections,12 tables,10 authored diagrams,one existing article
  enhancement script;home/archive pages checked remain zero-script. All IDs
  unique,fragment/post/download links resolve. Chinese home/archive include the
  article;English archive omits it;missing translation toggle is disabled. Four
  built downloads match source bytes exactly. No host paths or credentials in
  downloadable examples.
- npm run preview -- --port4324 started the background server. Webpage desktop,
  mobile,middle-row interaction and reduced-motion screenshots remain unverified:
  the prior automatic localhost browser approval rejection was respected,with
  no alternative browser/headless webpage workaround. The new diagrams were
  inspected separately as local artifacts. No commit/push or visual approval.
- Scope audit:26 new task-owned files only (one post,one ledger,20 diagram files,
  four JSON examples). No tracked/shared files modified. Original dirty checkout
  manifest of202 paths is byte-for-byte unchanged;other article worktrees were
  untouched. Temporary dependency symlink removed after checks.
- No agent-company deployment,paid model/product evaluation,unattended live run,
  replay of real project tasks,or measured RSI improvement. The article is a
  source-backed design blueprint with a clearly synthetic complete example.

## Architecture revision plan and source inventory (2026-10-22)

User feedback: the first draft described responsibilities but did not select an
implementable runtime architecture, design principles, technology stack or
call-level flow. Success means one coherent reference design with process/module
boundaries, domain objects, dispatch transactions, SDK handoff, automatic review
and rework, crash recovery, decision intake, and concrete H0-H4 editing examples.
The deliverable remains an article, not an implemented unattended service.

Chosen recommendation: a TypeScript modular control service and runner,
PostgreSQL domain state/jobs/events, Claude Agent SDK, isolated source copies,
independent verification, serialized integration and versioned Harness changes.
These choices and all internal interfaces are author recommendations. They are
not attributed as a complete shipped architecture of a vendor. The core SQL is
an illustrative schema subset, explicitly missing production migrations, budget
ledger and complete authorization/service enforcement.

New sources inventoried BEFORE drafting the new architecture sections:

| Primary source | Scope read | Used for |
|---|---|---|
| Claude Agent SDK overview | comparison, capabilities, programmable loop | SDK owns one coding session, not the whole company |
| SDK structured outputs | quickstart, schema output, result/exception handling | query/outputFormat/structured_output; success without output is not valid |
| SDK permissions | evaluation order, allow/deny semantics, callback bypass | allowedTools is not an exclusive tool set; do not rely solely on canUseTool |
| SDK secure deployment | threat model, boundary/least privilege, container deployment | credentials and database stay outside worker-writable boundary; no maximal-security claim |
| PostgreSQL 18 SELECT | locking clause, queue-like SKIP LOCKED scope | short claim transaction; not a general consistent business read |
| PostgreSQL 18 LISTEN | registration, connection lifetime, startup race | commit LISTEN then inspect state, and keep polling |
| PostgreSQL 18 NOTIFY | description and transaction semantics | commit-time wake hint, table remains durable truth |
| Git worktree | description and shared repository behavior | source/workspace management does not imply sandboxing |
| Docker Engine security | namespaces/cgroups and daemon attack surface | isolation depends on mounts/privileges; worker gets no Docker socket |
| Temporal workflow execution | definition, replay overview | alternative only when workflow complexity warrants a different orchestration owner |
| Fastify introduction | framework scope | recommendation for HTTP ingress; no benchmark claim |
| node-postgres transactions | complete transaction guide | same client within BEGIN/COMMIT/ROLLBACK |
| Zod basics | define, parse, safeParse | structural validation is separate from business authorization |

URLs are in the article or its source front matter. The Agent SDK TypeScript
reference was too large for web extraction; direct markdown downloads returned
403. API details used in the article are instead established by the official
structured-output page. No pretend full-reference reading, installed SDK run,
paid model call, real deployment or optimization benchmark is claimed.

Revision outline: sixteen chapters; front-loaded runtime architecture/principles
and selected stack, followed by authority, modules, intake, dispatch, schema,
SDK adapter, verification, recovery, call-level example, concrete RSI, memory and
budget, implementation stages and operational acceptance. Added architecture,
data-model, claim-transaction and SDK-handoff diagrams. Default one repository
writer; process-scenario T3 precedes repair T2 on an internal baseline. Kept all
case IDs synthetic. Added a core SQL schema, plan proposal and runtime settings.
Prior task/RSI JSON examples were aligned with this concrete design.

## Architecture-revision verification (2026-10-22)

- Final revision: 16 chapters, 20,041 CJK characters (including headings/table
  text), 16 tables, 14 mechanism diagrams, six JSON examples and one SQL example.
  Four new Mermaid/SVG pairs; dependency and Task-state diagrams revised to match
  the concrete single-writer design. Newly rendered artifacts visually inspected.
- Humanize-text applied to the full technical draft: 15 recorded prose changes,
  then two sentence-flow repairs with no changed fact. Front matter, URLs,
  numbers, code fences, tables and diagram imports locked during the pass.
- Native npm run check: 95 files, 0 errors, 0 warnings, 0 hints. Native npm run
  build: exit 0, 245 pages, including Pagefind. Existing empty collection and
  markdown API notices and zh-cn stemming limitation remain unchanged.
- Native npm test: 22 passed, 0 failed, 0 skipped. No added tests that merely
  restate the article and no autonomous-runtime completion claim.
- All 14 SVGs parse; XML id attributes unique across the article, marker/ARIA
  references resolve, colors use tokens, and no new script/filter/animation.
  One supplemental audit initially mistook data-id for id; corrected to XML
  attributes. This was an audit false positive, not a diagram defect.
- Six JSON examples parse; task dependencies are acyclic, T2/T3 scopes and
  prerequisite records agree, embedded JSON subsets match downloads, defaults
  grant no release permission, and the RSI experiment remains NOT_RUN.
- SQL relationships and task/job/attempt transitions manually reviewed against
  the prose. Core schema is illustrative, not a production migration; budget
  ledger, complete policy history and runtime enforcement still need engineering.
  No PostgreSQL database was created and no company service was executed.
- Embedded TypeScript syntax transpiles. Additionally fetched the official
  published @anthropic-ai/claude-agent-sdk 0.3.307 package read-only from npm;
  sdk.d.ts confirms query, Options.cwd, maxTurns, JSON-schema outputFormat and
  structured_output types. No package added to this site, no installed-SDK full
  type-check or model invocation. Metadata/type evidence is retained in the
  temporary research folder. The version audit does not claim an optimal version.
- Built HTML has 16 sections, 16 tables and 14 authored diagrams, no duplicate
  IDs, all local links/anchors resolve, and all seven downloads match bytes.
  Article ships its one existing enhancement script; checked home/archive pages
  remain script-free. Chinese list includes the post; English list omits it and
  the missing-translation toggle is disabled.
- Existing npm preview server confirmed running on port 4324 and serves this
  worktree's rebuilt dist directory. Browser page screenshots remain unverified:
  the earlier automatic localhost approval rejection (not authorized) was
  respected; no alternate browser or headless webpage workaround.
- Final scope: 37 task-owned files (one post, one ledger, 28 diagram files,
  seven downloadable examples). Compared with the prior draft, 11 additions and
  eight modified files; no tracked/shared edits, no change to established site
  contracts or runtime dependencies. Original checkout's 202-path content
  manifest remains byte-for-byte unchanged. Temporary dependency symlink removed
  after verification. No commit, push, deployment or paid-product experiment.

## Article-owned diagram layout revision (2026-10-22)

User feedback: fixed-width diagrams inside half-width sequence rows required
horizontal panning and prevented a complete initial view. The owning surface is
this article; no shared MechanismSequence, global styles, routes or public API
was changed. A new article-only CompanyDiagram component selects wide/narrow
inline SVGs, fits diagrams within available width and stacks sequence copy above
the diagram. Selectors match only rows containing its company-diagram marker.

Eleven wide illustrations gained authored Mermaid/SVG phone variants. At widths
up to 899px, lifelines become vertically ordered message steps, and branching
outcomes appear as explicitly conditional notes below the main path. The phone
variants have intrinsic widths 187-236 SVG units and 16px authored text. Three
already narrow diagrams retain their existing SVG. This is a layout/illustration
revision; article front matter, prose, tables, code examples and sources remain
byte-identical to the prior draft. No new browser runtime was added.

Native check:96 files,0 errors,0 warnings,0 hints. Native build including Pagefind
passed; native tests:22 passed,0 failed,0 skipped. All11 new Mermaid sources
rendered; PNG artifacts visually inspected. All25 SVGs parse, IDs/marker references
resolve, and phone widths remain below280 units. Built HTML contains13 article-
owned diagram frames,11 narrow variants, no duplicate IDs and one existing script.
Checked framework pages remain script-free. Compiled CSS contains the article-
only stacking/fit selectors and899px variant breakpoint.

Local preview on port4324 is updated. Browser geometry and desktop/mobile/
reduced-motion screenshots await authorization: earlier automatic localhost
approval rejected access as unauthorized. Asked once through async user input
for permission to verify this concrete revision; no alternative browser or
headless webpage renderer used while that question is pending. Diagram artifact
review is not presented as full webpage layout proof. No commit or push.

Final scope audit:60 task-owned files, no tracked/shared edits, no whitespace
errors. Original202-path checkout manifest remains unchanged. Removed temporary
dependency symlink after checks. Native webpage geometry review remains pending.

## Publication validation (2026-10-22)

The user explicitly requested commit and deployment after the updated diagram
preview, then said to continue. Publication uses a separate worktree on remote
main1c18454473ad92072019d74fb8e15ca1a03f06a5. Exactly60 task-owned files were
copied; no existing remote paths overlapped and no unrelated dirty work was
included. Shared source and dependency manifests are unchanged from the authoring
baseline. No further approval is requested for this authorized publication.

Latest-baseline validation passed: npm run check (96 files,0 errors/warnings/hints),
npm test (22 passed,0 failed,0 skipped), and npm run build with Pagefind. Static
HTML review confirms local links and anchors resolve, all7 downloads match source
bytes,13 article-owned diagram frames include11 narrow variants, SVG IDs are
unique, and locale-list/toggle behavior is correct. The article retains one
existing enhancement script; checked framework pages remain script-free.
Browser screenshots remain unverified because of the earlier automatic localhost
approval rejection for unauthorized browser access. Publication is not a claim
of responsive browser acceptance, nor a runtime test of the proposed Agent
company. Deployment and live availability are checked separately after push.
