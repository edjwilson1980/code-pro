#!/usr/bin/env bash
# Paste this into your Claude cloud environment's "Setup script" box
# (claude.ai/code > environment settings). Runs when a cloud session starts.
set -e
npm install -g repomix >/dev/null 2>&1 || true
# Turn on the studio secret scan for any repo in the working folder
git config --global core.hooksPath .githooks 2>/dev/null || true
echo "Studio cloud setup complete"
