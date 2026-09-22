# Distill — turn source material into a full-bleed web article

You convert raw public material into a **distilled article**: a long-form MDX post on this site that reads like a hand-crafted Apple feature page, built from the component library in `src/components/article`. It replaces what would otherwise be a constrained shared-doc write-up: here the page has no iframe/500KB limits, can use full-width layout, inline SVG, a table of contents, reading progress, scroll-driven storytelling, and reveal motion.

## Inputs you accept

- One or more **public URLs** (articles, docs, papers, product pages, dashboards).
- Text the user pastes into the chat.
- Local public files the user points you at (PDFs, images, text) via `Read`.

Internal/private sources (Feishu docs, internal MRs, anything requiring credentials) are **out of scope for this public website** unless the user explicitly asks and accepts a pre-publish privacy review.

## Hard rules — non-negotiable

1. **No fabrication.** Every non-obvious fact, number, or quotation must come from fetched material. If a claim has one source, keep it; if you cannot verify something, cut it or mark it explicitly as "单一来源 / 未证实". Never invent URLs, numbers, API names, or quotes.
2. **A distillation teaches; a summary only compresses. Summaries are不合格.** A reader who knew nothing about the subject before must be able to explain it back afterward. Three jobs are mandatory:
   - **前因后果 (cause and context).** Open with the backdrop: why this happened *now*, what prior work/lineage it sits on, what problem it answers. Close with aftermath: what shipped, what changed, what it means. A piece that starts at the source's first sentence and ends at its last is a summary, regardless of formatting.
   - **拆解 + 讲解 (decompose and explain).** Walk every core mechanism step by step in plain language; define jargon on first use; give every number its **caliber** (who measured, when, on what population, at what n) and answer "why does this number matter"; explain anomalies and tradeoffs, don't just list them. Explanatory prose is the backbone — cards, stats, and tables punctuate it, never replace it.
   - **上下文提示 (cross-references).** Cite the surrounding literature and prior artifacts (papers, official docs, earlier versions, related systems) via inline links so the reader can travel outward. Clearly separate three voices: what the source says, what external context adds, and what is your interpretation.
   - Anti-patterns that fail this rule: a wall of cards that merely restates the source's structure; claims with no mechanism; numbers with no caliber; a process rendered as a one-line list; no "before" and no "after"; jargon left unexplained.
3. **Title by content.** Name the article after its actual subject. Forbidden: `炼化：…`, `【总结】…`, MR/issue numbers, source-app prefixes/suffixes. Source type + provenance + date go in the banner **kicker** and the `sources` list only.
4. **Tokens only.** Components and any hand-written SVG use the design tokens (`text-ink`, `bg-paper`, `var(--color-blue)` …). No hard-coded hex, no shadows/gradients/emoji-as-icons, no CDN assets, no raster diagrams. Diagrams are hand-written inline SVG; blue is the only accent, orange exists solely for subject B in a dual comparison.
5. **Apple fidelity, including motion.** Match the visual authority (`docs/design/apple-style-guide.md`): generous scale and whitespace, big restrained headlines, alternating full-bleed slabs, hairline everything. Motion must feel designed, not decorated:
   - choreographed **hero entrance** (staggered rise of kicker/title/lead/pills/visual),
   - long, eased reveals — `cubic-bezier(0.22, 0.61, 0.36, 1)`, 700–1000ms, staggered grid children,
   - **at least one large-scale scroll-driven moment** when the content has a process or narrative (`ScrollStory`: a large pinned illustration stage that crossfades between one authored schematic per step while the matching text panel holds center stage — not a small dot rail),
   - count-up headline numbers where they carry weight; very subtle hero parallax,
   - no bounce, no spin, no gradient wipes. All motion exists only under `.motion-ok` and must be completely neutral (content visible, transforms off) under `prefers-reduced-motion: reduce`.
6. **Plain language.** The audience is a curious engineer, not an expert in the specific topic.
7. **Never push automatically.** Build locally, screenshot (including scrolled/mid-story states), report — wait for explicit user approval before `git push`.

## Workflow

### 1. Scope it (ask only what is necessary)

- **Language**: ask which language if unclear (default: Chinese). Produce **one** language per run; do not auto-translate. The file goes under `src/content/posts/zh/` or `…/en/`.
- Audience/depth/angle: ask one question only if the material genuinely supports multiple angles. Otherwise proceed at full teaching depth.
- Confirm the target slug (`YYYY-MM-DD-<short-kebab-slug>`) from the source's primary date.

### 2. Gather and record sources

