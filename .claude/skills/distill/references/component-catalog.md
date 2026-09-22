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

Constrains ordinary Markdown to the 760px reading column. Full-width components sit OUTSIDE it as siblings.

```mdx
<Prose>

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

## Section / SectionHead

`Section` wraps a full-bleed block. Props: `alt?` (paper-gray rounded-28 slab), `id` (kebab English, used by the TOC).

```mdx
<Section alt id="mechanism">
  <SectionHead kicker="02 · MECHANISM" title="……" lead="……" />
  …cards/steps/table…
</Section>
```

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

`nodes: { year, title, body? }[]`. Collapses vertically on mobile.

## Pipeline — stage cards with arrows

`stages: { title, body? }[]`. Stacks vertically with arrows on narrow screens.

## CompareTable

Props: `headers: { label, dot?: 'a'|'b' }[]`, `rows: string[][]`, `caption?`. Hairline rows; horizontally scrolls on mobile. Put user-facing differences here for dual comparisons.

```mdx
<CompareTable
  headers={[{ label: "维度" }, { label: "A", dot: "a" }, { label: "B", dot: "b" }]}
  rows={[["多实例", "支持", "不支持"], ["…", "…", "…"]]}
/>
```

## Callout

Props: `eyebrow?`, `tone?: 'neutral'|'insight'` (insight shows a blue uppercase eyebrow — the only colored element). White hairline card, no left color bar.

## StatGrid / Stat — key numbers

`StatGrid cols?: 2|3|4`. `Stat value` (string), `unit?` (small suffix), `label?`. Use only verified numbers; always state caliber nearby.

```mdx
<StatGrid cols={3}>
  <Stat value="90%" unit="更少 JS" label="口径…" />
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
- Reading-progress bar, scroll-reveal for `.reveal` (all Section/CoverBanner/Summary roots already carry it; the article script also reveals `.article-prose` and images), and the wide-screen TOC from section `id`s.
- `<Sources>` from front matter, untranslated notice when no counterpart exists.
- Near-monochrome Shiki for fenced code.

## Diagram rules (inline SVG)

- `viewBox`-based, no width/height 100%; use token hex only (`#1d1d1f #424245 #6e6e73 #86868b #f5f5f7 #dedee3 #ececf0`, blue `#0066cc`, compare `#e8710a`).
- Blue/orange only on node dots / header dots / thin affiliation lines.
- Arrows via `<marker>`; labels in neutral ink. No bitmaps, no emoji, no external refs.
