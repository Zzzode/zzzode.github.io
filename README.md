# zzzode.github.io

Zzzode's personal website: publications, talks, teaching, and writing.

- **Framework**: [Astro 7](https://astro.build) — static output, zero JavaScript by default
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with Apple-style design tokens (see [docs/design/apple-style-guide.md](docs/design/apple-style-guide.md))
- **Content**: Astro Content Collections + zod, front matter validated at build time
- **Languages**: bilingual Chinese (default, site root) and English (`/en`), with a navigation language toggle
- **Deployment**: push to `main`, GitHub Actions builds and publishes to GitHub Pages

## Local development

Requires Node.js ≥ 22.12.

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build and check

```bash
npm run check      # TypeScript strict + content collection validation
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  components/        # Nav, Footer, HomeHero, SectionCard, EntryList, EmptyState, …
    pages/           # shared page components used by both locale routes
  layouts/           # BaseLayout
  pages/             # zh routes (site root) and mirrored en/ routes
  content/           # Markdown: publications / talks / teaching / posts, each with zh/ + en/
  i18n/ui.ts         # all UI strings (zh/en) — the only place interface copy lives
  styles/            # global.css: @theme design tokens and .prose
  lib/               # content helpers, formatting, RSS
public/              # favicon, files/ (PDFs), images/
astro.config.mjs     # site URL, i18n routing, integrations, Shiki theme
```

### Adding a bilingual entry

Create a same-named Markdown file pair, e.g.:

```
src/content/posts/zh/2026-09-22-threads.md
src/content/posts/en/2026-09-22-threads.md
```

Fields are defined in [`src/content.config.ts`](src/content.config.ts). An entry without a counterpart is hidden from the other-locale list and shows a disabled language toggle. Paper titles, venues, and citations stay in their original language.

## Deployment

Pushing to `main` deploys via `.github/workflows/deploy.yml`. Before the first deploy, set **Settings → Pages → Source** to **GitHub Actions**.

## Documentation

- [Collaboration guide (AGENTS.md)](AGENTS.md)
- [Apple-style Design Guide](docs/design/apple-style-guide.md)
- [Site Curator Prompt](docs/prompts/site-curator.md)
- [Operations](docs/operations.md)

Engineering docs and source comments are written in English; visitor-facing content is bilingual Chinese/English.
