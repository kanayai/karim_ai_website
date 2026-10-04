# Prompt for Codex — harsh UX and structure critique of karim_ai_website

_Written 2026-10-04 by Claude Code for Karim. Paste everything below the line into Codex, run from the repo root._

---

You are an external reviewer. Give a **thorough, harsh, honest critique** of this personal academic website and its codebase, aimed at improvement. Do not be polite or reassuring; if something is a bad idea, say so and say why. Praise only where it informs a decision (what must be kept).

**Do not modify any project files.** This is review only. Your single output is the report file named at the end.

**This is unfinished work.** The site is mid-build. Judge where it is heading as well as where it is now, and say what to prioritise to finish it well.

**Fake buttons are deliberate.** The themed pages copy the real sites' appearance faithfully; not every control works, and that is acceptable. Appearance and overall UX matter most to Karim. Example: the green **Code** button on the GitHub page works (clone URLs, ZIP), as a real visitor would expect, while Star/Fork/Watch are visual only. Full functionality is not the goal. Do **not** recommend removing decorative controls just because they are inert. Do flag cases where an inert control is one a visitor would very likely try to use and would be frustrated by (like the green Code button), and recommend which few controls are worth making real.

## 1. What the site is

Personal website of Karim Anaya-Izquierdo, Senior Lecturer in Statistics, Department of Mathematical Sciences, University of Bath (UK). Research: information geometry, uncertainty quantification in mechanical engineering, survival analysis, spatial epidemiology, Bayesian methods. Teaching: probability for data science, data science, design of experiments.

Stack: React 19 + Vite; research pages generated from JSON with R; blog in Quarto; generated HTML in `public/` is committed; Netlify deploys from `main`. Repo: `github.com/kanayai/karim_ai_website`.

Concept: the **home page is a minimal interactive terminal**. Each section opens in its own "look-alike" interface imitating a well-known website:

| Section (home `ls`) | Look | Component |
|---|---|---|
| home | Minimal terminal | `src/components/MinimalHome.jsx` + `minimalShell.js` |
| `research/` | GitHub repository | `src/components/GitHubLayout.jsx` (+ `GitHubCodeMenu.jsx`) |
| `teaching/` | PyPI package page | `src/components/PyPILayout.jsx` |
| `bio/` | Wikipedia article (en/es/fr/pt) | `src/components/WikiLayout.jsx` |
| `journal/` | AI chat assistant (ChatGPT-style "Blog Assistant") over Quarto posts | journal shell in `src/App.jsx` + `src/components/BlogViewer.jsx` |
| `workspace/`, `contact/` | VS Code | `Layout.jsx` + `Editor.jsx` |
| `terminal/` | Full terminal | `src/components/TerminalLayout.jsx` |

Routing is by `activeFile` via `getLayoutType()` in `src/App.jsx`. Light/dark mode is shared by home, GitHub and Wiki pages (`src/hooks/useSiteMode.js`); PyPI and terminal pages do not yet follow it.

