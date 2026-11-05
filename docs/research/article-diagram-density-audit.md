# Article diagram density audit

Reviewed on 2026-10-17. Status: local preview, not committed or published.

## Scope and decision

The user requested the DSec article's process overview and compact explanation/diagram pattern for other suitable articles, plus a denser latest-posts section on the home page. The DSec component and article remain unchanged.

The inventory found 29 other articles using 31 ScrollStory sequences with 155 standalone diagrams. None required continuous interpolation of the same object: their teaching unit was a diagram paired with an explanation. All 31 now use `MechanismSequence`, with a linked overview and normal-flow rows. Cover illustrations, ordinary figures, timelines, tables, Steps, Pipeline, and the DSec lifecycle are outside this migration.

## Presentation changes

- Desktop pairs explanation and diagram; widths below 900px stack them in reading order. All steps remain present and readable, with no viewport-height spacer, pinned visual, crossfade, or JavaScript relocation.
- 142 legacy SVGs lose duplicate card/header decoration. Their viewBoxes are tightened around measured rendered geometry. Short spatial labels remain in their diagrams; longer footer explanations become wrapping captions attached to the same frame.
- 13 imported Scion, REA, and Aster SVGs render directly, without the redundant square outer SVG. They retain their natural, readable dimensions instead of enlarging tall diagrams to fill an entire column.
- Numeric SVG widths preserve a readable label size. Dense diagrams can pan within a focusable region; they never widen the page. A localized hint appears through 1199px.
- The home page retains chronological day groups and article numbering. Single-entry days and a final unpaired entry span the available row; existing excerpts fill the second column on desktop and follow the title on mobile. Multi-entry days retain the equal two-column grid.
- The obsolete ScrollStory component, runtime handling, and global CSS are removed. Authoring guidance and templates now describe the replacement. No dependency or runtime JavaScript was added.

## Content and contract preservation

All 31 `steps` arrays are unchanged. Every original non-header SVG text fragment remains in its diagram or corresponding caption. The migration contains 155 matching frame slots and 58 caption slots. Frame order follows authored DOM order rather than the historically inconsistent activation indices in two old sequences. Source lists, front matter, tables, numerical claims, and SVG assets remain unchanged.

The owning shared presentation component/export, article enhancement script, article CSS, localized labels, and home-page section changed within the requested scope. No public URL, locale contract, content schema, or external API changed. Existing unrelated work was retained. Historical REA/Aster research ledgers describe the presentation and checks at the time they were written; this audit records their current replacement rather than rewriting that history.

## Verification

- `npm run check`: 76 files, zero errors, warnings, or hints.
- `npm run build`: successful, including the 32-page Pagefind index. Existing Astro deprecation/empty-collection notices and Pagefind Chinese stemming notices remain.
- Served the built output through `npm run preview`.
- Browser inspection at 1280px and 390px covers all 29 migrated routes and all 155 diagram/explanation pairs: no missing frames or page-wide horizontal overflow. Desktop inspection also found no duplicate IDs or remaining ScrollStory roots. Non-empty diagram text has an approximately 12px rendered readability floor; tiny fractional differences occur during the existing section entrance transform.
- Real mobile horizontal interaction moved the E2B diagram by 144px while the page horizontal offset stayed zero. Keyboard ArrowRight focused the diagram region and moved it by 40px, also without moving the page horizontally.
- Representative screenshots cover compact legacy diagrams and directly imported diagrams, plus the home-page latest section on desktop and mobile. Transition-width, wide-TOC, English-home, and DSec regressions are reviewed alongside the required sizes.
- Independent read-only review found no blocking issues: frame/caption pairing, preserved diagram text, SVG IDs, shared scope, and diff hygiene passed. A duplicate accessible figure label was removed.
- `git diff --check`: clean. DSec source diff: empty. HEAD remains `d84df2ca319af3a34739d1955309c6a2b62b50b1`.

These checks establish layout, pairing, and content preservation, not the technical truth of the older articles. Screenshots sample representative diagrams; the route-wide checks do not substitute for manually reading every drawing. Real-device touch and screen-reader testing, and OS-level reduced-motion emulation, were not performed; the new component itself has no motion or runtime dependency.

## Inventory

| Article | Sequences | Frames |
| --- | ---: | ---: |
| `2026-09-22-mimo-v26-open-rl.mdx` | 1 | 5 |
| `2026-09-22-opus-lean-agent-sdk.mdx` | 1 | 6 |
| `2026-09-23-ai-and-compilers-survey.mdx` | 1 | 5 |
| `2026-09-23-ai-glasses-industry-chain.mdx` | 1 | 5 |
| `2026-09-23-ai-org-structure.mdx` | 1 | 5 |
| `2026-09-23-bert-diffusion-llada.mdx` | 1 | 5 |
| `2026-09-23-claude-code-architecture.mdx` | 1 | 5 |
| `2026-09-23-e2b-sandbox-infra.mdx` | 1 | 5 |
| `2026-09-23-edgejs-inprocess-dotnet.mdx` | 1 | 5 |
| `2026-09-23-flue-agent-harness.mdx` | 1 | 5 |
| `2026-09-23-grokbot-openclaw-agent-forms.mdx` | 1 | 5 |
| `2026-09-23-gson-yymodel-serialization.mdx` | 1 | 5 |
| `2026-09-23-jev-system1.mdx` | 2 | 10 |
| `2026-09-23-kotlin-k2-fir-interop.mdx` | 1 | 5 |
| `2026-09-23-laya-decision-model.mdx` | 1 | 5 |
| `2026-09-23-nvidia-h200-china-verification.mdx` | 1 | 5 |
| `2026-09-23-rustc-query-incremental.mdx` | 2 | 10 |
| `2026-09-23-skip-language.mdx` | 1 | 5 |
| `2026-09-23-tradingagents.mdx` | 1 | 5 |
| `2026-09-23-v8-jvm-instance-models.mdx` | 1 | 5 |
| `2026-09-24-nasdaq-record-a-share-linkage.mdx` | 1 | 5 |
| `2026-09-27-mimo-v26-rl-oss-environments.mdx` | 1 | 5 |
| `2026-09-30-deepseek-ascend-open-source.mdx` | 1 | 5 |
| `2026-09-30-gpt6-astra-posttraining.mdx` | 1 | 6 |
| `2026-10-06-osc7501-program-status.mdx` | 1 | 5 |
| `2026-10-10-openviking-context-database.mdx` | 1 | 5 |
| `2026-10-11-rea-agent-reverse-engineering.mdx` | 1 | 4 |
| `2026-10-12-aster-team-ai-gateway.mdx` | 1 | 4 |
| `2026-10-13-scion-source-control.mdx` | 1 | 5 |

Total: **29 articles, 31 sequences, 155 frames**.
