# Updates Log

Last checked: 2026-10-01

> The session-start hook (`.claude/hooks/update-check.mjs`) checks pinned versions for free on every open. Once per day it asks Claude to run the research pass below before coding. Claude updates the date above and adds a dated entry at the top of the log.

## How the check works (Claude follows this)
**Budget:** about 10 searches/fetches. Skim release notes; don't read whole sites.

1. **Read the hook's output** for pinned tools with newer versions.
2. **Check the official sources** below for anything new since the last check date:
   | Area | Where to look |
   |---|---|
   | Claude Code (features, settings, hooks, models) | Claude Code changelog: github.com/anthropics/claude-code (CHANGELOG.md) and code.claude.com/docs |
   | n8n | n8n release notes (docs.n8n.io → Release notes) |
   | n8n-mcp / n8n skills | GitHub releases: czlonkowski/n8n-mcp, czlonkowski/n8n-skills |
   | Playwright MCP | GitHub releases: microsoft/playwright-mcp |
   | Stripe (MCP, API, deadlines) | docs.stripe.com/mcp and the Stripe changelog |
   | WooCommerce / WordPress | developer.woocommerce.com blog, WordPress security releases |
   | Security | GitHub security advisories for every package we pin; run `npm audit` if the project has a package.json |
3. **Project-specific:** read the Tech plan in `docs/PROJECT_BRIEF.md` and search for updates, deprecations or security issues in that stack (e.g. a client's framework or plugin).
4. **Log it:** add an entry at the top of the log below and update "Last checked". Max 5 bullets. For each one: what changed, whether it matters to us, and the suggested action. Include a `Security:` line for anything we'd install or upgrade.
5. **Report to Ed** in 1 to 3 lines before starting his task. Example: "Updates: n8n 2.40 adds X (useful for gang-sheet flow). Playwright MCP has a new version; want me to review and bump it?"
6. **Never auto-apply.** Version bumps, new tools and rule changes wait for Ed's OK. After approval: review the release notes and the scripts it runs, bump the pin (`.mcp.json` or `.claude/update-watch.json` "reviewed"), commit, and note it here.
7. **Getting smarter:** if an update changes how we should work (a new Claude Code feature that saves credits, a deprecation), propose the exact `CLAUDE.md` or `TOOLBOX.md` edit to Ed.

## Log
<!-- Newest first. Format:
### YYYY-MM-DD
- What changed → matters? → action
-->

### 2026-10-01 (first check)
- **WooCommerce 11.1.2 is a security release (Sept 22).** It tightens checks on email-based reviews. → Matters: South Side DTF runs WooCommerce. → Action: confirm the store is on 11.1.2+; update on SiteGround staging first, then live. Security: High if skipped.
- **Stripe MCP deadline Oct 31, 2026.** Plain secret/restricted keys stop working for AI connections. → Action: use OAuth or Agent keys only (already our standard in TOOLBOX).
- **Claude Code 2.1.287.** Fixes plugin start-up hooks not running in new cloud sessions; adds "You should know", an optional side agent that flags missed issues. → Action: none needed; "You should know" is worth a trial on a big build.
- **n8n 2.40 is current (Sept 15).** AI Agent can force a tool call on the first step (helps cheaper models behave). → Action: check our n8n version next time we touch the order workflows.
- **Context7 blocked in the cloud environment** (proxy refused the connection). → Action for Ed: claude.ai/code → environment settings → allowed domains → add `mcp.context7.com`.
- Pinned tools (Playwright MCP 0.0.83, n8n-mcp 2.91.0, n8n skills 19cd793): all current.
