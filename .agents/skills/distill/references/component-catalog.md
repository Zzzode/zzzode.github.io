# Distilled-article component catalog

All components live in `src/components/article/` and are exported from its barrel:

```mdx
import {
  Prose, CoverBanner, Section, SectionHead, CardGrid, InfoCard,
  DualCompare, BlockTitle, Steps, Timeline, Pipeline, CompareTable,
  Callout, StatGrid, Stat, Summary, Sources,
} from '@/components/article';
```

`<Sources>` is rendered automatically by `PostPage.astro` from front matter — do not place it manually.

## Prose

Constrains ordinary Markdown to the 760px reading column. Full-width components sit OUTSIDE it as siblings. In a canvas article (below) pass `tile` so it becomes a borderless white tile on the gray field.

```mdx
<Prose tile>

Ordinary paragraphs, lists, `inline code` go here. Leave blank lines at the edges.

</Prose>
```

## CoverBanner — required first block

Props: `kicker` (string, provenance, always gray), `title`, `lead?`, `pills?` (`{ label, dot?: 'a'|'b' }[]`). Slot `visual` = inline SVG.

```mdx
<CoverBanner
  kicker="WEB ARTICLE · docs.example.com · 2026-09-22"
  title="……"
  lead="……"
  pills={[{ label: "A" }, { label: "B vs C", dot: "a" }, { label: "C", dot: "b" }]}
>
  <svg slot="visual" viewBox="0 0 460 320">…</svg>
</CoverBanner>
```

## ArticleCanvas + Section / SectionHead — the default surface

New distilled articles use the **canvas register** (design guide §3.10): wrap the whole body in one `<ArticleCanvas>` (after `CoverBanner`; `Sources` stays outside), and every section uses `canvas`. Blocks inside become white tiles: `Prose tile`, `Timeline tile`, `CompareTable tile`, `StatGrid tile`, `Summary surface="white"`; bespoke full-width blocks (Steps, SVGs) get a `not-prose rounded-[18px] bg-white` wrapper. Each head gets a sequential `index` and a **short noun-phrase kicker ≤ ~6 CJK glyphs** — it doubles as the one-line TOC chapter name; the long title stays the h2. Never put the number inside the kicker text. Do not mix `canvas` with `alt`/default sections in one article.

```mdx
import { ArticleCanvas, Section, SectionHead, Prose } from '@/components/article';

<CoverBanner … />
<ArticleCanvas>
  <Section canvas id="mechanism">
    <SectionHead index="01" kicker="总框架" title="……" lead="……" />
    <Prose tile>…</Prose>
  </Section>
</ArticleCanvas>
```

`toc="…"` on `SectionHead` overrides the TOC name when the kicker must differ; legacy `Section alt` (paper rounded slab, no index) still exists for older articles.

## CardGrid / InfoCard — overview tiles

`CardGrid` props: `cols?: 2|3` (default 3). `InfoCard` props: `label?` (uppercase eyebrow), `title?`, `surface?` (default `white`; use `surface="paper"` only when the grid sits on a white page rather than an alt slab).

```mdx
<CardGrid>
  <InfoCard label="DEFAULT" title="……">
    <p class="mt-2 text-[13px] leading-[1.65] text-muted">……</p>
  </InfoCard>
</CardGrid>
```

## DualCompare — point-by-point subject A vs B

Props: `aTitle`, `bTitle`, `aLabel?`, `bLabel?` (default A/B). Slots `a` / `b` carry symmetric content. Both cards must carry the same three layers when making a technical comparison: architecture / pipeline / user difference (use `<BlockTitle title="架构设计" />`). Blue dot marks A, orange marks B — affiliation only, never ranking.

```mdx
<DualCompare aLabel="ASTRO" aTitle="……" bLabel="SPA" bTitle="……">
  <span slot="a"><BlockTitle title="架构设计" /><p class="mt-2">…</p></span>
  <span slot="b">…</span>
</DualCompare>
```

## Steps — vertical numbered pipeline (neutral)

`steps: { title, body? }[]`. 3–5 steps; verb-first titles.

```mdx
<Steps steps={[{ title: "…", body: "…" }, { title: "…" }]} />
```

## Timeline — horizontal rail

`nodes: { year, title, body? }[]` (any count). On desktop it becomes a horizontally scroll-snapping strip of fixed-width cards (scrollbar hidden); on mobile a joined vertical list. Ideal for lineage / release-history context (the 前因 section).

## Pipeline — stage cards with arrows

`stages: { title, body? }[]`. Stacks vertically with arrows on narrow screens.

## ScrollStory — the large-scale scroll-driven moment

Use when the piece teaches a **process or lifecycle** (one is expected in a deep distillation; skip only when the content genuinely has no sequence). Layout: a **large visual stage** pins on the left (≥900px) while compact text panels march past on the right; the stage crossfades/scales between one authored illustration per step (completed steps leave, the active step shows), and inactive panels recede to 28% opacity so whitespace reads as focus staging. Below 900px the script relocates every illustration into its own panel (interleaved, static, all visible); without JS all illustrations render statically. Reduced-motion switches instantly with no transform/opacity transition.

