# UX and structure critique — 4 October 2026

## 1. Verdict

There is a memorable concept here, but today the concept often hides the basic academic information visitors came for. Keep the minimal terminal home and the strongest look-alike treatments, while making every important section directly addressable and plainly navigable. The three priorities are: add real URLs and useful page metadata; make mobile and assistive-technology navigation reliable; and replace or relabel teaching-page controls that promise course files or downloads that do not exist.

**Evidence boundary:** I read the specified README, handoff, revamp plan, React layouts, and relevant CSS/source. I attempted to start the local site and connect the in-app browser, but that browser was unavailable; I could not inspect a rendered page, click controls, or verify a 375×812 viewport. Mobile and visual fidelity comments below are source/CSS-based judgements. No build, tests, lint, or performance measurement was run.

## 2. Top 10 issues, ranked

| Rank | Issue | Audience affected | Severity | Effort | Recommendation |
|---:|---|---|---|---|---|
| 1 | Sections are React state, not URLs. Refresh, share, browser back, and search crawlers cannot reliably address the visible section. | All | Critical | M | Adopt real paths or hash routes for home, research, teaching, bio, journal, and contact; map old static filenames to them. |
| 2 | First-time visitors meet `whois Karim` and `ls`, but the professional identity and click affordance are delayed by an animated intro; visitors must infer that folder names are links. | All | High | S | Keep the terminal, but show the role/affiliation immediately and make the section list visibly read as navigation (e.g. retain terminal syntax with a one-line “Choose a section” cue). |
| 3 | The teaching UI shows download links/buttons and course package language, but the download buttons have no actions and the displayed files look like actual course resources. | Students, professionals | High | S | Replace placeholders with current Moodle links and verified public materials; clearly label anything illustrative. Make the Moodle/course entry point work. `PyPILayout.jsx:150-175`. |
| 4 | The terminal-centric interaction is a serious mobile and accessibility barrier unless all useful destinations remain exposed as normal links. The home does expose links, but the command field still receives desktop auto-focus and output has no clear live announcement. | All | High | M | Keep typed commands optional; provide semantic navigation as the primary fallback, suppress focus/animation for reduced motion, and announce command output/status. `MinimalHome.jsx:148-151, 207-255`; `TerminalLayout.jsx:311-347`. |
| 5 | Several high-salience controls look functional but are dead: notably PyPI downloads, GitHub “Go to file” and toolbar actions, and the VS Code style contact/workspace affordances. | All | High | S | Make only the expected actions real: contact links, course/Moodle links, GitHub Code menu, file navigation, and clear return-to-home. Label the rest as visual decoration or render them as non-controls. |
| 6 | Direct academic trust signals are scattered or missing: CV is not evident in the section map, email is only visible in the research layout, and publications are one interaction away only if a visitor finds Research. | Professionals, students | High | S | Add a compact, visible academic identity block and direct links to publications, ORCID, Bath profile, CV, and email within one click of home. |
| 7 | The Wikipedia imitation makes a personal bio look like an independent encyclopaedia entry and the article has weak provenance cues. | All | Medium | S | Keep the familiar format, but make the page explicitly “About Karim”, distinguish self-authored facts, and link claims to Bath/ORCID/source pages. Avoid implying independent editorial review. |
| 8 | Public content is shipped as one Vite SPA with minimal document metadata. Titles/descriptions are generic and each active page shares the same document URL/title. | All | High | M | Add route-level titles/descriptions, canonical URLs and Open Graph data; pre-render static section content or provide crawlable fallback HTML. |
| 9 | The site has several distinct shells and global style systems, but theme behaviour is inconsistent and routing concerns are concentrated in a growing `App.jsx`. | Internal | Medium | M | Consolidate route metadata and shell selection; define shared tokens and theme policy. Keep shell-specific CSS isolated and test each route after any global CSS change. |
| 10 | The repo combines hand-authored source, generated Quarto output, legacy pages and older experiments without a clear generated-file policy. | Internal | Medium | M | Document the canonical source for each public file, remove genuinely obsolete material after confirming links, and automate a small build/content check in CI. |

