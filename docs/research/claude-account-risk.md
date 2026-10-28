# Claude hidden-score hypothesis: source ledger

Research and draft date: 2026-10-28. Owner: the Chinese post and this ledger only. Existing shared-component, article and home-page changes are outside this task. User clarification: explain the substance of all 18 clauses, rather than repeatedly discussing the screenshot, its author, missing proof or official corroboration. Reconstruct the empirical model and develop concrete mechanisms; absence of public disclosure is not disproof. Keep provenance in this ledger and the article's brief community-context note. Official and industry sources provide background, not a substitute subject.

## Input and coverage

The supplied screenshot contains an introductory confidence claim, 18 numbered observations, and a closing sentence. All 18 observations were inventoried and covered below. The author attributes information to a friend operating an account pool and combines it with personal experience; this secondhand provenance is retained here. The screenshot supplies no original URL, calendar publication date, sample size, experiment records, or internal implementation evidence. The article analyzes the clauses without republishing the image or its profile information. The article date is the research date, not an inferred source date. No URL is fabricated for the screenshot.

| Item | Screenshot claim (paraphrase) | Treatment |
| --- | --- | --- |
| Intro | Author believes at least 80% is accurate | Personal confidence, not measured accuracy; no denominator |
| 1 | Weighted hidden score; low scores trigger bans | Unverified implementation hypothesis |
| 2 | Email and IP dominate; clean IP and mobile signup help | Weights and client advantage unverified; region requirements independently documented |
| 3 | Subscription changes score; waiting one or two days helps; identity checks and repeated face use | Subscription delay and score unsupported; identity verification is documented; no account-quota claim inferred |
| 4 | Stable IP, location matching and global proxy routing help | No documented scoring weights or global-routing requirement; distinguish connection troubleshooting from eligibility |
| 5 | Account age adds tolerance; 2023 accounts especially strong | No age coefficient, privileged cohort, or comparative sample supplied |
| 6 | Spread usage; avoid web; CLI and desktop safer | Documented shared usage limits; no client-specific immunity established |
| 7 | Time zone, language have little effect | No scoring documentation; no guarantee inferred |
| 8 | High concurrency, repeated prompts, logins and IP changes subtract points | No weights established; policy violations differ from ordinary repeated prompts |
| 9 | Mobile and memory improve score | Feature behavior documented; score effect unsupported |
| 10 | Foreign physical credit card helps; source of app-store payments matters; virtual cards risk ban | Official billing requirements documented; no comparative ban probability or credit-score gain established |
| 11 | Observation period, example 60/55/40 thresholds, forced logout, two or three cycles | Numbers are hypothetical in the screenshot; no verified state machine or cycle count |
| 12 | Many devices hurt; use one computer/client | Retain as a claimed scoring preference; documented cross-device support does not establish whether device count affects internal scoring |
| 13 | Windows/macOS equivalent; Linux lowers score | No documented platform score |
| 14 | Saying one is Chinese is safe; not banned for memory text | No absolute outcome guarantee; nationality statements, service location and document eligibility are distinct |
| 15 | Buying credits helps score | Paid usage continuation documented; reputation benefit unsupported |
| 16 | Heavy use of `fable` lowers score | No reputation effect documented; Fable-specific weekly limits appear in current official help |
| 17 | Max upgrade often starts observation; subsequent reductions trigger ban | No incidence rate, causal evidence or public observation-state specification |
| 18 | Work hours do not affect score; long use does not cause ban | No scoring rule verified; no absolute safety guarantee inferred |

## Primary sources fetched

All links below were fetched on 2026-10-28. Help pages are mutable, so this is a dated reading, not a permanent policy guarantee.

