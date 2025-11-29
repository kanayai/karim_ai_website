---
description: How to sync work between computers using the sync script
---

# Git Sync Workflow

To avoid conflicts when working on multiple computers (e.g., Office Mac and Home PC), follow this simple "Push-Pull" rule.

## The Golden Rule
**"Sync BEFORE you start, Sync AFTER you finish."**

## How to use the Sync Script

I have created a helper script that does everything for you (Pull, Add, Commit, Push).

### 1. When you START working (Arrival)
As soon as you sit down at the computer, run:

```bash
./scripts/sync_work.sh
```

This ensures you have the latest work from your other computer.

### 2. When you FINISH working (Departure)
Before you leave the computer, run:

```bash
./scripts/sync_work.sh
```

This saves your work and sends it to the cloud so it's ready for your other computer.

---

## Troubleshooting

If the script fails, it usually means you have **conflicts** (you changed the same file on both computers without syncing).
In that case, you will need to resolve them manually or ask me for help!