## 3. Home page

### Keep

- Keep the terminal as the visual signature. The brief, restrained surface is distinctive and more memorable than a generic academic template. The folder list is also real, keyboard-focusable anchor markup in `MinimalHome.jsx:39-54`, so the main navigation is not command-only.
- Keep the command as optional exploration and preserve the visible `help` cue. The component already honours reduced motion in its intro and list animation (`MinimalHome.jsx:19-21`; `MinimalHome.css:71-74`).
- Keep the compactness. Do not turn the home page into a large portfolio landing page; put depth inside the section pages.

### Change

- The name animation first morphs the full name into “Karim AI” and delays the completed home state (`MinimalHome.jsx:57-104`). That is a costly first impression for visitors seeking a real academic. Show “Karim Anaya-Izquierdo” and “Senior Lecturer in Statistics, University of Bath” immediately; let the animation be a small accent after the identity is clear.
- `ls` and filesystem labels are charming to developers but weak information scent for students and non-technical visitors. Preserve the syntax and labels, but add one short instruction such as “Choose a section” and short descriptions that say what is inside. The existing blurbs in `MinimalHome.jsx:6-14` are only hover/focus previews in the current source, not descriptions adjacent to each link.
- The home input gets auto-focused after the intro on any device matching `(hover: hover)` (`MinimalHome.jsx:148-151`). That includes many tablets and can steal keyboard focus from someone tabbing into the page. Do not autofocus; let the user choose the input.
- Current click-to-focus on the entire main area (`MinimalHome.jsx:207-208`) creates an unexpectedly broad input target. Restrict focus behaviour to the terminal prompt itself so visitors can select text and use section links without focus jumping.
- Consider changing the displayed shell prompt from `Karim AI` to the full professional identity while keeping the terminal aesthetic. The current visual title is not the same as a clear academic name.

The terminal is a hook for a portion of the audience and a barrier for the rest only if it is the sole way in. With obvious clickable section links, it can stay. Do not require typing to reach the primary content.

## 4. Section by section

### Research — keep GitHub, make the content more academic

The GitHub repository look is the strongest thematic choice: research is naturally organised around projects, files, collaborators, and outputs, and Karim has already reported that the page looks realistic (`HANDOFF_NEXT_AGENT.md`, “Done so far”). Keep the metaphor and avoid a wholesale redesign.

Make the first viewport tell a research visitor what the work is and surface selected publications without requiring a metaphorical file-browser tour. A GitHub repository has dense controls that are recognisable but not all useful here. The green **Code** menu is correctly functional and its ZIP/clone affordances belong. Make the visible file rows keyboard-operable links rather than clickable `div`s (`GitHubLayout.jsx:176-179`); make **Go to file** actually open/search files if it remains visible (`:158-161`). Branch, Add file, Issues, Pull requests, Actions, Blame, Copilot and Pin are conspicuous controls that look interactive; either give the few meaningful ones a destination (e.g. real GitHub repo/issues) or remove button semantics and avoid inviting a click. Star/Watch/Fork can remain visual decoration under the stated design policy. The raw-file copy action is useful and already implemented (`:334-335`).

The repeated image alt text “User Profile”, “Owner”, or “Karim” is not useful identification; use “University of Bath crest” only if the crest itself is meaningful, otherwise empty alt. `GitHubLayout.jsx:94,136,170`.

### Teaching — recommend Moodle as the entry point, not a PyPI imitation

**Recommendation: use a simple teaching/course page with clear links to Bath Moodle; retire PyPI as the dominant teaching metaphor.** Students recognise Moodle and need current course, materials, assessment, and access details. Professionals and educators need a course overview and public examples, not a software-package installation surface. PyPI’s `pip install` convention describes software distribution, so it makes course information sound like a package and carries no teaching benefit for either audience.

