# Apple-style Design Guide

This guide is the **visual and component authority** for the whole zzzode.github.io site and for all HTML embedded inside posts. The goal is a unified, restrained, breathable apple.com feel — not "default template gray-blue" and not an "enterprise dashboard".

## Sources of truth

| Surface | Implementation source of truth | Role of this guide |
|---|---|---|
| Design tokens (color, type, radius) | The `@theme` block in `src/styles/global.css`; Tailwind generates utilities like `text-ink`, `bg-paper`, `rounded-card` and emits matching CSS custom properties on `:root` | Defines token meaning and values; new tokens only go in `@theme`; never hard-code colors in components |
| Site framework components (nav, footer, hero, section cards, entry lists, empty states, long-form prose) | `src/components/*.astro`, `src/components/pages/*.astro`, `src/layouts/BaseLayout.astro`, `src/pages/**` | Defines principles and component look; framework changes happen at the component layer and must pass check/build |
| Hand-written HTML inside posts/pages (overviews, dual-subject comparisons, flow timelines, card groups) | HTML written directly in Markdown bodies | **Serves as the build/acceptance spec**, with per-component structure and CSS constraints; colors must come from `var(--color-*)` only |
| Markdown long-form typography | `.prose` in `src/styles/global.css` (@tailwindcss/typography) and Astro's built-in Shiki (near-monochrome custom theme in `astro.config.mjs`) | Headings/body/tables/code follow this; do not re-typeset inside individual posts |

When visuals conflict with the token table, colors, type, radii, and spacing always defer to the tokens. No second palette, no alternative component set.

---

## 1. Principles

1. **Grayscale is the skeleton; color is punctuation.** The page is built from ink, layered grays, and light-gray surfaces. Accent color is reserved for links, key numbers, and small "affiliation" dots — never for fills, columns of text, or card outlines.
2. **Content creates hierarchy.** Hierarchy comes from type size, weight, whitespace, and rounded sections — not dark color blocks, heavy borders, stacked shadows, or colored top edges.
3. **Breathing room.** Generous whitespace, relaxed line-height (1.6–1.75 for body), large radii; gaps between sections are larger than gaps between elements.
4. **Symmetry is fairness.** A dual-subject comparison (e.g. V8 vs JVM) must be point-by-point symmetric; affiliation is marked only by a 7–8px dot, with matched density, structure, and line counts on both sides.
5. **Graphics serve comprehension only.** No decorative gradients, shadow stacks, emoji-as-icons, animated GIFs, or meaningless icons. Dividers, table rules, and step connectors use neutral gray and stay as faint as possible.
6. **Light by default with a dark global nav.** Content surfaces are light (white hero and white tiles alternating with `paper` sections); the only dark element is the thin translucent global navigation bar, per apple.com. No other dark color blocks in content.

---

## 2. Tokens

### 2.1 Color

Tokens are declared in `@theme` in `src/styles/global.css`. Components use Tailwind utilities (`text-ink-2`, `bg-paper`, `border-line-soft`, `bg-blue`); embedded HTML uses CSS variables (`var(--color-ink)`).

| Token (CSS variable) | Value | Tailwind example | Use | Never |
|---|---|---|---|---|
| `--color-ink` | `#1d1d1f` | `text-ink` | H1s, nav text, strong body | — |
| `--color-ink-2` | `#424245` | `text-ink-2` | Body, card/table text | No pure `#000` for long text |
| `--color-muted` | `#6e6e73` | `text-muted` | Secondary copy, leads, entry meta, descriptions | Not for small text (insufficient contrast) |
| `--color-muted-2` | `#86868b` | `text-muted-2` | Eyebrows/kickers, footer, weakest labels | Not for key info |
| `--color-paper` | `#f5f5f7` | `bg-paper` | Gray sections, cards, code, empty states | Don't layer another gray on top |
| `--color-line` | `#dedee3` | `border-line` | Card outlines, table-header rules | — |
| `--color-line-soft` | `#ececf0` | `border-line-soft` | List row rules, nav/footer hairline | — |
| `--color-blue` | `#0066cc` | `bg-blue` / `text-blue` | Primary accent: links, primary button, subject-A dot | No large fills, no whole text columns |
| `--color-blue-hover` | `#0050a3` | (built-in hover) | Hover state of blue interactions | Not on light surfaces outside hover |
| `--color-blue-on-dark` | `#2997ff` | — | Highlights on dark surfaces only | Not on light surfaces |
| `--color-compare` | `#e8710a` | — | The "other side" dot **only** in dual-subject comparisons | Never on ordinary pages, never as fill |

Color red lines:

- An ordinary page has **exactly one accent color: blue**.
- `compare` orange exists only for point-by-point dual-subject comparisons, and blue/orange may appear only in 7–8px dots, dots inside small pills, 6px dots in table headers, links, and primary buttons.
- Forbidden: colored body text columns, colored card top edges/outlines, colored `code`, colored badges/tags, high-saturation fills, rainbow multi-color, stacked red/yellow/green status colors, brand-colored social icons.
- When you must express good/bad/warning, prefer text and neutral color — not blocks of green/red.