Props: `steps: { tag, title, body }[]` (4–6). The `visual` slot contains **one `<svg class="ss-frame" data-ss-node="i">` per step, in the same order**. Frame contract:

- each frame is a standalone `viewBox="0 0 460 460"` SVG — a full illustration, not a dot (the stage is large; this is the piece's main visual moment);
- draw a rounded paper card (`<rect x=10 y=30 width=440 height=400 rx=24 fill="#f5f5f7">`), an uppercase eyebrow + step title + `NN / NN` counter, and a token-only schematic that *shows the mechanism* (histogram, grid, checklist, dot matrix, axis — geometric, labeled);
- blue only for the meaningful active element; everything else neutral. The script only toggles `.is-active`/`.is-done` — authored colors stay static inside each frame;
- never use TS type annotations inside MDX `{…}` expressions (oxc parser); for mixed arrays map over objects (`{label, ok}[]`), not tuples.
- inside SVG `<text>…</text>`, any literal `{` `}` or `…` is parsed as a JSX expression and breaks the build; wrap such text as `{"{ code: 1 }"}` (and use `&lt;`/`&gt;` for angle brackets).

```mdx
<ScrollStory steps={[{ tag: "01 · 出题", title: "…", body: "…" }]}>
  <svg slot="visual" class="ss-frame" data-ss-node="0" viewBox="0 0 460 460">
    <rect x="10" y="30" width="440" height="400" rx="24" fill="#f5f5f7" />
    {/* eyebrow, title, counter, schematic */}
  </svg>
</ScrollStory>
```

Beat heights (56vh middle, 28vh first, 42vh last; stage 58vh) keep the rhythm tight — tune downward if panels look marooned in whitespace; the center 10% IntersectionObserver band drives the switch.

## CompareTable

Props: `headers: { label, dot?: 'a'|'b', wrap?: boolean }[]`, `rows: string[][]`, `caption?`. Hairline rows; columns stay on one line by default and the table horizontally scrolls on mobile (min-width 640px) — set `wrap: true` on long prose columns so they wrap instead of stretching the scroll width.

```mdx
<CompareTable
  headers={[{ label: "维度" }, { label: "A", dot: "a" }, { label: "B", dot: "b" }]}
  rows={[["多实例", "支持", "不支持"], ["…", "…", "…"]]}
/>
```

## Callout

Props: `eyebrow?`, `tone?: 'neutral'|'insight'` (insight shows a blue uppercase eyebrow — the only colored element). White hairline card, no left color bar.

## StatGrid / Stat — key numbers

`StatGrid cols?: 2|3|4`. `Stat value` (string, the server-rendered final value — always truthful), `unit?`, `label?`. Optional count-up: numeric `count` plus `countPrefix?` / `countSuffix?` / `countDecimals?`; the article script animates it once when scrolled into view (motion allowed only; reduced-motion and no-JS render the final value). Use only verified numbers; always state caliber nearby.

```mdx
<StatGrid cols={3}>
  <Stat value="3.47" count={3.47} countDecimals={2} countPrefix="$" countSuffix="M" label="口径…" />
</StatGrid>
```

## Summary — closing takeaways

`takeaways: { title, conclusion, detail?, dot?: 'a'|'b'|'neutral' }[]` (1–2), `note?` (caliber/disclaimer). Sources + distillation date follow automatically.

```mdx
<Summary
  takeaways={[{ title: "…", conclusion: "…", detail: "…" }]}
  note="本文依据 … 炼化；版本演进可能改变具体 API。"
/>
```

## What the page already provides

- Dark global nav, footer.
- Choreographed hero entrance (staggered rise of kicker/title/lead/pills/visual; add `data-hero-dash` to an authored SVG line for slow marching dashes), long eased `.reveal` scroll reveals for Section/Summary roots (`.article-prose` and images too), headline stat count-ups, subtle hero parallax.
- `ScrollStory` pinned-visual state machine (see above) and the wide-screen TOC from section `id`s.
- `<Sources>` from front matter, untranslated notice when no counterpart exists.
- Near-monochrome Shiki for fenced code.
- Every motion behavior exists only under `.motion-ok` and is fully neutral under `prefers-reduced-motion: reduce`.

## Diagram rules (inline SVG)

- `viewBox`-based, no width/height 100%; use token hex only (`#1d1d1f #424245 #6e6e73 #86868b #f5f5f7 #dedee3 #ececf0`, blue `#0066cc`, compare `#e8710a`).
- Blue/orange only on node dots / header dots / thin affiliation lines.
- Arrows via `<marker>`; labels in neutral ink. No bitmaps, no emoji, no external refs.
