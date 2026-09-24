export interface Entry {
  /** internal or external URL; when omitted the title renders as plain text */
  href?: string;
  external?: boolean;
  title: string;
  /** gray metadata line: venue · year, date, etc. */
  meta: string;
  /** original date, for chronological feeds that group by day */
  dateValue?: Date;
  excerpt?: string;
  tags?: string[];
}
