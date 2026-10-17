# AI Daily execution prompt

Use this prompt for one invocation of the existing Beijing 10:00 daily task. The schedule belongs to the task runner, not this repository. Do not create another scheduler or change/enable the task from an issue run. During initial setup, the task remains paused until the one-time architecture release gate below is cleared and the parent activates the existing task.

## Mission and authority

Work in `Zzzode/zzzode.github.io` against the latest authorized `main`. Produce one Chinese AI Daily issue with verified global developments, ordered by importance to engineers and technical business readers. Read `AGENTS.md`, `docs/prompts/site-curator.md`, `docs/design/apple-style-guide.md`, `.agents/skills/distill/SKILL.md`, `.agents/skills/humanize-text/SKILL.md`, and the distill visual checklist before working. Follow the current components and tokens; inspect a recent article rather than copying an old template.

Preserve unrelated modifications. Never force-push, change credentials/permissions, or write secrets/personal data. A push to `main` publishes.

**One-time architecture gate:** the new Daily schema, routes, shared presentation changes and their initial responsive previews require the user's architecture release approval. While that approval/deployment is pending, prepare reviewable local changes or article drafts only; do not commit or push the architecture, publish an issue, or activate the task. Do not infer architecture approval from the standing article authorization below.

**Standing daily publication authorization:** the user has already authorized subsequent daily issues to be committed and pushed to `main` once independent source verification and independent PC/mobile rendering review pass and every discovered issue is fully fixed. After the approved architecture is deployed, execute that authorization without asking for another human approval for each issue. This explicit instruction supplies the approval for routine daily article publication under `AGENTS.md` and the distill workflow; their generic confirmation wording must not turn it into a new per-issue approval gate. It does not extend to new architecture changes, unrelated edits, credentials or task configuration. An unavailable reviewer/browser, unresolved source claim or failed check blocks that issue's publication; keep it as a draft and report the exact blocker.

## Establish the issue and its identity

1. Resolve the execution date in `Asia/Shanghai`, never from the machine's calendar date. The planned cutoff is that date at `10:00:00+08:00`. If invoked before that time, prepare a draft; do not move the cutoff into the future or label unverified events as known.
2. Find the latest published daily cutoff. Normally use `(previous cutoff, today's cutoff]`. With no prior issue, use the previous calendar day's 10:00. After a missed run, explicitly label the longer catch-up window; do not silently call several days “the last 24 hours.” Store both instants with offsets. Retries use the existing issue's window.
3. The single canonical file is `src/content/posts/zh/YYYY-MM-DD-ai-daily.mdx`, where the date is the cutoff's Beijing calendar date. Look for this file before writing. Update it in place, including a draft; never create `-2`, `-updated`, or a second same-date slug. A no-change rerun must produce no content diff. Corrections update `updated` and explain the correction in the body without replacing the issue identity.
4. Start with `draft: true`. Set `date` to the intended/actual publication instant, with explicit offset and no earlier than cutoff or the last source retrieval. Do not alter an already published issue's original publication date on correction. Future-dated or draft posts have no public detail route, list entry, tag entry, RSS item, search document, or sitemap URL. Because this is a static site, eligibility changes only at a new build.

## Gather, verify and rank

Search the web and open every source used. Cover these areas, recording any area with no verified meaningful update in the working ledger rather than inventing an item:

- AI product/model releases, developer tools, infrastructure and technical changes;
- financing, acquisitions and commercial developments (currency, round type, announced versus completed);
- important research papers (original paper, version/date, evaluation setup, limitations);
- standards, safety, data governance, regulation and interoperability;
- Agent tools, runtimes, protocols and deployments.

Use primary product announcements/docs/changelogs, company/regulatory filings, original papers and official standards texts. Secondary reporting can add context, identified as such. Confirm event time as well as page publication time; recycled reports about old events are not new developments. Keep earlier references as context, separately from new event claims. Separate vendor claims, independent measurements and editorial interpretation. A plausible URL or search snippet is not verification.

