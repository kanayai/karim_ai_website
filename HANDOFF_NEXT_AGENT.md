# Handoff — karim_ai_website
_Checkpoint 2026-10-03_

## Objective
Minimal terminal home (`Welcome`) plus themed sub-pages (GitHub, Wiki); polishing from Karim's visual feedback.

## Done so far
- Home help: no "(also: …)" hints; `pwd, date, uptime` is the second-to-last line; `theme` toggles, `theme light|dark` sets, anything else → `zsh: command not found`.
- Intro: `whois ` pre-typed, `Karim` typed live, name morphs `Karim Anaya-Izquierdo` → `Karim AI`, replays every 30 s; plays on every load (seen flag removed; reduced-motion skips). `whoami` → `guest`.
- `where karim` / `find karim` print the address (my draft wording; unlisted in help, Tab completes). Other args → command not found.
- Shared light/dark: `src/hooks/useSiteMode.js` (localStorage `site-mode`, default light). Home, GitHub page (CSS vars, toggle in header, iframe content via `githubTheme` in `App.jsx`) and Wiki follow it.
- Wiki: language dropdown (en/es/fr/pt) in `src/constants/wikiStrings.js`; es/fr/pt translations written by Claude, unreviewed.

## Resume point
`src/components/WikiLayout.jsx`, `GitHubLayout.jsx`, `useSiteMode.js`, `minimalShell.js`, `MinimalHome.jsx`.

## Next action
Check the Wiki and GitHub pages in the browser (light/dark, language menu, header layout on phone). Then: Karim to confirm the address text and review the translations; decide on German; PyPI and terminal pages do not follow the shared theme yet.

## Last safe commit
4571356 (tree clean before this handoff, which is committed after it)

## Local preview
`npm run dev` → http://localhost:5173/.
