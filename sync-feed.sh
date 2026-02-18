#!/bin/zsh
# sync-feed.sh — run personal-feed sync with your usual shell environment

# Load your zsh config so PATH and nvm are available
source ~/.zshrc 2>/dev/null || true

cd /Users/t.j.ferriss/personal-feed

# Run the sync and log output with timestamps
echo "[$(date)] Starting npm run sync" >> sync.log
npm run sync >> sync.log 2>&1
echo "[$(date)] Finished npm run sync" >> sync.log