Do not copy Moodle wholesale: a personal site cannot reproduce Moodle authentication or course state. Use a clean, course-catalogue layout with course code/title, intended audience, current academic year, short description, public sample materials, and a prominent “Open in Moodle” link for enrolled students. Keep public assets genuinely public; do not imply that Moodle-restricted content can be downloaded here. The current copy/install control may be a plausible metaphor, but the three “Download” buttons currently have no handlers (`PyPILayout.jsx:150-175`), and the course list items are clickable `li`s rather than keyboard links (`:87-88`). These are high-frustration cases and should be corrected before launch.

### Bio — keep Wikipedia style with clear authorship

Keep this. The familiarity benefits all three audiences, the language menu is a plausible small feature, and the component sets `lang={lang}` on the content wrapper (`WikiLayout.jsx:40`). But it should read as an intentionally encyclopaedic profile, not imply a neutral third-party Wikipedia article. Label the content “About Karim” or “Biography”; add source links to career and research claims. The article’s selected tabs are spans (`:103-105`) which are appropriate only if they are decoration; the top wordmark is a clickable `div` (`:42`) and should be a real home link/button. The page contains ORCID, GitHub and Bath profile links, but no obvious email/CV link in the article (`:155-160`).

### Journal — keep the AI chat assistant and make it an honest search interface

Keep the chat-like entry point: it gives people a familiar way to discover posts and suits the conversational idea. Develop it as a transparent **search and recommendation interface over a fixed set of posts**, not a pretend generative assistant. Say that it searches Karim’s articles; show matching titles, dates, excerpts, and why each matched. Include a normal browse-all link and stable direct post URLs. Add clear empty/no-results/error states and sample prompts that reflect actual post content. The implementation uses Fuse and local blog metadata (`BlogViewer.jsx` imports and search flow); do not present generated answers or claims of an AI backend unless there is one. The ARIA live conversation area is a good start (`BlogViewer.jsx:288`), but results and focus movement should be checked with a screen reader.

### Workspace — merge into a short “Tools and workflow” page or drop

The current section promises “Tools and working setup” (`MinimalHome.jsx:11`), which is niche compared with research, teaching and biography. Keep only if it has useful material for collaborators/students: reproducible workflow, software, code repositories, or data/software guidance. A VS Code editor metaphor makes those details harder to read and navigation less expected. Prefer folding it into Research or Journal as a concise page. Do not keep it as a separate section just to preserve another imitation.

### Contact — keep the content, replace the IDE shell

Contact is a universal task and should not require visitors to understand a VS Code file explorer. Provide a direct email link, Bath profile, ORCID, and optionally a CV/contact form only if actively maintained. Put the email link in the global/footer navigation as well as the page. If the editor theme is important, keep it as surface styling but do not make contact details behave like code files. `MobileNav.jsx:4-11` already gives Contact a slot, but the generic VS Code content shell obscures its importance.

### Terminal — merge or drop as a top-level section

The minimal terminal already exists at home; the separate terminal page repeats the premise and is even more technical. Its fastfetch block at least makes role and affiliation explicit (`TerminalLayout.jsx:287-307`), but that information belongs on the home screen. Fold genuinely useful terminal commands into the home and remove `terminal/` from the main section list. Keep the standalone terminal only if it offers a materially different demonstration; otherwise it is a duplicate destination with little value for the main audience.

## 5. Mobile

No rendered 375×812 inspection was possible, so these are code/CSS risks, not claims of observed overflow. There is meaningful responsive work already: GitHub and PyPI define narrow breakpoints and overflow handling, Wiki switches layout below 800px, and the terminal has a mobile breakpoint with 16px command input (`GitHubLayout.css:522+`, `PyPILayout.css:347+`, `WikiLayout.css:243+`, `TerminalLayout.css:318+`). The mobile bottom navigation is a useful fallback on most themed layouts (`MobileNav.jsx:24-40`).

