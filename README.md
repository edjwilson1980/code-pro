# Studio Starter

The starting point for every app the studio builds, whether for South Side DTF, personal projects, or clients.

## Start a new project
1. On GitHub, click **Use this template**, then **Create a new repository**.
2. Name it clearly (e.g. `clientname-store-rebuild`) and set it to **Private**.
3. Open it in Claude: the **Code** tab on your phone or claude.ai/code, or run `claude` in the folder on your PC.
4. On your PC, run once in the folder: `git config core.hooksPath .githooks` (turns on the secret scan; cloud does this automatically).
5. Say: **"Start the kickoff."** Claude runs the Q&A and fills in `docs/PROJECT_BRIEF.md`.
6. Approve the brief. Building starts after that.

## What's inside
| File | What it does |
|---|---|
| `CLAUDE.md` | Studio rules Claude follows every session: kickoff first, credit savers, parallel work, safety |
| `docs/KICKOFF_QUESTIONS.md` | The Q&A question bank, including client-job questions |
| `docs/PROJECT_BRIEF.md` | The project's blueprint and scope of work |
| `docs/PROGRESS.md` | Handoff note between sessions, plus who's working on what |
| `.mcp.json` | Context7 live docs + Playwright browser testing, in cloud and on your PC |
| `.claude/agents/` | Cheap Haiku helpers: `docs-writer`, `test-runner`, `quick-edit` |
| `.githooks/pre-commit` | Secret scan: blocks commits containing API keys or passwords |
| `scripts/cloud-setup.sh` | Paste into your cloud environment's setup script once |
| `.env.example` | Where keys go (as `.env`, which is never uploaded) |

## One-time cloud setup
In claude.ai/code, open your environment settings:
- Paste `scripts/cloud-setup.sh` into **Setup script**.
- If Context7 is blocked, add `mcp.context7.com` to the allowed domains.
