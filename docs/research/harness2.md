# Harness² source and teaching ledger

Research date: 2026-10-19. Publication authorized by the user on 2026-10-20.
Owner: the Harness² article and its diagram assets only. No shared component,
style, locale string, or public interface changes.

## Evidence and versions

- User source: https://mp.weixin.qq.com/s/kOITEJCs1QRW7nfZbs3Wnw
  — QbitAI, “谷歌开源RSI新成果！华人浓度爆表”, Jay. The page's
  `create_time=1792375810` corresponds to 2026-10-19 10:10:10 Asia/Shanghai.
  Fetched successfully with urllib after the web reader failed.
- Primary paper: https://arxiv.org/html/2610.14224v1
  — *Harness²: Recursive Agent Harnessing for an Open World*, 2026-10-09.
  Methods, benchmark results, limitations, and prompts are author reports,
  not independent replications.
- Official release: https://github.com/google-research/harness2
  pinned to `1cfe254e8d25b15f37048c3730134686abe60335`.
  README, docs/SETUP.md, docs/EXPERIMENTS.md, docs/BENCHMARKS.md,
  pyproject.toml, config.py, core/{recursion,schedule,selection,library,ledger,
  context,tree}.py, substrate/{opencode,codex}.py, demo.py and cli/demo.py.
- Project: https://harness2.github.io/ (same authors, not independent evidence).
- Context: https://arxiv.org/abs/2303.17651 (Self-Refine, output refinement);
  https://arxiv.org/abs/2303.11366 (Reflexion, linguistic feedback and memory).
  Both abstract pages fetched and claims checked.

## Inventory before outlining

All six editorial blocks of the WeChat source were read:

| Block | Topic | Treatment |
|---|---|---|
| 1 | Announcement and harness-level RSI | Definition and source attribution |
| 2 | Missing verifiers and task overfitting | Motivation and evidence boundary |
| 3 | Two loops, scoped edits, contrast, composition, library | Full mechanism walkthrough |
| 4 | Benchmark gains, scaling, transfer | Primary-table results and calibers |
| 5 | Author profiles and ethnic tally | Paper/team attributed; ethnicity tally and biographical promotion omitted |
| 6 | Reference link and publisher footer | Original URL retained; publisher promotions omitted |

The paper's 15 substantive blocks (abstract, six numbered sections, eight
appendices) were inventoried and read. References were checked for the
contextual papers used. Figures 1–19 and Tables 1–7 were inventoried through
their captions and associated explanations; the article does not claim image
OCR or reproduce every numerical point from plotted figures.

| Paper block | Coverage |
|---|---|
| Abstract, 1 Introduction | Frozen weights, two problems, bounded claims |
| 2.1 | Execution harness vs improvement harness, eight components |
| 2.2.1 | Reference → invariant/domain proposals → probes → selective composition → executed successor |
| 2.2.2 | Width vs depth, k, anonymous selector, k=1 bypass |
| 2.3 | Full adopted tree plus EXPERIENCE.md; reset next execution harness |
| 3 | Four configurations, benchmarks, default editor, means and SD |
| 4 | Budget, ablations, transfer, same-model study, JobBench case |
| 5–6 | Prior work and bounded contribution |
| A | Improvement object/timing/supervision/streaming/scaling/improver update distinctions |
| B | Test sample counts and scoring protocols |
| C | Baseline differences; no blanket state-of-the-art claim |
| D | Mounting, sessions, validators, library, component activation |
| E.1–E.7 | Component removal, retrospective reuse caveat, transfer, reliability, production comparison, regressions, concrete cases |
| F | Added compute and unreliable judgment |
| G | Library management and adaptive budget are future work |
| H | Executable edits, evidence decisions, selector and reflection prompts |

## Teaching plan

Backdrop: connect output self-refinement and reflective memory to editing
executable runtime files. Explain why open-world work lacks a convenient oracle.
Aftermath: the release is a benchmark framework with adapters and a deterministic
demo, not an automatic production plugin for any installed coding agent.

Ten sections: motivation; editable surface; Propose–Probe–Compose; behavioral
evidence; cross-task retention; measured RSI checkpoints; parallel/sequential
budget; results; model-backed setup; limits and adoption. Eight Mermaid sources
produce eight tokenized inline SVGs: overview, proposals, evidence, library,
recursion, demo, rsi-next-task, runtime. Labels distinguish observed deterministic
steps from model-based mechanisms described in the paper.

## Number ledger

