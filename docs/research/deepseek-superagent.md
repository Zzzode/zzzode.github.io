# DeepSeek Super-agent research ledger

## Intent and owned scope

Distill the user's DeepSeek essay into a Chinese teaching article, explain unfamiliar concepts on first use, trace an actual request through the public prototype, and distinguish architecture proposals, prototype behavior and reported experiments. Own only `src/content/posts/zh/2026-10-31-deepseek-super-agent.mdx`, `src/assets/deepseek-superagent/` and this ledger. Preserve all unrelated dirty changes. No provider installation, account access, messaging, deployment, commit or publication is authorized by this research task.

Stages: retrieve and inventory the essay; pin primary implementation; explain mechanisms and reconcile differences; write static diagrams and prose; humanize; native check/build and available preview review. Success requires full topic coverage, sourced claims and explicit verification boundaries. Shared components and public contracts are out of scope.

## Retrieval and provenance

Checked 2026-11-02. User URL: https://zhuanlan.zhihu.com/p/2099987320443237060 . Both browser fetch and direct HTTP returned 403. A page explicitly crediting the complete Chinese essay to DeepSeek is readable at https://blog2.eimoon.com/p/deepseek-super-agent-design/ . Its TOC and all article text were read through the web reader; direct shell retrieval did not complete, and the later parsing attempt failed because bs4 is unavailable. No need to install a parser. Do not claim to have accessed the original Zhihu HTML or verified mirror fidelity byte-for-byte. Cite this republication transparently, and rely on official code/documents for technical implementation claims. No third-party commentary is treated as implementation evidence.

Official prototype cloned read-only to `/private/tmp/deepseek-superagent-research`, pinned at `6337fc823ce20251c8de8085948165c81aaa701e`; initial commit 2026-10-31T20:05:39+08:00. This supports the article's 2026-10-31 subject date; the mirror date is 2026-11-01. Version is 0.1.0, MIT; README expressly says research prototype, not official product or production-ready, different from internal implementation and essay.

## Complete essay inventory

Nine main sections and sixteen numbered subsections, all read and used:

1. Motivation: single-session attention limits and continuous/high-efficiency/proactive/persistent goals.
2. Two-layer architecture: 2.1 Router and batching; 2.2 Workers and optional inner teams.
3. Event-driven design: 3.1 deterministic/semantic filtering; 3.2 subscriptions and bypass; 3.3 Inline/Spill, locality and Chain of Recall; 3.4 speculative work.
4. Human interaction: 4.1 asynchronous tools/full-duplex interaction; 4.2 channel-specific communication.
5. Separation: 5.1 compute/state; 5.2 compute/execution environments and BYOM.
6. External Watchdog and task progress monitoring.
7. Preliminary experiments: 7.1 four-way ablation; 7.2 Router batching stress test.
8. Open problems: 8.1 scaling and long memory; 8.2 product interaction/intervention; 8.3 context boundaries and A2A; 8.4 security/privacy.
9. Conclusion, prototype status and attribution. Author/acknowledgements read; navigation, promotional footer and QR codes excluded.

All figure captions read. Figures showing examples and architecture are not our observations. Numeric image-only rows were not available for independent transcription; use only numbers explicitly stated in prose, omit unverified cells rather than reconstruct them. No copying source screenshots into assets.

## Primary evidence

Read README and official docs 000 Philosophy, 001 Domain, 002 Authorization, 003 Execution, 004 Prompts, 005 Panel, 006 Deployment, plus relevant architecture mappings in 007. SETUP.md was read as documentation, not followed as an instruction to execute. Cookbook 008 is only an extension reference and not required to explain this article. Read implementation excerpts in `src/core/intake.ts`, `src/core/evals.ts`, `src/app/resources.ts`, `src/app/cards.ts`, `src/app/store.ts`, and `package.json`.

Additional context: https://www.deepseek.com/en/harness/ and https://www.anthropic.com/research/managed-agents (redirected from the engineering URL), published 2026-04-08. The latter explains independently replaceable harness, durable session log and execution environments; avoid borrowing its performance numbers as DeepSeek results.

