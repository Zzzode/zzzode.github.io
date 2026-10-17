# AI Daily pre-release validation

Date: 2026-10-17. Baseline: `d84df2ca319af3a34739d1955309c6a2b62b50b1` (verified against remote `main` before work and again during review). The architecture-only results below were recorded before the first real issue. Subsequent release evidence is recorded in [the 2026-10-17 ledger](research/ai-daily-2026-10-17.md). No scheduler modification or automation enablement is part of this work.

## Current correction and Skill verification

The initial architecture matrix below is historical. The first issue's selected-item fact/render PASS did **not** establish complete-candidate coverage; its financing-absence statement and blanket prerelease exclusion were withdrawn. Current evidence is the [structured run](daily/runs/2026-10-17.json), [independent correction report](daily/reviews/2026-10-17.md) and [independent Skill review](daily/skill-validation.md).

| Gate | Current result | Evidence / limit |
| --- | --- | --- |
| Repository Skill placement and structure | PASS | `.agents/skills/ai-daily/`; 62-line main workflow, metadata, three references and one executable validator; short task entrypoint delegates to it |
| Creator validation | PASS | `quick_validate.py`: `Skill is valid!` |
| Independent Skill review and forward exercise | PASS | No structural blocker; evidence tests independently 11/11; raw synthetic inputs correctly produced HOLD when discovery/review/render evidence was absent |
| Open discovery and complete candidate audit | PASS WITH LIMITS | 101 actual search/read/metadata records (56 searches); 57 candidates: 7 confirmed, 7 boundary watches, 12 excluded, 31 unresolved; 91 access records across 64 URLs. Counts do not certify exhaustive coverage |
| Historical exclusion recovery | Fixed | Previous release/paper/transaction/security leads restored and freshly checked; Ollama preview added, version-only Codex held; specific timing/significance reasons replace stable-only exclusion |
| Time and source contract | PASS | Instant/date/interval precision; unknown timezone retained; DST and date boundaries tested; article citation publication/retrieval metadata bound to fetched evidence |
| Visible correction | PASS | Original slug/date retained; actual updated and explanation shown; confirmation bars exclude the separate uncertainty section |
| Unit tests | PASS | 19 total, including 11 evidence-workflow cases |
| Astro check | PASS | 93 files, zero diagnostics; existing loader/deprecation notices remain separate |
| Production build and Pagefind | PASS | 223 static pages, 33 indexed pages; existing warning classes remain |
| Isolated Daily integration | PASS | Actual copied build: 16 public issues, two archive pages, late backfill, drafts/future/translation privacy, source/preview/date-only/correction rendering; no fixtures written into production |
| Production isolation and reviewed output | PASS | Seven production routes byte-identical to frozen preview; one home issue teaser, technical writing retained; public list/RSS/sitemap discoverability, English isolation, no fixture URL/token in HTML/XML |
| Real browser and complete-candidate final gate | See independent report | Chromium 1280/1680/768/390; exact reviewed MDX hash recorded in run. Build success alone is not this gate |
| Deployment/live and external schedule | Separate release evidence | Scheduler untouched. Exact-commit Actions and live network outcome must be reported separately; local Chromium review is not a physical-device or live-site certification |

All five topics retain `partial`, with dynamic-access, original-source, time and identity limitations disclosed in the public issue and independently assessed. No automatic metric proves global absence. The corrected issue uses primary evidence for confirmed/watch items and preserves publisher claims versus editorial inference. No synthetic exercise or fixture is publishable.

## Code and architecture checks

