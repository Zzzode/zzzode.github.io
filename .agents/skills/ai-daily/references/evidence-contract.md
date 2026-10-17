# Evidence contract

Use `dailyLedgerSchema` in `src/lib/daily-ledger.ts` as the exact field contract and `../scripts/validate-ledger.mjs` as the executable release check. It makes no network requests and cannot certify factual or exhaustive coverage.

Record version 2, run/author/issue identity, editorial window and actual execution interval. Queries retain exact text, language, focus, actor, execution instant, relevant result URLs and notes. Sources retain URL, primary/secondary/community caliber, actual access status/time, publication evidence when available and a short evidence paraphrase/location. Never commit entire scraped pages, signed URLs, credentials, private data or internal tool payloads.

Record every considered event with identity/topic/maturity, discovery queries, sources, event evidence, importance rationale, decision and reason. `include` is confirmed in-window; `watch` is a primary-backed boundary overlap displayed separately; `pending` is held for unresolved evidence/identity; `exclude` needs an explicit reason. Duplicates reference another candidate. Outside-window exclusion needs actually disjoint bounds. No candidate count substitutes for quality.

Checks distinguish `checked_no_update`, `candidate`, `access_failed`, `uncovered`. Executed checks need times/query/source references. No-update requires fetched evidence and applies only to the observed scope. Failure requires failure evidence. Uncovered must not pretend execution occurred. Each topic and open discovery need recorded assessments. Uncovered topics block release; partial topics require independent `pass_with_limits` and concrete public disclosure.

The separate reviewer must read every candidate, including exclusions; add new discoveries and reopen the read set before finalizing. Preserve the reviewer's own supplementary queries/report/findings. Code checks ids/references, not genuine independence or evidence persuasiveness.

Bind `daily.evidenceRun` to `docs/daily/runs/YYYY-MM-DD.json`. Set each published item's `candidateId`/`releaseStatus`; keep ledger included/watch ids in display order. Store exact window, honest limitations and SHA-256 of reviewed MDX bytes. Corrections preserve `article.originalDate`, the post's original date and slug, and add `updated` plus visible explanation.

Run `node .agents/skills/ai-daily/scripts/validate-ledger.mjs docs/daily/runs/YYYY-MM-DD.json [article.mdx]`. Author Daily front matter as JSON inside YAML delimiters to avoid a second parser dependency. The command fails incomplete gates or article disagreement; it does not check every prose/SVG claim. Keep real runs distinct from clearly marked fixtures under `tests/` and temporary copied checkouts.
