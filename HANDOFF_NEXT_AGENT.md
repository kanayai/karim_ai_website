# Handoff — karim_ai_website
_Checkpoint 2026-10-02 18:00 BST_

## Objective
Minimal black/light terminal home page (replaced the macOS-style desktop as `Welcome`), now interactive.

## Done so far
- Home = typed `whoami` intro, `ls` section list, hover/tap previews (`public/previews/*.webp`), light theme by default.
- Live prompt: `ls`, `cd`/`open`, `cat bio`/`man karim`, `whoami`, `pwd`, `date`, `uptime`, `help`, `contact`/`mail`, `neofetch`, `history`, `coffee`, `tea`, `theme` (light/dark), `clear` (list returns), Easter eggs (`sudo`, `rm -rf` → "Nice try.", `exit`, `vim`).
- UX: Tab completion, ↑/↓ history, permanent "type help" hint, auto-scroll to prompt, no focus box, only the hovered list highlights.
- Pushed to `origin/main` (Netlify auto-deploys; deploy not yet confirmed).

## Resume point
`src/components/MinimalHome.jsx` (UI) and `minimalShell.js` (pure command logic: `run`, `complete`). `App.jsx` maps `Welcome` to `MinimalHome`; old desktop is `MacDesktopLayout.jsx` (unused for home).

## Next action
Check the Netlify deploy on a real phone (keyboard covering prompt? light-theme page edges?), then take Karim's visual feedback. Not done: bio text and "14 years" uptime wording unconfirmed by Karim.

## Last safe commit
See `git log -1` (tree clean when written; this handoff committed after).
