import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { postSchema } from './lib/post-schema';

/**
 * Content collections are the single source of truth for site entries.
 * Every Markdown frontmatter field is validated against these schemas
 * at build time — a typo fails `astro build`, not a live page.
 */

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: postSchema,
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

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // creation/start date; lists sort newest first and show the year
    date: z.coerce.date(),
    description: z.string(),
    stack: z.array(z.string()).default([]),
    // short factual chips for the flagship band (tests, spec size, license …)
    highlights: z.array(z.string()).default([]),
    repo: z.url().optional(),
    url: z.url().optional(),
    status: z.enum(['active', 'archived', 'experiment']).default('active'),
  }),
});

export const collections = { posts, publications, talks, teaching, projects };

export type CollectionName = keyof typeof collections;