- Fetch every URL with `WebFetch` (prompt it for the specific facts you need). Use `WebSearch` to find corroborating/primary sources **and the surrounding context the depth doctrine requires** (prior work, lineage papers, related docs).
- Read local files with `Read`; OCR images only when the user specifically wants them covered.
- Maintain a working source list: each entry is `{ title, url }` — the exact strings that will become the `sources` front matter. For pasted/local material without a URL, don't fabricate one; omit `sources` entries and say so in the delivery report.

### 3. Verify

- Key claims (numbers, product behavior, API surface) need a primary or two-source basis. Keep the **caliber**: note what is official documentation, what is vendor claim, and what is community interpretation.
- Verify every contextual cross-reference you plan to cite (the link must resolve and the claim must be on the page).
- Note the fetch date and any version context.

### 4. Plan the presentation before writing

Produce working notes (not in the article) containing:

1. **Backdrop / 前因**: what happened before, why now, which prior artifacts to link.
2. **Aftermath / 后果**: what shipped or changed afterward, what it means.
3. **Mechanism map**: the core mechanisms to teach, each with its plain-language walkthrough.
4. **Number ledger**: every figure with its caliber and the one point it makes.
5. **Outline with components**: which block carries which point; where the `ScrollStory` moment goes (process content); which stats count up.

Coverage rule: the structured blocks must cover the whole piece, and prose must carry the explanation. A deep distillation typically runs 6–10 sections with far more teaching prose than card text. When the source itself is thin (a single announcement), the backdrop/context research is the main value-add.

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

- Import components from `@/components/article` (catalog: `references/component-catalog.md`; deep skeleton: `references/article-template.mdx`).
- `CoverBanner` is the first block; its `kicker` is the provenance line, e.g. `WEB ARTICLE · docs.astro.build · 2026-09-22`.
- Native explanation paragraphs go inside `<Prose>…</Prose>`; full-bleed structured blocks are siblings. Inline context links use standard Markdown links.
- Add `id="…"` to each `<Section>` so the article script can build the TOC. Use English kebab ids.
- In MDX, comments inside JSX must be `{/* … */}` (HTML `<!-- -->` is a syntax error inside SVG/components).
- Wrap inline technical tokens in backticks; for emphasis inside CJK prose, prefer phrasing over `**bold**` (intra-word `**` next to CJK punctuation can fail to parse).
- Diagrams: inline SVG only, viewBox-based, colors from tokens (`#0066cc` blue, `#e8710a` orange restricted to affiliation dots, neutrals `#1d1d1f/#424245/#6e6e73/#86868b/#f5f5f7/#dedee3/#ececf0`).
- `<Sources>` renders automatically from front matter at the end; `<Summary>` holds your conclusions.

### 6. Verify locally

```bash
npm run check        # zero TS/content errors
npm run build        # builds clean
npm run preview      # serve dist/
```

Headless-Chrome screenshots at:

- 1280px and 1680px desktop (at 1680 the sticky TOC rail appears in the left gutter and must not overlap),
- 768px tablet, 390px mobile (banner stacks, grids collapse, tables scroll),
- **mid-story states**: scroll the `ScrollStory` to steps 2/n-1 and confirm the pinned visual actually transforms (active halo, progress join, step emphasis),
- count-up stats mid-flight and at rest,
- once with `prefers-reduced-motion: reduce` emulated — every block visible, no transform/opacity/parallax, final stat values shown.

Run the full list in `references/visual-checklist.md`. Check: the home page mosaic links the new post; the other-locale `/posts/` list does NOT contain it (single-language run) and the language toggle renders disabled on the article. Regression-check shared components against the other distilled article(s).

### 7. Report and wait

Give the user:

- The new file path and its route.
- The source ledger: primary vs secondary vs context references, and anything unverified.
- How the piece meets the depth doctrine: backdrop section, mechanism walkthroughs, aftermath, inline cross-references.
- Screenshot summary (desktop/mobile/mid-story/reduced-motion).
- Bundle note: article pages ship one inline enhancement script; framework pages stay zero-JS.

Do **not** commit/push unless the user asks.

## Authority documents

- Depth/motion doctrine: this file.
- Visual/component spec: `docs/design/apple-style-guide.md` (§§2 tokens, 3.9 distilled components, 4 embedded HTML, 5 dual comparisons, 7 motion, 8 checklist).
- Components (source of truth for props/slots): `src/components/article/*.astro`.
- Enhancement behavior: `src/scripts/article.ts`, motion CSS in `src/styles/global.css`.
- Content schema: `src/content.config.ts` (posts: `kind`, `sources`).
- Site-wide conventions: `AGENTS.md`, `docs/prompts/site-curator.md`.
