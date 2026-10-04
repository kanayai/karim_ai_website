# Handoff — karim_ai_website
_Checkpoint 2026-10-04 (M1–M6 and M8 done; M7 waiting on Karim)_

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
  hidden <640px. e8ec069 Home morph now ~2 s after load (Karim asked). M3.3 dropped.
- cc5a5d5 morph repeats every 10 s (start to start). **M6.1–6.5 done**: d082b05 real links (GitHub rows,
  logo, repo name, Wiki wordmark); 984c67e home output aria-live; 1af6c65 alt text; 1e40999 decorative
  GitHub controls unfocusable; 8c4c105 Journal labelled keyword search + browse all. fd17ce8 fixed
  RCodeViewer rendering R source as HTML. Whois-style home record (option B) approved and pushed: 9e80a9f.
- Home tweaks (Karim): d15b779 + 60eed98 smaller font, `# choose a section` removed; b0e3f47 no focus box
  on the command line (Karim dislikes it — do not re-add).
- **M6.6 done — every page follows one light/dark setting** (`useSiteMode`): e432488 VS Code pages +
  Journal (VS Code theme derived from site mode in `App.jsx`); c2d04b2 Teaching dark palette + toggle;
  0a7785e Journal toggle.
- Home extras (Karim): 88443b5 `whois karim` = opening record; 63e0c65 `man <cmd>` pages; cbcbaef
  blinking block cursor until focus + type-anywhere.
- **M8 done**: e50a994/e30cb89 dead components + unused images deleted; 251a0e0 test post removed, old
  docs labelled historical; 614b67d lint clean (generated dirs ignored, 26 fixes); cd8118f CI
  (`.github/workflows/ci.yml`: lint + build, passing); 47485d7 debug leftovers removed (pink body, logs);
  df3cc10 react-bootstrap removed; 95b2319 images 6.4 MB → 0.4 MB (mix2/blackboard now .jpg); 638b0f0 README.
  Not done: per-section browser smoke test in CI (needs @playwright/test — ask Karim first); main JS
  bundle still 496 KB (155 KB gzip) — lazy-load layouts would cut first load.
- Agents now have a browser: canonical `browser-check` skill (`playwright-cli`) — use it to verify
  every milestone at desktop + iPhone 15. In Codex, approve running it outside the sandbox.

## Resume point
Home colours done (46fdd7f: zsh-style colours for git/grep/fastfetch, plain whois name). Only **M7
Workspace** remains, waiting on Karim's content (he does not know yet). Keep the root markdown files
(`about_me.md`, `projects.md`, `welcome.md`, `phd_students.md`) — Karim may use them later.

## Next action
Ask Karim about Workspace content when he is ready. Optional: per-section browser smoke test in CI
(needs @playwright/test — ask first); lazy-load layouts to cut the 496 KB main bundle.

## Last safe commit
46fdd7f (pushed)

## Blockers
- None for M1–M3. M4 needs Karim's course list, Moodle URLs, public materials; M7 needs Workspace content.

## Local preview
`npm run dev` → http://localhost:5173/
