# karim_ai_website — personal academic website

Personal website of **Karim Anaya-Izquierdo**, Senior Lecturer in Statistics, Department of Mathematical Sciences, University of Bath.

The home page is a minimal terminal. Each section opens in its own look-alike interface: research as a GitHub repository, teaching as a PyPI package page, bio as a Wikipedia article, and so on. Built with React + Vite; research pages are generated from JSON with R; the blog is Quarto.

## Quick start

Prerequisites: Node.js and npm; R (`tidyverse`, `jsonlite`) and the Quarto CLI only if you regenerate content.

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # production build into dist/
```

Pushing to `main` on GitHub deploys the site through Netlify.

## Site map

| Section (home `ls`) | Opens | Look | Component |
|---|---|---|---|
| home | `Welcome` | Minimal terminal | `src/components/MinimalHome.jsx` + `minimalShell.js` |
| `research/` | `projects.html` | GitHub repository | `src/components/GitHubLayout.jsx` |
| `teaching/` | `current_courses.ipynb` | PyPI package page | `src/components/PyPILayout.jsx` |
| `bio/` | `wiki.html` | Wikipedia article (en/es/fr/pt) | `src/components/WikiLayout.jsx` |
| `journal/` | `blog.html` | Blog reader (Quarto posts) | journal shell in `src/App.jsx` |
| `workspace/`, `contact/` | `workspace.md`, `contact.html` | VS Code | `Layout.jsx` + `Editor.jsx` |
| `terminal/` | `terminal.html` | Full terminal | `src/components/TerminalLayout.jsx` |

Routing is by `activeFile`: `getLayoutType()` in `src/App.jsx` maps each file to a layout.

Light/dark mode is shared across the home, GitHub and Wiki pages via `src/hooks/useSiteMode.js` (stored in `localStorage` as `site-mode`).

### Home terminal

Commands live in `src/components/minimalShell.js` (pure function: input → output and action). `help` shows the public list; `help --all` lists every command, including the unadvertised ones (`git log`, `curl wttr.in`, `google`, Easter eggs). `clear` returns to the opening screen.

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
  App.jsx              routing (activeFile → layout), theme, open files
  components/          one component per layout, plus viewers (Html, Notebook, RCode, …)
  constants/           blog data, themes, Wiki strings
  hooks/useSiteMode.js shared light/dark mode
  locales/             i18n strings (en, es, fr, pt)
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
- `WEBSITE_DOCUMENTATION.md` — detailed notes from the earlier VS Code-only design

## Licence

MIT — see `LICENSE.txt`.
