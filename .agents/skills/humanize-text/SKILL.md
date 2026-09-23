---
name: humanize-text
description: Deeply polish text to remove AI machine-feel and make it read more human. Trigger when the user asks to "remove AI flavor," "make it sound human-written," "make text more natural," "humanize," or pastes an AI-sounding draft to be rewritten naturally. Language-agnostic (Chinese, English, mixed). In this repository it is also the mandatory prose-quality gate (step 6) of the `distill` skill.
---

# Humanize Text: Remove AI Machine-Feel, Add Human Voice

## What this skill does

AI detectors (e.g. Tencent Zhuque, GPTZero) do not check "where the content came from." They flag **statistical signatures** of AI text: low perplexity (every next word is too predictable), low burstiness (sentence lengths are too uniform), and prose that is too smoothly coherent. But those statistics are only half the story. What actually makes text read as machine-written to a human is mostly **structural and rhetorical habit** — three-part parallelism, template paragraph shapes, over-signposted logic, and the absence of any real point of view.

So this skill works on two fronts:
- **Subtract** the AI signatures (statistical smoothness *and* structural templates).
- **Add** the positive qualities of good human writing that no detector-dodging trick supplies on its own: concrete detail, a consistent voice, genuine stance, and the small imperfections of a real mind at work.

The goal is text that reads like strong human writing — **without changing meaning or facts**. Reducing detector scores is a *side effect* of writing more like a person, not the target. Do not optimize for a specific detector; optimize for genuine naturalness, which generalizes across all of them.

Key terms:
- **Perplexity**: how predictable the text is. AI picks the highest-probability next word at every step, so its output is too smooth (low perplexity). Human writing has surprising word choices and varies (high, fluctuating perplexity).
- **Burstiness**: how much sentence length/complexity varies. AI tends to write sentences of similar length (low burstiness); humans alternate long and short (high burstiness).

## Language handling (do this first)

This skill is language-agnostic. Before rewriting:
1. Detect the dominant language of the input (e.g. Chinese, English, or mixed).
2. Apply the language-neutral principles below to ALL languages.
3. When applying the "AI cliché" and "example phrasing" lists, use the matching language's list (Chinese list for Chinese text, English list for English text). For mixed text, apply both.
4. Never translate the text into another language unless the user explicitly asks. Rewrite within the original language.

## Usage boundaries (must follow)

1. Position this as a **writing-quality tool**: polishing the user's own drafts, translations, or AI-assisted drafts to read more naturally.
2. If the user explicitly wants to disguise AI-ghostwritten content as original work to evade academic-integrity checks, flag the integrity risk and keep the focus on "improving natural writing quality," not "deceiving a detector."
3. Swapping synonyms (e.g. "therefore" → "so") does not fool detectors and is not this skill's method. This skill changes the **underlying patterns**: sentence rhythm, structure, logical undulation, point of view, and voice.

## Workflow

1. **Detect language** (see above) and **identify genre**: academic/report, blog/social, fiction/prose, email/casual, **technical (code, code comments, API docs, engineering docs, RFCs)**. Genres differ in how much "human voice" is acceptable and *what kind* of human voice applies (academic cannot go too colloquial; social can be livelier; **technical voice is expert judgment and restraint, not colloquialism — see the dedicated section below**).
2. **Meaning lock**: before rewriting, list the original's core claims, key facts, numbers, proper nouns, and citations. These are **red lines — never alter or fabricate them**.
3. **Establish one voice**: decide on a single narrator — register (formal/neutral/casual), stance (confident/measured/skeptical), and level of expertise — and hold it consistently through the whole piece. A text that shifts persona mid-way reads *less* human, not more. Voice-consistency outranks any single rule below.
4. **Rewrite paragraph by paragraph**: apply the rules below. You may merge/split sentences, reorder paragraphs, restructure lists into prose (or vice versa), and add/remove transitions — but never change claims or facts.
5. **Self-check**: go through the checklist, especially whether any fact was altered or any information was invented.
6. **Deliver**: by default output the full rewritten text; if the user asks, append a brief "what changed" note.

## The rewriting rules

The first three rules attack the **structural and rhetorical templates** that are the loudest AI tells today — treat them as highest priority. The next four cover statistical smoothness. The last two are the positive human qualities to add, and the guardrails against over-correcting.

### Rule 1 · Break structural and rhetorical templates (highest-value fix)

