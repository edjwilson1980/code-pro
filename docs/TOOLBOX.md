# Studio Toolbox

What's installed, what it's for, and what's optional. Updated 2026-10-01.

## Installed automatically (in every repo from this template)
| Tool | What it does for us | Saves credits by |
|---|---|---|
| **Context7** (MCP) | Live, version-correct docs for any library | No guessing APIs, no rework |
| **Playwright** (MCP) | Opens the app in a browser, clicks through it, screenshots | Catches broken UI before Ed sees it |
| **n8n-mcp** (MCP) | Knows every n8n node, validates workflows, searches templates; with API key, builds/edits workflows on our n8n | Validated first try instead of trial and error |
| **n8n skills** (plugin, czlonkowski/n8n-skills) | 14 skills: expressions, Code nodes, error handling, binary files, sub-workflows, AI agents, self-hosting | Avoids the classic n8n mistakes |
| **Haiku helpers** (`.claude/agents/`) | `docs-writer`, `test-runner`, `quick-edit` | Cheap model for cheap work |
| **Secret scan** (`.githooks/pre-commit`) | Blocks commits containing keys/passwords | Prevents a very expensive mistake |

## n8n: connecting Claude to our instance
1. In n8n: **Settings → n8n API → Create API key**. Use a test project/instance first.
2. PC: set Windows environment variables `N8N_API_URL` (e.g. `https://n8n.yourdomain.com`) and `N8N_API_KEY`, then restart Claude.
   Cloud: add the same two variables in claude.ai/code → environment settings.
3. Leave them blank and n8n-mcp still works for docs + validation; Claude hands you workflow JSON to import.

**Alternative: n8n's own built-in MCP server** (n8n 2.13+): Settings → Instance-level MCP. It can search, run and (newer versions) create/edit workflows, with OAuth sign-in. Good for *running* workflows from Claude; n8n-mcp is still better for *building* because of node docs and validation. Can run both.

## Optional, install when the job calls for it
| Tool | When | Install |
|---|---|---|
| **WooCommerce MCP** (official, developer preview) | Claude reading/updating products and orders on a WooCommerce store | Enable `mcp_integration` feature, WordPress Application Password, proxy `@automattic/mcp-wordpress-remote`. Test site first: it's preview software. |
| **Serena** (MCP) | Big codebases (20k+ lines): reads code by symbol instead of whole files | `/plugin install serena` in Claude Code (needs `uv`) |
| **Superpowers** (obra/superpowers) | Long builds: forces design → plan → test-driven build → review | `/plugin install superpowers@claude-plugins-official`. Use its "executing-plans" mode, which is cheaper. Overlaps with our kickoff, so use only for big builds. |
| **frontend-design** (Anthropic plugin) | Any customer-facing UI; avoids the generic "AI look" | `/plugin install frontend-design@claude-plugins-official` |
| **ccusage** | See where your credits went, by day, project and model | On PC: `npx ccusage@latest` |
| **Repomix** | Pack a whole repo into one file to hand to another AI | Already in cloud setup: `repomix` |

## Skip
- Random "MCP server lists" with dozens of servers. Every MCP server adds its tool list to every message, so install only what a project uses.
- Output-compression plugins ("caveman" style). They save a little on output but make the answers harder for you to read.
