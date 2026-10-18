# Time and selection

Use the shared `src/lib/news-evidence.ts` representation, always with `basis` and exact `sourceUrls`:

- `instant`: evidenced `value` with offset.
- `date`: calendar `value`, optional evidenced IANA `timeZone`. Omit timezone if unknown; headquarters are not proof.
- `interval`: supported `earliest`/`latest` bounds. Explain corroboration and precision, without implying an exact event instant.

A known-zone date spans its actual civil day, including DST transitions. An unknown-zone date conservatively covers UTC-12 through UTC+14. Computed possibility bounds are not claimed publication timestamps. A CMS midnight does not prove midnight release. A source precise only to the minute can use the corresponding minute interval.

For `(start, cutoff]`, inside means the entire range is after start and at/before cutoff; outside means disjoint; otherwise overlapping. Corroborate important overlaps through original announcements/feeds, paper versions, release metadata or attributed contemporary evidence. A later repost cannot backdate an event. A page's current update time is not an archival snapshot.

Keep important evidence-backed overlaps in `daily.pending` with a concrete uncertainty reason and next verification step. Reliable fetched reporting can support an overlap without an official announcement. Exclude overlaps from confirmed counts. A time with no defensible bounds stays unresolved in the ledger. Do not carry historical funding regression examples into each real issue.

Model the selected news event separately from the underlying activity. A new exclusive disclosure, interview or conference announcement can establish a reporting/announcement event without proving when negotiations, assessment or operations began. Preserve that distinction in the title, time basis and prose. A later translation or recap of an already public statement does not refresh its event date without a material new disclosure. Review prior unresolved leads and correct the original issue, or label a retrospective item with its original date separately from current-window counts.

Keep announcement/availability/preview/beta/completed-acquisition/proposed-rule/effective-temporary-measure distinctions. Maturity alone does not determine importance. Popularity locates candidates; actual novelty, capability, consequence and evidence determine selection.

Read original papers as needed; distinguish submission, public version, revision and a new research blog. Do not exclude a new public result just because an older submission exists, or recycle an old result because a digest uses today's date. Model source publication precision independently from event time.