The risks are structural. The shell needs a keyboard on a phone; the command input can trigger a full-screen keyboard and leaves little room for output. Keep it optional and never autofocus it on mobile (the home already checks hover, but hover is not a dependable device classifier). The home link list should remain the first usable mobile navigation. The global mobile navigation appears on GitHub, Wiki, PyPI and journal, but not on the contact/workspace VS Code layout or standalone terminal, and it omits Workspace and Terminal (`App.jsx:184-240`; `MobileNav.jsx:4-11`). Contact should remain one tap away everywhere. Six bottom-nav targets must remain generously sized and respect safe-area insets.

At phone widths, test: header controls wrapping; file names and breadcrumb truncation; GitHub tables/sidebar collapse; PyPI tab and sidebar overflow; Wiki infobox and language menu; chat prompt/result scrolling above the fixed nav; and VS Code editor horizontal scrolling. CSS contains explicit horizontal overflow in some components, which is acceptable for code/tables but should not produce page-wide horizontal scroll. Establish one shared mobile smoke checklist before deciding the imitations are “responsive”.

**Minimal-cost fix:** ensure each page’s primary content and navigation work at 320–375px; add a universal responsive header/menu with Home, Research, Teaching, About, Journal, Contact; hide secondary imitation chrome below a breakpoint; add bottom padding for fixed navigation and iOS safe areas; and make the command input opt-in. This retains the visual ideas without forcing full fidelity to every desktop control.

## 6. Accessibility, SEO, performance

### Accessibility

- Global focus-visible styling exists (`src/index.css:32-39`), and the home links explicitly support focus (`MinimalHome.css:32-36`). However, the home input then suppresses its focus outline with `!important` (`MinimalHome.css:58-62`). Remove that suppression or supply a clearly visible caret/focus treatment.
- Terminal output is appended visually but not within an `aria-live` region; a screen-reader user may not hear command results. Make output polite-live, expose the prompt as a labelled form, and ensure keyboard shortcut behaviour is discoverable. The home has a useful `aria-label` but no live output (`MinimalHome.jsx:228-255`).
- Clickable rows and labels implemented as `div`/`li` are not keyboard controls: research file rows (`GitHubLayout.jsx:178`), PyPI course list items (`PyPILayout.jsx:87-88`), and home wordmarks. Convert to anchors/buttons.
- `prefers-reduced-motion` is handled for the home and some CSS (`MinimalHome.jsx:19-21`, `MinimalHome.css:71-74`; `src/index.css:144+`); the recurring name morph correctly stops when `reduced` is true (`MinimalHome.jsx:106-108`). Preserve this behaviour when adjusting the intro.
- Wiki language is set on the page wrapper and language choices have `lang` attributes. Better use actual links/per-language URLs and update document language/title when selected; wrapper-only language does not change the outer `<html lang="en">` (`index.html:2`).
- Check contrast in light/dark modes with automated and manual checks. I cannot make a reliable contrast judgement from source alone. The GitHub, Wiki and home share mode; PyPI and terminal do not, as both the handoff and `App.jsx:220-240` confirm.
- Decorative buttons can stay visual, but inert controls must not be focusable buttons; that is an accessibility issue as well as a UX issue. Give icons accessible names where they act, and mark decorative logos appropriately.

### SEO and sharing

`index.html` sets `<title>Karim_AI</title>` and no meta description, canonical, Open Graph or Twitter card metadata (`index.html:4-20`). The app keeps navigation in `activeFile` state (`App.jsx:28-30,153-168`) rather than URL routes. That prevents useful deep links, back/forward navigation and page-specific link previews; the actual research/blog HTML in `public/` is a partial exception, but visitors entering those files may not reach the same themed React view. Fix routing and canonical destinations first, then render route-specific title/description/social tags and ensure important text exists in crawlable output.

### Performance

