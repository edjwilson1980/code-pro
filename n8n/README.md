# n8n workflows

Every workflow Claude builds or changes gets exported here as JSON (`<name>.json`), so we have version history and can roll back.

Rules:
- Build and test on a copy named `[TEST] <name>`; only swap into the live workflow after Ed's OK.
- Never paste credentials into workflow JSON. n8n stores them in its own Credentials; the export only references them by name.
- After a change goes live, re-export and commit it here with a plain-English message.
