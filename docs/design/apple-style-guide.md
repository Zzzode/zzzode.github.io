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
6. **Light by default.** The site is light-first (white alternating with `paper` gray). Apart from the one intentionally designed brand moment on the home hero, no dark color blocks in content.

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
| Home hero H1 | `clamp(40px,6vw,64px)` / 1.08 |
| Section H1 | `clamp(30px,4vw,40px)` / 1.1 |
| Post H1 | `clamp(28px,4vw,38px)` / 1.12 |
| Section H2 | 22–28px / 1.15 |
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
- Cards are one of: 1px `line`/`line-soft` outline on white (home section cards), or borderless `paper` fill; stay consistent within a list.
- Nav/footer: white with a 1px `line-soft` hairline; no gradients.

---

## 3. Framework components

Source of truth: `src/components/`, `src/components/pages/`, `src/layouts/BaseLayout.astro`. Styles use token utilities at the component layer; never leak implementation classes into Markdown.

### 3.1 Nav (`Nav.astro`)

- White (`bg-white/85 backdrop-blur`, sticky) with a 1px `line-soft` bottom border, 56px tall; no dark bar, no shadow.
- Site name 17px/600 ink; items 14.5px ink; hover/active turns blue (no active background block).
- Bilingual: every item and the brand link carry the locale prefix (`/en` for English); the language toggle is a hairline pill linking to the same route in the other locale, rendered as a disabled `muted-2` pill when no counterpart exists.
- Mobile (<768px): zero-JS native `<details>` dropdown — white, 1px hairline, 12px radius, ≥44px touch targets; the toggle pill sits beside the hamburger.

### 3.2 Hero (`HomeHero.astro`)

- Large `paper` rounded-28 banner, padding 28–64px; not a dark cover image.
- Structure: gray uppercase eyebrow (**never blue**) → ink H1 (negative tracking) → gray lead (16.5–17px, max-width 620px) → button row.
- Primary button: blue pill with white text; secondary: white pill with 1px hairline and ink text. Copy is localized via `home.*` keys.

### 3.3 Section cards (`SectionCard.astro`)

- Four home entry cards: white, 1px `line-soft`, radius 18, no shadow; grid `grid-cols-1 sm:grid-cols-2`, gap 16px.
- Inside: English eyebrow label + localized title (19px/600); bottom row 13px `muted-2` (localized count with singular/plural — "1 item" / "3 items" — or "Nothing yet"/"暂无内容") + neutral `›`.
- Hover: title turns blue, outline deepens slightly; no movement, no shadow.

### 3.4 Entry list (`EntryList.astro`) — publications/talks/teaching/posts

- Hairline rows: 20px vertical padding, 1px `line-soft` between rows, no rule after the last row.
- Titles 16.5px/600 ink; linked titles turn blue on hover, no underline; meta 12.5px `muted` (venue · year / localized date / tags).
- Excerpts 13.5px `muted`, max-width 680px; tags are white 1px hairline pills.
- External links (DOI/official) open in a new tab; PDFs live in `public/files/`.

### 3.5 Empty state (`EmptyState.astro`) / page header (`PageHeader.astro`)

- Empty collections render a `paper` rounded-22 block with centered 14.5px `muted` localized text — no dramatic icons.
- Section headers: gray uppercase eyebrow → localized H1 (clamp 30–40) → one gray lead.

### 3.6 Prose, code, footer

- Long-form uses `.prose max-w-none` (typography plugin, colors mapped to tokens): ink headings with negative tracking, ink-2 body, blue links without underline (underline on hover), neutral quotes/rules, 12px-radius images.
- Inline `code`: mono, `paper` background, ink-2 text, 5px radius; code blocks: `paper`, radius 12, 13px.
- Syntax highlighting is the **near-monochrome Shiki theme** in `astro.config.mjs`: default ink-2, keywords in bold ink, comments in italic muted-2; no colorful syntax themes.
- Footer: white + 1px top `line-soft`, 12.5px `muted-2`; neutral GitHub/RSS icons turning blue on hover; localized copyright line.

### 3.7 Icons and images

- Nav/footer use minimal inline SVG (GitHub, RSS, hamburger) in `currentColor`.
- No emoji-as-icons; when no avatar image exists, don't ship a big placeholder image — use a monogram (as in `public/favicon.svg`).
- Images go in `public/images/` or next to the entry; compress (long edge ≤2000px), no external image hosts, no large Base64 inlining.

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