There is no measured bundle or mobile loading result. `BlogViewer` and `HtmlViewer` are lazy-loaded (`App.jsx:25-26`), and `Editor.jsx` lazy-loads several viewers, which can help. Conversely, the declared runtime set is broad (`recharts`, `katex`, Bootstrap/React Bootstrap, Fuse, icons, i18n), and `main.jsx` imports all Bootstrap CSS globally (`src/main.jsx:5`). Inspect Vite’s production chunks before removing dependencies; the source alone cannot prove which are unused or their real mobile cost. Google Fonts is a render-blocking external stylesheet dependency and there is no font fallback strategy beyond CSS monospace; consider self-hosting or a robust system fallback. Static Quarto output is sizable because it includes its own libraries, but it is separated under `/blog/` and should be assessed as page-level weight, not conflated with the React bundle.

## 7. Internal structure and maintenance

- **Routing:** `App.jsx` is the central state router (`:28-30,153-168`) and manually maintains blog filenames, file groups, page mode, and layout branches. URL routes should become the source of truth; define a route/content manifest once and derive active nav, title, layout, and breadcrumbs from it. This will also eliminate state-only history and refresh bugs.
- **Component/CSS organisation:** page-shell CSS is sensibly split by layout, but `App.jsx` owns many unrelated state concerns and global Bootstrap/VScode theme styles leak across pages. Move page state to the route/shell that owns it and share only tokens, header/navigation primitives, and common accessibility styles. Avoid premature component micro-splitting; the actual priority is reliable navigation and clear styling boundaries.
- **Theme:** shared light/dark mode is a coherent experience on home, GitHub and Wiki. PyPI and standalone terminal are explicitly inconsistent (`HANDOFF_NEXT_AGENT.md`; `App.jsx:220-240`). Either make the site preference global or remove theme switching from the partial set; the current split suggests a bug to visitors.
- **Content pipeline:** ORCID → JSON → R-rendered HTML plus Quarto source → committed public output is workable for one person if it is deterministic and documented. The fragility is manual freshness and dependency/tool mismatch on deploy. State the source of truth, record generation date/source, ensure a clean regeneration produces no unrelated diffs, and add a CI check that generated output is current. ORCID fetching depends on network/API response and should fail visibly without corrupting existing data. `README.md` documents the workflow but not a validation step.
- **Dead code/legacy:** `MacDesktopLayout.jsx` has no import from `App.jsx`; it appears abandoned, as do associated CSS and preview imagery unless referenced elsewhere. `TrustModal.jsx` has no imports found and can likely go. `RetroGame`, `MusicPlayer`, `CitationGenerator`, `DataVizGallery`, `LatexPlayground` and several viewers are imported by `Editor.jsx`, so they are not automatically dead even if the current primary routes do not surface them. Audit imports/route reachability before deletion. `WEBSITE_DOCUMENTATION.md` is explicitly historical; label it prominently or archive it.
- **Repo hygiene:** root `about_me.md`, `projects.md`, and `welcome.md` exist alongside current source and are not listed in the README’s current workflow; review whether they are stale before retaining. `public/blog/` generated Quarto HTML/libraries are tracked, which is consistent with static deployment if the generator is unavailable in Netlify. I found no tracked `dist/` entries in the inspected tracked-file listing. Stray `.DS_Store` files occur under `src`, `public`, and `blog`; ignore and untrack them. The cloned test post `public/blog/posts/cloned-post-test.html` looks like content pollution, not a test fixture.
- **i18n:** four languages for a personal biography carry translation and maintenance costs. Keep them only if Karim can keep all versions accurate and there is evidence of a real audience. Otherwise English-first is sensible for a Bath-based academic site; offer translated bio as optional supplementary content, not a promise of parity across the whole website. If retained, use locale URLs and translate navigation, titles, and metadata, not only the Wiki body.
- **Safety net:** package scripts offer build and lint (`package.json`), but no test script or CI config was evident in the inspected file list. Minimum: lint + production build on each PR; a small browser smoke check for one route per shell, direct URL/refresh/back, working email/Moodle/Code links, and a phone-width overflow check. Validate generated JSON/HTML references and broken local links. Do not build a large end-to-end suite before fixing URLs.

