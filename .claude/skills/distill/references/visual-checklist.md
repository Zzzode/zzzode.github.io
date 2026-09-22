# Distilled article — pre-delivery visual checklist

Run `npm run check`, `npm run build`, then `npm run preview` and screenshot at **1280 / 1680 / 768 / 390**, plus mid-story viewport states and one pass with `prefers-reduced-motion: reduce` emulated.

## Depth doctrine (fails the whole piece if missing)

- [ ] **前因**: an opening section establishes why this happened now, the prior work/lineage, with inline links to external primary references.
- [ ] **讲解**: every core mechanism gets a plain-language walkthrough; jargon defined on first use; each number carries its caliber (who/when/population/n) and the point it makes.
- [ ] **后果**: aftermath — what shipped, what changed, what it means; plus explicit limits/caliber where appropriate.
- [ ] Three voices separable: source facts vs external context vs the author's interpretation.
- [ ] Explanatory prose carries the piece; cards/stats punctuate, never replace it.

## All widths

- [ ] Banner is the first block; kicker is gray uppercase provenance (never blue); title matches the file's `title`; pills are hairline with optional 7px dots.
- [ ] No literal `**` / broken Markdown in rendered output; inline code has the neutral paper chip and no decorative backticks.
- [ ] Grayscale-first: blue appears only in links, the insight kicker, the progress bar, active/done ScrollStory nodes, and subject-A dots; orange only on subject-B dots.
- [ ] No shadows, gradients, emoji-as-icons, raster diagrams, or external asset hosts.
- [ ] Sources at the end are numbered, link out (every URL returns 200), and match front matter; caliber note present for vendor/benchmark numbers.
- [ ] Language toggle on the article is disabled (no counterpart) for a single-language run; the other-locale posts list does not contain the article.

## 1280 desktop

- [ ] Alternating white / paper sections; cards white on paper slabs; hairline rows on tables.
- [ ] Hero entrance staggers in once (kicker → title → lead → pills, visual alongside); reveal blocks fade/rise with the long Apple easing; progress bar tracks scroll.
- [ ] Count-up stats reach and settle on the exact server-rendered value.

## ScrollStory (when used)

- [ ] At ≥900px the large illustration stage pins while panels march; scroll to each step: its frame is visible (crossfade/scale), its panel is full-opacity while others recede, and frame/panel sit in the same viewport band with no dead whitespace beside them.
- [ ] Below 900px every frame is relocated inside its own panel (illustration then text, interleaved), all visible without interaction; no leftover empty pinned column.
- [ ] Frames follow the contract: one standalone 460×460 `svg.ss-frame[data-ss-node="i"]` per step with paper card, eyebrow/title/counter, mechanism schematic, token colors; no TS annotations in MDX expressions.
- [ ] Reduced-motion: frames switch instantly (no transform/opacity transition), state still reflected.

## 1680 wide

- [ ] The "ON THIS PAGE" TOC appears in the left gutter, its right edge clears the article column, and the current section gets a blue left border while scrolling.

## 768 / 390 narrow

- [ ] Banner stacks (copy above SVG); card grids and dual comparisons become one column; timeline becomes a joined vertical list / scroll strip; tables scroll horizontally without page overflow.
- [ ] Touch targets ≥44px; no clipped text; mobile nav menu still works.

## prefers-reduced-motion: reduce

- [ ] All content renders immediately at full opacity; no hero/parallax/reveal/count-up/marching-dash animation.
- [ ] ScrollStory labels all visible; node colors still reflect current state (information), with no transform/transition.
- [ ] Stats show final values; reading progress bar and (at wide width) TOC still work.

## Bundle & regression

- [ ] Framework pages (home, section lists, CV, 404) still emit zero script tags.
- [ ] The article ships only the one inline enhancement script (report its gzip size; ~1.6 KB as of the ScrollStory/count-up additions).
- [ ] Shared components changed (Steps, Stat, Timeline, CompareTable, CoverBanner, …) regression-checked on the other distilled article(s).
