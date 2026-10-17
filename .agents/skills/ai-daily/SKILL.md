---
name: ai-daily
description: Research, audit, correct and publish the Chinese AI Daily column for zzzode.github.io. Use for daily AI news, coverage verification, missed-news corrections or changes to its evidence workflow. Discover important global products, models, tools and research from companies, labs, independent teams and individuals, beyond any fixed company list.
---

# AI Daily

Produce an importance-ranked Chinese issue for engineers and technical business readers. Use this skill as the single editorial workflow; `docs/prompts/ai-daily.md` is only its scheduler entrypoint. Read `AGENTS.md`, site-curator, the Apple design guide, distill, humanize-text and the distill visual checklist. Use current shared components/tokens.

## Establish the run

- Read latest authorized main; preserve unrelated edits. Resolve the planned cutoff at 10:00 Asia/Shanghai. Use `(previous cutoff, cutoff]`, or the previous day's cutoff for the first issue. State a longer catch-up window explicitly. Prepare only a draft if invoked before cutoff.
- Serialize work for `src/content/posts/zh/YYYY-MM-DD-ai-daily.mdx`. Reuse that slug on retries/corrections; deduplicate against preceding issues. A no-change rerun makes no diff. On correction preserve original `date`, set actual `updated`, and explain material changes visibly.
- When correcting an issue, carry forward every previously considered or excluded lead with its provenance; reassess obsolete rules such as stable-only selection. Preserve actual earlier activity timestamps, or make fresh reads and record the new times. Do not silently lose prior exclusions when replacing a ledger.
- Start `docs/daily/runs/YYYY-MM-DD.json`. Read [evidence contract](references/evidence-contract.md); record actual searches/accesses as executed. Keep raw traces outside the public repo and a sanitized structured ledger inside it. Never fabricate historical activity.

## Discover beyond named sources

- Search products/functions/models/tools/technology, financing/acquisitions, important research/papers, standards/safety/data governance and Agent tooling/protocols globally. Use multiple languages and discovery paths appropriate to the subject; record limitations honestly.
- Follow primary announcements, original papers/version histories, company/investor filings, official standards and changelogs. Use industry reporting, research/community/product channels to discover unfamiliar labs, independent teams and individual studios, then follow up with primary evidence. GitHub releases are one route, never the whole feed.
- Consult [dynamic seeds](references/watchlist.json), then add/revisit/merge/retire entries according to evidence and relevance. The watchlist is neither an allowlist nor a fixed company-count gate. Follow important products regardless of owner size. Popularity is a discovery signal, not proof of capability or leadership.
- Keep ambiguous JEV, Laya, OSC or other names unresolved with candidate identity links. Do not silently rename them, infer team size, use unrelated namesake domains, or block other collection on their resolution.
- Record **every potentially relevant event considered**, including reviewer discoveries and rejected candidates; irrelevant search boilerplate is not an event. Keep exact query text, relevant result URLs, actual accesses, evidence and reasons. Distinguish `checked_no_update`, `candidate`, `access_failed`, `uncovered`. An inaccessible source is never “no update”; one checked page proves only that observed scope.

## Verify and select

- Follow [time and selection rules](references/time-and-selection.md). Preserve an instant, date or evidenced interval. Do not manufacture an hour/offset from a date, CMS midnight, crawl time or unanchored relative age.
- Put fully supported in-window events in `daily.items`. Put important primary-backed events whose time ranges cross a boundary in `daily.pending`, with actual dates, uncertainty and corroboration attempts. They are visibly separate and excluded from confirmed counts. Disjoint old events remain context/excluded; events without defensible bounds stay unresolved in the ledger. Do not simply discard important date-only announcements.
- Include consequential preview/beta announcements when evidence and significance warrant; label maturity/access limits. Stable-only is not a rule. Funding needs currency/round/announced-versus-completed status; papers need version/evaluation/limitations. Distinguish new public research explanations from older submissions.
- Separate vendor assertions, independent measurements, plans, proposals, effective measures and editorial inference. Do not turn planned integrations into shipped capabilities, voluntary guidance into law, or trending claims into proven leadership.
- Rank by consequence, novelty and evidence with reasons. Do not pad categories or impose a fixed news/company count. Entire unsearched topics block release. Sparse but genuinely searched topics and residual access/time uncertainty require evidence and disclosure; no code can prove global absence.

## Independently audit all candidates

- Give a separate reviewer this skill, the full ledger, all candidates (included, excluded, pending and date-uncertain), exact sources and draft. Require their own supplementary open discovery, rather than a reread of selected items. Add their queries/new candidates before final review.
- Require topic and open-discovery assessments. Investigate suspicious empty topics, source concentration and omissions. Fix blocking findings. Use `pass_with_limits` only for bounded, explicitly disclosed gaps; do not waive an entirely unsearched category.
- Record the complete reviewed candidate-id set, reviewer queries, findings/resolutions and report at `docs/daily/reviews/YYYY-MM-DD.md`. A factual/visual PASS for selected items does not certify coverage. The validator checks record consistency, not truth, actual independence, importance or exhaustive discovery.

## Write and verify

- Use JSON front matter (valid YAML), `channel: daily`, `kind: distilled`, `daily.evidenceRun`, ordered `candidateId` values and release statuses; follow `src/lib/post-schema.ts`. Keep test fixtures separate.
- Reuse automatic CoverBanner/ArticleCanvas/DailyBriefing/Sources. Supply explanatory MDX sections from index 03, one useful source-backed responsive inline SVG and measured trend commentary. Confirmed-topic bars count selected items only. Explain uncertain items without claiming they were definitely known before cutoff.
- Apply humanize-text with facts/dates/numbers/source URLs/calibers frozen. Keep operational implementation details in engineering docs.

```sh
npm test
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run test:daily:integration
node .agents/skills/ai-daily/scripts/validate-ledger.mjs docs/daily/runs/YYYY-MM-DD.json
git diff --check
```

- Independently preview the exact candidate in an isolated copy, exposing only the copy's draft. Inspect actual Chromium screenshots at 1280/1680/768/390, normal/reduced motion, all sections, chart/SVG labels (at least 12 CSS px), uncertainty bucket, sources, menu/TOC, latest/archive links, English isolation and an old article. Test real Pagefind UI as well as its API. Fix and repeat affected checks. Unavailable reviewer/browser blocks publication; build success is not visual success.
- Verify one home daily teaser without displacing technical writing; archive/pagination, writing/tags/search/RSS/sitemap and missing translations; absence of draft/future/fixture content. Never deploy fixture checkouts.
- Bind the final reviewed MDX SHA-256 to the ledger; validate article/ledger identity and order with the bundled script. Changes after review/hash require affected re-review. Preserve reviewed output through the final build.

## Release under the existing authority

The user authorized Daily corrections and the necessary workflow changes in this task, and routine Daily publication after independent coverage/fact/real-render review with blocking fixes resolved. Use that authority without another per-issue human approval. New unrelated architecture, paid services or permissions are outside it. Never force-push or change credentials/permissions.

Recheck upstream, reconcile other work and rerun affected checks. Commit only authorized changes and push main normally. Verify exact-commit GitHub Actions build/deploy success, then actual live PC/mobile. Separate deployment success from blocked live review; do not bypass network policy or invent screenshots. Return the issue/window, corrections, complete ledger/review, limitations/unresolved entities, checks/screenshots, commit/CI/live status and scheduler entrypoint. Do not create/edit/enable automations; the parent owns the existing task.