- Default sections are white; `section.alt` is a `paper` rounded-28 block (12–16px outer margin) with cards inside knocked out to white.
- Centered section heads: gray uppercase kicker (e.g. `01 · INSTANCE MODEL`) → `h2` → one gray supporting line.

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

- **Zero JS by default**: components without a `client:*` directive emit no JavaScript; the site currently ships no JS bundle at all. Prefer native capabilities (the mobile nav uses `<details>`); justify any island explicitly.
- **No frameworks or CDNs**: no React/Vue/Svelte UI frameworks (Astro supports them, this site doesn't need them), no Bootstrap/Tailwind-CDN/jQuery/webfonts/analytics scripts; third-party assets must be vendored or installed via npm.
- **Tailwind v4 only** (`@tailwindcss/vite`; configuration lives in `global.css`) plus the typography plugin; no second CSS system.
- **Syntax highlighting** via built-in Shiki with the repository's near-monochrome theme (`astro.config.mjs`); no Prism/highlight.js.
- **i18n**: zh is the default locale at the root, en under `/en` (`astro.config.mjs`); UI strings only in `src/i18n/ui.ts`; entries are same-name file pairs under `src/content/<collection>/{zh,en}/`.
- **Schema-bound content**: front matter follows `src/content.config.ts`; type/format errors fail `npm run build` and `astro check`.
- **Deployment**: `withastro/action@v6` builds and deploys; Settings → Pages → Source must be **GitHub Actions**. This is a user root site (zzzode.github.io) — no `base`; a custom domain goes in `public/CNAME`.
- Compress images; no inlined Base64 images; `dist/`, `.astro/`, `node_modules/` are not committed.
- Tailwind breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280`; multi-column layouts collapse at narrow widths.

---

## 8. Pre-publish visual checklist

After a local build, check at desktop 1280px, tablet 768px, and phone 390px (DevTools device mode or headless screenshots), in **both locales**:

- [ ] `npm run check` and `npm run build` pass with no errors/new warnings.
- [ ] The site is grayscale-first; accent appears only in links, primary buttons, and 7–8px dots; no large color blocks, colored tags, or brand-colored icons.
- [ ] Font sizes, negative tracking, line-height, and radii match the token table; no square cards, no shadows anywhere.
- [ ] Nav: white hairline, sticky without obscuring content; mobile hamburger and dropdown work with zero JS.
- [ ] Language toggle links to the same route in the other locale, or is a disabled pill when the entry has no counterpart; nav links all carry the correct `/en` prefix on English pages.
- [ ] Home hero is light with a 28px radius; eyebrow gray uppercase, no emoji; section cards switch between two columns and one column.
- [ ] Entry-list hairlines/meta/tags are neutral; empty collections show the localized empty state.
- [ ] Per-locale lists only contain entries that exist in that locale; dates are localized; post titles/venues keep their original language.
- [ ] Post headings, dates, tags, and `.prose` render correctly; code blocks are near-monochrome; dual-subject blocks are symmetric with all three layers.
- [ ] Multi-column layouts collapse correctly at narrow widths; no clipped text or horizontal overflow; touch targets ≥44px.
- [ ] Images are compressed with alt text; no external image hosts, localhost links, or placeholder URLs.
- [ ] The build emits no first-party JS bundle (apart from a justified island) and no external fonts/CDNs.
- [ ] The diff contains no tokens, credentials, or personal data, and no `dist/` artifact noise.

## 9. File map

- Tokens and global typography: `src/styles/global.css` (`@theme` + base + `.prose`).
- Highlight theme and site config: `astro.config.mjs`; UI strings: `src/i18n/ui.ts`.
- Content schemas: `src/content.config.ts`; entries: `src/content/{posts,publications,talks,teaching}/{zh,en}/`.
- Framework components: `src/components/{Nav,Footer,HomeHero,SectionCard,PageHeader,EntryList,EmptyState}.astro` and page components in `src/components/pages/`.
- Routes: `src/pages/index.astro` and `src/pages/{publications,talks,teaching,posts}/index.astro`, posts detail `src/pages/posts/[...slug].astro`, `src/pages/cv.astro`, `src/pages/404.astro`, `src/pages/rss.xml.ts`, plus mirrored files under `src/pages/en/`.
- Static assets: `public/favicon.svg`, `public/files/` (PDFs), `public/images/`.
- Deployment: `.github/workflows/deploy.yml`.
