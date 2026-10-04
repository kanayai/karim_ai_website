# Browser follow-up to the UX critique — 4 October 2026

## Review conditions and evidence

**Observed:** I opened `https://example.com` in Playwright CLI using iPhone 15 emulation; it succeeded after the sandbox denied a write to `/Users/kai21/Library/Caches/ms-playwright/daemon/.../uxsmoke.err`. The approved outside-sandbox retry succeeded. I took the requested smoke screenshot and closed that browser.

For the site review I started Vite on `http://127.0.0.1:5174/`, because port 5173 was already occupied. I used Chromium at its default desktop viewport and WebKit iPhone 15 emulation. Playwright reported iPhone CSS viewport `393×659` (rather than the prompt’s example 375×812). I captured home and all seven sections in the light and dark preference states, then checked key interactions. Screenshots and Playwright’s snapshots/logs are in `/private/tmp/2026-10-04_ux-critique-browser/`; nothing was saved in the repository except this report. Both browser sessions finished with **0 errors and 0 warnings** in the console. The Vite process started for this check was stopped; port 5173 was left alone.

“Observed” below means seen or clicked in this browser run. “Code-based” means the conclusion comes from source inspection rather than a rendered accessibility/performance audit. Screenshots show a developing local build, not the public Netlify deployment.

## 1. Verdict

The earlier critique reached the right main priorities, but it overstated some problems: the Bio page already discloses that it is an experimental personal profile, and Contact contains strong academic signals and working destinations. The live mobile review confirms that most pages avoid page-wide horizontal overflow, while some top bars and tab strips visibly clip or require horizontal scrolling. The highest-priority confirmed issue is the first-visit modal blocking Contact/Workspace, followed by URL-less navigation and misleading inert course downloads.

## 2. Status of the original Top 10 findings

| Rank | Original finding | Status | Browser follow-up |
|---:|---|---|---|
| 1 | Sections are React state, not URLs. | **Confirmed — observed** | Clicking Research, Teaching, Bio, Journal, Contact, Workspace, and Terminal kept the address at `/`; the title remained `Karim_AI`. Refresh/deep-link/back-button concerns remain. |
| 2 | Home delays identity and terminal interaction may obstruct discovery. | **Corrected — observed** | The loaded home is genuinely minimal: full name appears briefly in the animation, then changes to “Karim AI”; role and Bath affiliation are absent. But the seven folder labels are prominent clickable links and the prompt says “type help or click a folder”. Typing is optional, so the navigation barrier was overstated. The initial animation can show only a partial `whois Karim`/name; after about 12 seconds the links are present. Keep the sparse home, improve the static identity cue, and do not claim visitors must type. |
| 3 | Teaching shows fake course download controls. | **Confirmed — observed** | I opened “Download files”: three file cards and four buttons named “Download” were shown. Clicking a file’s Download button left the page and card count unchanged; it had no `href`. The control has a pointer cursor and reads as actionable. Recommendation to provide verified files or real course links stands. |
| 4 | Terminal use creates mobile and accessibility barriers. | **Corrected — observed + code-based** | At iPhone size, the home input was not auto-focused and its folder links remained the main, tap-friendly path. The separate terminal has visible command chips and top navigation, making it less typing-dependent than claimed. However, command output has no live announcement in source (`MinimalHome.jsx:228-255`; `TerminalLayout.jsx:311-347`), and the phone keyboard remains an optional interaction that should not become the main path. |
| 5 | Salient controls look functional but are inert. | **Confirmed in part — observed + code-based** | GitHub’s Code dropdown opened; its ZIP link points to the real repo archive. The Back to OS controls and mobile section navigation work. The Wiki language menu offered four choices; selecting Français changed the wrapper language to `fr`. A Journal suggested prompt produced four relevant post cards. The terminal’s Research control opened the Research view. In contrast, Teaching’s Download buttons did nothing. The prior report treated several other imitation controls as inert based on source; I did not click every such control, so those remain **code-based**, not browser-confirmed. Keep decorative look-alike controls per Karim’s instruction; make expected actions such as downloads, contact, file selection and navigation real. |
| 6 | Academic signals are scattered or missing. | **Corrected — observed** | Home itself has no role, affiliation, email, ORCID or CV. But Contact is one click from home; its desktop first view clearly shows the full name, role, Bath affiliation, Email, Bath profile, GitHub and ORCID. The rendered Contact details include `kai21@bath.ac.uk`; Research also links email and ORCID. The original claim that email was only on Research was wrong. A public CV was not evident. On phone, the large Contact photograph pushes contact actions below the initial viewport, so this is a mobile ordering problem rather than a site-wide absence. |
| 7 | Wiki-style Bio could imply independent editorial status. | **Withdrawn — observed** | The rendered page calls itself “K.AI OS Encyclopaedia”, labels itself “The free-ish profile page”, says “From K.AI OS Encyclopaedia, the personal academic website namespace”, and includes a notice that it is an experimental personal interface with links to the formal Bath profile and ORCID. The proposed provenance fix is already present. Preserve it. |
| 8 | Generic title and missing metadata weaken SEO/shareability. | **Confirmed — observed + code-based** | Across the themed pages, the URL stayed `/` and title `Karim_AI`. `index.html:4-20` has no description, canonical or Open Graph metadata. Public static outputs exist, but they do not give the in-app section a distinct URL. |
| 9 | Inconsistent themes and route/shell complexity hurt coherence. | **Confirmed — observed + code-based** | Research and Bio changed between light and dark; Journal stayed dark, and Teaching stayed blue/dark in both saved `site-mode` states. The app routes those sections from in-memory `activeFile` (`App.jsx:153-168`), consistent with the URL finding. The theme boundary is real; whether Journal/Teaching should support both modes is a design decision. |
| 10 | Generated content and legacy files create maintenance risk. | **Code-based; no browser confirmation** | Browser use does not verify repository provenance or build freshness. The earlier source observations still stand: committed Quarto output is the deployment strategy, root Markdown and `.DS_Store` files need a relevance/ignore audit, and generated sources need reproducibility checks. Do not treat the presence of generated static output alone as a defect. |