For each candidate record the claim, exact URL, source title, source publication timestamp, actual retrieval timestamp, event timestamp, evidence excerpt/location, category and reason it matters. Do not guess a timestamp. If a page gives only a date, corroborate the timestamp or exclude the item when window membership cannot be established; explain the omission in the report. Label single-source announcements. Remove unsupported figures, quotes and unverifiable URLs. Maintain the source ledger in the working report and preserve exact source URLs in front matter and item links.

“OSC” is the user's example and must remain “OSC” until verified. Find the exact expansion, owner, specification URL, version and status from a primary source, and determine its relevance to AI/Agents. Do not silently replace it with MCP or another acronym, assume it names a formal standard, or conflate a protocol proposal with an adopted standard. An existing site article mentions OSC 7501; that article is context, not proof of what the user meant or proof of a new event. If the intended OSC cannot be resolved, report the ambiguity and omit claims requiring that interpretation.

Deduplicate syndicated reports and multiple announcements of the same event. Compare the preceding issues' items/URLs so unchanged events do not recur as fresh news. A material follow-up must name what changed and link the earlier issue. Rank across categories by technical/business consequence, evidence quality and immediacy; do not force category blocks or invent numerical importance scores. Aim for 6–12 useful items when evidence supports them, but quality sets the count. If no meaningful verified item exists, create no public issue, report the empty window, and preserve the existing latest-issue entry.

## Write schema-valid content

Use `channel: daily` for column membership and `kind: distilled` for presentation. Neither a tag nor `kind` alone assigns the daily column. The schema is `src/lib/post-schema.ts`; keep it open while authoring. Example shape below uses placeholders intentionally and is not publishable content:

```yaml
---
title: "AI 日报 · <YYYY-MM-DD>：<verified lead topic>"
date: "<publication ISO timestamp with +08:00>"
draft: true
kind: distilled
channel: daily
excerpt: "<Chinese one-sentence lead based on the actual ranked items>"
tags: ["AI 日报"]
sources:
  - title: "<exact primary source title; identify vendor claim if applicable>"
    url: "<verified exact URL>"
    publishedAt: "<verified ISO timestamp with offset>"
    retrievedAt: "<actual ISO timestamp with offset>"
daily:
  issueDate: "<YYYY-MM-DD in Beijing>"
  timeZone: Asia/Shanghai
  windowStart: "<exclusive window start ISO timestamp>"
  cutoff: "<inclusive cutoff ISO timestamp>"
  items:
    - title: "<Chinese factual item title>"
      summary: "<plain Chinese text: what changed, mechanism/evidence, practical business/engineering significance and limits>"
      category: products # products | business | research | governance | agents
      eventTime: "<verified event timestamp in (windowStart, cutoff]>"
      sourceUrls: ["<one or more exact URLs from sources above>"]
---
```

`daily.items` order is the reader's importance order. Every item needs a title, informative summary, category, event time and source links. Summary is plain text: sources are rendered as accessible links separately. Keep each claim traceable to its item sources, adding an extra source whenever different clauses need different support. Use currency/benchmark context; do not compare incomparable results.

The shared post layout renders the daily CoverBanner, one continuous ArticleCanvas, a chart summary computed from the actual item categories, ranked item summaries with source publication/retrieval times, and the closing numbered source list. Do not duplicate these blocks in the MDX body. The summary counts describe this issue's coverage only; never present them as market share, investment totals or importance.

The MDX body supplies explanatory follow-through. Import current components from `@/components/article`. Use `<Section canvas id="...">`, `<SectionHead index="03" ...>`, `<Prose tile>` and subsequent sequential indices. Short noun-phrase kickers feed the TOC. Add at least one useful inline SVG body illustration grounded in the lead item's verified mechanism, timeline or dependency. Explain what changed from the earlier system, how it works and its limitations. Use viewBox, responsive width, accessible title/description or `aria-label`, token colors, neutral text/lines and labels that render at least 12 CSS pixels (prefer 14) at 390px. Reflow vertically, shorten labels or provide an adjacent text equivalent when scaling would make them smaller. Link the supporting item/source in the caption. Do not use decorative stock imagery, unverifiable charts, raster diagrams, made-up data or external font/CDN assets. A source-backed process may use the existing ScrollStory only when it explains a real process; test all states if used.

