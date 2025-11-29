#!/bin/bash

# Sync Work Script
# Usage: ./scripts/sync_work.sh

echo "🔄 Starting Sync..."

# 1. Add all changes
echo "➕ Adding changes..."
git add .

# 2. Commit (if there are changes)
if git diff-index --quiet HEAD --; then
    echo "✅ No local changes to save."
else
    echo "💾 Committing changes..."
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
    HOSTNAME=$(hostname)
    git commit -m "WIP: Sync from $HOSTNAME at $TIMESTAMP"
fi

# 3. Pull latest changes (rebase to keep history clean)
echo "⬇️  Pulling latest changes..."
git pull --rebase origin main

if [ $? -ne 0 ]; then
    echo "❌ Error: Pull failed. You might have conflicts. Please resolve them manually."
    exit 1
fi

# 4. Push to remote
echo "⬆️  Pushing to cloud..."
git push origin main

if [ $? -eq 0 ]; then
    echo "🎉 Sync Complete! You are safe to switch computers."
else
    echo "❌ Error: Push failed. Check your internet connection or git status."
    exit 1
fi