1. [Safeguards warnings and appeals](https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals): documented enforcement reasons and signed-in appeal route; organization holds are distinct from personal-account status.
2. [Identity verification on Claude](https://support.claude.com/en/articles/14328960-identity-verification-on-claude): dated August 11, 2026; selected use cases, Persona, physical government photo ID, possible live selfie; accepted documents do not establish geographic service eligibility.
3. [How do usage and length limits work?](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work): session/week limits, context length, shared usage across product surfaces. Does not document a hidden account reputation score.
4. [Log in to your Claude account](https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account): explicitly supports the same account across devices; login troubleshooting.
5. [Verify your phone number](https://support.claude.com/en/articles/8287232-verify-your-phone-number): physical location and phone requirements for signup.
6. [How do I sign up for the Pro plan?](https://support.claude.com/en/articles/8325609-how-do-i-sign-up-for-the-pro-plan): dated August 6, 2026; paid and free regional eligibility; no documented waiting period before upgrade.
7. [Paid plan billing FAQs](https://support.claude.com/en/articles/8325618-paid-plan-billing-faqs): web cards versus Apple/Google billing; payment failure can change subscription state.
8. [Why was my card declined?](https://support.claude.com/en/articles/9402418-why-was-my-card-declined): dated July 10, 2026; billing location/address, issuer decisions, 3DS and funds. No risk-score increase from a specific card class documented.
9. [Manage usage credits for paid Claude plans](https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans): additional paid usage after plan limits; separate from monthly API credits; Fable-specific weekly limit on Max plans. This is not evidence that credits buy account reputation.
10. [Use Claude's chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context): memory and previous-chat search are user features, not documented account-score controls.
11. [Troubleshoot Claude error messages](https://support.claude.com/en/articles/12466728-troubleshoot-claude-error-messages): distinguishes usage, length, login, capacity and service failures; capacity constraints need not appear on the incident status page.
12. [Age assurance on Claude](https://support.claude.com/en/articles/15171100-age-assurance-on-claude): dated May 18, 2026; age verification uses Yoti. Do not conflate with Persona identity verification.

## Industry context added for the substantive revision

13. [Cloudflare: Bot detection engines](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/): fetched 2026-10-28; request headers, session characteristics and browser signals, plus session-pattern smoothing. Used to explain why activity history can matter, without asserting Anthropic uses this implementation or score.
14. [Cloudflare: Bot scores](https://developers.cloudflare.com/bots/concepts/bot-score/): fetched 2026-10-28; request-level automation likelihood. Used to distinguish a request bot score from the account-level model.
15. [Stripe Radar: Rules reference](https://docs.stripe.com/radar/rules/reference): fetched 2026-10-28; allow/block/review processing, disposable-email and first-seen examples, card-country versus IP-country comparison, and velocity rules. Used as concrete industry context. No claim that these are Claude's rules or weights.

Email replacement cost, account history, survivorship, network consistency, client/platform confounders, feature-use correlation and upgrade/review explanations are editorial reasoning. Conditional wording is retained; none is presented as a measured Anthropic feature or observed experiment.

## Temporal conflict investigated and excluded from the revised article

[Supported Regions Policy](https://www.anthropic.com/legal/supported-regions), reached through the legacy supported-countries URL, says **Effective Nov 12, 2026**, later than the research date. Do not present its expanded entity/ownership restrictions as already effective on October 28. The substantive revision removes this policy detour and its frontmatter entry; it is not used as a current policy basis.

## Presentation plan and meaning lock

- Backdrop: differences between otherwise similar accounts motivate a persistent account-history model; no recent enforcement wave or product launch is invented.
- Mechanisms: initial account conditions; accumulated history versus calendar age; clean versus stable IP; devices versus session consistency; OS versus deployment context; duration versus intensity; causation versus feature-use correlation; payment information versus review timing; state-dependent delayed treatment.
- Aftermath: derive practical priorities from the mechanisms, rather than ending with a source-evidence checklist. No new product or policy release is claimed.
- Number ledger: 18 is the count of numbered clauses; 60/55/40 remain explicitly hypothetical teaching examples; one or two days, two or three cycles and 2023 retain their experiential context. The source author's 80% confidence is recorded here but omitted from visitor-facing prose because it adds no clause analysis.
- Eighteen canvas sections in original clause order, using one authored 01-18 index shared by section pills and TOC. No secondary chapter or subsection number series. Two small explanatory tables and two closing takeaways remain. Removed the repeated source-evidence tables and generic observation-recording Steps block. No diagram or new shared component is needed.
- Single-language run per `distill`; the existing locale fallback should hide the post on English lists and disable its English toggle.
- Mandatory `humanize-text` pass freezes source URLs, numbers, dates and evidence labels; revises prose only. No invented firsthand experiences, internal score, or support guarantee.

## Prose review

Applied the repository-local `humanize-text` workflow to the substantive rewrite before check/build. Each clause develops what the factor measures, a possible mechanism and its practical implication. Removed repeated screenshot/author/source-audit framing. Kept one measured narrator and explicit conditional language for inferred implementation. Locked clause numbers, hypothetical values, source URLs and documented product details during the prose pass. No first-person experience, empirical weights or internal implementation was invented.

## Initial draft verification record (superseded prose)

- `npm run check`: passed after the final article edit; 76 files, zero errors, warnings or hints in Astro diagnostics. Startup still reports deprecated Markdown configuration and empty collection notices.
- `npm run build`: passed after the final article edit; 223 static pages and Pagefind indexing completed. Build output includes empty-collection notices and Astro/Vite `use astro:head-inject` module-directive warnings, including the new MDX and existing MDX files. These toolchain warnings were disclosed rather than fixed through unrelated configuration or dependency changes.
- `npm run preview` detected the already-running Astro preview on port 4321. Used that served production build; did not stop or replace the existing server.
- Real headless Chrome preview at 1280, 1680, 768 and 390 pixels: route returned HTTP 200, one h1, all eight sections present, no page horizontal overflow. Three screenshot-claim tables contain six rows each, covering all 18 numbered items; a separate mechanism table contains three rows.
- Captured hero and middle-of-article screenshots at all four widths. Visual review found the two-character number-column label wrapping; changed it to `#`, then repeated check/build and the four-width preview captures.
- Mobile table panning works inside the table container. At 1680 pixels the TOC right edge is 314px and the active heading begins around 333px; the TOC link navigates to the selected section.
- Reduced-motion preview: inspected article blocks have opacity 1, no transforms or animations. With JavaScript disabled all eight sections remain present and no prose/reveal blocks are hidden.
- Chinese home and posts list link to the new article. English home and posts list omit it. English toggle is disabled with the existing untranslated notice. Both locales' home/list pages emitted zero script elements.
- Bundle observation: the current build emits one shared external article-enhancement module, 5,506 raw bytes / 2,182 gzip bytes. It is not inline in this build; no new script or runtime dependency was introduced by the article.
- Diff review: exactly two new task-owned files; no shared component, established contract, dependency, generated output or pre-existing dirty file modified. Compared hashes of all 57 initially changed/untracked paths: unchanged. No subagent work was delegated.
- Not verified: hidden scoring weights, thresholds, alleged observation states, or causal account-ban outcomes; the article deliberately presents the screenshot as a secondhand empirical model. User visual approval and publication are pending; no commit or push performed.

## Substantive revision verification (before numbering correction)

- Replaced the source-audit article with direct analysis of all 18 clauses, grouped into eight sections. The clauses now explain mechanisms, interactions and practical consequences. Removed repeated screenshot/author phrasing and the three source-evidence tables. Provenance and evidence inventory stay in this ledger.
- Added verified Cloudflare and Stripe primary documentation as explicitly separate industry examples. The analysis does not equate their request/payment scores with an Anthropic account score or assert a measured Claude weight.
- Applied the mandatory humanize pass. Preview review also prompted shortening the headline to `Claude 隐藏分模型` to avoid awkward wrapping and reduce TOC crowding.
- Project-native check/build passed for the substantive rewrite. Astro diagnostics: 76 files, zero errors, warnings or hints. Static build and Pagefind completed; the previously disclosed toolchain and empty-collection notices remain.
- Served production-preview review at 1280, 1680, 768 and 390 pixels: HTTP 200, all 18 numbered clause headings present, eight sections, two tables, no page horizontal overflow, no browser exceptions. The 1680px TOC clears the content by 18px; mobile tables pan within their container.
- At 390px, reduced-motion and JavaScript-disabled checks each found all 20 inspected article blocks visible and untransformed. The article still uses the single existing enhancement script and introduces no runtime code.
- Compared the 57 pre-existing modified/untracked paths against the start-of-task snapshot: unchanged. Only the article and this research ledger are owned by the revision. No shared modules or public contracts changed; no delegation, commit or push.
- Remaining limit: causal account outcomes and internal weighting are not empirically verified; the article's mechanism analysis is explicitly conditional. User approval of the revised presentation is still pending.

## Numbering correction

The prior draft mixed eight topic-chapter indices with the original 18 clause numbers and reordered clauses by topic. The user identified the mismatch. Reorganized the article into 18 sections in the original 01-18 order; each clause now uses the existing `SectionHead.index` for both its pill and TOC. Removed the second number series and repeated numbered h3 titles. Kept paragraph content, source URLs, example values, tables and closing takeaways unchanged; moved the closing prose outside numbered sections. No shared TOC/component/script change is needed.

Verification: `npm run check` passed (76 files; zero diagnostic errors, warnings or hints), and `npm run build` plus Pagefind passed with the previously disclosed toolchain/empty-collection notices. In served Chrome preview at 1280, 1680, 768 and 390 pixels, section indices, visible pills and TOC indices each run from 01 through 18 in the same order; there are exactly 18 TOC links and no page horizontal overflow or browser exceptions. Clicking the final TOC entry navigates to `#working-hours` and marks 18 active. Reduced-motion and JavaScript-disabled mobile previews retain all 40 inspected prose/section blocks. Desktop and mobile captures were visually reviewed. The 57 pre-existing dirty paths remain unchanged. No shared component, public contract, commit or push involved.

## Closing-card width correction

The unnumbered closing prose was nested in a `space-y-6` div. That broke the existing canvas rule for direct-child prose tiles, leaving the default 960px prose cap active while numbered-section tiles used the full 1016px desktop inner width. Removed that article-local wrapper so the closing prose and takeaways are direct canvas children and inherit the established width/rhythm rules. No shared CSS or component edit is needed; prose and numbering are unchanged.

Verification: `npm run check` passed (76 files, zero diagnostic errors/warnings/hints); build and Pagefind passed with the previously disclosed notices. Measured the served build at 1280/1680/768/390px: last-clause prose, closing prose and the takeaway grid have identical left/right edges and widths (1016/1016/704/358px respectively). The paired desktop takeaways are equal width and their combined grid aligns with the full-width tiles; mobile takeaways each occupy the same 358px width. No page overflow; 01-18 numbering remains unchanged. Desktop and mobile captures were visually reviewed. Only the article-local wrapper and this record changed; no shared module/public contract change, commit or push.

## Practical guide and diagrams

The user clarified the article's goal: actionable habits that may improve account reputation and reduce the chance of restrictions. Reframed the opening and each of the original 18 clauses around concrete actions, then added priority and stage-by-stage decision tables. No score value, measured weight or guarantee was invented. An uncertain community model remains identified once in the introduction; the official account appeal route is linked for an actual ban.

Four authored Mermaid flowcharts and their static SVG outputs live under `src/assets/claude-hidden-score/`: an accumulation overview, an action-priority map, a comparison of session patterns, and a response flow for actual account prompts. They depict recommendations and illustrative reasoning, not verified Anthropic internals. Source `.mmd` files are retained alongside their SVGs. SVGs use site color tokens, descriptive titles and descriptions, unique ID prefixes and no runtime scripts; Mermaid CLI was installed outside the repository. No shared CSS, UI component or dependency changed.

After drafting, the required humanize pass kept numbers, citations, and the uncertainty boundary intact while reviewing advice for direct wording and avoiding unsupported causal claims. Four-width served previews, keyboard panning and no-JavaScript review were recorded locally; no commit or push was performed at that point.

Final review: `npm run check` passed with 76 files and zero diagnostics; build and Pagefind passed with the pre-existing notices. Served previews at 1280/1680/768/390px retained all 01–18 indices and had no page overflow. At 390px, keyboard scrolling moved the action map by 40px, and all three body diagrams remained visible with JavaScript disabled. Diagram text and cluster labels were checked against their node bounds; a centering defect found during preview was corrected and the checks rerun. Desktop and mobile screenshots were reviewed; real-device touch and screen-reader use were not tested. All 57 pre-existing dirty paths still match the start-of-task snapshot.
