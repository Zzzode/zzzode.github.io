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
6. **Plain language that sounds like a person wrote it.** The audience is a curious engineer, not an expert in the specific topic. No made-up jargon collocations, no rule-of-three tics, no scaffold phrases — a reader must never finish a sentence wondering what the words literally mean (a real review rejection: a title ending in「怎么咬合」). Step 6 of the workflow (humanize gate) is mandatory.
7. **Never push automatically.** Build locally, screenshot (including scrolled/mid-story states), report — wait for explicit user approval before `git push`.

## Workflow

### 1. Scope it (ask only what is necessary)

- **Language**: ask which language if unclear (default: Chinese). Produce **one** language per run; do not auto-translate. The file goes under `src/content/posts/zh/` or `…/en/`.
- Audience/depth/angle: ask one question only if the material genuinely supports multiple angles. Otherwise proceed at full teaching depth.
- Confirm the target slug (`YYYY-MM-DD-<short-kebab-slug>`) from the source's primary date.

### 2. Gather and record sources

- Fetch every URL with `WebFetch` (prompt it for the specific facts you need). Use `WebSearch` to find corroborating/primary sources **and the surrounding context the depth doctrine requires** (prior work, lineage papers, related docs).
- Read local files with `Read`; OCR images only when the user specifically wants them covered.
- **Multi-block / multi-section source materials must be inventoried first.** When a fetched doc (e.g. a Feishu wiki export with `html5-block`/embedded blocks, a long page with many sections, or several attachments) contains N blocks, list all N with their topics, read every one, and tick each off before planning the outline. Never write after sampling only a subset — silently dropping blocks (itineraries, maps, tables, full plans) is a real failure that requires a rebuild. State explicitly in the delivery report how many blocks existed and how many were used.
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

### 6. Humanize the prose — mandatory gate (before local verify)

Every distilled draft goes through the **`humanize-text` skill** in this same repo (`.agents/skills/humanize-text/SKILL.md`) before it is allowed to build. Invoke/load that skill and apply its full rule set. This is a required step, not optional polish. A factually correct article that reads like machine output fails review.

**Meaning lock (red lines):** every number, date, proper noun, URL, caliber label and quotation produced in steps 2–3 stays exactly as-is. This pass rewrites rhythm, structure and wording only — never facts. Tables, SVG labels, code and other genuinely structured data stay precise and uniform; only rhetorical prose gets humanized.

Repo-specific bans for Chinese distilled articles (from actual review feedback):

- **生造/机械搭配与黑话**：「咬合、抓手、赋能、闭环、心智、颗粒度、对齐、维度、生态、底层逻辑」一律删，除非原始材料本身在用。检验法：把标题或小标题读给一个不在该圈子里的朋友听，听不懂就换成人话（反例：「诺金早享、全项优速通与万圣夜场怎么咬合」）。
- **三项排比（rule of three）**：不允许连续段落堆叠三段式并列；「A、B、C」式标题和正文排比同屏最多一个。
- **「不是 X，而是 Y / 不是……是……」句式全文最多出现一次**；「本质是 / 天然是 / 核心是 / 换句话说 / 值得注意的是」这类套话清零。
- **破折号「——」每屏最多一个**，优先用句号断开；不要每个段落都用破折号挂一个工整的补充。
- **「加粗词：……」式段首小标语连用不超过两处**；不要给每段都配一个小标题，也不要把所有想法都拍平成列表。
- **段落形状要变**：不要每段都是「判断句 + 三点支撑 + 收尾句」。允许一句话单独成段，允许长短句交替，允许真实的限定（「这点我没查到一手来源」「这步要看当天运气」）。
- **一个叙述者贯穿全文**：游记/体验类可以大大方方用「我/我们」和口语；投研/硬核技术类只靠节奏、取舍判断和诚实的知识边界显人味，不许替事实虚构观点（factual 体裁的 voice 红线照 humanize-text skill Rule 6）。
- 写完后**通读或小声朗读全文**，任何要读第二遍才懂的句子都重写；然后过一遍 humanize-text skill 的 self-check（事实零改动、无残留模板、句式长短不齐而不是机械交替）。

### 7. Verify locally

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

### 8. Report and wait

Give the user:

- The new file path and its route.
- The source ledger: primary vs secondary vs context references, and anything unverified.
- How the piece meets the depth doctrine: backdrop section, mechanism walkthroughs, aftermath, inline cross-references.
- A one-line note that the mandatory humanize pass was applied (and any wording the user should spot-check).
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