### Status corrections to other claims in the original response

| Original claim/recommendation | Status | Updated assessment |
|---|---|---|
| Mobile navigation is absent on Contact/Workspace. | **Withdrawn — observed + code-based** | Contact visibly has the bottom navigation on phone; `App.jsx:280-308` renders it for the default VS Code layout, including Workspace and Contact. Workspace is marked as About (`MobileNav.jsx:19`) and neither Workspace nor Terminal has its own bottom-nav entry. Terminal instead has its own top navigation. |
| Home navigation may be undiscoverable without knowing commands. | **Corrected — observed** | All section names are visible anchor links and the hint explicitly says “type help or click a folder”. This is not a terminal-only interaction. The weak point is absent academic role/affiliation on home and the delayed intro. |
| Contact details are hard to find in general. | **Corrected — observed** | Contact is directly available in the bottom nav and its desktop layout gives email and institutional links. The issue is specifically the phone ordering: image before contact actions. |
| The Wiki imitation needs a clear signal that it is self-authored. | **Withdrawn — observed** | Its subtitle and disclaimer already mark it as a personal experimental page and point to Bath/ORCID for formal details. |
| The separate Terminal page adds little value. | **Corrected — observed** | It has distinct content (identity/system details), visible command chips and working navigation. It remains optional/duplicative, but is not merely a duplicate shell. |
| The site may have global phone-width overflow. | **Corrected — observed** | Sampled pages report document/body width equal to the 393px viewport. Some individual headers and tab strips clip or scroll internally, which is the demonstrated problem. |
| `TrustModal.jsx` is unused. | **Confirmed — code-based, but separate from the observed gate** | `TrustModal.jsx` is not the first-visit overlay. The rendered gate comes from `WelcomeBanner.jsx` and is rendered by `App.jsx`; the original source review missed that used component. |

## 3. Section findings from live use

### Home — keep the minimal terminal

**Observed:** At desktop and iPhone widths the loaded home is a short terminal transcript with clickable `research/`, `teaching/`, `bio/`, `journal/`, `workspace/`, `contact/`, and `terminal/` links. On iPhone the links wrap into tidy rows; the page’s document width stays at 393 CSS pixels, so there is no page-wide horizontal overflow. The terminal input did not take focus on iPhone. No role or Bath affiliation is visible on this home state.

Keep the home sparse and the command optional. The one improvement remains a concise static professional descriptor and a plain “choose a section” cue; there is no need to replace the terminal or add a large hero. The intro can be a poor first impression if someone sees it mid-animation: a screenshot around five seconds after reload showed only the partial name “Karim ”, while the complete links took longer to appear. Reduced-motion users receive the immediate state in code (`MinimalHome.jsx:19-21`).

### Research — keep GitHub

**Observed:** The desktop and phone layouts read as a repository, the README gives identity and research areas, and the sidebar surfaces University Profile and ORCID links. The real Code dropdown exposes clone/archive options. Clicking its ZIP link was not necessary to confirm the destination; its observed `href` is the real GitHub ZIP archive. The responsive bottom navigation is visible on phone.

