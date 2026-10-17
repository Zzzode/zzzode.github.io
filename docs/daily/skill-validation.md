# AI Daily skill completion review

**Verdict: the skill is written and usable as a repository-local editorial workflow. Its location, directory structure and division of responsibilities are appropriate. No blocking structural or workflow defect was found in this bounded review.** This verdict does not certify a real issue for release or verify the live truth of watchlist entries.

Reviewed read-only: the 62-line `.agents/skills/ai-daily/SKILL.md`, `agents/openai.yaml`, all three reference files, `scripts/validate-ledger.mjs`, `tests/daily-evidence.test.mjs`, `tests/fixtures/daily-evidence.mjs`, `tests/fixtures/daily.mjs`, the scheduler entrypoint and relevant shared schema/time implementations. No network access, news collection, repository write or publication was performed.

## Placement and responsibility

The canonical location `/workspace/zzzode.github.io/.agents/skills/ai-daily/` is appropriate for a version-controlled skill whose operation depends on this site's content schemas, components, tests and publication workflow. The package is intentionally repository-bound; it does not need to be made a globally portable standalone skill.

The directory has a clear division:

- `SKILL.md` defines when to use the skill and the collection, selection, audit, rendering, correction and release workflow. At 62 lines it is concise, with concrete gates rather than a duplicated operating manual.
- `agents/openai.yaml` supplies the display metadata and `$ai-daily` invocation prompt. The identifier matches the skill name.
- `references/evidence-contract.md` explains the ledger semantics and explicitly delegates the exact field contract to `src/lib/daily-ledger.ts`.
- `references/time-and-selection.md` isolates time precision, boundary handling and editorial event distinctions.
- `references/watchlist.json` is an evolving set of discovery seeds, explicitly not an allowlist or company quota. Ambiguous JEV/Laya/OSC entries remain qualified and unresolved.
- `scripts/validate-ledger.mjs` validates ledger/article agreement using the site's existing schemas. Its four-level relative imports resolve correctly from the package in the current repository layout.
- Regression tests and synthetic fixtures live outside the skill under `tests/`, where they can participate in the site's normal test suite without becoming production feeds.

`docs/prompts/ai-daily.md` is now a short invocation and scheduling-ownership entrypoint. It points to the skill instead of restating a competing editorial policy. Site-curator and AGENTS also point Daily work to this workflow. The design guide, distill and humanize-text remain shared presentation/prose authorities, while ai-daily supplies the specialized discovery, time, audit and conditional-release rules. That separation is reasonable; these are complementary responsibilities rather than multiple independent Daily prompts.

## Content and execution

The workflow covers the required sequence: establish a truthful run/window, discover beyond named companies, retain every considered event, verify primary evidence and time precision, select by significance, independently audit the entire candidate set with supplementary discovery, write and inspect exact rendered output, bind reviewed bytes to the ledger, and verify the actual deployment/live result.

The important boundaries are explicit: previews and betas are eligible; date-only evidence is preserved; historical events are not recycled as new; inaccessible sources are not no-update findings; uncertain identities are not guessed; uncovered categories block release; bounded limitations require reviewer assessment and public disclosure. Corrections preserve the slug/original date and prior candidate provenance. The skill also excludes automation management, unrelated architecture, paid services, credential changes and force-pushes from routine issue work.

The executable chain exists and is compatible with the selected environment's Node `v24.19.0`. The ledger validator imports the shared schemas, checks publication-window/selection/source/time/maturity agreement and enforces the reviewed MDX hash. The ledger schema rejects uncovered categories, missing independent supplementary discovery, incomplete candidate review and unresolved blocking findings. Site scripts provide the named unit, check, build and Daily integration commands.

The exact render/browser, source truth, consequence ranking, actual reviewer independence and open-world coverage judgments still require real execution by people/agents. Both the skill and validator explicitly state that record/schema consistency cannot establish those facts. This is an honest and necessary limit, not a defect to solve with a numeric coverage score.

## Evidence from testing and the forward exercise

I independently ran `node --test tests/daily-evidence.test.mjs`: **11 tests passed, 0 failed**. They exercise historical funding window separation, date/DST/unknown-timezone bounds, pending uncertainty, unfamiliar studios and preview/beta eligibility, access failures, uncovered-topic blocking, full-candidate reviewer coverage, supplementary reviewer searches, review limits, reviewed hashes, source metadata agreement and correction dates.

The parent reports creator quickvalidate PASS and 19 total unit tests passing. Those are supporting parent-provided results; I did not rerun creator quickvalidate or the full test suite in this review. Unit tests and metadata validation establish the behaviors they exercise, not real news accuracy, render quality or exhaustive collection.

The earlier independent forward exercise produced `/tmp/ai-daily-forward-result/release-recommendation.md`. It correctly found the fixture beta temporally eligible, retained significant unknown-zone date-only research in a separate uncertainty bucket, treated the inaccessible source as failed/unresolved, excluded historical financing from the later window, kept unresolved names qualified, and blocked release with all coverage topics uncovered and no supplementary audit. **That synthetic HOLD is a successful demonstration of the skill's release boundaries; it is not evidence that the skill itself is unfinished.** The fixture was explicitly non-publishable regardless of the editorial analysis.

## Limits and follow-up

No blocker requires another rewrite or directory move before describing this skill as complete. Keep these operating limits visible:

- The package depends on this repository's schemas and tooling; moving it elsewhere would require adapting those imports and commands.
- Watchlist seed labels and URLs were inspected as data, not independently verified online in this review. Actual runs must perform and record current accesses rather than treating the seed list as evidence of current news.
- Standing Daily publication authority is conditional and remains subordinate to the actual task/user scope. It did not authorize publication of the synthetic exercise, and the skill must not be treated as unrestricted publication permission in a different context.
- An actual issue still needs real collection, independent complete-candidate audit, exact rendering checks and the remaining release evidence. A completed skill is a workflow, not an already-executed issue or an activated scheduler.

This review wrote only this temporary report. No action was denied, left pending for approval or left with an uncertain execution outcome.
