# AI Daily architecture and operations

## Baseline evidence

Audited `main` at `d84df2ca319af3a34739d1955309c6a2b62b50b1`; `git ls-remote origin refs/heads/main` matched the clean checkout before edits. This table records the initial audit, before the approved architecture and first-issue release.

| Goal/surface | Existing evidence at the audited commit | Gap |
| --- | --- | --- |
| Daily column | `src/content.config.ts` defined only `kind: note/distilled`; `Nav.astro` had writing/projects/etc.; no daily routes | Presentation kind did not establish a daily column |
| Daily execution | `docs/prompts/site-curator.md` and distill covered long-form articles; `.github/workflows/deploy.yml` deployed pushes | No repository daily prompt, issue identity/window/source contract, or daily scheduler; the externally planned 10:00 Beijing task is paused |
| Home | `HomePage.astro` hand-curated technical feature/picks plus 12 newest unpromoted posts | A daily feed mixed into the same 12 slots would displace long-term writing |
| Archive/pagination | `/posts/` listed all locale posts; tags separate; no pagination | No daily history or bounded daily archive |
| Visibility | Detail routes/RSS/tags excluded drafts; home and `getLocalized()` did not; no future-date filtering | Draft list links and future content could be exposed inconsistently |
| Search/sitemap | Pagefind postbuild indexed generated `data-pagefind-body`; Astro sitemap covered built routes | Any generated future article would enter search/sitemap |
| Locales | Locale folders and shared-slug counterpart lookup; toggle disabled if missing | Counterpart lookup could find a draft/future translation |
| Dates | Legacy date-only posts; formatting used host local getters | Daily instants needed explicit UTC+8 windows rather than implicit host dates |

## Implementation contract

Posts retain existing routes and backwards-compatible defaults. `channel: writing` is the default for all existing articles; `channel: daily` is explicit. `kind: distilled` controls visual presentation only. New `post-schema.ts` validates daily metadata and source references. `post-policy.ts` owns public eligibility, deterministic sort, canonical daily identity and 14-issue pagination. Every public post consumer uses `getLocalized('posts', lang)`, which validates identities and excludes draft/future entries. Public counterparts use the same eligibility rule. Detail routes therefore exclude private content before Pagefind and sitemap run.

A daily file is `src/content/posts/zh/YYYY-MM-DD-ai-daily.mdx`, with `issueDate` equal to the cutoff date in `Asia/Shanghai`. The same date/locale cannot create another slug, even as a draft. Reruns update this path; schema validation alone does not coordinate concurrent external writers, so the task runner must serialize a date's execution. Scheduled publication is build-time eligibility, not a dynamic clock on GitHub Pages. No new workflow/scheduler was installed.

`daily.items` is importance ordered and rendered centrally, guaranteeing title/summary/source links for each item. Its source URLs resolve to the issue's unique source ledger, whose cited records carry publication/retrieval instants. Each event must fall in `(windowStart, cutoff]`; sources cannot publish after cutoff. The schema cannot certify truth or importance: research and review remain release gates. The source times shown to readers and the reporting window always render in Beijing time; legacy calendar-date display is now host-independent UTC.

`/daily/` and `/en/daily/` exist with honest localized empty states. Published issues sort by issue date, descending, independently of backfill publication time. Pages 2+ are static routes `/daily/page/2/` etc., 14 issues each, connected by older/newer links and included in the sitemap. Page 1 remains present at zero issues. The first page can toggle locale; a later archive page with no guaranteed same-page counterpart disables the toggle.

Global navigation, writing archive and daily article breadcrumbs expose the column. Home uses one latest-issue teaser chosen by issue date, with its archive link visible even when empty. Daily entries never enter the technical feature, picks, 12-entry latest feed, topic counts or long-form source totals. All posts still appear in `/posts/`, tags and locale RSS; full-text search indexes each public daily article. Previous/next article navigation stays within writing or daily, preserving reading continuity.

Daily presentation reuses CoverBanner/ArticleCanvas/Section/SectionHead/Sources. DailyBriefing supplies a neutral category-count chart and source-linked summaries. Counts describe the issue only. The MDX body supplies verified explanations, a meaningful inline SVG and trend analysis. No UI framework, runtime dependency, new palette or framework-page script is introduced. The regression review also corrected shared Stat affix duplication and expanded navigation/footer and daily-archive touch targets while retaining their visual styling.

## Reproduction

```sh
npm test
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run test:daily:integration
ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --host 127.0.0.1 --port 4321
```

`test:daily:integration` copies the project to a new `/tmp/ai-daily-review-*` directory, symlinks installed dependencies, removes only copied daily issues to establish a controlled test calendar, writes clearly marked non-news fixtures there, builds that copy, and checks 16 published issues over two pages, private/future ordinary and daily posts, a draft translation, home isolation, tags/RSS/sitemap and script-free framework output. It prints the temporary checkout path and writes it to `/tmp/ai-daily-review-root` for local preview. It does not change production `src/content`. The temporary copy contains reserved `example.test` URLs; do not deploy it. Use the test fixtures only for layout and routing, never for source verification.

For visual review, preview the real build for the zero-issue state and the isolated build for multi-issue states. Use actual browser renders at 1280/1680/768/390, inspect screenshots, menus, charts, pagination, locale switching, reduced motion and an old article. Results and remaining gates are recorded in [the validation matrix](daily-news-validation.md) and the independent handoff report. Exact checks and complete runnable editorial instructions are in [the daily execution prompt](prompts/ai-daily.md).

## Release sequence

1. Review the architecture/code diff and screenshot evidence; fix independent review findings.
2. Obtain the user's explicit approval for the one-time architecture release per `AGENTS.md`. The user approved the reviewed architecture and the real 2026-10-17 issue in this release scope, conditional on independent factual/rendering review and passing checks; the initial architecture gate is satisfied for that scope.
3. Commit only the approved architecture/tests/docs and reviewed real issue; push within that scope. Verify the exact commit’s existing deployment workflow, then inspect the deployed home, column, issue and old articles. Empty-state and multi-issue checks use isolated review builds.
4. The user has already granted conditional, continuing authorization for subsequent daily articles: after independent source verification and independent PC/mobile rendering review pass, with every issue fully fixed, commit the reviewed article/assets and push main for deployment. This is the explicit article-publication approval required by generic repository/skill wording; do not request another human approval for every issue. A fixture is never a first issue. Failed checks, unresolved evidence or an unavailable independent reviewer/browser keep that issue as a draft.
5. The parent manages initial activation of the existing external `Asia/Shanghai` 10:00 task after the architecture gate clears. Do not create a duplicate task or change its configuration from a routine issue run. The task's prompt must preserve the standing conditional daily publication authorization and the independent source/visual gates. New architecture changes and unrelated edits still need their own scope approval.
