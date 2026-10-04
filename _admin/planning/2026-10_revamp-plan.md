# Website revamp plan — October 2026

Sources: `_admin/reviews/2026-10-04_codex-ux-critique_RESPONSE.md` (code-based critique),
`..._RESPONSE_v2_browser.md` (browser-verified corrections — wins where they disagree),
`2026-10-04_decisions.md` (Karim's answers). Supersedes the layout list in `website-revamp.md`
for Teaching and Terminal.

**Target site:** six sections, each a look-alike, each with its own address.

| Section | Look | Address |
|---|---|---|
| Home | Minimal terminal (only terminal) | `/` |
| Research | GitHub | `/research` |
| Teaching | Moodle look-alike (new) | `/teaching` |
| Bio | Wikipedia, English + Spanish | `/bio` (`/es/bio`) |
| Journal | ChatGPT-style search over posts | `/journal`, `/journal/<post>` |
| Workspace | VS Code | `/workspace` |
| Contact | VS Code | `/contact` |

Each milestone = one small, revertable commit (or a few), checked with `browser-check`
at desktop + iPhone before moving on.

## M1 — Quick removals (≈1 hour)
1. Remove the first-visit trust pop-up (`WelcomeBanner.jsx`, rendered in `App.jsx`). *Top browser finding.*
2. Archive PyPI and Terminal layouts: move to `src/archive/` with a short README; unroute them;
   remove `terminal/` from home list. Teaching temporarily points to a simple holding page.
3. Drop French and Portuguese (Wiki strings, locales, `public/*.fr|pt.html`).

## M2 — Real addresses (the big one)
1. Map each section/file to a URL path; keep `activeFile` internally, sync it with the address
   bar via the History API (no new dependency), handle back/forward.
2. Netlify fallback so `/research` etc. load the app (`public/_redirects`), without breaking existing static files.
3. Per-page `document.title` ("Research — Karim Anaya-Izquierdo"), and `<html lang>` follows Bio language.
4. `index.html`: real title, meta description, canonical, Open Graph/social preview.
5. Home links, mobile bottom nav and "Back to OS" buttons become real links to these addresses.
   Add Workspace to mobile nav.

## M3 — Home identity (≈1 hour)
1. Show "Karim Anaya-Izquierdo — Senior Lecturer in Statistics, University of Bath" straight away,
   keeping the terminal look; shorten the intro so the section links appear quickly.
2. Add a "choose a section" cue; stop auto-focusing the input; restore its focus outline.
3. Archived Terminal's identity panel informs this. ~~Optional hidden `terminal` command~~ — dropped (Karim, 2026-10-04).

## M4 — Teaching as Moodle look-alike
1. Design from Bath Moodle's look: course cards (code, title, year, audience, short description).
2. Each card links to the real Moodle course; only genuinely public materials downloadable.
3. Parked design issue: make clear it is not the real Moodle (no login expectation).
4. **Needs from Karim:** current course list, Moodle URLs, which materials are public.

## M5 — Phone fixes
1. Bio header: "Back to OS" clipped at 393 px — compact the controls.
2. Contact: email/Bath profile/ORCID above (or beside) a smaller portrait.
3. Research/Moodle tab strips: tidy internal scrolling; Research README higher on phone.

## M6 — Accessibility and polish
1. Clickable `div`/`li` rows → real links/buttons (GitHub file rows, course lists, Wiki wordmark).
2. Terminal output announced to screen readers (`aria-live`).
3. Alt text: replace "User Profile"/"Owner" on the crest.
4. Inert decorative buttons stay (Karim's policy) but are not keyboard-focusable.
5. Journal: label honestly as search over Karim's posts; "browse all" link.
6. Theme: decide whether Journal/Moodle follow light/dark (open question).

## M7 — Workspace content
Replace placeholder with real content. **Needs from Karim:** what it should show
(e.g. tools, reproducible workflow, software, how to work with me).

## M8 — Housekeeping (internal)
1. Delete dead code after an import check (`MacDesktopLayout`, `TrustModal`, unused CSS/previews).
2. Untrack `.DS_Store`; delete `public/blog/posts/cloned-post-test.html`; review root `about_me.md`,
   `projects.md`, `welcome.md`; label `WEBSITE_DOCUMENTATION.md` as historical.
3. Safety net: lint + build on each push (GitHub Action), plus a browser smoke check per section.
4. Measure production bundle size; drop unused dependencies only after measuring.
5. Update README site map.

## Open questions (not blocking M1–M3)
- Workspace content (M7).
- How to avoid the Moodle look-alike being mistaken for real Moodle (M4).
- Should Journal and Teaching follow light/dark mode?
- Not adopted from the critique: replacing the look-alikes with plain pages (Alternative C) —
  Karim keeps the themed looks; addresses (M2) deliver C's practical benefits.

## Status (2026-10-04, end of session)
M1–M6 and M8 done and live; M3.3 dropped. Only M7 (Workspace content) remains — waiting on Karim.

## Next session
1. **M7 Workspace** — ask Karim what it should show (tools, reproducible workflow, software, how to
   work with me…). Keep the Memory Match game (`retro_game.exe`) there for now.
2. **Terminal command for the game** (once the game's place is settled): hidden command such as
   `./retro_game` or `play` that opens `/workspace/retro-game`, like `cd` opens sections; list it in
   `help --all` next to `coffee`/`tea`. Not a text-mode rebuild.
3. Optional, ask first: per-section browser smoke test in CI (`@playwright/test`); lazy-load layouts
   to shrink the 496 KB main bundle.
