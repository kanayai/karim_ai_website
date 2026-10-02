# Handoff — karim_ai_website
_Checkpoint 2026-10-03_

## Objective
Minimal black/light terminal home page (replaced the macOS-style desktop as `Welcome`), now interactive; polishing from Karim's visual feedback.

## Done so far
- Earlier: typed `whoami` intro, `ls` list, live prompt (help, cd/open, cat bio, uptime, contact, fastfetch, coffee/tea, theme, clear, Easter eggs), Tab completion, ↑/↓ history, light theme default.
- This session (pushed, `0f6d69f`, `08a6470`):
  - Hover screenshot previews removed; hover keeps only the boxed highlight; phone taps open directly (no tap-twice).
  - Body text 1.5× original (`.mh-body` clamp(1.575rem, 3.3vw, 2.25rem)); 2× was too large.
  - Command output `line-height: 1.3` (terminal-like).
  - `help`/Tab list only `fastfetch`; `neofetch` still accepted silently (Karim's choice).
  - `.mh-screen` is its own scroll container (`body { overflow: hidden }` site-wide in `vscode-theme.css` blocked scrolling) — can now scroll back to top; `clear` wipes.
- Pushed `d222530`: `grep <word>` (searches section blurbs + bio, case-insensitive, flags ignored; in `help` and Tab); read-only replies for `mkdir`/`touch`/`mv`/`cp`/`chmod`/`chown` ("Read-only file system" + "Look, don’t touch."), not in help.
- Karim confirmed uptime wording/date (Sept 2013, "in academia (at Bath)") is fine.

## Resume point
`src/components/MinimalHome.jsx` (UI), `MinimalHome.css`, `minimalShell.js` (pure command logic: `run`, `complete`).

## Next action
Take Karim's feedback from the Netlify deploy (grep, read-only commands; phone scrolling/font fit). Possible extension offered: grep over full page text. Optional cleanup offered, not done: delete unused `public/previews/*.webp` and `preview:` fields in `entries`.

## Last safe commit
See `git log -1` (tree clean when written; this handoff committed after `d222530`).

## Local preview
`npm run dev` → http://localhost:5173/. Headless check: Chrome `--remote-debugging-port` + CDP script (intro takes ~20 s unless seen before).
