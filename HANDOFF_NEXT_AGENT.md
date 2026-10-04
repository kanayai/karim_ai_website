# Handoff — karim_ai_website
_Checkpoint 2026-10-04 (after M1)_

## Objective
Revamp the site from the October 2026 UX critique: six look-alike sections, each with its own
address, following `_admin/planning/2026-10_revamp-plan.md` (milestones M1–M8).

## Done so far
- Codex critique (code-based) + browser-verified follow-up in `_admin/reviews/` (v2 wins where they disagree).
- Karim's decisions recorded in `_admin/reviews/2026-10-04_decisions.md`: keep look-alikes; every page
  gets its own address; Teaching → Moodle look-alike; archive PyPI and Terminal layouts; Workspace
  stays (VS Code); Bio English + Spanish only; email-only contact, no CV; trust pop-up goes.
- Revamp plan written and committed: `_admin/planning/2026-10_revamp-plan.md`.
- **M1 done** (browser-checked desktop + iPhone 15): 593100d pop-up removed; 05f6b21 PyPI/Terminal
  archived to `src/archive/`, Teaching → `TeachingHolding.jsx`; 340180f French/Portuguese dropped.
  Not pushed. Dead `MacDesktopLayout` still references `terminal.html` (M8).
- Agents now have a browser: canonical `browser-check` skill (`playwright-cli`) — use it to verify
  every milestone at desktop + iPhone 15. In Codex, approve running it outside the sandbox.

## Resume point
Plan milestone **M2 — Real addresses**, item 1: map sections/files to URL paths, sync `activeFile`
with the History API in `src/App.jsx` (home links currently use `#file` hashes).

## Next action
M2 in small commits (1 addresses + back/forward; 2 `public/_redirects`; 3 titles/lang; 4 index.html
meta; 5 real links + Workspace in mobile nav). Browser-check each.

## Last safe commit
340180f (tree clean, not pushed)

## Blockers
- None for M1–M3. M4 needs Karim's course list, Moodle URLs, public materials; M7 needs Workspace content.

## Local preview
`npm run dev` → http://localhost:5173/