### 2.2 Typography

```css
--font-sans: "SF Pro SC","SF Pro Text","SF Pro Display","PingFang SC",
  -apple-system, BlinkMacSystemFont, "Helvetica Neue","Segoe UI",Roboto,Arial,sans-serif;
--font-mono: "SF Mono",Menlo,Consolas,"Liberation Mono","Lucida Console",monospace;
```

- Headings: sans stack, weight 600, negative tracking (`-0.02em ~ -0.03em` on large titles).
- Body: weight 400; `html` sets `-webkit-font-smoothing:antialiased`.
- Code: mono stack, 1–2px smaller than body.
- **System font stacks only — no webfont files** (no external font requests, no FOUT).

Type scale (base 15.5–16px):

| Role | Size / line-height |
|---|---|
| Home hero H1 | `clamp(40px,7vw,76px)` / 1.05 |
| Section H1 | `clamp(30px,4vw,40px)` / 1.1 |
| Post H1 | `clamp(28px,4vw,38px)` / 1.12 |
| Section H2 | 22–28px / 1.15 |
| Feature-tile title | clamp(24–34px) / 1.12 |
| Card H3 / entry title | 16.5–19px / 1.25–1.35 |
| Body | 15.5px / 1.6–1.75 |
| Meta / labels | 12–13px `muted`; eyebrows/kickers 12px uppercase with `letter-spacing:.14em` |

### 2.3 Radii, spacing, width

- Radii: `--radius-sm 5px` (inline code), `--radius 12px`, `--radius-card 18px` (section cards), `--radius-hero 28px` (hero, empty states); buttons/pills use `rounded-full` (999px); avatars `rounded-full`.
- Spacing in multiples of 4; card padding 20–28px; hero padding 28px mobile / 48–64px desktop; section vertical rhythm 40–56px — **outer section whitespace > inter-card gap (16px)**.
- Width: standard container `max-width:1080px` with side padding `px-5` mobile / `px-8` desktop; reading column for posts `max-width:760px`.
- Embedded HTML roots are fluid/full-width; inner width constraints use `max-width` + `margin:auto`, never fixed pixel page widths.

### 2.4 Backgrounds, borders, shadows

- **No shadows by default** (no Tailwind shadows anywhere, including hover). Separation comes from alternating white/`paper` surfaces plus radii.
- Cards/surfaces are one of: 1px `line`/`line-soft` outline on white, or borderless white tiles on `paper` sections; stay consistent within a section.
- Liquid-glass surfaces (floating TOC, active-row pill, section index chips) use the `--glass-*` tokens in `@theme`; the translucent films and rims are defined there — do not re-declare glass colors outside the token block (§3.10).
- Nav is the one dark surface (translucent `#1d1d1f` + blur, white text); footer stays light: white with a 1px `line-soft` hairline; no gradients.

---

## 3. Framework components

Source of truth: `src/components/`, `src/components/pages/`, `src/layouts/BaseLayout.astro`. Styles use token utilities at the component layer; never leak implementation classes into Markdown.

### 3.1 Nav (`Nav.astro`)

