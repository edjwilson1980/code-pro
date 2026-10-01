#!/usr/bin/env bash
# Paste this into your Claude cloud environment's "Setup script" box
# (claude.ai/code > environment settings). Runs when a cloud session starts.
set -e
npm install -g repomix >/dev/null 2>&1 || true
echo "Studio cloud setup complete"
