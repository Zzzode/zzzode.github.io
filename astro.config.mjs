// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Near-monochrome Shiki theme — syntax colors stay inside the Apple
// grayscale token scale (see docs/design/apple-style-guide.md §4.6).
const monoCodeTheme = /** @type {const} */ ({
  name: 'apple-paper-mono',
  type: 'light',
  colors: {
    'editor.background': '#f5f5f7',
    'editor.foreground': '#424245',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation', 'meta'],
      settings: { foreground: '#86868b', fontStyle: 'italic' },
    },
    {
      scope: ['keyword', 'storage', 'constant.language', 'support.type.primitive'],
      settings: { foreground: '#1d1d1f', fontStyle: 'bold' },
    },
    {
      scope: ['string', 'constant.numeric', 'constant.other'],
      settings: { foreground: '#424245' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'entity.name.class', 'support.class'],
      settings: { foreground: '#1d1d1f' },
    },
    {
      scope: ['variable', 'variable.parameter'],
      settings: { foreground: '#424245' },
    },
  ],
});

// https://astro.build/config
export default defineConfig({
  // User/organization root site (<user>.github.io) — do NOT set `base`.
  site: 'https://zzzode.github.io',
  // Chinese is the default locale at the site root; English lives under /en.
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // @ts-expect-error - Astro accepts a custom Shiki theme object
      theme: monoCodeTheme,
      wrap: true,
    },
  },
});
