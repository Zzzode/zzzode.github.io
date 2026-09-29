/**
 * Build-time reading-time estimate for a post's raw Markdown/MDX body.
 * Mixed CJK/Latin text: CJK characters count individually, Latin words
 * tokenized on whitespace. Speeds are deliberately round conventions
 * (~380 CJK chars/min, ~230 Latin words/min) for a relative guide, not
 * a precise measurement.
 */
export function readingMinutes(body: string | undefined): number {
  if (!body) return 1;

  // Drop code blocks and inline code, HTML tags, and Markdown syntax,
  // so a dense fenced snippet does not inflate the estimate.
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|$-]/g, ' ')
    .trim();

  if (!text) return 1;

  const cjk = (text.match(/[぀-ヿ一-鿿㐀-䶿]/g) ?? []).length;
  // Remove CJK runs before counting Latin words.
  const latinText = text.replace(/[぀-ヿ一-鿿㐀-䶿]/g, ' ');
  const words = (latinText.match(/[A-Za-z0-9][A-Za-z0-9'-]*/g) ?? []).length;

  return Math.max(1, Math.round(cjk / 380 + words / 230));
}
