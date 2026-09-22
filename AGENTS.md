# zzzode.github.io — Collaboration Guide

This repository holds Zzzode's personal website. It is built with **Astro 7 + Tailwind CSS v4 + TypeScript** as a fully static site. Pushing to `main` builds and deploys it to GitHub Pages via GitHub Actions (`withastro/action@v6`). Output is plain static HTML/CSS with **zero JavaScript by default** (Astro islands: no `client:*` directive means no JS bundle).

## Language policy

- **Source code, prompt docs, and all other engineering docs are written in English by default.** That includes code identifiers and comments, this file, `docs/`, and `README.md`. Write new documentation in English; translate existing prose when you touch it.
- **Visitor-facing content is bilingual (Chinese / English)** and users switch languages with the toggle in the navigation:
  - Chinese is the default locale served from the site root (`/`, `/publications/`, …); English lives under the `/en` prefix (`/en/`, `/en/publications/`, …). Configuration lives in `astro.config.mjs` (`i18n`) and UI strings in `src/i18n/ui.ts`.
  - Content entries (posts, publications, talks, teaching) exist as translation pairs: same filename under `src/content/<collection>/zh/` and `…/en/`. A post should normally ship with both versions. An entry missing its counterpart is hidden from the other locale's list, and the language toggle on its page is rendered disabled.
  - Academic metadata (paper titles, venues, citations) is always kept in its original language.

## Ground rules

- Read the [Site Curator Prompt](docs/prompts/site-curator.md) before changing content or presentation.
- The [Apple-style Design Guide](docs/design/apple-style-guide.md) is the single visual authority. Design tokens are declared only in the `@theme` block of `src/styles/global.css` (they also land on `:root` as CSS custom properties). Components and in-article HTML may only reference tokens — never hard-code colors or invent new palettes/components.
- Content/presentation separation: scholarly entries are Markdown files in `src/content/{publications,talks,teaching,posts}/{zh,en}/` with front matter validated at build time by the zod schemas in `src/content.config.ts`; shared UI lives in `src/components/`, routes in `src/pages/`, static assets in `public/`.
- Local verification: both `npm run check` (TypeScript strict + collection validation) and `npm run build` must pass. Use `npm run dev` (HMR) or `npm run preview` (served build output) to review.
- Do not add UI frameworks (React/Vue/…), runtime CDN scripts, or webfonts. If an interaction genuinely needs an island (`client:load`, etc.), explain in the commit message why a static solution was insufficient. The **only** shipped first-party JavaScript is `src/scripts/article.ts` (~1.6 KB, inlined), loaded solely on post pages for the choreographed hero entrance, scroll reveals, stat count-ups, the `ScrollStory` pinned visual, reading progress, and the TOC; every framework page stays zero-JS and all motion must respect `prefers-reduced-motion: reduce`.
- Long-form research write-ups are **distilled articles**: MDX posts (`kind: 'distilled'`) composed with the components in `src/components/article`. When the user hands over a URL / links / pasted material and asks to 炼化 / distill / turn it into an article, invoke the **`distill` skill** (`.claude/skills/distill/SKILL.md`): fetch and cross-check public sources, never fabricate, produce the article per that skill, verify locally, and never push without confirmation.
- This is a public repository: treat `public/files/`, page copy, and the repository contents as publicly visible. Never commit tokens, credentials, or personal data.
- Keep changes minimal: fix styling centrally in tokens/components; do not pile inline styles into posts; extract repeated markup into components.
- `dist/`, `.astro/`, and `node_modules/` are gitignored — never commit build output.
- Pushing to `main` publishes the site (Actions takes ~1 min). Run check/build/visual self-check locally and **get explicit user confirmation before pushing**.
- GitHub repo Settings → Pages → Source must be **GitHub Actions** (not branch deployment). A custom domain is maintained via `public/CNAME`.

See [Operations](docs/operations.md) for environment setup, commands, and troubleshooting.
