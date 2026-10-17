// Explicit test data, never news. Only copied into a temporary test checkout.
export function dailyFixture(issueDate = '2000-01-16') {
  return {
    title: `TEST FIXTURE — 非新闻 — ${issueDate}`,
    date: `${issueDate}T10:00:00+08:00`,
    kind: 'distilled', channel: 'daily',
    excerpt: '测试样例，仅用于版式和归档核验。这不是新闻报道。',
    tags: ['fixture-only'],
    sources: [{ title: 'TEST FIXTURE source (not a news source)', url: 'https://example.test/fixture', publishedAt: `${issueDate}T01:00:00+08:00`, retrievedAt: `${issueDate}T09:00:00+08:00` }],
    daily: {
      issueDate, timeZone: 'Asia/Shanghai',
      windowStart: `${issueDate}T00:00:00+08:00`, cutoff: `${issueDate}T10:00:00+08:00`,
      items: [{ title: '测试条目：验证中文长标题在手机上的换行与阅读次序', summary: '此处是明确的测试文字，不描述任何真实事件。fixtureonlytoken 用于检查全文检索。摘要仅说明来源链接、截止时间与栏目展示是否正确。', category: 'governance', eventTime: `${issueDate}T01:00:00+08:00`, sourceUrls: ['https://example.test/fixture'] }],
    },
  };
}
export const dailyBody = `
import { Section, SectionHead, Prose, Summary } from '@/components/article';

<Section canvas id="fixture-illustration">
  <SectionHead index="03" kicker="测试插图" title="测试插图：采集窗口与截止时间" />
  <div class="rounded-card bg-white p-5 sm:p-8">
    <svg viewBox="0 0 640 200" role="img" aria-label="测试图示：采集窗口截至北京时间十点" class="w-full" style="max-width:640px">
      <rect x="16" y="24" width="608" height="152" rx="18" fill="var(--color-paper)" />
      <text x="40" y="65" fill="var(--color-ink)" font-size="28">TEST FIXTURE · 非新闻</text>
      <path d="M40 105 H600" stroke="var(--color-line)" stroke-width="2" />
      <circle cx="40" cy="105" r="4" fill="var(--color-ink-2)" />
      <circle cx="600" cy="105" r="4" fill="var(--color-ink-2)" />
      <text x="40" y="145" fill="var(--color-ink-2)" font-size="26">00:00 开始</text>
      <text x="600" y="145" text-anchor="end" fill="var(--color-ink-2)" font-size="26">10:00 截止 · UTC+8</text>
    </svg>
    <p class="mt-3 text-[13px] text-muted">这是测试说明图，不含新闻事实或市场指标。</p>
  </div>
</Section>
<Section canvas id="fixture-trends">
  <SectionHead index="04" kicker="测试点评" title="测试点评，不作趋势判断" />
  <Prose tile>
    本测试样例没有新闻证据，不能据此作产业判断。正式日报应把来源事实与分析判断分开，说明尚未确认的信息。
  </Prose>
</Section>
`;
export function fixtureMdx(data) {
  // JSON is a YAML subset and avoids test-only serialization dependencies.
  return `---\n${JSON.stringify(data, null, 2)}\n---\n${dailyBody}`;
}
