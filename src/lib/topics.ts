/**
 * Editorial topic threads shared by the home page and the /posts filter.
 * Keys double as i18n suffixes (`topic.<key>` / `topic.<key>.desc`).
 * Slugs are the post date-slugs without the `zh/` / `en/` locale prefix.
 */
export type TopicKey = 'agents' | 'models' | 'languages' | 'industry';

export interface TopicDef {
  key: TopicKey;
  slugs: string[];
}

export const TOPICS: TopicDef[] = [
  {
    key: 'agents',
    slugs: [
      '2026-10-16-deepseek-dsec-sandbox',
      '2026-10-06-osc7501-program-status',
      '2026-09-27-mimo-v26-rl-oss-environments',
      '2026-09-22-opus-lean-agent-sdk',
      '2026-09-23-claude-code-architecture',
      '2026-09-23-e2b-sandbox-infra',
      '2026-09-23-flue-agent-harness',
      '2026-09-23-nanoclaw-agent',
      '2026-09-23-grokbot-openclaw-agent-forms',
      '2026-09-23-tradingagents',
      '2026-09-22-mimo-v26-open-rl',
    ],
  },
  {
    key: 'models',
    slugs: [
      '2026-09-23-jev-system1',
      '2026-09-23-laya-decision-model',
      '2026-09-23-bert-diffusion-llada',
    ],
  },
  {
    key: 'languages',
    slugs: [
      '2026-09-23-ai-and-compilers-survey',
      '2026-09-23-kotlin-k2-fir-interop',
      '2026-09-23-skip-language',
      '2026-09-23-gson-yymodel-serialization',
      '2026-09-23-rustc-query-incremental',
      '2026-09-23-v8-jvm-instance-models',
      '2026-09-23-edgejs-inprocess-dotnet',
    ],
  },
  {
    key: 'industry',
    slugs: [
      '2026-09-24-nasdaq-record-a-share-linkage',
      '2026-09-23-ai-glasses-industry-chain',
      '2026-09-23-nvidia-h200-china-verification',
      '2026-09-23-ai-org-structure',
    ],
  },
];

const topicBySlug = new Map<string, TopicKey>();
for (const topic of TOPICS) {
  for (const slug of topic.slugs) topicBySlug.set(slug, topic.key);
}

/** Date-slug of an entry href (`/posts/2026-09-23-x/` → `2026-09-23-x`). */
export function slugOfHref(href: string | undefined): string {
  if (!href) return '';
  return href.split('/').filter(Boolean).pop() ?? '';
}

/** Topic key for an entry href, or `undefined` for posts outside the threads. */
export function topicOfHref(href: string | undefined): TopicKey | undefined {
  return topicBySlug.get(slugOfHref(href));
}