## 8. Quick wins (under about one hour each)

1. Put full name, role, Bath affiliation, and “Choose a section” on the home immediately; remove automatic input focus.
2. Make email, ORCID, Bath profile, and selected publications visible within one click from home.
3. Replace the fake PyPI download buttons with real verified Moodle/course destinations or remove the misleading files panel.
4. Convert clickable `div` and `li` items into anchors/buttons, particularly GitHub file rows and PyPI course navigation.
5. Add per-page title/description and social preview metadata once routes are defined; until then at least replace the generic title.
6. Add a visible, consistent Home link and keep Contact accessible from every shell.
7. Add live announcements for terminal command output and preserve visible focus around the home command input.
8. Ignore and untrack `.DS_Store`; label historical docs and inspect the cloned-post test artifact.
9. Ensure reduced motion stops the recurring home-name morph, not only the opening animation.
10. Run the existing lint/build scripts and record baseline production chunk sizes when Karim next wants implementation verification.

## 9. What not to change

- Do not replace the home with a generic hero-heavy portfolio. The terminal is a distinctive entry point and its section links make it usable without typing.
- Keep Research in the GitHub visual language; focus improvements on semantics, direct academic content, and the handful of useful actions.
- Keep the Wiki familiarity for Bio, with clear authorship and source links.
- Keep the Journal chat idea if it remains an honest interface to actual posts and every result can be opened directly.
- Keep generated static output committed if that is what makes Netlify deployment simple; improve freshness checks before changing the publishing model.
- Do not spend time making Star, Fork, Watch, or every imitation control functional. Prioritise actions visitors expect to work and content that academics need.

## 10. Alternative ideas

### A. Teaching as a course catalogue plus Moodle hand-off — recommended

**Pros:** students immediately recognise where to enter; professionals can scan course summaries; public resources can be distinguished from enrolled-only material. **Cons:** less visually novel than PyPI and requires accurate per-course links each year. **Audience fit:** best across students and professionals.

### B. Contact + Workspace become one “About and resources” section

Keep a concise Bio page and add a secondary “Working with me” page containing contact, supervision/collaboration interests, software stack, and reproducibility links. **Pros:** removes low-value standalone shells and gives collaborators practical context. **Cons:** may become a catch-all unless tightly edited. **Audience fit:** professionals and prospective students; general public can stay with Bio.

### C. Whole-site “academic field notes” concept, with the terminal as a visual skin

Make the content architecture a conventional set of stable academic pages, while retaining terminal styling only on the home and using restrained shared visual cues in all sections. **Pros:** excellent direct linking, accessibility, search, and predictable mobile use; retains the distinctive first impression. **Cons:** reduces the surprise of entering a different imitation at every click. **Audience fit:** strongest for all audiences, especially non-technical visitors.

### D. Teaching as a Moodle-inspired course dashboard

Use course cards, term/status, key actions, and materials categories resembling a VLE without pretending to be an authenticated Moodle copy. **Pros:** familiar to Bath students and supports scanning. **Cons:** could confuse users into expecting Moodle login/course functionality; annual maintenance. **Audience fit:** students; weaker than a neutral course catalogue for professionals.

## 11. Open questions for Karim

1. Is the primary goal to make the site a dependable academic profile, or to make it an experimental portfolio where the interface itself is a major attraction?
2. Should `workspace/` have a public purpose for students/collaborators, or is it an internal-interest page that can be folded into another section?
3. Does Karim want to maintain four biography translations and their metadata indefinitely, or should English be canonical?
4. Which teaching material is genuinely public, and what is the canonical Moodle URL/access boundary for each current course?
5. Is there a current CV file and preferred public contact route to surface?
6. Is the separate terminal page meant to demonstrate the shell, or should the home remain the only terminal experience?
