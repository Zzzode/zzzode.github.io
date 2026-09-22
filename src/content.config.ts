import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/**
 * Content collections are the single source of truth for site entries.
 * Every Markdown frontmatter field is validated against these schemas
 * at build time — a typo fails `astro build`, not a live page.
 */

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    authors: z.string().optional(),
    excerpt: z.string().optional(),
    paperurl: z.url().optional(),
    pdf: z.string().optional(), // path under /files, e.g. '/files/foo.pdf'
    doi: z.string().optional(),
    citation: z.string().optional(),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    location: z.string().optional(),
    type: z.enum(['keynote', 'talk', 'tutorial', 'poster']).default('talk'),
    url: z.url().optional(),
    excerpt: z.string().optional(),
  }),
});

const teaching = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teaching' }),
  schema: z.object({
    title: z.string(),
    date: z.string(), // free-form term, e.g. '2026 春季学期'
    venue: z.string(),
    role: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { posts, publications, talks, teaching };

export type CollectionName = keyof typeof collections;
