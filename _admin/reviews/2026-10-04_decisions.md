# Decisions after the UX critique — 4 October 2026

Karim's answers to the six open questions in `2026-10-04_codex-ux-critique_RESPONSE.md`
(informed by `..._RESPONSE_v2_browser.md`), taken in a /grill-me session with Claude Code.

1. **Profile vs experiment:** keep the themed look-alike sections, but **every page gets its own
   address** (so back, refresh, sharing and search work). Routing is the first build item.
2. **Workspace:** **keep as its own section** with the VS Code look (Karim's favourite with GitHub).
   Replace the placeholder with real content (content to be decided).
3. **Languages:** English is the main version; keep **Spanish** (Spanish-only collaborators);
   **drop French and Portuguese**. Keep the language button.
4. **Teaching:** replace PyPI with a **Moodle look-alike**, linking out to the real Moodle courses.
   Open issue for later: stop students mistaking it for the real Moodle / expecting a login.
   **Archive the PyPI layout** (not delete) — possible future use to advertise a Python package.
5. **Contact / CV:** **email only** (plus Bath profile and ORCID as shown now); no contact form;
   **no CV** — the website is the presentation.
6. **Terminal page:** **drop as a section**; the home page is the only terminal.
   **Archive the Terminal layout** (not delete) — the idea and work may be reused.

Also agreed earlier: the first-visit trust pop-up goes; decorative (inert) look-alike buttons stay.

## Suggested build order

1. Remove the first-visit trust pop-up (small).
2. Archive PyPI and Terminal layouts; remove `teaching/` PyPI route and `terminal/` from the home list.
3. Real page addresses + per-page titles/metadata.
4. Moodle look-alike for Teaching.
5. Phone fixes (Bio header, Contact order); drop French/Portuguese.
6. Workspace content.
