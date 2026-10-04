# Handoff — karim_ai_website
_Checkpoint 2026-10-04 (after M5)_

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
  Dead `MacDesktopLayout` still references `terminal.html` (M8).
- **M2 done** (browser-checked): 43c0e66 addresses via `src/routes.js` + History API (old `#file` links
  still work); 17c5e22 `public/_redirects` (section paths forced so `/contact` beats `contact.html`);
  1eac7df titles, `<html lang>`, `/es/bio` (Bio language lifted into App); aa22d42 index.html meta;
  19c6c01 `NavLink` real links + Workspace in mobile nav. **Open:** canonical/og:url/og:image need the
  live domain — done (karim-ai.netlify.app); `_redirects` verified live.
- **M3 done** (browser-checked): 1366e8f name + role shown at once, list after 0.45 s, Karim AI morph
  now returns to the full name; 046328d '# choose a section' cue, no auto-focus, focus outline.
  M3.3 (hidden `terminal` command) left optional/not done. About renamed to Bio in navs.
- **M4 done**: e70c022 Moodle look-alike (`TeachingLayout.jsx`, data in `src/constants/teachingData.js`);
  487a22e holding page removed. No public materials (Karim gave none). Levels inferred from unit codes.
- cc0f96d Bio infobox shows Karim's portrait (`public/images/karim-portrait.jpg`) instead of the crest.
- 67e9bff Bio text: PyPI references removed. **M5 done** (browser-checked iPhone 15 + desktop):
  6ebdd63 Bio header compact; 6a5d42b Contact portrait beside name (profile-pages.css, `!important`
  beats HtmlViewer's injected img rule); a881b97 Research README higher; b3f511e Journal top links
  hidden <640px. e8ec069 Home morph now ~2 s after load (Karim asked). M3.3 still undecided (recommend drop).
- Agents now have a browser: canonical `browser-check` skill (`playwright-cli`) — use it to verify
  every milestone at desktop + iPhone 15. In Codex, approve running it outside the sandbox.

## Resume point
**M6 — Accessibility and polish**, item 1: clickable div/li rows → real links/buttons (GitHub file
rows, Wiki wordmark `div` in `WikiLayout.jsx`).

## Next action
M6 in small commits; M7 (Workspace) still needs Karim's content. Browser-check each.

## Last safe commit
e8ec069 (pushed)

## Blockers
- None for M1–M3. M4 needs Karim's course list, Moodle URLs, public materials; M7 needs Workspace content.

## Local preview
`npm run dev` → http://localhost:5173/
