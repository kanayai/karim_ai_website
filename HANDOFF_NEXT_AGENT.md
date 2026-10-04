# Handoff — karim_ai_website
_Checkpoint 2026-10-04 13:30_

## Objective
Revamp the site from the October 2026 UX critique: six look-alike sections, each with its own
address, following `_admin/planning/2026-10_revamp-plan.md` (milestones M1–M8).

## Done so far
- Codex critique (code-based) + browser-verified follow-up in `_admin/reviews/` (v2 wins where they disagree).
- Karim's decisions recorded in `_admin/reviews/2026-10-04_decisions.md`: keep look-alikes; every page
  gets its own address; Teaching → Moodle look-alike; archive PyPI and Terminal layouts; Workspace
  stays (VS Code); Bio English + Spanish only; email-only contact, no CV; trust pop-up goes.
- Revamp plan written and committed: `_admin/planning/2026-10_revamp-plan.md`.
- Agents now have a browser: canonical `browser-check` skill (`playwright-cli`) — use it to verify
  every milestone at desktop + iPhone 15. In Codex, approve running it outside the sandbox.

## Resume point
Plan milestone **M1 — Quick removals**, item 1: remove the first-visit trust pop-up
(`src/components/WelcomeBanner.jsx`, rendered from `src/App.jsx` ~L280–284).

## Next action
Do M1 in three separate commits: (1) remove the trust pop-up; (2) archive PyPI + Terminal layouts
to `src/archive/` (unroute; drop `terminal/` from home list; Teaching → temporary holding page);
(3) drop French + Portuguese. Browser-check after each, then continue with M2 (real addresses).

## Last safe commit
0d0172f (tree clean, pushed)

## Blockers
- None for M1–M3. M4 needs Karim's course list, Moodle URLs, public materials; M7 needs Workspace content.

## Local preview
`npm run dev` → http://localhost:5173/