This is where most AI-detectable writing gives itself away. Hunt down and vary:
- **Three-part parallelism ("rule of three")**: "clear, concise, and credible" / "fast, stable, and scalable" / "高效、稳定、可扩展". This is the single strongest modern AI tell. Break the triad: use two items, or four, or fold them into a sentence unevenly.
- **The "not X, but Y" / "it's not just… it's…" frame** and other over-used contrast scaffolds. Fine once; a tic when it recurs.
- **Template paragraph shape**: not every paragraph should be "topic sentence + three supporting points + wrap-up." Let some paragraphs be one blunt observation; let others wander.
- **Formatting reflexes**: don't reflexively bold key terms, add a heading to every section, or convert every idea into a bulleted list. If the source is a wall of bullets, prose out the ones that are really connected thoughts. If list items are all the same length and grammatical shape, break that symmetry.
- **Em-dash overuse** (and its equivalents): AI leans on the dash to append a neat afterthought. Vary punctuation; sometimes just start a new sentence.

### Rule 2 · Break sentence rhythm (counter low burstiness)

- Deliberately alternate long and short sentences: follow a complex long sentence with a short one.
- Allow very short sentences for emphasis ("That's it." / "The point is clear.").
- Avoid 3+ consecutive sentences with the same structure or opening word.

### Rule 3 · De-signpost the logic (counter over-smooth coherence)

- Remove mechanical scaffolding ("first / second / third / finally"); use natural transitions or dive straight in.
- Understand *why* summary sentences read as AI: they restate what was just said. So don't just ban "in conclusion" — cut the redundant recap itself. If a paragraph only re-says the previous one, delete it.
- Allow occasional perspective jumps: a concrete example, a rhetorical question, a short aside. Not every paragraph must link neatly back and forth; humans allow some to be abrupt or short.

### Rule 4 · Increase word-choice surprise (counter low perplexity)

- Without hurting accuracy, replace generic words with more specific, vivid, or slightly less-common ones.
- Cut high-frequency AI filler (see per-language cliché list below).
- Keep a little colloquial or slightly "non-standard" phrasing when the meaning still lands.

### Rule 5 · Add concrete detail and stance (the positive human signal)

