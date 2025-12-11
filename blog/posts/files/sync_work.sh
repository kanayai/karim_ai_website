#!/bin/bash

# ==============================================================================
# 🔄 ACADEMIC SYNC SCRIPT v3.0 (Dynamic Branch Support)
# ==============================================================================

# ------------------------------------------------------------------------------
# ⚙️ CONFIGURATION
# ------------------------------------------------------------------------------
TARGET_DIRS=(
    "$HOME/Projects/Teaching"
    "$HOME/Projects/Research/certest"
    "$HOME/Projects/Website"	
)

# ------------------------------------------------------------------------------
# 🏁 INITIALIZATION
# ------------------------------------------------------------------------------
echo ""
echo "=========================================================="
echo "🔄 STARTING SYNC: $(date '+%Y-%m-%d %H:%M')"
echo "=========================================================="
echo ""

# Array to store the final report
SUMMARY_REPORT=()
has_errors=false

sync_repo() {
    local repo_path="$1"
    local name=$(basename "$repo_path")
    local status_icon="✨"
    local status_text="Clean (No changes)"
    
    cd "$repo_path" || return
    if [ ! -d ".git" ]; then return; fi

    echo "📂 Processing: $name"

    # Get current branch dynamically
    local current_branch=$(git branch --show-current)
    if [ -z "$current_branch" ]; then
        echo "   ⚠️  WARNING: Detached HEAD state - skipping."
        SUMMARY_REPORT+=("⚠️  $name|Detached HEAD - Skipped")
        return
    fi

    echo "   🌿 Branch: $current_branch"

    # Get start hash to compare later
    local start_hash=$(git rev-parse HEAD)

    # 1. ADD & COMMIT
    git add .
    if ! git diff-index --quiet HEAD --; then
        # Check if this is a feature branch with local changes - prompt for confirmation
        if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
            echo -n "   ⚠️  Feature branch with local changes. Sync '$current_branch'? (y/n): "
            read -r response
            if [[ ! "$response" =~ ^[Yy]([Ee][Ss])?$ ]]; then
                echo "   ⏭️  Skipped by user."
                SUMMARY_REPORT+=("⏭️  $name ($current_branch)|Skipped by User")
                return
            fi
            echo "   ✅ Confirmed. Proceeding with sync..."
        fi
        timestamp=$(date "+%Y-%m-%d %H:%M")
        git commit -m "Auto-Sync: $(hostname) at $timestamp" --quiet
        echo "   💾 Local changes committed."
    fi
    
    # Get hash after commit
    local post_commit_hash=$(git rev-parse HEAD)

    # 2. CHECK IF REMOTE BRANCH EXISTS (auto-push new branches)
    if ! git ls-remote --exit-code --heads origin "$current_branch" &>/dev/null; then
        echo "   🆕 New branch detected - auto-pushing to remote."
        if git push -u origin "$current_branch" --quiet 2>/dev/null; then
            echo "   ✅ New branch pushed to remote."
            SUMMARY_REPORT+=("🆕 $name ($current_branch)|New Branch Pushed")
        else
            echo "   ❌ ERROR: Failed to push new branch."
            SUMMARY_REPORT+=("❌ $name ($current_branch)|Push Failed")
            has_errors=true
        fi
        return
    fi

    # 3. PULL (REBASE)
    if ! git pull --rebase origin "$current_branch" --quiet 2>/dev/null; then
        echo "   ❌ ERROR: Pull failed (Conflict or network issue)."
        SUMMARY_REPORT+=("❌ $name ($current_branch)|Merge Conflict - Check Manually")
        has_errors=true
        return
    fi

    # Get hash after pull
    local end_hash=$(git rev-parse HEAD)

    # 4. PUSH
    if ! git push origin "$current_branch" --quiet 2>/dev/null; then
        echo "   ❌ ERROR: Push failed."
        SUMMARY_REPORT+=("⚠️  $name ($current_branch)|Push Failed (Internet?)")
        has_errors=true
        return
    fi

    # ---------------------------------------------------------
    # ANALYZE WHAT HAPPENED
    # ---------------------------------------------------------
    # Did we commit locally? (Start != Post_Commit)
    local local_change=false
    if [ "$start_hash" != "$post_commit_hash" ]; then local_change=true; fi

    # Did we download changes? (Post_Commit != End)
    local remote_change=false
    if [ "$post_commit_hash" != "$end_hash" ]; then remote_change=true; fi

    # Determine Final Status Label
    local branch_suffix=""
    if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
        branch_suffix=" ($current_branch)"
    fi

    if [ "$local_change" = true ] && [ "$remote_change" = true ]; then
        status_icon="🔄"
        status_text="Synced (Merged Up & Down)"
        echo "   ✅ Synced."
    elif [ "$local_change" = true ]; then
        status_icon="⬆️ "
        status_text="Pushed Local Work"
        echo "   ✅ Pushed."
    elif [ "$remote_change" = true ]; then
        status_icon="⬇️ "
        status_text="Pulled Remote Updates"
        echo "   ✅ Pulled."
    else
        echo "   💤 No changes."
    fi

    # Add to report array
    SUMMARY_REPORT+=("$status_icon $name$branch_suffix|$status_text")
}

# ------------------------------------------------------------------------------
# 🔄 MAIN LOOP
# ------------------------------------------------------------------------------
for parent in "${TARGET_DIRS[@]}"; do
    if [ -d "$parent" ]; then
        for d in "$parent"/*/; do
            d=${d%/}
            if [ -d "$d" ]; then sync_repo "$d"; fi
        done
    fi
done

# ------------------------------------------------------------------------------
# 📊 FINAL SUMMARY TABLE
# ------------------------------------------------------------------------------
echo ""
echo "=========================================================="
echo "📊 FINAL REPORT"
echo "=========================================================="

# Loop through the report array and format nicely
# We use IFS='|' to split the Name from the Status
IFS="|"
for item in "${SUMMARY_REPORT[@]}"; do
    set -- $item
    # $1 is the Repo Name (with icon), $2 is the Status Text
    printf "%-40s %s\n" "$1" "$2"
done

echo "=========================================================="
if [ "$has_errors" = true ]; then
    echo "❌ WARNING: Some repos failed. Check the log above."
else
    echo "✨ All repositories are safe and synced."
fi
echo "=========================================================="