| Check | Result | Evidence |
| --- | --- | --- |
| Explicit daily channel independent of presentation kind | Pass | `post-schema.ts`; existing distilled posts default to `channel: writing` |
| Source/window/Beijing calendar validation | Pass | Unit tests reject missing sources, missing retrieval times, invalid dates, out-of-window events and a cutoff later than publication |
| Idempotent identity and order | Pass | Canonical locale/date slug validation; duplicate rejection; late backfill test cannot displace the newest issue |
| Public eligibility | Pass | Shared filter on home/list/detail/tags/RSS/counterparts; isolated build excludes ordinary/daily draft and future posts |
| Latest and historical discovery | Pass | Exactly one home daily teaser, separate long-form latest feed, daily archive 14 + 2 fixture issues, prev/next links and writing-archive entry |
| Search/RSS/sitemap | Pass | Public fixture indexed; exact private/future fixture search empty; English locale fixture query empty; public issue and page 2 sitemap/RSS assertions |
| Locale behavior | Pass | English list/archive do not borrow Chinese content; draft English counterpart cannot enable the issue toggle; archive homepage toggle works |
| Production content isolation | Pass | Fixtures written only under a temporary copied checkout; production content unchanged |
| `npm test` | Pass, 8 tests | Channel defaults, evidence/window constraints, timezone boundary, private/future boundary, identity/sort, pagination, late backfill, Stat affix regression |
| `npm run check` | Pass | 89 files; zero errors, warnings or hints (Astro telemetry disabled for sandbox compatibility) |
| `npm run build` + Pagefind | Pass | 218 production pages, 32 indexed article/project pages; two new zero-issue archive routes |
| `npm run test:daily:integration` | Pass | Sixteen explicit non-news fixtures plus draft/future/translation fixtures; actual isolated Astro build and output assertions |
| `git diff --check` | Pass | No whitespace errors; no content fixtures/build output in the source diff |

The untouched baseline was separately built from `git archive HEAD`: 216 pages, with the same warning classes/counts as the final production build (3 empty-collection loader warnings, 6 empty-collection render warnings, 32 existing MDX/Vite directive warnings, plus the existing Markdown plugin deprecation notice). No new production build warning class was introduced. Pagefind's existing Chinese stemming notice remains. These warnings are not a zero-warning claim.

Home, daily archive and English counterparts emit zero script tags. Post pages emit one Vite-built local article enhancement module: 6,485 uncompressed bytes, 2,502 gzip bytes in this environment. The current Astro build emits it as a cached external module, despite older repository prose describing an inline script. The Daily implementation adds no separate client script, framework or runtime dependency.

## Independent browser review

The delegated reviewer used installed Chromium and Playwright, captured full-size screenshots, inspected the actual images and exercised menus, pagination, TOC, search and reduced motion. Four viewports were used: 1280, 1680, 768 and 390 CSS pixels. The real production-content build supplied both locales' empty states; a separate temporary build supplied sixteen clearly labelled TEST FIXTURE / 非新闻 issues. The test URLs are reserved `example.test` references, not claimed news sources.

Initial review identified duplicate daily TOC labels and a disabled archive-home language toggle. Both were fixed and independently rechecked. Further review found small fixture SVG labels, undersized archive/navigation/footer targets and an isolated teaser chevron wrap; these were corrected. Existing DSec statistics repeated units under reduced motion; the shared Stat rendering now adds only missing affixes, and count-up completion preserves the final formatted label. Numeric and already formatted legacy callers remain covered.

**Final independent verdict: PASS for the Daily feature and its isolated sample.** Four-width checks found no page overflow; Chinese/English menus, archive pagination, TOC and reduced motion worked. The final fixture SVG labels measured 13.91/12.92 CSS pixels at 390. Daily archive, navigation/footer, home CTA and source-list targets passed the focused 44-pixel checks. DSec final values were `32K / 90% / 67.8%`; MiMo preserved `$3.47M / ~75.3万 / <6` with normal and reduced motion. This does not assert that every existing inline prose link meets 44 pixels.

The final independent review, actual screenshots and browser measurements are supplied in the local handoff evidence directory, rather than committed as generated binary artifacts. This is a Chromium viewport review, not a physical-device or Safari/Firefox certification. It does not certify the accuracy or visual design of an unwritten first news issue.

## Release boundary

Architecture implementation and the Skill-backed [execution entrypoint](prompts/ai-daily.md) are ready for review. The existing external Beijing 10:00 task remains paused during the one-time architecture approval/deployment gate. The user subsequently approved the reviewed architecture plus a real 2026-10-17 issue, conditional on independent factual and real-browser review and passing checks. That explicit scope satisfies the one-time visual/release approval requirement in `AGENTS.md`.

The user has separately granted continuing conditional authorization for subsequent daily articles: independent source verification and independent PC/mobile rendering review must pass, and all discovered issues must be fully fixed; then the reviewed issue may be committed and pushed to main without another per-issue human approval. The one-time architecture approval is separate from the standing article authorization. The parent manages initial task activation after the architecture is approved/deployed; a routine issue run does not alter the task. No fixture checkout may be deployed.
