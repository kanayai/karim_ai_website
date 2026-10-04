# Handoff — karim_ai_website
_Checkpoint 2026-10-04 16:40_

## Objective
October 2026 revamp (`_admin/planning/2026-10_revamp-plan.md`): six look-alike sections, each with its
own address, consistent light/dark, live at https://karim-ai.netlify.app/.

## Done so far
- **M1–M6 and M8 done**, all browser-checked (desktop + iPhone 15) and live. Real addresses
  (`src/routes.js`, `public/_redirects`), Moodle-style Teaching (`TeachingLayout.jsx`, data in
  `src/constants/teachingData.js`), Bio portrait + en/es only, phone fixes, accessibility pass,
  one site-wide light/dark (`useSiteMode`; VS Code theme derived in `App.jsx`), dead code/images
  removed, lint clean, CI (`.github/workflows/ci.yml`, lint + build, passing). M3.3 dropped.
- **Home** (`MinimalHome.jsx` + `minimalShell.js`): whois record (Name/Role/Organisation, plain name,
  morph to "Karim AI" ~2 s after load then every 10 s), blinking block cursor until focus, type
  anywhere, `whois karim` = same record, `man <cmd>` pages, zsh-style colours (git/grep/fastfetch).
- Karim's standing preferences: no focus box on the Home prompt; keep folder links blue; keep root
  markdown files (`about_me.md`, `projects.md`, `welcome.md`, `phd_students.md`); keep the Memory
  Match game (`RetroGame.jsx`, `/workspace/retro-game`).

## Resume point
Plan section **"Next session"** at the end of `_admin/planning/2026-10_revamp-plan.md`.

## Next action
Ask Karim what Workspace should show (M7). If he keeps the game there, add a hidden terminal command
(e.g. `./retro_game` / `play`) that opens `/workspace/retro-game`, listed under `help --all`
(option 1 he preferred; not the text-mode rebuild).

## Last safe commit
See `git log -1` (this checkpoint commit; tree clean and pushed).

## Blockers
- M7 Workspace content: Karim has not decided yet.
- Optional work needing Karim's yes: `@playwright/test` smoke test in CI (new dependency);
  lazy-loading layouts to cut the 496 KB (155 KB gzip) main bundle.

## Verify
`npm run dev` → http://localhost:5173/ ; browser checks with the `browser-check` skill
(`playwright-cli`, desktop + `--device="iPhone 15"`).
