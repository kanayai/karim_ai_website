# Handoff — karim_ai_website
_Checkpoint 2026-08-25 21:33 CST_

## Objective
Continue evolving Karim's personal academic website as an immersive multi-environment site while keeping navigation recoverable and mobile usable.

## Done so far
- Added Terminal `map` and standardised `Back to OS` escape hatches across themed layouts.
- Fixed Research/GitHub scrolling so the fake repository page itself scrolls rather than trapping `projects.html`, `publications.html`, or `phd_students.html` in a small inner frame.
- Added a standalone Wikipedia-style profile page and made it the About destination.
- Repurposed the VS Code layout as `workspace.md`, an academic workbench / working-stack page rather than a duplicate About page.
- Applied the same outer-page scrolling approach to Teaching/PyPI and pushed all changes to `origin/main` for Netlify deployment.

## Resume point
Start from the live Netlify site after commit `b76afae`. Test the latest deployed behaviour on desktop and phone: `about`/`wiki`, `workspace`, Research file pages, and Teaching/PyPI scrolling.

## Next action
Do a live UX QA pass and decide whether `workspace.md` content should become a richer AI academic OS / methods workbench, or whether navigation labels need adjustment after seeing it live.

## Last Safe Commit
`b76afae` — tree clean and pushed to `origin/main`.
