#!/usr/bin/env node
// Studio auto-update check. Runs at session start (see .claude/settings.json).
// Free part: compares pinned tool versions to the latest releases (no AI credits).
// Then tells Claude whether today's research pass (docs/UPDATES.md) is due.
// Never installs or changes anything. Fails quietly when offline.
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const read = (p) => { try { return readFileSync(join(root, p), "utf8"); } catch { return null; } };
const run = (cmd) => { try { return execSync(cmd, { timeout: 8000, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { return null; } };

const lines = [];
const flags = [];

// 1. npm packages pinned in .mcp.json, e.g. "n8n-mcp@2.91.0"
try {
  const mcp = JSON.parse(read(".mcp.json") || "{}").mcpServers || {};
  for (const [name, cfg] of Object.entries(mcp)) {
    for (const a of cfg.args || []) {
      const m = /^(@?[^@\s]+)@(\d[\w.\-]*)$/.exec(a);
      if (!m) continue;
      const [, pkg, pinned] = m;
      const latest = run(`npm view ${pkg} version`);
      if (!latest) lines.push(`- ${pkg}: pinned ${pinned} (couldn't reach npm)`);
      else if (latest !== pinned) flags.push(`- ${pkg} (${name}): pinned ${pinned}, latest ${latest} → review release notes + security before bumping`);
    }
  }
} catch {}

// 2. GitHub repos we security-reviewed at a specific commit
try {
  const watch = JSON.parse(read(".claude/update-watch.json") || "{}");
  for (const g of watch.github || []) {
    const out = run(`git ls-remote https://github.com/${g.repo}.git refs/heads/${g.branch || "main"}`);
    const sha = out && out.split(/\s+/)[0];
    if (!sha) lines.push(`- ${g.name}: couldn't reach GitHub`);
    else if (sha !== g.reviewed) flags.push(`- ${g.name} (${g.repo}): changed since our security review (${g.reviewed.slice(0,7)} → ${sha.slice(0,7)}) → re-review its hooks/scripts before trusting the update`);
  }
} catch {}

// 3. Is today's research pass due?
const hours = (() => { try { return JSON.parse(read(".claude/update-watch.json")).checkEveryHours || 24; } catch { return 24; } })();
const m = /Last checked:\s*(\d{4}-\d{2}-\d{2})/.exec(read("docs/UPDATES.md") || "");
const last = m ? new Date(m[1] + "T00:00:00") : null;
const due = !last || (Date.now() - last.getTime()) / 36e5 >= hours;

const out = ["STUDIO UPDATE CHECK (automatic, session start)"];
if (flags.length) out.push("Pinned tools with updates available (do NOT install without Ed's OK):", ...flags);
else out.push("Pinned tools: all current.");
if (lines.length) out.push(...lines);
out.push(due
  ? `Research pass DUE (last: ${m ? m[1] : "never"}). Before writing any code this session, run the update check in docs/UPDATES.md ("How the check works"), log results there, then continue with Ed's request. Tell Ed the headline in 1–3 lines.`
  : `Research pass already done ${m[1]}. Skip it unless Ed asks. If any pinned tool above has an update, mention it in one line.`);
console.log(out.join("\n"));
