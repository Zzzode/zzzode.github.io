# Distilled article — pre-delivery visual checklist

Run `npm run check`, `npm run build`, then `npm run preview` and screenshot at **1280 / 1680 / 768 / 390**, plus one pass with `prefers-reduced-motion: reduce` emulated.

## All widths

- [ ] Banner is the first block; kicker is gray uppercase provenance (never blue); title matches the file's `title`; pills are hairline with optional 7px dots.
- [ ] No literal `**` / broken Markdown in rendered output; inline code has the neutral paper background.
- [ ] Grayscale-first: blue appears only in links, the insight kicker, the progress bar, and subject-A dots; orange only on subject-B dots.
- [ ] No shadows, gradients, emoji-as-icons, raster diagrams, or external asset hosts.
- [ ] Sources at the end are numbered, link out, and match front matter; caliber note present for vendor/benchmark numbers.
- [ ] Language toggle on the article is disabled (no counterpart) for a single-language run; the other-locale posts list does not contain the article.

## 1280 desktop

- [ ] Alternating white / paper sections; cards white on paper slabs; hairline rows on tables.
- [ ] Reveal blocks fade/translate in once; progress bar tracks scroll.

## 1680 wide

- [ ] The "ON THIS PAGE" TOC appears in the left gutter, its right edge clears the article column, and the current section gets a blue left border while scrolling.

## 768 / 390 narrow

- [ ] Banner stacks (copy above SVG); card grids and dual comparisons become one column; timeline/pipeline stack; tables scroll horizontally without page overflow.
- [ ] Touch targets ≥44px; no clipped text; mobile nav menu still works.

## prefers-reduced-motion: reduce

- [ ] All content renders immediately at full opacity with no transform/opacity transition.
- [ ] Reading progress bar and (at wide width) TOC still work — they are information, not decoration.

## Bundle

- [ ] Framework pages (home, section lists, CV, 404) still emit zero script tags.
- [ ] The article ships only the one inline enhancement script (report its gzip size, ~1 KB).
