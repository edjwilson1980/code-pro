# Studio Toolbox

What's installed, what it's for, and what's optional. Updated 2026-10-01.

## Installed automatically (in every repo from this template)
| Tool | What it does for us | Saves credits by |
|---|---|---|
| **Context7** (MCP) | Live, version-correct docs for any library | No guessing APIs, no rework |
| **Playwright** (MCP) | Opens the app in a browser, clicks through it, screenshots | Catches broken UI before Ed sees it |
| **Auto-update check** (session-start hook) | Free version check every open, plus a daily research pass | Keeps us current without paying twice a day |
| **Design director** (`.claude/agents/design-director.md`) | Picks the look with you, reviews every screen at phone and desktop size, signs off before launch | Catches "works but looks off" before you see it |
| **Haiku helpers** (`.claude/agents/`) | `docs-writer`, `test-runner`, `quick-edit` | Cheap model for cheap work |
| **Secret scan** (`.githooks/pre-commit`) | Blocks commits containing keys/passwords | Prevents a very expensive mistake |

**Added per project, not by default:** n8n-mcp + n8n skills, Stripe, Google, and every other skill or plugin. See `docs/SKILLS.md` for the match table.

## n8n: connecting Claude to our instance (when a project uses n8n)
1. In n8n: **Settings → n8n API → Create API key**. Use a test project/instance first.
2. PC: set Windows environment variables `N8N_API_URL` (e.g. `https://n8n.yourdomain.com`) and `N8N_API_KEY`, then restart Claude.
   Cloud: add the same two variables in claude.ai/code → environment settings.
3. Leave them blank and n8n-mcp still works for docs + validation; Claude hands you workflow JSON to import.

**Alternative: n8n's own built-in MCP server** (n8n 2.13+): Settings → Instance-level MCP. It can search, run and (newer versions) create/edit workflows, with OAuth sign-in. Good for *running* workflows from Claude; n8n-mcp is still better for *building* because of node docs and validation. Can run both.

## Optional connections, install when the job calls for it
(Skills and plugins such as frontend-design, Serena and Superpowers are in `docs/SKILLS.md`.)
| Tool | When | Install |
|---|---|---|
| **WooCommerce MCP** (official, developer preview) | Claude reading/updating products and orders on a WooCommerce store | Enable `mcp_integration` feature, WordPress Application Password, proxy `@automattic/mcp-wordpress-remote`. Test site first: it's preview software. |
| **ccusage** | See where your credits went, by day, project and model | On PC: `npx ccusage@latest` |
| **Repomix** | Pack a whole repo into one file to hand to another AI | Already in cloud setup: `repomix` |

## Per-project add-ons: payments and Google
Add these to the project's `.mcp.json` **only when the kickoff says the project uses them**. Each server adds its tool list to every message.

### Stripe (official): add when the project takes payments
Stripe's own server. Sign-in is OAuth, so there's no key in the repo. When you connect, you choose **sandbox only** or live, with separate permissions for each.
```json
"stripe": { "type": "http", "url": "https://mcp.stripe.com" }
```
Then run `/mcp` in Claude Code and sign in to Stripe. **Pick the sandbox** for building.
- It can search Stripe's docs, plan an integration, and read and write customers, products, prices, payment links, subscriptions, invoices and webhooks. Refunds and payouts need you to click an approve link first.
- Bonus: `npm install -g @stripe/cli` then `stripe agent setup` adds Stripe's official skills to Claude Code.
- **Deadline Oct 31, 2026:** Stripe's MCP will stop accepting regular secret and restricted keys. Use OAuth (above) or a new **Agent key** (Stripe Dashboard → API keys, the ones with the "Agent" badge). This only affects AI connections; your store's normal Stripe keys are unaffected.

### Google Workspace (Gmail, Drive, Sheets, Docs, Calendar, Forms, Apps Script)
- **Everyday use** (find an email, read a Drive file): use the Gmail/Drive/Calendar connectors already in claude.ai. No setup needed.
- **Inside a build** (an app or script that works with Sheets, Drive, Gmail): use **Workspace MCP** (taylorwilsdon/google_workspace_mcp, MIT). It works with personal Gmail accounts. Load only the tools you need, to keep cost down:
```json
"google": {
  "type": "stdio",
  "command": "uvx",
  "args": ["workspace-mcp==1.30.1", "--tool-tier", "core", "--tools", "drive", "sheets"],
  "env": {
    "GOOGLE_OAUTH_CLIENT_ID": "${GOOGLE_OAUTH_CLIENT_ID:-}",
    "GOOGLE_OAUTH_CLIENT_SECRET": "${GOOGLE_OAUTH_CLIENT_SECRET:-}"
  }
}
```
  One-time setup: Google Cloud Console → create a project → enable the APIs you need → create an OAuth client (Desktop app) → put the ID and secret in your environment variables. Add `--read-only` when Claude only needs to look.
- **Google's own Workspace servers** (gmailmcp.googleapis.com and others) are in Developer Preview and need enrollment. Skip them for now; revisit when they're generally available.

### Google Analytics 4 (official, Google): add for store or marketing projects
Lets Claude answer questions like "which products drove the most revenue last month" from your GA4 data. Setup: a Google Cloud project with the Analytics APIs enabled, plus a sign-in. It reads data only.

## Skip
- Random "MCP server lists" with dozens of servers. Every MCP server adds its tool list to every message, so install only what a project uses.
- Output-compression plugins ("caveman" style). They save a little on output but make the answers harder for you to read.