The phone page has a vertically scrollable tab strip: Code, Issues and Pull requests are visible, with later tabs partly cut at the edge. The oversized first-view chrome pushes README text below the first viewport, although file rows remain legible and the overall page does not widen past the viewport. The Back to OS button wraps onto two lines. These are polish issues, not grounds to abandon the metaphor. The source’s clickable file rows remain non-semantic `div`s (`GitHubLayout.jsx:176-179`), and I did not keyboard-test them.

### Teaching — PyPI remains the wrong main metaphor

**Observed:** On phone, title, `pip install ma22019`, a very large Copy action, horizontal course tabs, current/previous course navigation, and the course notebook appear. The layout is visually bold but consumes much of the small viewport; secondary tabs require horizontal scrolling. The “Download files” content visibly promises three PDFs, but Download does nothing. On both site-mode settings the page remains the same dark-blue theme.

Keep the course content; use a course catalogue with an obvious Bath Moodle hand-off. Preserve only materials that exist and are deliberately public. If the PyPI styling remains, the Download panel cannot keep fictitious file names and inert buttons.

### Bio — keep the familiar encyclopaedia treatment

**Observed:** The Bio page has career/research/teaching links, an infobox with role/institution/ORCID, language selector, theme toggle, and the explicit personal-site disclaimer described above. Selecting Français updates visible content and the wrapper `lang`, but `document.documentElement.lang` remains `en` (observed); set the outer document language/title too when the locale changes or move to locale URLs.

At iPhone width, the large wordmark and language/theme/back controls do not fit cleanly in the top bar: “Back to OS” is visibly clipped at the right edge. The viewport itself does not gain horizontal scroll, so this is internal header clipping. The bottom navigation still offers Home. Fix the header layout at narrow widths; retain the disclaimer and provenance links.

### Journal — keep the chat-shaped discovery tool

**Observed:** The Journal opens in a dark, ChatGPT-like shell. A “What should I read first?” prompt returned an explanation and four post cards with date, reading time, title, excerpt and Open action. Thus the prompt cards are functional and the experience is more useful than a static mock-up. A freshly opened phone view briefly showed “Loading journal…” while the lazy chunk loaded; content appeared after interaction. The prompt/results work without changing the URL, so a selected post is still not shareable as a route.

Keep it as an honest search/recommendation interface over Karim’s posts; expose a direct browse-all route and stable URLs for articles. Do not imply a live general-purpose AI if the implementation is the local post search.

### Workspace — merge or keep explicitly experimental

**Observed:** Once opened, Workspace is a VS Code shell containing a placeholder workbench note (“This page should eventually behave like a live academic desktop”) and prospective files that are not yet there. Its purpose is clearer than the previous critique gave it credit for—an operational view of research, teaching, reproducibility and AI workflows—but the page itself admits it is a placeholder. Mobile inherits the editor shell and bottom navigation; the main reading surface is code-editor-like and requires scrolling.

Do not present it as finished academic content. Either build out the collaborator/student value it promises or fold a short “Working with me”/workflow page into Bio or Research. Keep the VS Code frame only if the page remains an intentional experimental demo.

### Contact — keep contact, simplify its phone first view

**Observed:** On desktop Contact presents the full identity and role, portrait, and direct Email, Bath profile, GitHub and ORCID links, followed by contact details. Contact information is not missing. On phone, the portrait collage dominates the first viewport and email is below it; the mobile Contact item is present in the persistent bottom nav. Reorder/scale the image on narrow screens so Email and Bath profile are visible without a long scroll. The site’s first-visit prompt can block this page before any of those details are accessible; see the new finding below.

### Terminal — a useful optional playground, not a required route

**Observed:** The separate terminal has a fastfetch-style panel with full name, role, Bath affiliation and research, plus visible About/Research/Teaching/Theme controls and command chips. Its Research control opened the GitHub Research layout. On phone the panel and output are vertically stacked/scrollable and command chips remain visible farther down. It stays dark in both site-mode states.

That makes it a more informative demonstration than the earlier critique suggested. It is still a second terminal beside the minimal home terminal. Keep only if the richer shell is an intentional playground; otherwise move the useful identity facts to home and remove it as a top-level destination.

## 4. New browser-only findings

