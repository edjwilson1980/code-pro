# Skills & Plugins Library

Skills teach Claude how to do a specific kind of job well, like Stripe best practices, writing n8n expressions, or building an Excel file. **Each project gets only the skills it needs.**

**Why not install them all?**
- **Cost:** every installed skill or plugin adds its description to every message.
- **Accuracy:** with too many skills, Claude picks the wrong one more often.
- **Security:** plugins can run scripts and bring their own connections. Fewer plugins means a smaller attack surface.

Reviewed 2026-10-01 against Anthropic's official marketplace (`claude-plugins-official`, 315 plugins) and Anthropic's skills repo (`anthropics/skills`).

## How Claude picks them (every project)
1. **After the PRD (`docs/PROJECT_BRIEF.md`) is approved,** never before, Claude runs the skill hunt: the match table below first, then a search of the official marketplace, anthropics/skills and the vendor repos for the PRD's stack. It proposes **3 to 5 at most**, each with why it's needed and a `Security:` line.
2. **Ed approves** the list. Claude adds only the approved ones (see "How to add") and lists them in the brief's Tech plan.
3. **During the project:** the daily update pass rechecks this project's skills, and any change in scope (new integration, approaching launch) triggers a mini hunt for just that change.
4. **In the daily update pass,** Claude checks whether a new official skill fits this project's stack, or an installed one changed. It proposes but never auto-adds.
5. **Remove what's unused.** If a skill hasn't been needed for the project's current phase, propose removing it.
6. **Prefer official:** vendor-made (Stripe, Sentry, Vercel, Automattic) or Anthropic over community. A community skill needs its scripts read before adding.

## Match table
| If the project... | Add | Source | Security |
|---|---|---|---|
| Uses n8n | **n8n skills** plugin + **n8n-mcp** server | czlonkowski/n8n-skills (community, reviewed 19cd793) | Low (hooks only print reminders); **High** if the n8n key points at production |
| Takes payments with Stripe | **stripe** plugin (best practices, docs, upgrades; sets up Stripe MCP) | Stripe, official | Medium: sandbox only via OAuth. **High** in live mode. |
| Is a WordPress/WooCommerce plugin or custom PHP | **php-lsp** (code intelligence, catches errors before testing) | Anthropic | Low: runs locally, needs `npm i -g intelephense` |
| Is a brand-new WordPress block theme/site (not an existing SiteGround site) | **build-with-wordpress** | Automattic, official | Low/Medium: needs WordPress Studio on the PC |
| Has customer-facing screens (store pages, landing pages, apps) | **frontend-design** | Anthropic | Low: instructions only |
| Is JavaScript/TypeScript/Next.js | **typescript-lsp** | Anthropic | Low: runs locally |
| Deploys on Vercel | **vercel** plugin | Vercel, official | Medium: can deploy and change domains. Preview deploys only without Ed's OK. |
| Uses Supabase | **supabase** plugin | Supabase community (official org) | **High**: database access. Use a dev project, read-only where possible. |
| Reports errors to home base (Sentry) | **sentry** plugin (reads issues and stack traces to debug) | Sentry, official | Medium: reads error data, which can contain user info. Scrub personal data at the source. |
| Sends email (receipts, notifications) | **resend** | Resend, official | Medium: can send email. Test domain or sandbox first. |
| Sends texts | **twilio-developer-kit** | Twilio, official | Medium: can send SMS, which costs money. Test numbers first. |
| Produces documents (quotes, invoices, reports, spreadsheets, decks) | Copy only the needed skill folder (**xlsx**, **docx**, **pdf** or **pptx**) | anthropics/skills | Low: instructions plus local scripts. Copy into `.claude/skills/` so the version is locked. |
| Builds an MCP server or a Claude-powered feature | **mcp-builder** and/or **claude-api** skill folder | anthropics/skills | Low |
| Codebase over ~20k lines | **serena** | Oraios (via official marketplace) | Low/Medium: runs a local server (needs `uv`) |
| Handles customer data, payments, or is a client job | **security-guidance** (warns on risky edits, reviews each change) | Anthropic | Low: strongly recommended |
| Is about to launch (one-time) | **claude-security** deep scan, then remove | Anthropic | Low |
| Has 2+ agents working in parallel or uses pull requests | **code-review** | Anthropic | Low |
| Is a big multi-week build | **superpowers** (use "executing-plans", the cheaper mode) | obra (community, in official marketplace) | Low/Medium: read its hooks first |

Don't add one just because it exists. If nothing in the table fits a need, Claude searches the official marketplace first, then vendor repos, and proposes with a security line.

## How to add (Claude does this after Ed's OK)
- **Plugin from the official marketplace:** add `"<name>@claude-plugins-official": true` under `enabledPlugins` in this project's `.claude/settings.json`. If Claude Code doesn't know that marketplace, add it under `extraKnownMarketplaces` as GitHub repo `anthropics/claude-plugins-official`.
- **Plugin from a vendor's own marketplace** (e.g. n8n skills): add the repo under `extraKnownMarketplaces`, then enable it under `enabledPlugins`.
- **Single skill from anthropics/skills:** copy just that folder into `.claude/skills/<name>/` and commit it, noting the source commit in the commit message.
- **If the plugin brings an MCP server or hooks:** read them first, add the server name to `enabledMcpjsonServers` if it's in `.mcp.json`, and add the repo and reviewed commit to `.claude/update-watch.json` so the update check flags changes.
- Record what was added in `docs/PROJECT_BRIEF.md` (Tech plan → Skills/plugins).

### n8n add-on (copy when the project uses n8n)
`.mcp.json`:
```json
"n8n-mcp": {
  "type": "stdio", "command": "npx", "args": ["-y", "n8n-mcp@2.91.0"],
  "env": { "MCP_MODE": "stdio", "LOG_LEVEL": "error", "DISABLE_CONSOLE_OUTPUT": "true",
           "N8N_API_URL": "${N8N_API_URL:-}", "N8N_API_KEY": "${N8N_API_KEY:-}" }
}
```
`.claude/settings.json`: add `"n8n-mcp"` to `enabledMcpjsonServers`, plus
```json
"extraKnownMarketplaces": { "n8n-mcp-skills": { "source": { "source": "github", "repo": "czlonkowski/n8n-skills" } } },
"enabledPlugins": { "n8n-mcp-skills@n8n-mcp-skills": true }
```
