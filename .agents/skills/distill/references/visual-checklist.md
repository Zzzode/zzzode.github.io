# Distilled article — pre-delivery visual checklist

Run `npm run check`, `npm run build`, then `npm run preview` and screenshot at **1280 / 1680 / 768 / 390**, plus middle sequence rows and one pass with `prefers-reduced-motion: reduce` emulated.

## Depth doctrine (fails the whole piece if missing)

- [ ] **前因**: an opening section establishes why this happened now, the prior work/lineage, with inline links to external primary references.
- [ ] **讲解**: every core mechanism gets a plain-language walkthrough; jargon defined on first use; each number carries its caliber (who/when/population/n) and the point it makes.
- [ ] **后果**: aftermath — what shipped, what changed, what it means; plus explicit limits/caliber where appropriate.
- [ ] Three voices separable: source facts vs external context vs the author's interpretation.
- [ ] Explanatory prose carries the piece; cards/stats punctuate, never replace it.

## All widths

- [ ] Check both overlay and visible classic scrollbars. In Playwright Chromium, omit the default `--hide-scrollbars` argument for the classic pass. Compare document/body `scrollWidth` with their `clientWidth`, inspect full-bleed bounds, and include 1180×757 alongside the standard widths; `innerWidth` alone can hide scrollbar-width overflow.
- [ ] Banner is the first block; kicker is gray uppercase provenance (never blue); title matches the file's `title`; pills are hairline with optional 7px dots.
- [ ] No literal `**` / broken Markdown in rendered output; inline code has the neutral paper chip and no decorative backticks.
- [ ] Grayscale-first: blue appears only in links, the insight kicker, the progress bar, and subject-A dots; orange only on subject-B dots.
- [ ] No shadows, gradients, emoji-as-icons, raster diagrams, or external asset hosts.
- [ ] Sources at the end are numbered, link out (every URL returns 200), and match front matter; caliber note present for vendor/benchmark numbers.
- [ ] Language toggle on the article is disabled (no counterpart) for a single-language run; the other-locale posts list does not contain the article.

## 1280 desktop

- [ ] Alternating white / paper sections; cards white on paper slabs; hairline rows on tables.
- [ ] Hero entrance staggers in once (kicker → title → lead → pills, visual alongside); reveal blocks fade/rise with the long Apple easing; progress bar tracks scroll.
- [ ] Count-up stats reach and settle on the exact server-rendered value.

## MechanismSequence (when used)

- [ ] Every step has exactly one matching zero-based `frame-i` slot; optional `caption-i` notes stay with the correct diagram. The linked overview visits the corresponding row without hiding another stage.
- [ ] At ≥900px explanation and diagram share a compact row. All rows remain fully readable when scrolling stops anywhere; no pinned stage, viewport-height spacer, overlapping copy, or faded reading state.
- [ ] Below 900px rows stack copy then diagram. All stages render in order without JavaScript, with no relocated slots or empty desktop column.
- [ ] Diagrams show relationships, boundaries, data flow, state changes, or comparisons. Labels are readable at their rendered size; the viewBox has no large decorative margins, duplicated title/counter, or empty stage area.
- [ ] Responsive SVGs fit the diagram column. Dense numeric-width SVGs pan only inside their focusable diagram region, expose the localized mobile hint, and support touch/keyboard access; the page itself never overflows horizontally.
- [ ] SVG colors use tokens. Reduced-motion and JavaScript-disabled states retain every diagram, explanation, and caption at full readability; no frame activation is required.

## 1680 wide

- [ ] The "ON THIS PAGE" TOC appears in the left gutter, its right edge clears the article column, and the current section gets a blue left border while scrolling.

## 768 / 390 narrow

- [ ] Banner stacks (copy above SVG); card grids and dual comparisons become one column; timeline becomes a joined vertical list / scroll strip; tables scroll horizontally without page overflow.
- [ ] Touch targets ≥44px; no clipped text; mobile nav menu still works.

## prefers-reduced-motion: reduce

- [ ] All content renders immediately at full opacity; no hero/parallax/reveal/count-up/marching-dash animation.
- [ ] Every mechanism overview, diagram, label, and explanation stays visible without transforms or opacity changes.
- [ ] Stats show final values; reading progress bar and (at wide width) TOC still work.

## Bundle & regression

- [ ] Framework pages (home, section lists, CV, 404) still emit zero script tags.
- [ ] The article ships only the one inline enhancement script (report the current gzip size); mechanism sequences add no script.
- [ ] Shared components changed (Steps, Stat, Timeline, CompareTable, CoverBanner, …) regression-checked on the other distilled article(s).