All paper main-table means/SD are over three shuffled task streams. WorkBuddy
uses 40 Code / 35 Web / 25 Office test tasks; Avg is a domain macro-average,
not a pooled task mean. JobBench uses 34 test tasks with weighted rubric scores.
LAB uses 100 held-out tasks and reports criterion-level Partial pass rate.

| Claim used | Source/caliber |
|---|---|
| WorkBuddy GLM/OpenCode 64.2 (1.4) → 75.7 (2.2); +11.5 | Table 1, k=1, author measurement |
| GLM/Codex 64.4 (1.2) → 75.3 (1.3); +10.9 | Same |
| Gemini/OpenCode 72.4 (0.9) → 77.5 (2.5); +5.1 | Same |
| Gemini/Codex 74.5 (1.6) → 77.5 (2.0); +3.0 | Same |
| k=5 WorkBuddy Avg 80.8/80.4/79.6/78.3 | Table 1 mean + recursion delta; calculated, no SD inferred |
| JobBench Gemini/OpenCode 31.5 → 36.0; +4.5 | Table 2, k=1 |
| LAB GLM/OpenCode 59.6 → 71.4; +11.8 percentage points | Table 2, Partial, not whole-task accuracy |
| k=5 adds max 3.9/4.2/6.7 | Tables 1–2, maxima across configurations; points/points/percentage points |
| Ablation 77.5/36.0; no library 74.4/34.2; no scoping 74.6/32.3; no composition 75.9/34.1 | Table 3, Gemini/OpenCode k=1 |
| JobBench-to-WB library gains 0.6/0.5/2.9 | Figure 7 and §4; Code/Web/Office at fixed one-step budget |
| JobBench case 43.1 → 77.8 | Figure 9; single illustrative task, retrospective judge |
| Tool errors JobBench 14.4% → 9.1%; calls 27.4 → 32.8 | Table 7, Gemini/OpenCode k=1 |
| WB wrong selection 95 vs chosen 55 | E.6, retrospective, scores hidden from selector |
| 4k executor rollouts + 3k editor/composer stages | core/ledger.py nominal identity; excludes selection/reflection/retries/judging |

Main paper uses Claude Opus 4.8 as editor; same-model k=2 experiments are a
separate study. k measures width or depth, not simple repeated base execution.
The paper's token trade-off figure includes pre-delivery execution/improvement;
do not infer dollar cost, wall time, or total calls from #Steps.

## Executed evidence

On 2026-10-19, macOS, Homebrew Python 3.13, isolated temporary venv:
`pip install -e .`, then official `harness2-demo --output <temp>/demo-run --k 2`.
Exit 0: done=2, failed=0, execution_count=28, editor_calls=32. Both modes run;
their two reference rollouts per task are shared, so counts must not be summed
as two separate 4k budgets. First task library_entries_before agg/seq=0/0;
second=1/1. Base answers 105.25 and 35.50; composed answers 85.15 and 20.25.
Actual Python subprocesses and persisted full harness/EXPERIENCE.md verified.
Editors, selection, and reflection are deterministic fixtures, not model calls;
the demo selector calculates a known sum. No evidence of autonomous learning,
model quality, Linux benchmark compatibility, paid API access, or timing gains.
Temporary machine paths are excluded from public assets.

## Release discrepancies and limits

- README/SETUP reference `.env.example`, absent from this pinned Git tree.
  Article creates `.env` directly using documented variable names and explicit
  placeholders; it does not silently claim the template exists.
- Official EXPERIMENTS documents a Codex JobBench run downloading its rubric.
  Release network access is unrestricted, and Codex sandbox disabled. Local
  context filtering is insufficient to prevent internet rubric leakage.
  This release observation does not establish contamination in paper results.
- Paper LAB test count (100) differs from release full stream (1,143); no claim
  that an unrestricted default release run reproduces the paper.
- `core/selection.py` selects only composed finals (`agg1..k` or `c1..k`),
  explicitly excluding reference executions and uncomposed proposals. The
  paper's generic selector prompt mentions base outputs as eligible, so the
  article explains the pinned implementation's narrower pool separately.
- No production integration, external accounts, API model benchmark or legal
  work executed. Published model labels are preserved as author-reported labels.
- Desktop/mobile/reduced-motion webpage screenshots remain blocked by the prior
  localhost browser approval rejection. Do not bypass via headless screenshots.
  Generated Mermaid assets may be rendered and inspected locally.

## Prose and site verification

