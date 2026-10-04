# karim_ai_website — personal academic website

Personal website of **Karim Anaya-Izquierdo**, Senior Lecturer in Statistics, Department of Mathematical Sciences, University of Bath.

The home page is a minimal terminal. Each section opens in its own look-alike interface: research as a GitHub repository, teaching as a Moodle course page, bio as a Wikipedia article, and so on. Every page has its own address. Built with React + Vite; research pages are generated from JSON with R; the blog is Quarto.

## Quick start

Prerequisites: Node.js and npm; R (`tidyverse`, `jsonlite`) and the Quarto CLI only if you regenerate content.

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # production build into dist/
```

Pushing to `main` on GitHub deploys the site through Netlify (https://karim-ai.netlify.app/). A GitHub Action (`.github/workflows/ci.yml`) runs `npm run lint` and `npm run build` on every push.

## Site map

| Address | Section | Look | Component |
|---|---|---|---|
| `/` | Home | Minimal terminal (whois record + `ls`) | `src/components/MinimalHome.jsx` + `minimalShell.js` |
| `/research`, `/research/<page>` | Research | GitHub repository | `src/components/GitHubLayout.jsx` |
| `/teaching` | Teaching | Moodle course cards | `src/components/TeachingLayout.jsx` (data: `src/constants/teachingData.js`) |
| `/bio`, `/es/bio` | Bio | Wikipedia article (English, Spanish) | `src/components/WikiLayout.jsx` |
| `/journal`, `/journal/<post>` | Journal | ChatGPT-style keyword search over posts | journal shell in `src/App.jsx` + `BlogViewer.jsx` |
| `/workspace`, `/workspace/<file>` | Workspace | VS Code | `Layout.jsx` + `Editor.jsx` |
| `/contact` | Contact | VS Code | `Layout.jsx` + `Editor.jsx` (`public/contact.html`) |

Addresses live in `src/routes.js` (file ↔ path, titles); `src/App.jsx` keeps the address bar in step with
the open page via the History API, and `getLayoutType()` picks the layout. `public/_redirects` makes
Netlify serve the app at these paths (section paths are forced so `/contact` is not shadowed by
`public/contact.html`). Old `#file` links still work. Retired layouts (Terminal, PyPI) are kept in
`src/archive/`.

One light/dark setting covers every page: `src/hooks/useSiteMode.js` (stored in `localStorage` as
`site-mode`). The VS Code theme is derived from it in `App.jsx`.

### Home terminal

Commands live in `src/components/minimalShell.js` (pure function: input → output and action). `help` shows the public list; `help --all` lists every command, including the unadvertised ones (`git log`, `curl wttr.in`, `google`, Easter eggs); `man <command>` prints a short manual page built from that list. `whois karim` repeats the opening record. `clear` returns to the opening screen.

### Research (GitHub look)

Repo front page: toolbar (branch, Go to file, Add file, Code dropdown), file list, README, and About/Contributors/Languages sidebar. Clicking a file opens a GitHub-style file view with a file tree, Preview/Code toggle and Raw link. The Code dropdown's clone commands and Download ZIP point at this real repository.

## Content workflows

| Content | Source | Generate |
|---|---|---|
| Publications | ORCID → `data/publications.json` | `npm run update-publications` → `public/publications.html` |
| Projects | `data/projects.json` | `Rscript data/projects.R` → `public/projects.html` |
| PhD students | `data/phd_students.json` | `Rscript data/phd_students.R` → `public/phd_students.html` |
| Blog | `blog/posts/*.qmd` | `npm run build-blog` → `public/blog/` (see `QUARTO_GUIDE.md`) |

Generated HTML in `public/` is committed, so Netlify only needs the Vite build.

## Repository layout

```
src/
  App.jsx              layouts (activeFile → layout), address sync, theme, open files
  routes.js            addresses and page titles
  components/          one component per layout, plus viewers (Html, Notebook, RCode, …)
  constants/           blog data, themes, Wiki strings
  hooks/useSiteMode.js shared light/dark mode
  locales/             i18n strings (en, es)
  archive/             retired layouts (Terminal, PyPI), not built
public/                static pages, generated research HTML, Quarto blog output, images
data/                  JSON sources and the R scripts that render them
blog/                  Quarto blog source
scripts/               ORCID fetcher, multi-machine sync script
_admin/                planning notes
```

## More documentation

- `HANDOFF_NEXT_AGENT.md` — current state and next step
- `QUARTO_GUIDE.md` — writing and rendering blog posts
- `SYNC_INSTRUCTIONS.md` — working across machines (`./scripts/sync_work.sh`)
- `_admin/planning/2026-10_revamp-plan.md` — October 2026 revamp plan (milestones M1–M8)
- `WEBSITE_DOCUMENTATION.md` — historical notes from the earlier VS Code-only design

## Licence

MIT — see `LICENSE.txt`.
