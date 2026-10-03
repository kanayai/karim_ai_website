# Handoff — karim_ai_website
_Checkpoint 2026-10-03 18:29_

## Objective
Minimal terminal home plus look-alike section pages; polishing from Karim's visual feedback (research/GitHub page now matches real github.com).

## Done so far
- Home (`MinimalHome.jsx`, `minimalShell.js`): smaller font, translucent hover tint, `clear` restores opening screen + replays name morph. New commands: `git log|status|clone`, `google`, `orcid`, `github`, `curl google.com` (one-line 301 + opens), `curl wttr.in[/city]` (live, CORS ok). `help` shows `curl, git, google`; fastfetch line removed (command kept). Hidden `help --all`.
- Research page (`GitHubLayout.jsx/.css`, new `GitHubCodeMenu.jsx`): header with `kanayai / research`, search, Copilot; repo title row (Public, Pin/Watch/Fork/Star) above toolbar; 1280px centred container; branch/Go to file/Add file/green Code dropdown (real clone URLs, ZIP); repo home shows README; clicking a file opens GitHub file view (tree, breadcrumb, commit bar, Preview/Code/Raw). `Editor` has `bare` prop (no tabs) used here.
- Repo `README.md` rewritten for current structure.
- Karim reviewed the research page: "looks very realistic". No pending changes.

## Resume point
Karim is navigating the site to collect further changes; other section pages (PyPI teaching, Wiki, journal, terminal) may "inherit" the GitHub-page realism treatment.

## Next action
Ask Karim for his next list of changes from browsing the live site.

## Last safe commit
58a6669 (tree clean, pushed; this handoff committed after it)

## Notes
- Ctrl+L on home only types `clear` (needs Enter); offered to make it immediate — unanswered.
- PyPI and terminal pages still don't follow the shared light/dark mode.

## Local preview
`npm run dev` → http://localhost:5173/
