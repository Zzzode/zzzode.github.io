# Magpie research ledger

## Scope and plan

- Outcome: a Chinese teaching article about `yetone/magpie`, from the user problem to a complete first-use workflow and the gateway's request paths.
- Owner: `src/content/posts/zh/2026-10-18-magpie-local-model-gateway.mdx`, `src/assets/magpie/`, and this ledger.
- Stages: inventory public documentation; freeze the source; inspect protocol, routing and subscription implementations; draft ten sections; apply the local humanize skill; run the native checks and built-site preview.
- Dependencies: existing article components and existing article enhancement code. No shared component, route, token, dependency or agent configuration changes.
- Verification: `npm run check`, `npm run build`, preview at 1280/1680/768/390, intermediate diagrams, TOC clearance, locale behavior, reduced-motion and script surfaces where the browser supports them.
- Non-goals: installing Magpie on the user's machine, reading credentials, changing Codex/Claude configuration, sending paid requests, benchmarking, subscription-policy analysis, English translation, commit or publication.

## Snapshot and source register

Fetched on 2026-10-18. Repository snapshot: `ccb2eea1597d6d68e18427d6a9a2cbbe437c0602` (commit date 2026-10-18). The separately published latest-release URL resolved to `v0.1.1285` during research; the article describes the source snapshot, not an asserted feature-equivalent release. No installation or authenticated upstream execution was performed.

All sources below are primary. Implementation files are stronger evidence for the described source behavior than the project's marketing language; neither is a live compatibility test.

1. README: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/README.md
2. Reference manual: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/docs/reference.md
3. Get started: https://usemagpie.ai/docs/start
4. Intent routing: https://usemagpie.ai/docs/intent
5. Privacy: https://usemagpie.ai/docs/privacy
6. Remote Magpie: https://usemagpie.ai/docs/remote
7. Gateway protocol implementation: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/internal/gateway/gateway.go
8. Intermediate representation: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/internal/gateway/ir.go
9. Claude subscription bridge: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/docs/subsystems/claude-subscription-bridge.md
10. Routing/account selection: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/internal/gateway/fallback.go
11. Native compaction ownership: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/internal/gateway/native_compaction.go
12. Local conversation recording: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/docs/subsystems/gateway-sessions.md
13. OpenAI official advanced configuration: https://learn.chatgpt.com/docs/config-file/config-advanced
14. LiteLLM official gateway overview (context only): https://docs.litellm.ai/docs/simple_proxy
15. Release channel: https://github.com/yetone/magpie-releases/releases
16. Claude Code configuration adapter: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/internal/agent/claude.go
17. Claude subprocess and MCP callbacks: https://github.com/yetone/magpie/blob/ccb2eea1597d6d68e18427d6a9a2cbbe437c0602/internal/gateway/claude_subscription.go
18. Claude Code official gateway entry point: https://code.claude.com/docs/en/llm-gateway

## Inventory and coverage

The complete README was inventoried before outlining. Its 18 reader-facing units are accounted for below; sponsor badges, community invitations and the star request are not treated as technical sections. Long reference/subsystem manuals were consulted for the relevant named subsections, not represented as exhaustively audited.

| Unit | README topic | Coverage |
| --- | --- | --- |
| 1 | Product identity and audience | Chapters 1 and 10 |
| 2 | Quick start | Chapter 5 |
| 3 | Supported agents | Chapters 1, 2 and 5; exhaustive product list omitted |
| 4 | System topology | Cover and chapter 2 |
| 5 | Agent model selection and profiles | Chapters 2 and 5 |
| 6 | Providers and import | Chapters 2 and 5 |
| 7 | Subscriptions | Chapter 4 |
| 8 | Routing groups | Chapters 6 and 7 |
| 9 | Provider plugins | Chapter 9 |
| 10 | Gateway middleware | Chapter 9 |
| 11 | Usage and cost | Chapter 8 |
| 12 | LAN, remote, Docker and sync | Chapter 9 |
| 13 | Library | Chapter 9 |
| 14 | Search and MCP | Chapter 9 |
| 15 | Image/video tools | Chapter 9; no unsupported model promises |
| 16 | Agent updates, WSL and desktop conveniences | Chapter 9; minor appearance features omitted |
| 17 | Documentation and privacy | Source list and chapter 8 |
| 18 | License | Chapter 10 |

