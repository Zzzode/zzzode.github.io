# AI Daily — classic-scrollbar follow-up review

Result: **PASS** for CSS SHA-256 `02f2e85eec4603ee6f0e9b7ba2f4c37e1f221d6ca80780c10b004433547f315c` and unchanged Daily MDX SHA-256 `15a8b91b635222f70018d1245f64cdd73bf8cfc0eb701c5abae6a6bb2b12e282`. The independent reviewer made no source-code changes, committed nothing and pushed nothing.

## Correction to the earlier review

The earlier visual report's zero-overflow result covered Playwright's default headless mode, which hides scrollbars with `--hide-scrollbars`. Its `innerWidth` comparison did not test classic scrollbar layout and could not support a zero-overflow claim for that mode. This follow-up corrects that coverage gap.

The reviewer independently reproduced the bug at exactly 1180×757: `innerWidth=1180`, root `clientWidth=1165`, root `scrollWidth=1173`; the canvas ran from x=-7.5 to right=1172.5. That reproduction was recorded at 2026-10-19T02:45:44.722397+00:00 in `/tmp/ai-daily-2026-10-19-scrollbar-review/before.json` and `1180-classic-before.png`. With the reviewed fix, the same viewport has root client/scroll widths 1165/1165 and canvas bounds 0/1165. The canvas uses root container units that exclude the scrollbar; its dedicated TOC positioning uses the same measure.

## Environment and exact build

- Independent `visual_reviewer` agent, authorized cloud environment only; Chromium `154.0.8037.57` through Python Playwright.
- Isolated copy: `/tmp/ai-daily-scrollbar-final-yagejht8`; no `.git`, dependency copy, prior build output, or fixtures. Dependencies symlink to the repository's installed dependencies.
- Build: `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed. Log: `/tmp/ai-daily-2026-10-19-scrollbar-review/build.log`.
- Preview: `ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --host 127.0.0.1 --port 4331`.
- Actual matrix: 2026-10-19T02:48:43.693720+00:00 through 2026-10-19T02:56:10.010108+00:00.
- Classic mode explicitly removes Playwright's `--hide-scrollbars` default and disables OverlayScrollbar/FluentOverlayScrollbar. A 15px native vertical scrollbar is actually present. Default-hidden mode retains Playwright's original defaults as the comparison. No claim is made about testing a separate physical OS overlay-scrollbar implementation.

## Actual matrix and measurements

The new Daily was tested at 1280×900, **1180×757**, 1680×1050, 768×1024 and 390×844, with normal and reduced motion in both scrollbar modes (20 passes). The October 18 Daily and older DSec article were tested at 1280/768/390, both motion settings and both scrollbar modes (24 regression passes). Each article was actually scrolled from top to bottom and screenshotted. Another ten checks cover missing English translations and English lists: 54 checks total.

Classic-scrollbar results below use root `clientWidth`, not `innerWidth`; both motion settings matched:

| Viewport | Root clientWidth | Root scrollWidth | Canvas left | Canvas right |
|---|---:|---:|---:|---:|
| 1280×900 | 1265 | 1265 | 0.0 | 1265.0 |
| 1180×757 | 1165 | 1165 | 0.0 | 1165.0 |
| 1680×1050 | 1665 | 1665 | 0.0 | 1665.0 |
| 768×1024 | 753 | 753 | 0.0 | 753.0 |
| 390×844 | 375 | 375 | 0.0 | 375.0 |

All article passes in both modes have equal root client/scroll widths and a canvas bounded by that usable width. No JavaScript errors or unrevealed blocks remained. The root-container change did not disturb the sticky header, fixed reading-progress bar, viewport-fixed mobile menu, reveals or wide TOC. At 1680px the TOC/body gap is 18px in both modes; actual TOC clicks reach the requested chapter. The mobile menu opens/closes at top=44px and retains at least 44px link targets. Normal and reduced motion reach the same final layout.

Current Daily SVG minimum effective fonts with a classic scrollbar: {'1280': 20.1, '1180': 20.1, '1680': 20.1, '768': 13.19, '390': 15.15}; all remain above 12 CSS px. The original default-hidden mode also passes. DSec count-up values match their exact authored final values, including `32K`, `90%`, `67.8%`, `1.71×`, `57%` and `1.76×`.

No English DSec or Daily translation exists in the repository. Their English article URLs correctly return 404; English home/writing/Daily lists remain isolated. This is missing-translation verification, not an invented English article rendering result.

## Evidence and remaining scope

All generated evidence remains outside the public repository: `/tmp/ai-daily-2026-10-19-scrollbar-review/review.json`, `before.json`, `manifest.json`, `after-spotcheck.json`, browser/build logs, and screenshots named `{mode}-{width}-{motion}-*.png` (hero, chart/overview, liability/trend, bottom, TOC/menu, and old-article full-page views). `classic-1680-normal-toc-stable.png` separately captures the settled anchor-click state.

No remaining local rendering blocker. Publishing and exact-commit live PC/mobile verification remain with the parent release task.