Mandatory repo humanize-text pass: preserve factual values, source URLs,
commands, tables and diagram labels; edit explanatory paragraphs only.
Nine paragraph edits passed a meaning lock comparing front matter, table
markup, code fences, URLs and numeric tokens. Final terminology definitions
and the selector-pool clarification were reviewed separately.

- `npm run check`: 95 files, zero errors/warnings/hints.
- `npm test`: 22 passed, zero failed.
- `npm run build`: 237 pages, Pagefind completed. Existing empty
  publications/talks/teaching collection notices remain.
- `npm run test:daily:integration`: passed in its native isolated fixture tree.
- Supplementary built-HTML inspection: ten sections, eight labeled diagrams,
  six tables, unique IDs, resolved in-page anchors, one existing inline
  article script; Chinese home/archive include the article; English archive
  excludes it and the article translation toggle is disabled.
- Eight Mermaid diagrams compiled successfully; PNG renderings were inspected
  for label clipping and arrow direction. SVGs parse and use token colors,
  unique ID prefixes, no scripts, gradients, foreignObject or animations.
  Two labels/flows were simplified after inspection. Native SVG widths are
  retained as readability floors with the existing local overflow handling.
- Preview server started for this worktree at `http://localhost:4322`.
  No webpage screenshot, responsive layout, middle-row viewport, keyboard/touch
  interaction, or reduced-motion runtime claim is made. The prior browser
  permission rejection remains respected; these checks are pending.
- Only the new Chinese article, this ledger, eight `.mmd`/`.svg` asset pairs,
  and the extracted public demo trace are intended changes. Original dirty
  checkout preserved. The initial draft was left uncommitted and unpushed;
  no shared module or established public contract changed.

## Follow-up: concrete RSI state changes

Requested: expose what changes at each iteration, including cross-task learning.
Article §6 now precedes budget/results and uses H0/H1/H2 and R0/R1 as explicit
teaching names, not upstream API identifiers. §3 also expands the actual
model-backed JobBench case into a stage table without inventing intermediate
candidate scores or verbatim patches.

Verified existing local artifacts, no paid model run:

- Task A bases: 105.25. inv1/dom1/c1/inv2/dom2/c2: 85.15.
- c1 script removes ` if amount > 0`; c2 script is byte-identical to c1.
  Second-round stages have kept_base=true relative to current H1, not H0.
- Sequential selector adopted c1; two equal deliverables do not imply later
  checkpoints are preferred. Original EXPERIENCE.md and index retained.
- Task B bases: 35.50. All modified/checkpoint executions: 20.25.
- A's EXPERIENCE.md exists in B's inv1 context/library and is byte-identical
  to the retained entry. DemoProposer never reads this file or its mission to
  decide its edit: the demo does not establish a causal library benefit.
- `public/files/harness2/rsi-demo-trace.json` extracts the script snapshots,
  hashes, diff, stage flags, answers, chosen label, original experience and
  run summary. Source/commit, environment and deterministic limitations are
  embedded; machine paths and credentials are excluded.
- Separate the paper's claim that model-based editors use accumulated experience
  from the observed presence of library files. The editor weights and fixed
  instructions do not evolve; retained components and guidance available to
  later edits do.
- Follow-up humanize pass changed four prose phrases with a lock on code,
  table markup, source URLs and numeric tokens. Check/build rerun after edits;
  native tests/integration results above belong to the initial article pass,
  and were not repeated for this content-only follow-up.

## Publication preflight — 2026-10-20

- User explicitly requested committing and pushing the reviewed article.
- Isolated branch `codex/harness2-distillation` started at the current
  `origin/main`, `cf18f4087138383c59261329c10fa36ff65240fc`.
- Repeated release verification: 22/22 tests; `npm run check` on 95 files with
  zero diagnostics; `npm run build` with 237 pages and completed Pagefind;
  `npm run test:daily:integration` passed in its native isolated fixture tree.
- Supplementary final build checks verified eight diagrams, six tables,
  unique IDs and valid in-page anchors, one existing article script, correct
  Chinese listings and disabled translation, and the copied public trace.
- Original shared checkout preservation manifest covers 202 paths. Only the
  19 article, research, diagram and trace files are included for publication.
- Webpage viewport screenshots and reduced-motion runtime review remain
  unperformed following the earlier browser permission rejection. The explicit
  publication request followed disclosure of this limitation; no browser
  permission workaround was attempted.
- No real-model benchmark execution or autonomous-learning claim was added.