Reference sections used: Agents; Providers and the gateway; Routing groups; How magpie picks an account; Signed-in agents as providers; Connecting anything else; Install; As a background service; Docker; Use; Files; Counting users. Focused implementation reads: `translate`, `attempt`, protocol parsers and `Request`/`Event`; candidate selection and stream commitment; native-compaction writer restriction; Claude bridge process/tool/session paths; optional local recording.

## Teaching map

- Backdrop: independent agent configuration formats and incompatible model protocols make a base-URL change insufficient. OpenAI's custom-provider documentation supplies external context. LiteLLM is a neighboring gateway pattern, without asserting product parity.
- Mechanisms: configuration writes versus runtime forwarding; provider/model identities; native pass-through versus `Request`/`Event` translation; tool-call round trip; genuine Claude CLI bridge; account selection versus conversation affinity; pre-output fallback versus a committed stream; sealed-context portability.
- Walkthrough: install from the official site; add an API-key provider in the GUI; list and test models; save a settings profile; select a catalog model for Codex; start a new session; send a small request; check real provider/model headers; restore the saved profile when needed.
- Aftermath: one stable local endpoint for several clients, with a gateway process and compatibility surface to maintain. Optional remote access and plugins add operational responsibility.
- Voice: source behavior, explicitly hypothetical teaching examples, and editorial recommendations are labeled separately. No latency, savings or reliability claims are invented.

## Number and identifier ledger

| Value | Caliber and purpose |
| --- | --- |
| `127.0.0.1:3425` | Project default local model gateway; not a latency measurement |
| `3430` | Documented default browser management port; distinct from the model endpoint |
| Four protocol surfaces | Chat Completions, Responses, Messages, Gemini; capability varies by route/model |
| `auto`, `session`, `turn`, `off`, `strict` | Documented conversation-affinity options; no promise of universal resumption |
| `smart`, `order`, `rotate`, `usage`, `pace`, `weight` | Documented routing modes, not quality-ranking algorithms |
| `0600` | Documented Unix file mode for key/account files; not encryption |
| `v0.1.1285` | Observed separate release-channel label; not the pinned source version |

## Diagram provenance

Six Mermaid sources in `src/assets/magpie/` produce static SVGs. All diagrams are explanatory schematics rather than captured runtime traces. They are rendered before the site build, use the site's color tokens, are embedded as inline SVG through raw imports, and add no Mermaid runtime. The overview omits reverse streams for readability; the tool sequence shows them. The Claude bridge diagram omits authentication internals and demonstrates that tool execution returns to the caller. The two Claude-specific sequences distinguish the user-facing Claude Code client from a bridge-owned upstream process, and show the tool-result handoff. No new shared renderer is introduced.

## Evidence boundaries

- The CLI and HTTP examples follow the pinned reference. Model identifiers must come from the reader's catalog; placeholders are explicit. They are not transcripts of a real provider run.
- A subscription exposed technically as a provider is not evidence of provider approval for every client or deployment. The article makes no blanket authorization or resale claim.
- Same-protocol forwarding still includes routing and relevant compatibility processing; it is not described as byte-identical for all requests.
- Tool execution belongs to the caller in the ordinary forwarded-tool path; optional gateway-owned search/image capabilities and the Claude bridge are explained separately.
- Routing success, prompt-cache hits, model capability and conversation ownership are separate. Encrypted upstream state can bind a conversation to its writer.
- No performance comparison, security audit, real-account failover or cost-saving experiment was conducted.

## Humanize and validation