1. **First-visit onboarding blocks Contact and Workspace. — Observed, high severity.** The first time either VS Code-style route opened, a full-screen overlay asked “Do you trust the authors of this portfolio?” and dimmed the content. It blocked both pages on desktop and iPhone. “No, browse safely” dismissed it and enabled Simple mode; dismissal persisted in local storage. This is a workspace-trust parody, but to an ordinary academic visitor it looks like a real security decision. The gate interrupts the most practical section and delays contact details. Replace it with a small optional onboarding tip, or remove it from the default journey. `WelcomeBanner.jsx:20-38,48-65,101-114`; rendered through `App.jsx:280-284`.
2. **Mobile Bio header clips its return control. — Observed, medium severity.** At 393px the four header actions do not fit; “Back to OS” is cut off internally even though page-level `scrollWidth` remains 393. Use a compact menu or hide secondary controls below the breakpoint. The persistent Home nav is a partial workaround.
3. **Mobile Contact makes the image precede the useful action. — Observed, medium severity.** The portrait montage fills most of the initial phone viewport; Email, Bath profile and ORCID are below it. Bring the contact actions above or alongside a smaller image at phone widths.
4. **The phone view has no page-wide horizontal overflow in sampled shells, but imitation chrome scrolls/clips internally. — Observed.** `document.documentElement.scrollWidth` and `document.body.scrollWidth` were both 393 on the tested phone page. Research and Teaching tab strips are horizontally scrollable/clipped; Bio’s action row is clipped. Focus fixes on component overflow rather than a global horizontal-scroll bug.
5. **The local browser check found no console errors or warnings. — Observed.** This is a clean runtime smoke result only; it does not replace accessibility, performance or content-link testing.
6. **Choosing safe browsing briefly produces duplicate Simple mode toasts in the local dev build. — Observed, low severity.** The phone screenshot showed two overlapping “Simple mode enabled” notifications after the choice. `toggleSimpleMode` schedules a toast inside a state updater (`App.jsx:97-105`), and `main.jsx:10-15` wraps the app in StrictMode; React development checks can invoke updater functions twice. Confirm whether the duplicate occurs in a production build before treating it as a production defect.

## 5. Accessibility, SEO and performance updates

- **Keyboard/accessibility — code-based, with selected interactions observed.** Wiki language and theme controls are buttons and worked by click. Terminal Research, GitHub Code, mobile section navigation and Journal suggestion cards also worked. However, GitHub file rows and PyPI course navigation are clickable non-button elements (`GitHubLayout.jsx:176-179`; `PyPILayout.jsx:87-88`). Terminal output has no `aria-live` region (`MinimalHome.jsx:228-255`; `TerminalLayout.jsx:311-347`). The home input loses its focus outline due `!important` (`MinimalHome.css:58-62`). These need keyboard/screen-reader verification.
- **Motion — code-based correction.** The original response briefly stated the repeated name morph might ignore reduced motion; that was wrong. The second effect returns when `reduced` is true (`MinimalHome.jsx:106-108`). Keep that behaviour.
- **Language — observed + code-based.** French selection updates the Wiki content and wrapper `lang="fr"`, but outer `<html lang="en">` remains unchanged. Document title also remains generic.
- **Contrast/theme — observed only as rendered variants, not contrast-tested.** Research and Bio support light/dark; PyPI, Journal and dedicated Terminal remain dark-looking across the two site-mode states. Contact/Workspace have their own VS Code theme control. Make the scope of theme controls clear and decide whether a site-wide preference is worth implementing.
- **SEO — observed + code-based.** The app stays at `/` and the title remains `Karim_AI` for every section. The file contains no page description, canonical or social preview tags (`index.html:4-20`). This remains the most important technical fix for discoverability and sharing.
- **Performance — not measured.** I saw a brief “Loading journal…” fallback before its lazy-loaded content appeared; no timing or bundle-size measurement was made. The console was clean. Earlier dependency and Quarto payload comments remain code-based hypotheses until chunk/network sizes are measured.

## 6. Updated priority order

1. Remove or soften the first-visit trust modal, especially on Contact/Workspace.
2. Add addressable routes and page-specific document titles/metadata.
3. Fix PyPI’s fictitious Download controls and route students to verified Moodle/course resources.
4. Reflow Bio header and Contact actions on phone; the sampled site has no global horizontal overflow, but these controls/content are clipped or pushed below the fold.
5. Make clickable file/course rows semantic keyboard controls; announce terminal results to assistive technology.
6. Put name, academic role and Bath affiliation on the minimal home without expanding it into a conventional portfolio hero.
7. Decide whether Workspace and Terminal provide enough audience value to remain top-level pages.

The initial critique’s recommendations to keep Research as GitHub, keep Bio as an encyclopaedic profile, keep the Journal chat idea, and keep the home minimal remain sound. The Bio disclaimer is already implemented; no provenance change is needed.
