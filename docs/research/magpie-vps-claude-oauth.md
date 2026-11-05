# Personal Magpie VPS gateway research

## Intent, scope, and plan

Produce one Chinese teaching article from the two QianFan posts, with current primary-source verification. Own only the new article, `src/assets/magpie-vps/`, and this ledger. Do not alter the existing Magpie article or shared components, deploy a VPS, read credentials, or make authenticated model requests. Stages: inventory both posts; pin upstream; trace login/callback/proxy/storage; draft deployment and acceptance procedures; humanize; native check/build and preview review. Browser-driven verification depends on an available browser provider.

## Sources and version

Fetched 2026-11-02. Upstream source commit `ccd746e03937ad6d9fbce69d9113c425ca215708` (local shallow clone under `/private/tmp/magpie-vps-research/source`). This is a source snapshot, not proven equivalent to the mutable Docker `latest` tag or a live deployment. Both input posts are dated 2026-10-22. The deployment author records Magpie 1307→1318 and Caddy 2.11.7, not our observations.

Secondary sources:
- https://blog.mapin.net/posts/Magpie%20服务器部署实践
- https://blog.mapin.net/posts/Magpie%20模型路由实践

Primary sources:
- Pinned `docs/reference.md`, `Dockerfile`, `internal/provider/claude_signin.go`, `internal/cli/accounts_cli.go`, `internal/claudecode/claudecode.go`, `internal/netproxy/bridge.go`, `docs/subsystems/claude-subscription-bridge.md`, and `internal/provider/google.go` in yetone/magpie.
- https://usemagpie.ai/docs/remote
- https://code.claude.com/docs/en/authentication
- https://code.claude.com/docs/en/network-config
- https://code.claude.com/docs/en/legal-and-compliance
- https://support.claude.com/en/articles/14328960-identity-verification-on-claude
- https://docs.docker.com/engine/install/ubuntu/
- https://caddyserver.com/docs/caddyfile/directives/reverse_proxy
- https://caddyserver.com/docs/caddyfile/directives/handle_path

The supported-regions page retrieved during research carried a future effective date of 2026-11-12. Do not represent that future version as already effective. No exhaustive regional eligibility/legal assessment is made.

## Complete input inventory

Deployment post: background and 11 numbered sections, all read: (1) topology; (2) Compose and persistence; (3) HTTPS/path forwarding, including prefix subsection; (4) key separation; (5) outbound proxy caveats; (6) server authorization; (7) Remote Magpie and migration; (8) agent instructions; (9) author validation boundaries; (10) backup/rollback; (11) nightly updates, timer/service, idle heuristic and failure boundaries. Source code snippets and the final maintenance commands were read. Navigation/donation/footer excluded.

Routing post: background/subscription budget and 9 numbered sections, all read: (1) task groups; (2) entry/group/account selection; (3) intent rules; (4) classifier/compact/effort; (5) manual paid emergency; (6) agent configuration; (7) main/subagent references; (8) validation; (9) observations; references read. Navigation/donation/footer excluded. Coverage uses all 20 numbered units and both backgrounds, but avoids reproducing the author's prose or complete routing rules. Budget/account-purchasing details are deliberately not a recommended procurement procedure.

## Findings and editorial decisions

- Headless Claude sign-in is started by Magpie as the genuine `claude auth login --claudeai`, in its own temporary config directory. `claudePaste` accepts the final loopback callback with matching port and a code, or the displayed `code#state`; it delivers it to the waiting local CLI. Do not hardcode Codex's 1455 callback port as Claude's.
- A request using a Claude subscription runs the real Claude CLI and bridges caller tools. Do not describe it as arbitrary OAuth bearer replay or vendor-approved API conversion.
- `EnvForBunWith` now bridges SOCKS5 to HTTP for supported local CLI paths; this improves on the input post's uncertain older-source observation. The user's client settings path can differ. No claim of universally forced egress, DNS isolation, refresh success, or KYC prevention.
- `magpie claude-code install` downloads the vendor's build into the persistent cache and checks manifest size/SHA. It need not create a `claude` command on PATH. Installing only on the VPS host does not install it inside the container.
- Use named `/config` volume; maintain nonroot uid 65532. Keep admin private through SSH by default; expose only `/v1` and `/v1beta` through Caddy in the proposed public gateway. Explain the source's optional public-admin variant without requiring it.
- Current legal documentation distinguishes personal sign-in to the unmodified CLI from developer collection/intermediation of credentials. Personal technical feasibility is not an authorization guarantee. Provide an official native-CLI login path separately.
- KYC has no published zero-trigger configuration. Do not provide forged identity, regional masking, purchased accounts, fingerprint impersonation, or repeated retry strategies as a solution.
- Use one group for one Claude account initially. Four task groups and an intent classifier are optional, with a real extra inference cost. API fallback is manual and explicit.