- Applied the repository-local `humanize-text` skill to the full Chinese draft. The final edit replaced an abstract configuration metaphor with a direct description. A meaning-lock comparison preserved numerical tokens, URLs, inline technical identifiers and fenced examples. Structured terminology remains consistent; the read-through retained the distinction between documented behavior, teaching examples and recommendations.
- `npm run check`: passed, 76 files, zero errors/warnings/hints in the diagnostic result. The CLI also reports the existing Astro markdown-plugin deprecation and three empty collection notices.
- `npm run build`: passed, 220 pages; Pagefind indexed 33 pages. Rebuilt successfully after removing unused Mermaid filter/gradient definitions and replacing remaining generated color literals with tokens. Existing empty-collection notices and the Pagefind Chinese stemming note remain.
- All 17 unique linked URLs in the article, including installation and contextual links, returned HTTP 200 during source checking.
- Built-HTML inspection confirms ten chapter anchors, no duplicate IDs, no broken fragment links, article links in the Chinese home/posts lists, absence from the English lists, and a disabled English toggle. This is static inspection, not a browser interaction test.
- All four Mermaid inputs rendered successfully with the official Mermaid CLI installed only under `/tmp`; no repository dependency change. Their final SVGs parse as XML, contain readable text nodes, use color tokens, contain no script/foreignObject/filter/gradient, and use unique IDs. Mermaid sources and generated article assets are intentionally retained together.
- Bundle inspection: the article references one existing bundled enhancement module, 5,506 bytes / 2,183 bytes gzip in this build. The current Astro output references that module externally rather than inlining it. No Mermaid runtime was added. Home, post lists, About and 404 contain zero scripts in the inspected output.
- `git diff --check`: passed. The task adds this ledger, one Chinese article and four Mermaid/SVG pairs. No pre-existing shared module or established public contract was changed; unrelated dirty changes remain outside the task.
- Preview limitation: `npm run preview` found the already-running preview at `http://localhost:4321` (pid 99569), which serves the rebuilt output. Browser approval rejected opening that local origin, reporting that permission was declined. No alternate browser/automation path was attempted. Desktop (1280/1680), tablet (768), mobile (390), intermediate rows, reduced motion, TOC clearance and visual approval remain pending. Static output cannot establish these visual properties.
- No real upstream calls, credential access, model compatibility run, account failover test, performance test or independent security review. No delegated work was used. Nothing was committed or pushed.

Local route: `http://localhost:4321/posts/2026-10-18-magpie-local-model-gateway/`.

## User-requested full humanize revision

- Scope: the article's cover lead and explanatory prose, plus this record. All thirteen Prose blocks were revised; headings, component structure, tables, mechanism rows, captions, summaries and diagram assets were preserved. No other working-tree files were changed, checked against a pre-edit SHA-256 manifest.
- Meaning lock: local gateway versus configuration management; four protocol surfaces and Request/Event translation; caller-owned tools and the Claude subscription bridge; documented command/configuration examples; routing versus affinity, stream commitment and sealed-context ownership; privacy and pricing calibers; source snapshot and untested runtime boundaries. No new product claim, measurement, opinion attributed to a source, or first-person experience was introduced.
- Editorial work: shortened the repeated opening explanation; replaced awkward abstract phrasing with concrete actions; broke up long paragraphs about configuration and tool calls; made the first-use instructions easier to follow; removed repetitive transition and closing phrases. The article remains Chinese technical prose, with consistent terms and explicit evidence limits.
- Verified unchanged against the pre-pass article: complete front matter, all source URLs in order, numerical tokens, inline code, fenced command examples, and every structured component outside Prose except the explicitly revised cover lead. The 25 tracked technical names remain present with the same spelling. All Mermaid/SVG file hashes remain unchanged.
- Native verification: `npm run check` passed for 76 files with zero errors/warnings/hints in its diagnostic result; `npm run build` passed with 220 pages and Pagefind indexing 33 pages; `git diff --check` passed. Existing Astro deprecation, empty-collection notices and the Chinese stemming note remain.
- Visual verification remains pending under the prior browser-origin approval rejection. No renewed browser access or alternate screenshot mechanism was attempted. The rebuilt local route contains the revised prose. No shared module or established public contract changed; no commit or push.

## Claude Code mechanism expansion (2026-10-19)

