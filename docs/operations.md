# Operations

## Requirements

- **Node.js ≥ 22.12** (required by Astro 7; CI uses Node 24).
- **npm ≥ 9.6.5**. Commit `package-lock.json` — `withastro/action` detects the package manager from the lockfile.
- No Ruby/Python needed; content generation is handled by Astro Content Collections + zod.

## First-time setup

    npm install

On the ByteDance internal network, the default mirror (`bnpm.byted.org`) may lag new packages (e.g. `@astrojs/markdown-satteri` not found). The repository-level `.npmrc` pins the registry to `https://registry.npmjs.org/`, so running `npm install` inside the repo just works (GitHub Actions uses the public registry too).

## Local development

    npm run dev        # http://localhost:4321 with HMR

Production-equivalent build (required before pushing):

    npm run check      # astro check: TS strict + content collection validation
    npm run build      # outputs to dist/
    npm run preview    # serves dist/ locally (default http://localhost:4321)

Changes to `astro.config.mjs` or `src/content.config.ts` are re-synced automatically by the dev server.

## Adding content (bilingual pairs)

- Publications: `src/content/publications/{zh,en}/<slug>.md` (required `title/date/venue`; PDFs go in `public/files/` and are referenced as `pdf: /files/xxx.pdf`).
- Talks: `src/content/talks/{zh,en}/<slug>.md`; teaching: `src/content/teaching/{zh,en}/<slug>.md`; posts: `src/content/posts/{zh,en}/<slug>.md`.
- The zh and en files of an entry must share the same filename (same `<slug>`). Entries without a counterpart are hidden in the other-locale list and show a disabled language toggle.
- Front matter fields are defined in `src/content.config.ts` and validated at build time. Fix bad data in the source file — do not loosen the schema.
- Post bodies support GFM and syntax highlighting. Embedded HTML must only use `var(--color-*)` tokens; see `docs/design/apple-style-guide.md`.

### Adding a new UI string

1. Add the same key to both `zh` and `en` tables in `src/i18n/ui.ts`.
2. Reference it with `t(lang, 'key')`; never hard-code interface copy in a component/page.
3. Routes that exist in both locales need a thin file under `src/pages/…` (zh root) and `src/pages/en/…` (en), each rendering the shared page component with `lang="zh"|"en"`.

## Deployment

There is no deploy script: pushing a commit to `main` triggers `.github/workflows/deploy.yml` (`actions/checkout@v7` → `withastro/action@v6` → `actions/deploy-pages@v5`).

1. `npm run check` and `npm run build` pass.
2. Complete the design guide's §8 visual checklist at three widths, in both locales.
3. Push after the user confirms.
4. Make sure GitHub repo **Settings → Pages → Source** is **GitHub Actions** (required before the first deploy).
5. Confirm the workflow is green on the Actions tab, then spot-check the live site.

## Troubleshooting

- **`No matching version found for @astrojs/markdown-satteri` during install**: internal mirror lag; the repo `.npmrc` already pins the public npm registry — don't override it with `--registry`.
- **Build fails on content/schema**: fix the flagged front matter per file/line (ISO dates, valid enum values, valid URLs); don't weaken the schema.
- **Styles/new tokens don't apply**: in Tailwind v4 token names need the `--color-*` / `--radius-*` namespaces inside `@theme`; restart the dev server after changes.
- **"No files found matching `**/*.md`" / "collection does not exist or is empty" warnings**: expected while a collection has no entries in one/both locales; they disappear once Markdown pairs are added.
- **404s or wrong asset paths**: this is a root `<user>.github.io` site — do **not** set `base`; internal links are root-absolute (`/en/...` for English).
- **Actions fails while local build passes**: check the Actions log — usually lockfile drift or local-only env vars. Always trust `npm run build` (not a globally installed `astro`).
- **Fonts/styles differ between local and live**: no webfonts/CDNs are used anywhere; the site relies solely on system font stacks.
- **Oversized images**: compress first (long edge ≤2000px); no inlined Base64 or large data files.

## Never commit

- `dist/`, `.astro/`, `node_modules/` (already in `.gitignore`).
- Tokens, credentials, personal data — everything in this public repository is published to the web.
