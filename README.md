<div align="center">

<img src="./public/icon-512.png" width="72" alt="Zzzode monogram" />

# zzzode.github.io

**Personal website of Zzzode — research, engineering writing, talks, and teaching.**
Built with Astro as a fully static, bilingual site with an Apple-grade visual system.

[![Astro](https://img.shields.io/badge/Astro-7-0066cc?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-0066cc?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Zero JS](https://img.shields.io/badge/JS-0%20by%20default-0066cc?style=flat-square)](#highlights)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-2088FF?style=flat-square&logo=githubactions&logoColor=white)](#deployment)

**[Live site →](https://zzzode.github.io)**

</div>

## Overview

This repository is the site itself — content, components, design tokens, and the CI that ships it. Pages are pre-rendered to plain HTML and CSS. There is no framework runtime: framework pages ship **zero JavaScript**, and long-form article pages load a single inlined, dependency-free enhancement script (~1.6 KB) for scroll-driven storytelling.

- **Chinese by default, English on demand.** Chinese is served from the site root, English under `/en`, with a navigation toggle and scroll-spy TOC.
- **Content over configuration.** Scholarly entries live in type-checked Markdown/MDX collections; the page layer stays thin.
- **One design system, one source of truth.** Every color, radius, and font comes from a token block — no ad-hoc palettes in components or posts.

## Highlights

- **Static by default.** Astro 7 outputs static HTML; no `client:*` islands are used anywhere. The only first-party script is `src/scripts/article.ts`, loaded solely on post pages for the choreographed hero entrance, scroll reveals, count-up stats, the pinned `ScrollStory`, reading progress, and the TOC — all of it neutral under `prefers-reduced-motion: reduce`.
- **Apple-style design tokens.** Colors, radii, and type scales are declared once in the `@theme` block of `src/styles/global.css` (mirrored to CSS custom properties). Components and hand-written SVG inside articles may only reference tokens; the blue accent is singular, orange exists only for subject-B comparisons.
- **Type-safe bilingual content.** Astro Content Collections + zod validate front matter at build time. Every entry is a same-named `zh/` + `en/` pair; an entry missing its counterpart is hidden from the other-locale list and renders a disabled language toggle.
- **Long-form MDX engine.** `kind: 'distilled'` posts compose a dedicated component library — cover banners, scrollytelling stages, timelines, comparison tables, stat grids, callouts, and summaries — with diagrams hand-authored as inline SVG.
- **Motion with a conscience.** Long eased reveals and pinned crossfades exist only when the user hasn't asked for reduced motion; no-JS renders every final layout immediately.
- **No external assets.** System font stacks only; no webfonts, no CDN scripts, no UI framework. RSS, sitemap, and Shiki highlighting are built in.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | [Astro 7](https://astro.build) (static output, MDX via `@astrojs/mdx`) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + `@tailwindcss/typography`, tokens in one `@theme` block |
| Content | Astro Content Collections, zod-validated front matter (`src/content.config.ts`) |
| Languages | Bilingual zh (root) / en (`/en`), i18n routing in `astro.config.mjs`, UI strings in `src/i18n/ui.ts` |
| Motion | One inlined vanilla-TS script on post pages; zero JS everywhere else |
| Extras | RSS, sitemap, Shiki code highlighting |
| Deploy | GitHub Actions (`withastro/action`) → GitHub Pages on every push to `main` |

## Content model

```
src/content/
  publications/{zh,en}/   # papers — title, date, venue required; DOI/PDF/URL optional
  talks/{zh,en}/          # talks and keynotes
  teaching/{zh,en}/       # teaching by term
  posts/{zh,en}/          # notes (Markdown) and long-form articles (MDX, kind: 'distilled')
```

The two locales of one entry always share the same filename — the folder, not the name, decides the language. Paper titles, venues, and citations stay in their original language. A distilled post additionally carries a verified `sources: { title, url }[]` list and is built from the components in `src/components/article`.

## Quick start

Requires Node.js **≥ 22.12**.

```bash
npm install
npm run dev        # http://localhost:4321 with HMR
```

```bash
npm run check      # astro check — TypeScript strict + content collection validation
npm run build      # outputs static site to dist/
npm run preview    # serve the production build locally
```

## Project structure

<details>
<summary><b>Expand the layout</b></summary>

```
.agents/skills/          # agent skills (distill pipeline + humanize-text prose gate)
src/
  components/            # Nav, Footer, hero, cards, lists, shared page components
    article/             # MDX component library for distilled posts
    pages/               # page components shared by the zh and en routes
  content/               # Markdown/MDX collections: publications, talks, teaching, posts
  layouts/               # BaseLayout (head, nav, footer, article shell)
  lib/                   # collection helpers, formatting, RSS
  pages/                 # zh routes at root and mirrored en/ routes
  scripts/article.ts     # the ONLY first-party JS — post pages only
  styles/global.css      # @theme tokens, base styles, prose, article motion CSS
  i18n/ui.ts             # all zh/en interface copy — the only place UI strings live
public/                  # favicons, OG image, files/ (PDFs), images/
docs/                    # engineering docs: design guide, curator prompt, operations
.github/workflows/       # deploy to GitHub Pages
astro.config.mjs         # site URL, i18n routing, integrations, Shiki
```

</details>

### Add a bilingual entry

Create a same-named pair and keep fields consistent with [`src/content.config.ts`](./src/content.config.ts):

```
src/content/posts/zh/2026-09-22-threads.md
src/content/posts/en/2026-09-22-threads.md
```

A wrong field fails the build — fix the data at the source rather than loosening the schema.

## Writing for the site

Long-form research write-ups are produced by the **`distill` agent skill** (`.agents/skills/distill/`): it fetches and cross-checks public sources, never fabricates, plans the presentation, and emits a verified MDX article. Its mandatory pre-build step invokes the repo-local **`humanize-text` skill** so prose reads like a person wrote it. The `.claude` directory is a compatibility symlink to `.agents`.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which builds with the official Astro action and publishes to GitHub Pages (about one minute). For a first-time setup, set **Settings → Pages → Source → GitHub Actions**. Never push without a local `check` + `build` + visual review.

## Documentation

- [Collaboration guide (AGENTS.md)](./AGENTS.md) — ground rules for working in this repo
- [Apple-style Design Guide](./docs/design/apple-style-guide.md) — the single visual authority
- [Site Curator Prompt](./docs/prompts/site-curator.md) — content model, language policy, curation rules
- [Operations](./docs/operations.md) — setup, commands, troubleshooting

Engineering documentation and source comments are written in English; visitor-facing content is bilingual Chinese/English.