- The global navigation is the site's **single sanctioned dark chrome surface**, matching apple.com's `.globalnav` exactly: 44px tall, background `rgba(0,0,0,0.8)` with `backdrop-filter: blur(20px) saturate(1.8)` (pure black at 80% — not the near-black `--color-ink`, which composites too gray over light content); sticky, with at most a hairline `rgba(245,245,247,0.08)` bottom edge; no shadow.
- The left brand slot contains only the Z lettermark (21px, off-white, linked home with `aria-label="Zzzode"`) — no repeated wordmark in the bar, mirroring apple.com. Items are 12px `rgba(245,245,247,0.8)` (Apple's off-white, visibly brighter than 70% pure white), hover/active → `#f5f5f7`. Apple does not use blue inside the global nav — blue stays for in-page content links.
- The language toggle is a translucent hairline pill (`border rgba(245,245,247,0.22)`, text 85% off-white) brightening toward full white on hover; the disabled state uses 12% border + 35% text.
- The magnifier (desktop and mobile) is a normal link to `/search/`; with JS enhanced it instead opens the global command palette (§7), keeping the same fallback.
- Mobile (<768px): zero-JS native `<details>`; opening it shows a full-width opaque `ink` panel so article text cannot show through the links, with 17px items in `rgba(245,245,247,0.8)` separated by `rgba(245,245,247,0.08)` hairlines; white hamburger glyph. The panel scrolls when taller than the viewport. ≥44px touch targets.

### 3.2 Home hero (`HomeHero.astro`)

- Full-bleed **white**, centered content, vertical padding kept compact (~64–80px) so the lead story starts in the first viewport; this is the brand moment but never pushes real content below the fold.
- On wide screens (≥1024px) the centered horizontal eyebrow is hidden and the same words render as a **vertical edition label** on the hero's outer-left edge (`writing-mode: vertical-rl`, CJK glyphs upright, Latin letters rotated, `letter-spacing` widened) positioned one gutter beyond the 1080px container (`left: max(20px, calc(50% - 540px - 52px))`, vertically centered). Below 1024px it reverts to the horizontal centered eyebrow; the two never show together.
- Structure: gray uppercase eyebrow → a very large tight H1 (`clamp(40px,7vw,72px)`, weight 600, tracking `-0.035em`, line-height ~1.04) set in **two tones on two lines** — first line `ink`, second line `muted` — → one gray subhead (17–19px `muted`, max-width 560px) → a row of **blue/ink text links with `›` chevrons** (the Apple "Learn more ›" idiom), not pill buttons.
- The home is blog-first: the primary CTA goes to `/posts/`; the secondary one to `/cv/`.

### 3.3 Home editorial composition (`pages/HomePage.astro`)

The home centerpiece is a light, hairline-driven editorial page — type and 1px rules create hierarchy, never boxes or dark fills (the nav is the only dark surface). Sections alternate white / `paper` full-bleed:

- **Lead story** (white): a full-width `border-t border-line` magazine opener — a narrow meta rail (a `StarMark` ✦ plus `本期主打 / FEATURED` eyebrow over a mono issue line `NO.NN · YYYY.MM.DD`, muted) beside a large ink title (`clamp(29–46px)`, turns blue on hover), a gray excerpt, topic words joined by `·`, and a blue "阅读文章 › / Read post ›". The issue number is the build-time count of long-form posts excluding AI Daily; the human date stays the localized format elsewhere. An **oversized outlined issue numeral** sits behind the opener's bottom-right (`clamp(108–250px)`, transparent fill, `1.25px` stroke in ink at ~11% alpha via `color-mix`, `aria-hidden`, no motion) — pure type texture, clipped by the opener; never fill it, color it, or let it overlap text on mobile. The opener is reserved for the latest technical AI/engineering post.
- **Section numbering**: the four editorial section heads carry the same `StarMark` ✦ + mono two-digit index (`01` editor's picks, `02` latest, `03` topics, `04` colophon) in `muted-2`; the glyph and number stay quiet — the section title keeps the visual weight. `StarMark` (`src/components/StarMark.astro`, inline SVG four-point sparkle, `currentColor`) is the single recurring section glyph apart from the Z lettermark.
- **Editor's picks** (`paper`): a section heading with a blue "全部文章 ›" link, then hairline rows (`border-t/border-b border-line`) — mono `01` index, ink title (lead row larger than the rest), muted excerpt, date right-aligned. No rounded white tiles, no cards, no shadows.
- **Numbered archive**: a two-column `md:grid-cols-2` list (equal columns, never CSS multi-column) of top-hairline rows with mono index, title, date; single column below `md`.
- **Topic threads**: four text-only groups divided on wide screens by vertical `border-line-soft` rules; each shows mono index, localized entry count, semibold title, gray descriptor, and two sample entries below a hairline. Children with truncated text need `min-w-0`.
- **Colophon** (`paper`): a three-column band of **large build-time figures** (article/thread/source counts, ink `clamp(32–54px)` tabular numerals with 12px `muted-2` labels, hairline-separated) that count up on scroll via `choreography.ts`, over a quiet meta row — `✦ 04` + 档案 eyebrow, "无 Cookie，无追踪", projects/archive/RSS links. No dark stat band; counts are computed at build time.
- no posts yet: one centered white tile on `paper` with a localized empty message.

### 3.4 Secondary collections (projects / talks / teaching / publications)

- These are deliberately subordinate to writing and are reached from the nav. **Projects** (`/projects/`, `ProjectsPage.astro`) is the portfolio section in the home-page's magazine register: one **flagship feature** (the largest original work — a full-width `border-t border-line` opener with year + localized status on the meta rail, oversized title with `↗` external affordance, long description, a mono `highlights` evidence line, stack pills; evidence must come from real repo facts — spec size, test counts, license) followed by three honest curated groups (languages & runtimes / decision systems / platform tools). Groups are classifications, not rankings: no sequential group numbers, repeated years within a group collapse to the first row. **The whole page below its header is a static iOS grouped-list field — a full-bleed `paper` ground (`.page-paper`, full-viewport width) carrying white inset cards** (`.project-flagship`, `.project-group` / `.project-row`, all static: white fill, quiet shadow, no translucency, no pointer/hover glass, no per-element script); rows are separated by in-card hairlines (`--color-line-soft`). Keep it deliberately calm — there is deliberately no cursor effect on this page. A closing card lists this website itself and links to the full GitHub profile + RSS. Never equal-weight database rows, gray cards on white ground, or edge-to-edge hover backgrounds.
- A collection with no entries shows its localized empty state; it stays in the nav but never produces a filled card from placeholder data.

### 3.5 Entry list (`EntryList.astro`) — publications/talks/teaching/posts

- Hairline rows: 20px vertical padding, 1px `line-soft` between rows, no rule after the last row.
- Titles 16.5px/600 ink; linked titles turn blue on hover, no underline; meta 12.5px `muted` (venue · year / localized date / tags).
- Excerpts 13.5px `muted`, max-width 680px; tags are white 1px hairline pills.
- External links (DOI/official) open in a new tab; PDFs live in `public/files/`.

### 3.6 Empty state (`EmptyState.astro`) / page header (`PageHeader.astro`)

- Empty collections render a `paper` rounded-22 block with centered 14.5px `muted` localized text — no dramatic icons.
- Section headers: gray uppercase eyebrow → localized H1 (clamp 30–40) → one gray lead.

### 3.7 Prose, code, footer

- Long-form uses `.prose max-w-none` (typography plugin, colors mapped to tokens): ink headings with negative tracking, ink-2 body, blue links without underline (underline on hover), neutral quotes/rules, 12px-radius images.
- Inline `code`: mono, `paper` background, ink-2 text, 5px radius; code blocks: `paper`, radius 12, 13px.
- Syntax highlighting is the **near-monochrome Shiki theme** in `astro.config.mjs`: default ink-2, keywords in bold ink, comments in italic muted-2; no colorful syntax themes.
- Footer: white + 1px top `line-soft`, 12.5px `muted-2`; neutral GitHub/RSS icons turning blue on hover; localized copyright line.

### 3.8 Icons, logo, and images

- Brand mark ("A · Solid bevel"): a custom geometric Z drawn as a single bold stroke (`M14 13 H51 L13 51 H50`, stroke width 12.5/64, butt caps, bevel joins) in ink `#1d1d1f` — a lettermark, not a letter in a box. It inverts to `#f5f5f7` on dark surfaces. Assets: `public/favicon.svg` (source, with a `prefers-color-scheme: dark` inversion) plus pre-rendered PNGs: `favicon-32.png` (transparent, tab), `apple-touch-icon.png` (180, white opaque background — iOS requires opacity), `icon-192.png` / `icon-512.png` (white background, Z kept inside the maskable safe zone, manifest purpose `any maskable`).
- Social share image: `public/og.png` (1200×630, white card: the geometric Z lettermark + gray `RESEARCH · ENGINEERING · NOTES` eyebrow + ink `Zzzode` wordmark; language-neutral). Wired through `og:image` / `twitter:summary_large_image` in `BaseLayout.astro`; regenerate with a 2x-supersampled HTML→headless-Chrome render to keep the glyph crisp if the brand changes.
- Nav/footer UI glyphs are minimal inline SVG (GitHub, RSS, hamburger) in `currentColor`.
- No emoji-as-icons; when no avatar photo exists, use the brand monogram rather than a big placeholder image.
- Images go in `public/images/` or next to the entry; compress (long edge ≤2000px), no external image hosts, no large Base64 inlining.

### 3.9 Distilled-article components (`src/components/article/`)

Distilled research articles (`kind: 'distilled'` MDX posts) compose full-bleed blocks from this library; see `.agents/skills/distill/references/component-catalog.md` for props/slots and `article-template.mdx` for a skeleton.

- `CoverBanner` — required first block; gray provenance kicker, H1, lead, hairline pills, optional inline-SVG `visual` slot; staggers in on load (§7); stacks ≤860px.
- `Section` — two surface registers (see §3.10): the legacy white/`alt` rounded slab, or `canvas` (bare section inside an `ArticleCanvas` gray field) with `SectionHead`; `Prose` constrains ordinary Markdown to the 760px column while blocks stay full-width, and `tile` makes it a borderless white tile.
- `ArticleCanvas` — the continuous full-bleed gray canvas that wraps a canvas-register article body; required around any `canvas` sections.
- `CardGrid` / `InfoCard` — 1/2/3-column overview tiles; `DualCompare` / `BlockTitle` — point-by-point blue/orange dual cards with the three-layer rule (§5); `Steps` (neutral numbered, dot/title center-aligned on a unified connector rail), `Timeline` (rail; horizontally scroll-snapping strip on desktop, joined vertical list on mobile), `Pipeline` (stage cards + arrows).
- `MechanismSequence` — a linked process overview followed by compact diagram/explanation rows. Every `steps` entry requires a named `frame-i` slot and may have a `caption-i` slot (zero-based). All stages stay readable in normal document flow; wide screens pair explanation and diagram, and narrow screens stack them. Use diagrams to show data paths, state changes, boundaries, and meaningful comparisons. Do not restore viewport-height panels, pinned stages, scroll-driven frame crossfades, or dimmed explanatory text for a sequence of independent diagrams.
- `CompareTable` — dot-headed hairline table, single-line cells with a `wrap` opt-in for prose columns, horizontally scrollable on mobile (min-width 640); `Callout` — white hairline card, blue eyebrow only for `tone="insight"`; `StatGrid` / `Stat` — key-number grid; on legacy surfaces a 1px-gap hairline table, on the canvas `tile` renders independent borderless white tiles (`Stat dark` for an ink emphasis stat); optional numeric `count` count-up (server output is always the final value).
- `Summary` — closing takeaway cards + caliber note; `surface="white"` when the closing section sits on the canvas; `Sources` renders automatically from the post's `sources` front matter with a distillation date.
- Section roots carry `reveal` for scroll-in motion; diagrams are hand-written inline SVG in token hex only.

### 3.10 Article surface system (canvas + liquid-glass TOC)

Distilled long-forms use the Apple **shop-register** language: one continuous gray field carrying borderless white tiles. The Nasdaq market piece is the reference; new distillations default to it.

**Architecture**

- `<ArticleCanvas>` wraps the whole body (everything after `CoverBanner`; `Sources` renders outside on the white ground). It is a single full-bleed `--color-paper` field — never attach a background to individual sections (independent gray bands produce white gaps and width jitter at scroll boundaries).
- Every section uses `<Section canvas id="…">`: headings sit directly on the gray field; content blocks are white tiles aligned to one inner grid (1080px max, 32px side inset desktop / 16px mobile), so prose edges and chart edges align.
- Tile props (all opt-in; without them the component keeps its legacy surface): `Prose tile`, `Timeline tile`, `CompareTable tile`, `StatGrid tile`, `Summary surface="white"`. `MechanismSequence` provides its own white tile and needs no outer tile wrapper. Other full-bleed blocks (Steps, bespoke SVGs) get a plain `not-prose rounded-[18px] bg-white` wrapper with matching padding. Chart panel rects drop their hairline stroke (`fill="#ffffff"` only, `rx="20"`).
- Legacy articles keep `Section alt`/default + non-tile blocks unchanged; the two registers must not be mixed inside one article.

**Chapter numbering**

- Each `SectionHead` in a canvas article carries `index="01"`… (rendered as a glass number pill) and a **short noun-phrase `kicker`** — at most ~6 CJK glyphs (e.g. 第一环, 放大层（下）, 历史剧本). The kicker doubles as the floating TOC's one-line chapter name; pass an explicit `toc="…"` prop only to override it. The long educational title stays the h2 and is shown as the link's native `title` tooltip.
- The rail numeral is read from the same authored hint (`data-toc-index`), never a separate counter, so page pill and rail cannot desync. Articles without index pills get no number column.

**Liquid-glass TOC** (≥1600px; hidden below — no mobile entry)

- Material = a highly transparent film (`--glass-film-*` tokens) over the gray field, dual-tone rim (lit top/left, dark bottom/right), a top specular, and an SVG noise-lens `backdrop-filter` refraction in Chromium; other engines get the blur-only fallback (feature-detected via `.supports-glass-lens`). Never fill it into an opaque white card — on a featureless ground the rims and sheen carry the material.
- The active chapter is a **raised shard of the same glass** (`--glass-pill-*`), not a blue fill: ink bold label + blue numeral; unnumbered rails use a blue label instead.
- The caption (`本页内容` / `ON THIS PAGE`, localized) sits outside the scroll area as a compact group label (11px; CJK tracking 0.04em, Latin 0.12em). The rail scrolls itself to follow the spy without moving the page; focus gets a blue ring with a white light-gap (system outline under `forced-colors`).
- The panel stays outside the content measure with a ≥12px gap; on legacy 1080px articles it sits farther out so it never overlaps text.

---

## 4. HTML embedded inside posts

Applies to hand-written HTML in Markdown bodies (research overviews, dual comparisons, flow diagrams).

- Colors and sizes come **only** from the `:root` custom properties: `var(--color-ink)`, `var(--color-paper)`, `var(--radius-card)`, etc.; no hex literals.
- The root container is fluid/full-width with `box-sizing:border-box`; no fixed pixel page width.
- Images are repository assets (`public/images/`), never external hosts.

Recommended block order for technical surveys/comparisons: ① cover banner (4.1); ② a set of blocks covering the key points — overview, dual comparison (4.3), pipeline timeline (4.4), comparison table (4.5), code (4.6), chosen by content; the structured points must be complete, not one overview diagram; ③ summary (4.7). Native Markdown prose is interleaved for plain-language explanation.

### 4.1 Hero / cover banner

- `background:var(--color-paper);border-radius:var(--radius-hero)` (28px), padding 48–64px.
- Structure: gray uppercase wide-tracked eyebrow (**never blue**; source/topic) → ink `h1` (negative tracking) → gray lead (15–17px, line-height 1.6, max-width 560–660px) → optional white hairline pill row.
- On wide screens it may split into two columns (`grid-template-columns:1.15fr .85fr`, collapsing at ~860px): copy on the left, a **pure inline minimal SVG** of the core structure on the right; only nodes/emphasis points may be blue/orange dots. No bitmaps, external images, colorful illustration, emoji, or decorative gradients.
- No dark hero blocks, translucent colored pills, or colored-border pills.

### 4.2 Sections and white/gray alternation

- Two registers: **legacy** — default white sections, `section.alt` as a `paper` rounded-28 block (12–16px outer margin) with cards inside knocked out to white; **canvas** — one continuous `ArticleCanvas` gray field with borderless white tiles (§3.10, the default for new distilled articles).
- Centered section heads: gray uppercase kicker (e.g. `01 · INSTANCE MODEL`) → `h2` → one gray supporting line. Canvas heads show the kicker as a short noun phrase beside a numbered glass pill (§3.10).

### 4.3 Dual comparison cards (core component)

```css
.dual{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.card{border-radius:var(--radius-card);padding:28px 26px;background:var(--color-paper);border:none}
.alt .card{background:#fff}
```

- One card per side: a top affiliation tag `.ctag` (white/gray pill with a 7px dot + 11px gray uppercase microcopy), then `h3` + gray `.csub`.
- Affiliation color appears **only** on the dot; tag text, titles, and body are all neutral ink/gray.
- Organize cards with uniform blocks: `.blk-t` (11px gray wide-tracked mini-heading) + body or steps; collapses to one column at ≤640px.

### 4.4 Pipeline / process steps (vertical timeline)

- Single-column `.steps`; each step is "numbered dot + title + description". Dots are uniformly neutral gray (`background:var(--color-muted-2)`, white numerals, 19px) joined by a 1.5px `line-soft` vertical connector; **no per-step colors**.
- Titles 13px dark, descriptions 12.5px gray; 3–5 steps per pipeline; titles are verb-first phrases.

### 4.5 User-facing comparison table

- A `paper` (white inside `alt`) rounded-22 container holding a title, one explainer line, and a `table`.
- Headers: 11–12px gray uppercase; subject columns headed by "6px dot + name" (A blue / B orange), **never full-column fills**; 1.5px `line` under the header, 1px `line-soft` between rows.
- Container gets `overflow-x:auto` so narrow screens scroll instead of overflowing.

### 4.6 Code

- Inline `code`: mono 12–13px, `paper` background, ink-2 text, 5px radius; no blue/orange code backgrounds or colored code text; the same neutral treatment applies to code blocks, site-wide.

### 4.7 Summary and footer

- Close with 1–2 gray rounded-22 summary cards, one per subject: 8px dot + name + one bold conclusion + gray supplement.
- In-article footers: centered 11.5–13px `muted-2` text for sources and references, no heavy rule.

### 4.8 Icons and emoji

- No emoji-as-heading or status icons; write section titles in prose.
- When a glyph is needed, use minimal line SVG or characters (numerals, ≠, →) in neutral color.

---

## 5. Dual-subject comparison content (V8 vs JVM style posts)

Beyond visual symmetry, content must be symmetric point-by-point with real detail — no rich side opposite a slogan side:

1. **Paired points.** Each technical dimension is one section with a left and a right card; never a dimension that covers only A and dismisses B in one line.
2. **Three layers per point.** Every card must include:
   - **Architecture**: key components, data structures, isolation/sharing boundaries, with real API/type names (e.g. `Isolate`, `JNIEnv*`, `HandleScope`, `GlobalRef`).
   - **Pipeline**: 3–5 numbered steps covering the real order of creation, entry, execution, and teardown — not adjectives.
   - **User-facing difference**: outside the card, a table of actionable differences (multi-instance / failure domain / concurrency / typical use / behavior after teardown).
3. **Fixed affiliation colors.** One dot color per subject, consistent throughout (default A = blue, B = orange); colors identify sides, never rank them.
4. **Symmetric conclusions.** Closing cards are likewise paired, each summarizing the model's philosophy in one sentence.

---

## 6. Do / Don't

| ✅ Do | 🚫 Don't |
|---|---|
| Define tokens only in `global.css @theme` | Hard-code colors in components or posts |
| Alternate white and `paper` rounded sections | Fill content with dark color blocks |
| Borderless gray cards / 1px hairline cards | Colored card top edges/outlines, shadows |
| Accent only in links, primary buttons, 7–8px dots | Colored text columns, badges, code, brand-colored icons |
| Hairline scholarly lists with neutral meta | Colored type badges, a row of colored buttons |
| Neutral step numbers and connectors | A different colored dot per step, rainbow timelines |
| Gray uppercase eyebrow + ink H1 | Blue eyebrows, emoji headings |
| Point-by-point symmetric dual cards with 3 layers | Rich side vs slogan side, adjective stacking |
| Fluid max-width + responsive column collapse | Fixed pixel page widths, horizontal overflow |
| Generous whitespace, line-height 1.6–1.75, radii 18–28 | Dense copy, square corners, gradient backgrounds |
| Change style at the token/component layer with check+build | Inline styles, editing `dist/`, CDN stylesheets |

---

## 7. Technical constraints (Astro / GitHub Pages)

- **Compiled TS, progressive enhancement**: no UI frameworks or hand-authored JS blobs; first-party interactivity is authored as typed ES modules in `src/scripts/` (class/options/lifecycle/cleanup), bundled by Vite. ① `article.ts` loads only on post pages (below); ② `/search/` lazy-loads the Pagefind UI/CSS from the `postbuild` index (`pagefind --site dist` → `/pagefind/*`); ③ `BaseLayout` loads `choreography.ts` and `command-palette.ts` site-wide (§7 motion); ④ `/posts` inlines `post-filter.ts`. Every enhancement must degrade: triggers are real links/buttons, no-JS and `prefers-reduced-motion` always show final content. Zero third-party runtime dependencies. Justify any new module explicitly.
- **Astro ClientRouter** provides same-document navigation site-wide (View Transitions). TS modules bind once on `document` via `astro:page-load` and survive swaps; injected DOM is reattached, and unsupported browsers fall back to full loads. Hover/focus prefetch is enabled explicitly (`prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`) so the router warms the destination before click.
- **No frameworks or CDNs**: no React/Vue/Svelte UI frameworks (Astro supports them, this site doesn't need them), no Bootstrap/Tailwind-CDN/jQuery/webfonts/analytics scripts; third-party assets must be vendored or installed via npm.
- **Tailwind v4 only** (`@tailwindcss/vite`; configuration lives in `global.css`) plus the typography plugin; no second CSS system.
- **Syntax highlighting** via built-in Shiki with the repository's near-monochrome theme (`astro.config.mjs`); no Prism/highlight.js.
- **i18n**: zh is the default locale at the root, en under `/en` (`astro.config.mjs`); UI strings only in `src/i18n/ui.ts`; entries are same-name file pairs under `src/content/<collection>/{zh,en}/`.
- **Schema-bound content**: front matter follows `src/content.config.ts`; type/format errors fail `npm run build` and `astro check`.
- **Deployment**: `withastro/action@v6` builds and deploys; Settings → Pages → Source must be **GitHub Actions**. This is a user root site (zzzode.github.io) — no `base`; a custom domain goes in `public/CNAME`.
- Compress images; no inlined Base64 images; `dist/`, `.astro/`, `node_modules/` are not committed.
- Tailwind breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280`; multi-column layouts collapse at narrow widths.
- **Motion**: post-page motion (below) is JS-gated. Framework pages use CSS-only motion: the home hero plays a one-time staggered fade-rise via `[data-hero-enter]` keyframes and chevrons (`›`) nudge on hover through the `.chevron-link`/`.chevron` classes; both live inside a `prefers-reduced-motion: no-preference` media query, so reduced-motion users (and no-animation environments) get the final layout immediately.
- **MDX**: distilled articles are `.mdx` files (`@astrojs/mdx`) composing components from `@/components/article`; framework pages remain plain `.astro`.
- **Motion**: `src/scripts/article.ts` (~2.2 KB gzip) remains post-only. Framework pages keep their CSS-only gestures — ① the home hero `[data-hero-enter]` stagger; ② `/about` and `/projects` use `[data-enter]` / `[data-stagger]` / `[data-row-stagger]`; ③ the `/about` terminal self-types (`.tcmd-1..3`, `.tout-1..3`/`.tp`); ④ `/projects` is a static iOS grouped-list field (no page script) — and add two compiled enhancements: **`choreography.ts`** drives `[data-reveal]` / `[data-reveal-stagger]` blocks (blur 7px → 0, 18px rise, fade; one-shot IntersectionObserver) and count-up `[data-count]` figures on the home colophon; **`command-palette.ts`** powers the global ⌘K/Ctrl+K (also `/`) palette — frosted `--glass-panel` modal over `--glass-scrim`, lazy dynamic `import('/pagefind/pagefind.js')` filtered by locale, full keyboard model (↑↓/Tab/↵/Esc), capture-phase trigger interception so ClientRouter does not navigate first. **`post-filter.ts`** (`/posts` only, inlined) reveals a segmented topic control with a sliding white indicator (`--color-paper` track), animated list filtering, and a count line; the selected topic is the URL state (`?topic=<key>`, pushState + popstate, shareable, back/forward restores it) and the frosted band sticks under the 44px nav while the list scrolls; list rows use the CSS-only `.hover-lift` 3px nudge with the mono index turning blue on hover. **`code-copy.ts`** (post pages) injects a quiet hairline chip into every `pre.astro-code[data-language]` — visible on hover/focus, always on touch, blue "已复制/Copied" feedback for 1.8s, async Clipboard API with the legacy fallback. The palette's empty query shows the five most recent long-form posts above navigation, plus a `⌘K … Esc` hint footer (hidden on narrow screens). ClientRouter page swaps crossfade/rise (0.18s out / 0.34s in). No motion module ever hides content before JS proves itself: initial states are gated behind `html.js-reveal` / `html.js-filter`. Global craft: blue-tinted text selection, token-blue `:focus-visible` rings, smooth anchor scrolling. Under reduced motion everything renders at its final state immediately — no reveals, count-up, panel/indicator transitions, or view-transition animation.

---

## 8. Pre-publish visual checklist

After a local build, check at desktop 1280px, tablet 768px, and phone 390px (DevTools device mode or headless screenshots), in **both locales**:

- [ ] `npm run check` and `npm run build` pass with no errors/new warnings.
- [ ] The site is grayscale-first; accent appears only in links, primary buttons, and 7–8px dots; no large color blocks, colored tags, or brand-colored icons.
- [ ] Font sizes, negative tracking, line-height, and radii match the token table; no square cards, no shadows anywhere.
- [ ] The global nav matches apple.com: 44px, `rgba(0,0,0,0.8)` + `blur(20px) saturate(1.8)`, off-white `rgba(245,245,247,0.8)` links → `#f5f5f7` on hover/active, no blue in the bar; mobile opens a blurred dark full-width menu; sticky bar never obscures content.
- [ ] Language toggle links to the same route in the other locale, or is a disabled pill when the entry has no counterpart; nav links all carry the correct `/en` prefix on English pages.
- [ ] Home hero is white and centered with a compact two-tone ink/muted H1 and blue text-`›` links (no pill buttons, no dark hero); ≥1024px the eyebrow is the vertical outer-edge label, below that horizontal and centered (never both). The editorial page below uses only type and hairline rules — a light magazine lead story with the `NO.NN · YYYY.MM.DD` issue line and the quiet outlined numeral, ✦ + mono 01–04 section marks, hairline editor's-pick rows, an equal two-column numbered archive, and a quiet colophon meta line — with no rounded card soup and no dark content slabs; the outlined numeral causes no horizontal overflow at 390px.
- [ ] Entry-list hairlines/meta/tags are neutral; empty collections show the localized empty state.
- [ ] Per-locale lists only contain entries that exist in that locale; dates are localized; post titles/venues keep their original language.
- [ ] Post headings, dates, tags, and `.prose` render correctly; code blocks are near-monochrome; dual-subject blocks are symmetric with all three layers.
- [ ] Multi-column layouts collapse correctly at narrow widths; no clipped text or horizontal overflow; touch targets ≥44px.
- [ ] Distilled-article TOC at 1680px clears the article column and highlights the current section; narrow layouts stack the banner/cards/comparison/timeline.
- [ ] With `prefers-reduced-motion: reduce` emulated, every article block is visible immediately with no animation; the progress bar and TOC still function.
- [ ] Framework pages bundle only the two BaseLayout modules (`choreography`, `command-palette`, ~9 KB gzip total incl. ClientRouter) plus the inlined `/posts` filter; they degrade fully with JS disabled (real link triggers, complete lists, final-state content), and `/search/` still lazy-loads Pagefind; article pages contain only `article.ts` (~2 KB gzip).
- [ ] ⌘K/Ctrl+K opens and closes the palette on every page (Esc, scrim click), ↑↓/Tab move selection and ↵ navigates, search is locale-scoped and shows the empty/unavailable states, the `/posts` segmented filter filters and counts correctly with the indicator aligned.
- [ ] Images are compressed with alt text; no external image hosts, localhost links, or placeholder URLs.
- [ ] The build emits no first-party JS on framework pages apart from the lazy search-page loader and the justified article script, and no external fonts/CDNs.
- [ ] The diff contains no tokens, credentials, or personal data, and no `dist/` artifact noise.

## 9. File map

- Tokens and global typography: `src/styles/global.css` (`@theme` + base + `.prose`).
- Highlight theme and site config: `astro.config.mjs`; UI strings: `src/i18n/ui.ts`.
- Content schemas: `src/content.config.ts`; entries: `src/content/{posts,publications,talks,teaching,projects}/{zh,en}/` (posts accept `.md` and `.mdx`).
- Tag pages and reading aids: `src/lib/{tags,reading-time}.ts`, routes `src/pages/{,en/}posts/tags/[tag].astro`; prev/next navigation and reading time render in `PostPage.astro`.
- Search: `src/pages/{,en/}search.astro` → `components/pages/SearchPage.astro`; the Pagefind index is emitted to `dist/pagefind/` by the `postbuild` npm script (`pagefind --site dist`), filters per locale via `data-pagefind-filter` on `<html>`, and indexes only elements carrying `data-pagefind-body` (post articles, project list).
- Distilled-article components: `src/components/article/` (catalog in `.agents/skills/distill/references/component-catalog.md`; surface system in §3.10, incl. `ArticleCanvas.astro` and the canvas/tile props); post enhancement script: `src/scripts/article.ts`; distillation workflow skill: `.agents/skills/distill/SKILL.md`.
- Framework components: `src/components/{Nav,Footer,HomeHero,PageHeader,EntryList,EmptyState}.astro` and page components in `src/components/pages/` (the editorial home is `pages/HomePage.astro`).
- Routes: `src/pages/index.astro` and `src/pages/{publications,talks,teaching,projects,posts}/index.astro`, `src/pages/about.astro` (identity page — one oversized statement H1, a paper terminal-output block whose mono `$ now/stats/stack` transcript lines each add a fact the statement omits, then unnumbered hairline spec rows on one aligned label column and external identity links; no repeated role/focus restatements, no fake window chrome, no badges, no status-color dots), posts detail `src/pages/posts/[...slug].astro`, `src/pages/cv.astro`, `src/pages/404.astro`, `src/pages/rss.xml.ts`, plus mirrored files under `src/pages/en/`.
- Static assets: `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-{192,512}.png`, `public/og.png` (social card), `public/site.webmanifest`, `public/files/` (PDFs), `public/images/`.
- Deployment: `.github/workflows/deploy.yml`.