End with a distinct “趋势点评” section: a few measured paragraphs connecting the actual evidence to engineering and business decisions, marking interpretation and uncertainty and identifying what to watch next. Do not turn conjecture into a factual headline. Context/mechanism explanations must carry the article; the auto summary does not replace them. Apply `humanize-text` after drafting while freezing dates, numbers, citations, structured data and source caliber. Read the Chinese prose aloud and remove mechanical framing and unsupported opinions.

## Validate and review before release

1. Run `npm test`, `npm run check`, `npm run build` and `npm run test:daily:integration`. In a sandbox that cannot write Astro's config directory, use `ASTRO_TELEMETRY_DISABLED=1`. Do not change the user's home or permissions to make a check work. Inspect failures and existing warnings separately.
2. Review draft content in an isolated temporary checkout. Copy the exact candidate there, set its review-only copy to `draft: false` after its intended publication instant, build and use `npm run preview`. Never leave a fixture or draft-preview route in production content. After the one-time architecture gate has cleared and the independent checks pass, set the real candidate to `draft: false` under the standing daily publication authorization, then run the final check/build. If content or presentation changes after review, repeat the affected review before publishing.
3. An independent reviewer must cross-check every item and its factual claims against the fetched source ledger, confirm timestamps/window membership and source caliber, and resolve unsupported claims. The reviewer must also open and visually inspect actual Chromium renders at 1280 and 1680 desktop, 768 tablet, and 390 mobile. Capture the Chinese home, `/daily/`, the new article, archive pagination where applicable, English home/archive and an existing article regression. Check the empty state with isolated fixtures, too. Open the mobile menu; follow latest/archive/older/newer links; inspect graph labels, source links, body SVG, clipping, horizontal overflow, TOC clearance at 1680, keyboard navigation and touch targets. Check normal motion and reduced motion, including any mid-story states. Save screenshots, browser assertions and the reviewer's written findings. Fix findings and repeat affected checks. Build success or automated DOM checks alone do not satisfy visual review. If the browser or independent reviewer is unavailable, say exactly what is blocked and keep the release on hold.
4. Verify discoverability: one newest-issue home teaser; long-form technical lead/picks/latest remain intact; `/daily/` plus 14-issue archive pages; the public `/posts/` list and tags; search for a phrase unique to the candidate using the built Pagefind index; RSS and sitemap include the public issue. English lists must not show Chinese-only content; the article language toggle must be disabled without a published counterpart. Draft/future/fixture content must be absent everywhere.
5. Inspect `git diff --check` and the final diff. Confirm one canonical issue file, verified URLs, no fabricated news, no unrelated changes, build output, temporary fixtures or secrets. Recheck latest `main` before preparing release; if it moved, reconcile without discarding others' work and rerun affected verification.
6. If the one-time architecture gate is still pending, stop with a reviewable local diff/draft and report that specific gate. Once it is cleared, publish a passing real issue under the standing authorization: commit only the reviewed daily article and its necessary reviewed assets/corrections, then push `main` without requesting another per-issue human approval. Exclude all unrelated or unapproved architecture changes. Verify the deployment workflow succeeds and check the deployed entry/article on PC and mobile; fix any deployment or presentation defect and repeat the affected checks. Never deploy an isolated fixture checkout. An unchanged rerun creates no new commit.
7. Return the issue path/route, cutoff/window, ranked source ledger, omissions/unverified claims (including OSC), humanize note, change list, test results, screenshots and independent source/visual reviewer decision. State the draft/publication status, commit/deployment result and any exact blocker. Do not change or enable the automation from the issue run. A passing routine issue does not await another human approval.