## Key editorial decisions

- Design essay and prototype are separate evidence layers. The essay's unified Router response is not a prohibition on direct worker replies in the prototype: current prompts explicitly make the Executor acknowledge and handle its own follow-ups.
- Existing thread delivery is context, not fresh authority. Mandate limits still apply. Context-only subscriptions do not grant follow-up authority or resume ended Tickets. Human stop differs from ordinary completion and from process pause.
- `observe` is the default for inferred work; explicit authorized requests still run. `off` does not disable explicit work. `auto` needs enabled matching rules.
- Prototype is a one-repository local DSH bundle with SQLite, worktree preparation and role presets. Do not claim it ships the essay's full elastic cloud/BYOM design or a productized semantic Watchdog. Deployment docs have a separate-profile hourly health check and respect manual stop.
- CLI wrappers, prompt rules and worktrees are not OS isolation. Both role presets use the operator OS user's full access. Branch protection is needed for enforced review; auto-merge text is instructions, not host logic.
- Deployment explanation is a short prerequisite/start/acceptance walkthrough, not an install transcript. No authenticated request, merge or autonomous message was executed.

## Number ledger

Author observation of 3–5 live sessions is not a user study. Essay ablation: about 300 messages/run, about 20 work requests, five repetitions per variant; coding replaced by a time-consuming tool, message/work durations scaled to 1/4, real model-call time. Reported Super-agent p50=12.4 min, p95=15.7 min; neutral single-session p95=29.5 min, no subagent calls in five runs. Delegation prompt: four of five runs delegated. Removing bypass: about 30% more Router decisions, cache-read tokens 23.23M→31.77M (about 37%), completion time roughly unchanged. No claim of better code quality or cheaper total dollars.

Router-only test: real Router model, mock Workers, decision-trigger rates about 1→40/min; batch 1.0→2.8, request 2.5→3.9s, reported amortized decision time 6.4→1.6s. These are different metrics; the amortized number cannot be reconstructed by simple request-time/batch division from endpoints. No raw benchmark reproduced or confidence intervals established.

Prototype docs: role shell background threshold 5s; manual stop preservation; state and result distinct from process liveness. Only include extra version/port numbers if required for a usable walkthrough.

## Delivery and verification

Created one Chinese MDX article with ten numbered sections. Front matter has sixteen source entries: fourteen accessible official/primary implementation or context references, plus the user-supplied blocked original and its explicitly attributed republication. Covered all nine original main sections and sixteen numbered subsections; no claim to have read the inaccessible original HTML or image-only numeric table cells. Added five original Mermaid diagrams (cover, candidate admission, subscription continuation, reference recall and design-level lifetime), rendered with an existing temporary Mermaid CLI installation. Simplified tall decision diamonds into compact diagrams without changing the explained authorization boundary. Normalized SVG colors to project tokens, removed generated filters/shadows, and prefixed all IDs per diagram. PNG inspection checked admission labels/layout before normalization; it is not a browser screenshot of the article.

Applied the repository humanize-text gate to the complete draft: simplified the opening, added first-use definitions for Issue/PR, DSH, CLI, profile, SQLite and worktree, and retained all reported numbers, citations and table cells. No fabricated use experience or prototype benchmark claims. Narrative explains prerequisites and acceptance rather than running the upstream SETUP agent workflow.

Final `npm run check`: 76 files, zero errors/warnings/hints in diagnostics. Final `npm run build`: passed; it still emits module-level `use astro:head-inject` warnings, empty-collection warnings and Chinese stemming notes seen before this task. All five SVGs parse as XML. `git diff --check` passed for owned paths. Local preview `http://localhost:4321/posts/2026-10-31-deepseek-super-agent/` returned HTTP 200; rendered readback shows ten section headings plus Sources, two valid sequence anchors and no duplicate IDs. Page ships the existing single article module, with no Mermaid runtime or new dependency.

Full visual review remains unperformed: computer-use inventory has no apps or browsers and reports `Sky Computer Use native pipe startup failed` and `The browser access host is unavailable`. Cannot claim 1280/1680 desktop, 768 tablet, 390 mobile, middle-row or reduced-motion browser checks passed. Revisit those viewports before visual approval and publication. No experiment was reproduced, and no DSH service, account integration, model request or real repository task was run.