Removing AI tells is not enough — de-cliché'd text can still be hollow. Good human writing is *specific* and *committed*:
- Prefer concrete examples, names, numbers, and lived detail over generic statements — **but only detail already present in or safely inferable from the source; never invent facts** (see meaning lock).
- Let the writer's knowledge boundary show: a genuine "this part I'm less sure about," a narrowed claim, a small digression, an unresolved tension. Real minds are not uniformly confident.
- Where the genre permits (see Rule 6's constraint), take a real position instead of hedging everything into neutral balance.

### Rule 6 · Inject viewpoint and voice — within the genre's limits

- Add first-person judgment or attitude **only where the genre allows an opinion to exist** ("I think," "in my experience," "honestly"). Blog, essay, email, opinion: yes. 
- **Hard constraint (resolves the conflict with meaning lock):** for factual/report/academic genres, injecting a first-person stance the source did not contain is *fabrication of a viewpoint* and is forbidden. In those genres, achieve human voice through rhythm, structure, and word choice (Rules 1–4) only — not by manufacturing opinions or feelings.
- Let emotion and confidence fluctuate naturally between paragraphs — confident here, tentative there — rather than a flat, uniformly balanced tone. But keep it the *same narrator* throughout (Rule 3 of the workflow).
- Vary rhetoric: mix metaphor, analogy, example, contrast; don't write only flat declaratives, and don't repeat one device.

### Rule 7 · Don't perform "humanness" (the anti-overcorrection guardrail)

Over-correcting produces a *new* detectable pattern. Avoid it:
- Do not sprinkle "honestly / to be fair / 说实话 / 其实吧" everywhere. A page full of first-person filler is itself a current AI tell. Use such markers rarely, where they carry real meaning.
- Don't mechanically metronome long-short-long-short; that regularity is just a different uniformity. Vary the variation.
- Don't stack jargon to fake expertise; use terminology only when genuinely needed, and correctly. Keep academic text rigorous — mainly break scaffolding and repetitive syntax, don't dumb it down.
- Naturalness comes from subtraction and specificity, not from piling on voice markers.

## Technical writing: the expert's human voice (code, comments, API/engineering docs, RFCs)

Technical content written by a real expert reads unmistakably differently from AI-generated technical content — but **not** in the way blog prose does. Do not reach for the blog toolkit here. Colloquial interjections, sprinkled first-person filler, deliberately broken term consistency, and prose-ified lists are all **wrong** for technical text and will make it worse.

The AI tell in technical writing is different: it is **correct but hollow** — comprehensive, evenly-weighted, hedged into blandness, and utterly without judgment. It explains *what* the code does (which the code already shows), lists every option with equal emphasis, never says which one it would actually pick, never admits a limit, and pads everything with ceremony. An expert's voice is the opposite of that hollowness.

**What the expert's human voice is made of — add these:**
- **Judgment and stance.** State what actually matters, what you'd choose, what's a trap. "Use X here; Y allocates on every call." Not a neutral catalogue of all five options as if they were equal.
- **Comments that carry non-obvious information.** A real expert comments the *why*, the invariant, the gotcha, the upstream quirk — never restates what the next line plainly does. Delete "// increment counter"; keep "// must lock before this or we race with the reaper thread."
- **Honest boundaries.** "This degrades past ~10k entries." "Not tested under concurrent writes." "This is a workaround for a bug in <dep>; remove when fixed." Real minds admit what they don't know and where things are fragile. AI pretends everything is uniformly solid.
- **Concrete specifics over generic filler.** Real function/variable names, real failure modes, real numbers — not "various factors" or "in certain cases."

**What the expert's voice requires you to KEEP (do not "humanize" these away):**
- **Term consistency.** One concept, one name, everywhere. Do NOT vary vocabulary for "surprise" (Rule 4 is suspended for technical text). Inconsistent terminology is an amateur tell, not a human one.
- **Structural precision.** Parameter lists, enums, config tables, and step sequences **should** be uniform and complete. Do NOT break list symmetry or prose-out a genuine list. Rule 1's "break the list" applies to rhetorical padding, not to real structured data.
- **Factual neutrality where required.** Do NOT inject first-person opinion into a spec, a compliance doc, or a data description (Rule 6's hard constraint fully applies).

**What to still remove (these are AI tells in any genre):**
- Empty ceremony and scaffolding: "In this section we will explore…", "It is important to note that…", "首先/其次/最后", "综上所述", "This document aims to…".
- Rhetorical rule-of-three and grandiose framing ("robust, scalable, and maintainable").
- Restating the obvious; hedging every sentence into non-commitment; grandiloquent conclusions.

In one line: for technical text, the human voice comes from **judgment, honesty about limits, and disciplined precision** — add those, cut the ceremony, and keep everything that makes the content exact. This is closer to *sharpening* than to *loosening*.

## Optional: style transfer (strongest lever when available)

If the user provides a sample of their own writing (or a target author's), this beats every generic rule. When a sample is given:
1. Read it for concrete, transferable traits: typical sentence length and variance, favorite connectives, punctuation habits, formality, whether they use headings/lists, how much they hedge, recurring vocabulary.
2. Align the rewrite to *those specific* traits rather than the generic defaults above.
3. Still honor the meaning lock and all guardrails.

If no sample is given, proceed with the general rules and consider asking whether the user has a reference sample for important pieces.

## Per-language reference lists

AI cliché / filler to cut or reduce:
- **Chinese**: 综上所述、总而言之、值得注意的是、在当今社会、随着……的发展、首先/其次/再次/最后、不难看出、由此可见、归根结底、说到底；以及"赋能、抓手、闭环、维度、生态、颗粒度、心智、对齐"这类被滥用的黑话；机械并列的"不仅……而且……""既……又……""一方面……另一方面"；过度工整的四字排比堆砌;"……的同时"作连接词。
- **English**: "In conclusion," "Overall," "It is worth noting that," "In today's world," "With the rapid development of," "Firstly/Secondly/Finally," "Moreover," "Furthermore," "It is important to note that," "Delve into," "In the realm of," "Ultimately," "At the end of the day," "It's not just X, it's Y," "That said," and reflexive rule-of-three lists.

Natural personal-voice insertions (examples — **use sparingly**, see Rule 7):
- Chinese: 我觉得、在我看来、我的经验是、说实话、其实吧、说白了；口语场景可用语气词（吧/啊/呗/嘛）、甩短句、省略主语。
- English: "I think," "in my experience," "honestly," "to be fair," "the way I see it," "here's the thing."

## Genre intensity guide

- **Academic paper / formal report**: emphasize rules 1, 2, 3, 7; **Rule 6's hard constraint applies — no injected first-person opinion.** Stay rigorous; mainly kill templates, scaffolding, and repetitive syntax.
- **Blog / social**: all rules on; lean into 4, 5, 6 (specific, personal, opinionated) — while respecting the Rule 7 guardrail.
- **Fiction / prose**: emphasize 1, 2, 4, 5; chase rhythm, imagery, and concrete sensory detail.
- **Email / everyday**: apply lightly; focus on rules 2 and 6 for a natural, human tone.
- **Technical (code / comments / API & engineering docs / RFCs)**: **use the dedicated technical section above, not the blog toolkit.** Suspend Rule 4 (keep term consistency), do not break real lists (Rule 1 targets only rhetorical padding), and obey Rule 6's no-opinion constraint for specs. Human voice here = expert judgment, honest limits, and precision; the work is cutting ceremony and adding "why," not loosening or colloquializing.

## Self-check list (verify after rewriting)

Meaning (red lines):
- [ ] Are the core claims and conclusions consistent with the original?
- [ ] Are all facts, numbers, proper nouns, and citations **preserved as-is, unaltered, not fabricated**?
- [ ] Was any information — including any *opinion or stance* — introduced that wasn't in the original? (If so, and the genre is factual, delete it.)
- [ ] Was the text kept in its original language (no unintended translation)?

Structure & rhythm (the main tells):
- [ ] Any leftover three-part parallel lists / rule-of-three? (Break them.)
- [ ] Any recurring "not X but Y" / "not just… it's…" frames?
- [ ] Reflexive bolding, headings, or bullet lists that should be prose? Are list items uniformly shaped?
- [ ] Em-dashes (or equivalents) overused as neat afterthoughts?
- [ ] Do sentence lengths clearly alternate long and short — *without* a mechanical long-short-long metronome?
- [ ] Any run of 3+ sentences with identical structure or opening word?
- [ ] Any AI scaffolding clichés left (first/second, in conclusion, 综上所述, 归根结底, ultimately)?
- [ ] Any redundant recap paragraph that only restates prior content?

Voice & humanity:
- [ ] Is it one consistent narrator throughout, not a shifting persona?
- [ ] Is there concrete detail and a real stance, or is it still hollow and uniformly hedged?
- [ ] Is "humanness" over-performed — too many "honestly / 说实话 / to be fair," too many first-person interjections?
- [ ] If a style sample was provided, does the result actually match its traits?

Technical text only (if genre is code / comments / docs / RFC):
- [ ] Did I KEEP term consistency (one concept = one name), not vary it for "surprise"?
- [ ] Did I KEEP real lists/tables/param sequences uniform and complete (not prose-ify or break symmetry)?
- [ ] Do comments carry non-obvious "why"/invariant/gotcha info, not restate what the code plainly does?
- [ ] Is there real judgment (what to pick, what's a trap) and honest admission of limits — not an even, opinion-free catalogue?
- [ ] Did I avoid colloquial filler and injected opinion in specs/compliance/data descriptions?
- [ ] Did I cut empty ceremony ("This section explores…", grandiose rule-of-three) while keeping precision?

## Important reminders

- Any AI detection is a **probabilistic judgment**. This skill improves naturalness and reduces machine-feel, but does not guarantee passing any specific detector; detectors update daily and no stable "bypass" exists.
- Prioritize correctness and readability; human voice is secondary. When they conflict, meaning-preservation wins.

## In this repository (zzzode.github.io)

This copy is versioned with the repo so the prose standard travels with the code — do not depend on a user-level install of the same skill.

- **Role:** it is the mandatory step 6 ("Humanize the prose") of the `distill` skill (`.agents/skills/distill/SKILL.md`). Every distilled MDX article passes through these rules after the draft is written and before `npm run check` / `npm run build`.
- **Repo-specific banned wording for Chinese articles** (made-up jargon collocations, per-screen limits on rule-of-three / em-dash / bold labels, the read-aloud test) lives in the distill skill's step 6 — that list is the authority for site-specific phrasing; this file is the authority for the general craft.
- **Meaning lock is stricter here than the generic rule.** In distilled articles these are frozen and may never change in a humanize pass: every figure, date, price, percentage, proper noun, source URL, caliber label (官方 / 第三方 / 我们自己的计划 / 未证实), direct quotation, and the `sources` front matter. CompareTable cells, Stat values, Timeline nodes, and SVG `<text>` are structured data — keep them precise and uniform (the technical-writing section above applies); humanize the surrounding `<Prose>`, headings and leads only.
- **Language policy:** visitor-facing prose is Chinese (default) or English under `/en`; rewrite within the existing language, never translate. Engineering docs and skill files stay English, so edits to `docs/` or skills use the English cliché list.
- **Voice by genre on this site:** travel/experience pieces may use 我/我们 and a plain spoken register; research, investment and hard-engineering pieces earn their human voice through rhythm, concrete detail, judgment and honest knowledge boundaries — never by inventing a stance the sources do not support.
- After the pass, the distill workflow's build/screenshot verification still runs unchanged; humanizing prose is not a reason to skip it.