## Number ledger and verification boundaries

3425/3430 are documented ports, 65532 the image uid; 443/80 are proposed HTTPS/ACME ports, 22 only the default SSH example (actual port must be checked). 0600/0700 are access modes, not encryption. `latest` is mutable. Source author subscription budgets are not carried into the new plan. All model names are obtained from the actual catalog. Commands in the article are proposed operations, not an execution transcript.

Four Mermaid diagrams: compact cover, ingress/control separation, OAuth handoff, and credential ownership/refresh. All are explanatory, without real account data. Render to static SVG, normalize colors to project tokens, embed without a Mermaid browser runtime.

## Humanize and final validation

Applied the repository-local humanize-text gate after drafting, preserving commands, source links and technical limits. Revised the proxy explanation, routing transition, and SSH preparation wording; retained the distinction between personal native-CLI authentication and third-party gateway approval. Read through the complete eleven-section draft. No invented account-risk score, guaranteed KYC avoidance, VPS benchmark, or firsthand deployment experience.

Four Mermaid inputs (including a compact cover) rendered with the official Mermaid CLI from a temporary npm tool installation. Generated SVGs have unique per-diagram IDs, token colors, and no gradients or filters. Narrow diagrams use local overflow regions with keyboard focus; the OAuth chapter explains horizontal navigation. No new renderer or repository dependency was added.

- Final `npm run check`: 76 files, zero errors/warnings/hints in diagnostics.
- Final `npm run build`: 226 pages, Pagefind indexed 35 pages. Existing empty collection warnings and Chinese stemming notes remain.
- Built HTML: eleven numbered headings 01–11, no duplicate IDs; new post linked from Chinese home and posts list, absent from English posts list; no English counterpart, toggle disabled. One existing article enhancement module, no Mermaid runtime. The original checkout's local build has no Umami ID supplied; published analytics configuration is unchanged by this task.
- All four SVGs parse as XML. `git diff --check` passed for the owned paths.
- `npm run preview` reported the existing server at localhost:4321. Its new article route returned 200. The requested alternate 4322 endpoint failed on IPv4 and was not used further.
- Browser DOM host unavailable; native Edge accessibility and screenshot access succeeded. Reviewed screenshots at 1280, 1680, 768 and 390 widths, including OAuth and credential diagrams, wide TOC clearance, and the command-palette reduced-motion emulation. Corrected a too-tall initial hero by moving the complete ingress chart into chapter 2 and adding a compact cover. Removed Mermaid's default shadow and non-token colors. During a rebuild an old stylesheet reference briefly returned 404; a post-build reload removed it. Remaining visible console messages came from an installed browser extension (`chrome-extension://…/editor/content.js`), not article code.
- Device-emulation editing briefly produced width=1 and inflated page scaling. Reset device emulation and repeated the final 1280/390 screenshots; the prior 1680 chapter screenshot showed the TOC and OAuth graph without overlap. Preview screenshots were shown in tool output, not saved into the repository. This is a manual visual review, not an automated no-overflow assertion or full cross-browser certification.
- Native container validation could not run: installed `docker` has no `compose` subcommand and no daemon at `/var/run/docker.sock`; Caddy is not installed. No real VPS, account, DNS, ACME, proxy, paid request, credential renewal, backup restoration or model-tool integration was executed. These remain acceptance steps for the actual deployment.
- Owned additions only: one MDX article, this ledger, four Mermaid/SVG pairs. No shared module, established public contract, credentials or account settings changed; no delegated work, commit or publication.