Only the article, this ledger and five Mermaid/SVG pairs were created. No shared module, established public contract, credentials or user settings were changed. No delegated work, commit or push.

## Explicit humanize-text pass

At the user's request, revised the cover lead and explanatory prose across all ten sections. Kept one technical voice, replaced repeated cautionary formulas with concrete consequences, and varied paragraph and sentence lengths. Preserved the distinction between inferred work and explicit authorization, experiment scope and code quality, and architecture proposals and current implementation. Corrected two draft rewrites during review that would have overstated the irrelevance of PR counts or claimed raw measurements were categorically unpublished.

Editorial comparison against the pre-pass snapshot confirmed unchanged front matter, headings, URLs, numeric values, inline-code identifiers, all tables, the structured sequence and closing summary. All ten Mermaid/SVG file hashes are unchanged. This is editorial preservation review, not regression test coverage. Only the article and this ledger changed in this pass; no shared module or established public contract changed.

Final `npm run check` passed: 76 files, zero errors/warnings/hints in diagnostics. Final `npm run build` passed with the previously recorded build warnings/notes. Local article preview returned HTTP 200. Browser review was attempted again: no native apps or browsers available, with `Sky Computer Use native pipe startup failed` and `The browser access host is unavailable`; no new desktop/mobile screenshots are claimed. No upstream deployment, experiments or account tasks were executed. No delegation, commit or push.

## Diagram and content revision (2026-11-02)

At the user's request, reworked the article's visuals and section rhythm. Replaced the five Mermaid renders with nine hand-authored editorial SVGs: cover, architecture, admission, continuation, recall, async timeline, lifetime, experiment bar chart and execution-boundary panel. Deleted the Mermaid sources. Added the missing architecture, async, experiment and isolation figures; split long prose tiles around the new figures and added short section leads. The experiment chart plots only the two reported p95 values and labels the five-run sample; it does not reconstruct unreported cells.

Content changes: added the Eval timeout path (`unavailable`), corrected the async figure so the 5-second background transition is drawn at five seconds, and re-ran the humanize pass on the revised prose. Facts, numbers, source URLs, tables, section ids and the closing summary are unchanged.

Verification: `npm run check` (76 files, zero errors/warnings/hints) and `npm run build` pass. Captured the built page through the preview server with headless Chrome/CDP at 1280, 1680, 768 and 390 CSS px under `prefers-reduced-motion: reduce`. The TOC rail appears at 1680; sequence rows stack below 900px; figures remain readable and pannable with the localized hint; the document scrollWidth equals the client width at 390. Headless classic scrollbars show a 7.5px overshoot from the shared full-bleed `.article-canvas-wrap` (`100vw`), not from the article; no shared CSS was changed. All nine SVGs validate as XML.

Not performed: real-device touch and screen-reader testing; the synthetic experiment was not reproduced. The article remains untracked; no commit or push.

## Narrative restructure (2026-11-02)

At the user's request, the article was reorganized around the source's design philosophy instead of a feature-by-feature walkthrough. New spine: problem (attention as the scarce resource) → philosophy (the act / speak / stop rules) → user mental model (work, not sessions) → architecture (Router/Worker and the object chain) → harness run model → implementation (authorization, execution and recovery, context) → tradeoffs and experiments → limits → code-reading guide. Added a three-card philosophy block, a user-view/system-view mapping table, a tenth SVG (`session-flow.svg`) and a harness section with role cards for the Router, Worker, subagent and host, session lifecycle and delivery rules, a message sequence diagram, and the six cross-session communication paths. The current asset set is ten SVGs. Changed the title to “从管理会话到管理工作” and the cover visual to “你继续说话，系统记住工作”. All facts, numbers, sources and the editorial boundaries remain unchanged. Re-ran the humanize check (removed repeated “不是 X，而是 Y” frames), `npm run check` and `npm run build`; captured 1280 and 390 views of the new sections. No commit or push.
