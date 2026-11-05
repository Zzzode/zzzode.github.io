# Distilled-article component catalog

All components live in `src/components/article/` and are exported from its barrel:

```mdx
import {
  Prose, CoverBanner, Section, SectionHead, CardGrid, InfoCard,
  DualCompare, BlockTitle, Steps, Timeline, Pipeline, MechanismSequence, CompareTable,
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

## RideFile — ride spec-sheet tile (itineraries)

One borderless white tile holding hairline-separated rows; each row is a ride name + muted context tag, then a typographic label/value spec list (locker / queue / seat). Labels are a muted meta column — never bold inline tags. Place one tile right after the `Schedule` phase it details.

`rides: { name, context?, specs: { label, value }[] }[]`; `title?` eyebrow (e.g. "项目档案 · 变形金刚基地").

```mdx
<RideFile
  title="项目档案 · 变形金刚基地"
  rides={[
    {
      name: "霸天虎过山车",
      context: "优速通 · 单人通道二刷",
      specs: [
        { label: "存包", value: "过金属探测，零散物品全部入柜；免费，超时收费。" },
        { label: "座位", value: "第一排视野最开阔，最后一排被甩得最狠。（经验值）" },
      ],
    },
  ]}
/>
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

## MechanismSequence — process overview and compact details

Use when a process or lifecycle needs a separate diagram for each stage. A linked overview precedes normal-flow explanation/diagram rows. At widths of at least 900px, copy and diagram share a row; below 900px, copy comes before its diagram. Every stage stays visible without JavaScript or scrolling to an activation point. The component already provides a white tile, separators, numbered overview links, and stable per-sequence anchors; do not wrap it in another tile.

Props: `steps: { tag, title, body }[]` (at least one). For each zero-based index `i`, provide **one named `frame-i` slot**. A missing frame or an empty `steps` array fails the build. Optional `caption-i` slots hold legends, source/caliber notes, or a short interpretation immediately below the corresponding diagram. There are no `visual`, `aspect`, `frameMax`, or scroll-state props.

- Each diagram must explain a data path, state change, boundary, or comparison; repeat labels only where they help identify the drawn objects. Keep headings and explanatory prose in `steps`.
- Prefer a tightly cropped, responsive `viewBox` SVG (`width="100%"`) with token variables. Use neutral labels and connectors, with accent only as allowed by the design guide.
- For an existing dense SVG that cannot fit legibly, a numeric `width` may establish a readability floor. Overflow stays inside the focusable diagram region, with a localized pan hint on narrow screens. Check label size and local scrolling at 390px; never allow the whole page to overflow.
- Keep the overview and all rows in ordinary document flow. No viewport-height steps, pinned stages, scroll-driven whole-frame crossfades, opacity-based reading states, or JavaScript slot relocation.
- Never use TS type annotations inside MDX `{…}` expressions. Inside SVG text, wrap literal braces in an expression such as `{"{ value: 1 }"}` and escape angle brackets as `&lt;` / `&gt;`.

```mdx
<MechanismSequence
  steps={[{ tag: "01 · Input", title: "Accept the example input", body: "Teaching schematic only; replace with sourced article content." }]}
>
  <svg slot="frame-0" width="100%" viewBox="0 0 460 160" role="img" aria-label="Example input and receiving stage">
    <rect x="16" y="40" width="160" height="80" rx="12" fill="var(--color-paper)" />
    <path d="M176 80 H284 m-8 -6 8 6 -8 6" fill="none" stroke="var(--color-muted)" />
    <rect x="284" y="40" width="160" height="80" rx="12" fill="var(--color-paper)" />
    <g fill="var(--color-ink)" font-size="18" text-anchor="middle">
      <text x="96" y="86">Input</text>
      <text x="364" y="86">Stage</text>
    </g>
  </svg>
  <p slot="caption-0">Illustrative labels only; no product behavior or measured values are asserted.</p>
</MechanismSequence>
```

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
- The wide-screen TOC from section `id`s. `MechanismSequence` provides its own static overview links and rows without an additional script.
- `<Sources>` from front matter, untranslated notice when no counterpart exists.
- Near-monochrome Shiki for fenced code.
- Every motion behavior exists only under `.motion-ok` and is fully neutral under `prefers-reduced-motion: reduce`.

## Diagram rules (inline SVG)

- `viewBox`-based, with CSS token variables for colors. Responsive sequence frames use `width="100%"`; numeric widths are allowed only as an intentional readability floor with local horizontal scrolling. Do not set a fixed height that distorts the viewBox ratio.
- Blue/orange only on node dots / header dots / thin affiliation lines.
- Arrows via `<marker>`; labels in neutral ink. No bitmaps, no emoji, no external refs.
