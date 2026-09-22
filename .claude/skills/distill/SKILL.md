---
name: distill
description: 'Distill a public URL, a set of links, pasted text, or a local public file into a full-bleed, visually rich web article on this Astro site (a "distilled" MDX post). Use when the user says 炼化 / distill / 总结成文章 / 做成网页文章 / turn this into an article and provides source material. Fetches and cross-checks sources, never fabricates, and ships an Apple-style MDX article built from src/components/article.'
metadata:
  category: writing
  tags: "distill, research, writing, mdx, apple-design"
---

# Distill — turn source material into a full-bleed web article

You convert raw public material into a **distilled article**: a long-form MDX post on this site that reads like a hand-crafted feature page, built from the Apple-style component library in `src/components/article`. It replaces what would otherwise be a constrained shared-doc write-up: here the page has no iframe/500KB limits, can use full-width layout, inline SVG, a table of contents, reading progress, and reveal motion.

## Inputs you accept

- One or more **public URLs** (articles, docs, papers, product pages).
- Text the user pastes into the chat.
- Local public files the user points you at (PDFs, images, text) via `Read`.

Internal/private sources (Feishu docs, internal MRs, anything requiring credentials) are **out of scope for this public website** unless the user explicitly asks and accepts a pre-publish privacy review.

## Hard rules — non-negotiable

1. **No fabrication.** Every non-obvious fact, number, or quotation must come from fetched material. If a claim has one source, keep it; if you cannot verify something, cut it or mark it explicitly as "单一来源 / 未证实". Never invent URLs, numbers, API names, or quotes.
2. **Title by content.** Name the article after its actual subject. Forbidden: `炼化：…`, `【总结】…`, MR/issue numbers, source-app prefixes/suffixes. Source type + provenance + date go in the banner **kicker** and the `sources` list only.
3. **Tokens only.** Components and any hand-written SVG use the design tokens (`text-ink`, `bg-paper`, `var(--color-blue)` …). No hard-coded hex, no shadows/gradients/emoji-as-icons, no CDN assets, no raster diagrams. Diagrams are hand-written inline SVG; blue is the only accent, orange exists solely for subject B in a dual comparison.
4. **Plain language.** The audience is a curious engineer, not an expert in the specific topic. Define every technical term in one plain sentence on first use.
5. **Never push automatically.** Build locally, screenshot, report — wait for explicit user approval before `git push`.

## Workflow

### 1. Scope it (ask only what is necessary)

- **Language**: ask which language if unclear (default: Chinese). Produce **one** language per run; do not auto-translate. The file goes under `src/content/posts/zh/` or `…/en/`.
- Audience/depth/angle: ask one question only if the material genuinely supports multiple angles (e.g. news summary vs deep architecture explainer). Otherwise proceed.
- Confirm the target slug (`YYYY-MM-DD-<short-kebab-slug>`) from the source's primary date.

### 2. Gather and record sources

- Fetch every URL with `WebFetch` (prompt it for the specific facts you need). Use `WebSearch` to find corroborating/primary sources when the given link is secondary or you doubt a claim.
- Read local files with `Read`; OCR images only when the user explicitly wants them covered.
- Maintain a working source list: each entry is `{ title, url }` — the exact strings that will become the `sources` front matter. For pasted/local material without a URL, don't fabricate one; omit `sources` entries and say so in the delivery report.

### 3. Verify

- Key claims (numbers, product behavior, API surface) need a primary or two-source basis. Keep the **caliber**: note what is official documentation, what is a vendor claim, and what is community interpretation.
- Note the fetch date and any version context (e.g. "Astro 7.x docs as of …").

### 4. Plan the presentation before writing

Produce, in your working notes (not in the article):

- An outline with H2 sections and, for each, the component(s) it needs.
- A presentation decision: audience · reader's question · what visual blocks carry which point.

Coverage rule (from the design guide): the structured blocks must **cover the whole piece**, not be one overview image. A good distilled article uses most of: cover banner → overview cards → mechanism/steps → (dual comparison or pipeline when the content supports it) → table → key numbers → conclusion + sources. Skip blocks that don't fit; never pad.

### 5. Write the MDX article

Path: `src/content/posts/<lang>/<YYYY-MM-DD-slug>.mdx`

Front matter:

```yaml
---
title: "按实际内容命名的标题（与 Banner h1 一致）"
date: 2026-09-22
excerpt: "一句话摘要，会出现在列表与分享卡片。"
tags: ["…"]
kind: "distilled"
sources:
  - title: "页面标题"
    url: "https://example.com/…"
---
```

Body conventions:

- Import the components you use from `@/components/article` (catalog: see `references/component-catalog.md`; skeleton: `references/article-template.mdx`).
- `CoverBanner` is the first block; its `kicker` is the provenance line, e.g. `WEB ARTICLE · docs.astro.build · 2026-09-22`.
- Native explanation paragraphs go inside `<Prose>…</Prose>`; full-bleed structured blocks (`Section`, `StatGrid`, …) sit as siblings, alternating with prose.
- Add `id="…"` to each `<Section>` so the article script can build the TOC. Use English kebab ids.
- In MDX, comments inside JSX must be `{/* … */}` (HTML `<!-- -->` is a syntax error inside SVG/components).
- Wrap inline technical tokens in backticks; for long emphasis inside CJK prose, prefer phrasing over `**bold**` (intra-word `**` next to CJK punctuation can fail to parse).
- Put hand-written diagrams in the banner `visual` slot or a `Section` — inline SVG only, viewBox-based, colors from tokens (`#0066cc` blue, `#e8710a` orange restricted to affiliation dots, neutrals `#1d1d1f/#424245/#6e6e73/#86868b/#f5f5f7/#dedee3/#ececf0`).
- `<Sources>` renders automatically from front matter at the end of the page; `<Summary>` is where your conclusions go.

### 6. Verify locally

```bash
npm run check        # zero TS/content errors
npm run build        # builds clean
npm run preview      # serve dist/
```

Then headless-Chrome screenshots (or ask the user to look at `npm run dev`) at:

- 1280px and 1680px desktop (at 1680 the sticky TOC rail appears in the left gutter and must not overlap the article),
- 768px tablet,
- 390px mobile (banner stacks, grids collapse, tables scroll),
- once with `prefers-reduced-motion: reduce` emulated — every block must be visible with no transform/opacity animation.

Run the full list in `references/visual-checklist.md`. Check: the home page mosaic links the new post; the other-locale `/posts/` list does NOT contain it (single-language run) and the language toggle renders disabled on the article.

### 7. Report and wait

Give the user:

- The new file path and its route (`/posts/<slug>/` or `/en/posts/<slug>/`).
- The source list with what was primary vs secondary, and anything left unverified.
- Screenshot summary (desktop/mobile/reduced-motion).
- Bundle note: article pages ship one inline enhancement script (~1 KB gzip); framework pages stay zero-JS.

Do **not** commit/push unless the user asks. When committing, include the article and any genuinely new/reused component changes in a focused commit.

## Authority documents

- Visual/component spec: `docs/design/apple-style-guide.md` (§§2 tokens, 3.9 distilled components, 4 embedded HTML, 5 dual comparisons, 7 motion, 8 checklist).
- Components (source of truth for props/slots): `src/components/article/*.astro`.
- Content schema: `src/content.config.ts` (posts: `kind`, `sources`).
- Site-wide conventions: `AGENTS.md`, `docs/prompts/site-curator.md`.
