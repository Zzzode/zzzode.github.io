import { z } from 'zod';

export const newsTimestamp = z.iso.datetime({ offset: true });
const zone = z.string().refine((value) => {
  try { new Intl.DateTimeFormat('en', { timeZone: value }); return true; } catch { return false; }
}, 'Use a valid IANA timezone');
const provenance = { basis: z.string().min(1), sourceUrls: z.array(z.url()).min(1) };

/** A date is evidence with limited precision, never a fabricated midnight event. */
export const timeEvidenceSchema = z.discriminatedUnion('precision', [
  z.object({ precision: z.literal('instant'), value: newsTimestamp, ...provenance }),
  z.object({ precision: z.literal('date'), value: z.iso.date(), timeZone: zone.optional(), ...provenance }),
  z.object({ precision: z.literal('interval'), earliest: newsTimestamp, latest: newsTimestamp, ...provenance })
    .refine((value) => Date.parse(value.earliest) <= Date.parse(value.latest), 'Invalid time interval'),
]);
export type TimeEvidence = z.infer<typeof timeEvidenceSchema>;
export type TimeRange = { earliest: number; latest: number };
const DAY = 86_400_000;

function dayBoundary(date: string, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
  // Find the first instant of the local calendar day, including midnight DST transitions.
  let low = Date.parse(date) - 2 * DAY;
  let high = low + 4 * DAY;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (formatter.format(new Date(middle)) < date) low = middle + 1;
    else high = middle;
  }
  if (formatter.format(new Date(low)) !== date) throw new Error(`Calendar date does not exist in ${timeZone}: ${date}`);
  return low;
}

export function evidenceRange(time: TimeEvidence): TimeRange {
  if (time.precision === 'instant') return { earliest: Date.parse(time.value), latest: Date.parse(time.value) };
  if (time.precision === 'interval') return { earliest: Date.parse(time.earliest), latest: Date.parse(time.latest) };
  const day = Date.parse(time.value);
  if (!time.timeZone) {
    // Unknown source timezone: conservatively allow civil offsets UTC-12 through UTC+14.
    return { earliest: day - 14 * 3_600_000, latest: day + DAY + 12 * 3_600_000 - 1 };
  }
  const tomorrow = new Date(day + DAY).toISOString().slice(0, 10);
  return { earliest: dayBoundary(time.value, time.timeZone), latest: dayBoundary(tomorrow, time.timeZone) - 1 };
}

export function windowRelation(time: TimeEvidence, windowStart: string, cutoff: string): 'inside' | 'outside' | 'overlap' {
  const range = evidenceRange(time);
  const start = Date.parse(windowStart), end = Date.parse(cutoff);
  if (range.latest <= start || range.earliest > end) return 'outside';
  if (range.earliest > start && range.latest <= end) return 'inside';
  return 'overlap';
}

export function instantEvidence(value: string, url: string): TimeEvidence {
  return { precision: 'instant', value, basis: 'Recorded publication instant', sourceUrls: [url] };
}