Preview: http://localhost:4321/posts/2026-10-22-magpie-vps-claude-oauth/

## Explicit humanize-text revision

At the user's request, revised the cover lead and narrative prose throughout all eleven sections. Removed repetitive reminders, stiff transitions and indirect instructions while preserving factual scope and the distinction between authorization, token exchange and a working model request. Read the revised prose against the original draft; corrected wording that would have narrowed a restoration failure to a startup failure.

Editorial comparison against the pre-revision snapshot confirmed unchanged front matter, fenced commands/configuration, tables, ordered OAuth steps, section headings, URLs, inline identifiers and closing summary. All eight Mermaid/SVG asset hashes are unchanged. This comparison is an editorial preservation check, not regression coverage.

Re-ran `npm run check`: 76 files, zero errors, warnings or hints. `npm run build` passed; it emitted module-level `use astro:head-inject` bundling warnings, empty-collection warnings and Chinese stemming notes. These were not changed by this prose pass. Native Edge access initially returned an unrelated existing window, but preview navigation did not take effect and a subsequent action failed with `noWindowsAvailable`. No new desktop/mobile screenshot review was completed for this prose revision; the earlier visual review applies to the unchanged layout and diagrams. No VPS or provider execution was performed. Only the article and this ledger were edited in this pass; no shared module, public contract, commit or publication changed.

## Network selection and Tailscale expansion

User requested an actual explanation of Caddy and a detailed Tailscale alternative, including selection criteria. Owned scope remains this ledger and the article. Added a network decision table, defined reverse proxy/TLS/DNS and loopback access, made Tailscale Serve the recommendation for personal devices, and retained public Caddy as an explicit alternative. Existing proxies may be retained. Added SSH model forwarding for a minimal first check.

Fetched official documentation on 2026-11-02: Caddy automatic HTTPS; Tailscale private Docker hosting, Serve CLI, Linux installation, access control, grant examples, firewall ports, HTTPS certificates, Funnel and exit nodes. These ten primary references were added to front matter (25 sources total: two original secondary articles and 23 primary references). The original two-post coverage remains unchanged. Recommendations are our deployment choices, rather than a claim that the original author used Tailscale.

Walkthrough now covers host installation and separate Tailscale authentication, client enrollment, MagicDNS/HTTPS prerequisites, certificate transparency, Serve status/background forwarding/targeted removal, application key retention, group/tag grants, additive policy behavior, management SSH preservation, unauthorized/offline access checks and gateway URL propagation. Explicitly distinguishes Serve from public Funnel, full-port forwarding from Caddy's path allowlist, and ordinary OpenSSH over the tailnet from Tailscale SSH. Explains why joining Tailscale alone does not expose a loopback-bound Docker port, and why ordinary Tailscale/Serve changes neither public egress nor Claude's localhost callback. No exit node or public exposure was configured.

Moved the existing Caddy topology diagram into the public branch without modifying assets. Updated Compose's advertised URL, client instructions, curl examples, acceptance criteria, maintenance guidance and final recommendations to follow the chosen branch. Twelve numbered sections now keep the existing anchor IDs and add `tailscale-and-ssh`. No shared component or established public contract changed. Applied the humanize-text gate to the new technical prose, retaining exact commands and source claims.

`npm run check` passed (76 files, zero diagnostics) and `npm run build` passed after drafting. Both native checks passed again after the final loopback explanation; check still reported zero diagnostics, and the build retained its module-directive/empty-collection warnings and Chinese stemming notes. Preview returned HTTP 200. Visual review remains blocked: computer-use inventory returned no apps/browsers, with `Sky Computer Use native pipe startup failed` and `The browser access host is unavailable`. No new screenshots are claimed. No Tailscale/Caddy binaries are available for local execution; real VPS enrollment, policy enforcement, TLS issuance, streams, device disconnection and provider authentication remain unverified. No user network configuration, credentials, commits or publication changed.