- Request: include the previously explained Claude Code mechanisms in the article itself, with practical diagrams rather than leaving the explanation in chat.
- Owner and stages: article chapters 2–4, two Mermaid/SVG pairs in the existing article asset folder, and this ledger. Recheck the pinned adapter and bridge implementation; add configuration and tool-flow walkthroughs; render static sequences; humanize the new prose; run native checks and inspect built output. No shared code, dependency, user-agent configuration, commit or publication changes.
- Added a reduced `settings.json` illustration, the base URL/token/main-model responsibilities, tier mappings, and the pinned adapter's removal of the older `ANTHROPIC_MODEL` override. The placeholder token/model are explicitly illustrative and never used to call a service.
- Added a Claude Code client walkthrough: Messages request, Chat Completions upstream, Read tool call, Messages `tool_use`, local execution, and the corresponding `tool_result` returned to the model. The new `claude-code-proxy` sequence makes the execution location explicit.
- Added a side-by-side comparison of Claude Code as the user's client and Claude Code as a Magpie-owned upstream process. The new `claude-mcp-roundtrip` sequence shows the helper callback, per-run token, waiting tool call, second client HTTP request and resumed process.
- Explained stream-json stdin/stdout, helper setup, the difference between a run callback token and other keys, restricted subprocess tools, inherited-environment cleanup, and the default prompt wrapper. The no-recursion explanation is explicitly a source-based inference, not an observed runtime test.
- Source additions are primary references 16–18. All new behavior statements are tied to snapshot `ccb2eea1597d6d68e18427d6a9a2cbbe437c0602`; no assertion about a newly installed/latest release was added.
- Applied the local humanize skill after drafting. The final prose pass retained source URLs, numerical tokens, inline technical identifiers and fenced configuration examples. Existing sources, prose and original diagram assets were preserved; the new explanatory sections are additions.
- Both new Mermaid inputs compiled into static, token-colored, uniquely identified SVGs. Their numeric widths establish readable local horizontal panning through the existing mechanism component. Browser screenshots remain blocked by the prior declined local-origin approval; diagram compilation and static HTML inspection do not prove responsive layout.
- Rechecked official source 18 through the web reader. It describes the gateway configuration surface but explicitly excludes official support for routing to non-Claude models; that distinction is now stated beside the example. A raw urllib request received HTTP 403, while the web reader retrieved the document successfully; the two added pinned GitHub source URLs returned HTTP 200.
- `npm run check` passed for 76 files with zero errors/warnings/hints in the diagnostic result. Native build passed with 220 pages and Pagefind indexing 33 pages. Built output contains all six diagrams, four tables and the existing single article module; new SVGs have no duplicate IDs, and fragment links resolve within the generated page. Home and English-list script/locale checks passed. Existing empty-collection/deprecation/Chinese-stemming notices remain.
- The article's diff against the previous humanized version consists of additions only. A working-tree SHA-256 comparison confirms that all previously existing paths outside the article and ledger, including the original four diagram pairs, are unchanged. Four new asset files contain the two new Mermaid/SVG pairs. `git diff --check` passed.
- No live credential, paid upstream request, subprocess execution or failure-recovery test was performed. Responsive visual review remains pending; nothing was committed or pushed.


## Authorized publication preparation (2026-10-19)

- The user explicitly requested commit and push after the visual-review limitation had been disclosed. Publication is authorized; browser visual review is still unperformed, and no screenshot approval is claimed.
- The original main checkout was at `d84df2c`, while the fetched remote main had ten newer commits ending at `7394030888c77a9779436a98e74ad1d396b642c4`. The release uses an isolated worktree on that remote baseline so the already-published Daily changes remain intact. The original dirty checkout and its existing branch baseline are preserved.
- Release dependency audit found that the article's MechanismSequence component was still untracked and absent from published main. The release adds this existing standalone component and its four localized UI strings. The article imports it directly, so the unrelated barrel replacement, ScrollStory deletion, global motion/style migration, homepage edits and older-article conversions are excluded. The new shared component serves this article; existing component contracts and behavior are unchanged.
- Local alternatives: copying the component into the post would duplicate its layout/slot invariant; hardcoding its UI text would violate the site's centralized localization rule. The smallest prerequisite is the existing component plus additive localization keys, without changing existing exports or callers. Rollback is the scoped publication commit's revert.
- Fresh validation on the remote-based release tree: `npm test` passed all 22 tests; `npm run check` passed 95 files with zero diagnostic errors/warnings/hints; `npm run build` generated 233 pages; `npm run test:daily:integration` passed. Existing collection/deprecation/stemming notices remain. Installed dependencies were reused through a local node_modules symlink, which is excluded from the commit.
- Static release-output inspection confirms all six diagrams, five sequence rows, four tables, no duplicate IDs or broken fragment links, a disabled English toggle, Chinese-list presence and English-list absence. Inspected framework pages remain script-free. This baseline uses its existing single article module (2,502 bytes gzip), with no Mermaid runtime added.
- A pre-release hash manifest protects all pre-existing dirty/untracked paths. Publication contains the article, research ledger, twelve diagram source/vector files, the standalone sequence component and four added localization strings. No real credentials, paid upstream execution, account failover or runtime performance measurements were added.