Read first, in this order: `README.md`, `HANDOFF_NEXT_AGENT.md`, `_admin/planning/website-revamp.md`, `src/App.jsx`, then each layout component. `WEBSITE_DOCUMENTATION.md` describes an earlier VS Code-only design — treat as historical. Run the site with `npm install && npm run dev` (http://localhost:5173/) and actually use it, including at a phone viewport (e.g. 375×812) if you can drive a browser; if you cannot, say so and review from code and CSS.

## 2. The owner's aims (judge everything against these)

**Audience** (estimated):
- **80% professionals** — scientists, mathematicians, statisticians, educators. Not necessarily statisticians.
- **15% students.**
- **5% general public** (non-scientists).

**Home page:** must stay **minimal, with a little interactivity as now**. It is the entry point to all sections. Karim wants to keep most of what is there.

**Section pages:** need not be minimal. Each section narrows the audience (e.g. research → professionals). The themed look-alikes are deliberate:
- **Bio as Wikipedia** — Karim likes this: almost everyone in all three audience groups has seen a Wikipedia page.
- **Research as GitHub** — Karim wants to **keep** this; only minor improvements.
- **Teaching as PyPI** — Karim is **unsure**; considering **Moodle** instead (the VLE students at Bath actually use). Give a clear recommendation.
- **Journal as an AI chat assistant** — Karim likes this; unfinished; open to suggestions on how to develop it.
- **Other sections** (workspace, contact, terminal) — theme and purpose unclear. Recommend: keep, re-theme, merge or drop, and what look-alike (if any) fits.

**Mobile:** not yet considered. Karim suspects mobile is compromised. Assess properly.

**Open to radically different ideas.** Everything above is Karim's current thinking, not a constraint. Moodle for teaching is one suggestion; a completely different idea is equally welcome. The same applies to every section, the home page, the themes and the overall concept. If you think a different approach would serve the audience better, propose it with reasons, even if it means replacing something Karim likes.

## 3. What to critique

Cover both audience-facing and internal issues.

**A. Audience-facing (UX, content, accessibility)**
1. First 10 seconds on the home page for each audience group: does a non-technical visitor understand who this is and where to click without typing commands? Is the terminal a barrier or a hook? Discoverability of sections without knowing commands.
2. Information scent and navigation: can a visitor get from home to publications, a course, contact details, and back, quickly? Is "return to home" consistent across layouts?
3. Each themed page: is the metaphor helping or hurting comprehension for its likely audience? Is the realism convincing — what looks off compared with the real site? Within the "fake buttons are fine" policy above, which few inert controls would visitors most likely click, and which should therefore be made to work?
4. Teaching: PyPI vs Moodle vs something else — weigh students (who know Moodle) against professionals/educators (who may land there too). Concrete recommendation.
5. Unclear sections: purpose, audience, and recommendation for each.
6. Mobile/phone: layout at narrow widths, typing into a terminal on a phone keyboard, tap targets, horizontal scroll, the GitHub/Wikipedia/PyPI imitations at small widths. What is broken; what must change; what minimal-cost fix exists.
7. Accessibility: keyboard navigation, screen readers on the terminal, contrast in both themes, focus states, reduced motion, alt text, language attributes for the multilingual Wiki.
8. Credibility and professional signals for academics: are the essentials (name, role, affiliation, publications, ORCID, email, CV) findable in one or two clicks? Anything that undermines credibility?
9. SEO and shareability: titles, meta descriptions, Open Graph, indexable content (a JS-only terminal may hide content from search engines and link previews), direct deep links to sections.
10. Performance: bundle size, unused dependencies, load time on mobile.

**B. Internal (structure, maintenance, workflow)**
1. Architecture: routing by `activeFile` vs URL routes (deep links, back button, bookmarking). Component sizes, duplication across layouts, CSS organisation, theme handling.
2. Dead code and leftovers from earlier designs (e.g. VS Code-era components, `MacDesktopLayout`, `RetroGame`, `MusicPlayer`, `TrustModal`): what is used, what to delete.
3. Content pipeline: JSON → R → committed HTML in `public/`; ORCID fetch; Quarto blog. Is this maintainable for one busy academic? What is fragile?
4. Repo hygiene: tracked generated files, stray root markdown files (`about_me.md`, `projects.md`, `welcome.md`, …), docs that are stale, `dist/` presence.
5. i18n: four languages — worth the maintenance cost given the audience?
6. Testing/linting/CI: what minimal safety net is missing.

## 4. Output

Write your report to:

`_admin/reviews/2026-10-04_codex-ux-critique_RESPONSE.md`

Use British English. Structure:

1. **Verdict** — 5 lines max: overall judgement and the three most important changes.
2. **Top 10 issues, ranked** — table: rank, issue, audience affected (pros/students/public/all/internal), severity (critical/high/medium/low), effort (S/M/L), recommendation.
3. **Home page** — what to keep, what to change, with the minimal-interactivity constraint respected.
4. **Section by section** — research, teaching (with explicit PyPI vs Moodle recommendation), bio, journal (AI chat look: how to develop it), workspace, contact, terminal: keep / change / merge / drop, and why.
5. **Mobile** — findings and fixes.
6. **Accessibility, SEO, performance.**
7. **Internal structure and maintenance.**
8. **Quick wins** — changes under ~1 hour each.
9. **What not to change** — things that work and should be protected.
10. **Alternative ideas** — at least two or three bold alternatives (for teaching, other sections, or the whole concept), each with pros, cons and audience fit.
11. **Open questions for Karim** — decisions only he can make.

Cite files as `path:line` where relevant. Separate observed facts (you ran it / read it) from opinion. Be specific: "the X button on the GitHub page does nothing on click" beats "some buttons are fake".
