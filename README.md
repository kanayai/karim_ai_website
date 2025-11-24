# Karim AI Portfolio Website

A VS Code-themed portfolio website built with React, Vite, and Quarto for blogging.

## Development

Start the development server:
```bash
npm run dev
```

## Managing Publications

Publications are **automatically fetched from ORCID** and converted to HTML:

### Update Publications from ORCID
```bash
npm run update-publications
```

This command:
1. Fetches latest publications from ORCID public API (`0000-0001-9718-5256`)
2. Updates `data/publications.json` with full author lists
3. Regenerates `public/publications.html` using R (tidyverse)

The generated page features:
- Magazine/Grid layout with VS Code dark theme
- Full author lists (not "et al.")
- Publication cards with year badges and type icons
- Direct links to DOI/publication sources

### Manual Updates
If you need to manually edit publications:
1. Edit `data/publications.json`
2. Run `Rscript data/publications.R` to regenerate HTML

## Managing Research Pages

### Projects Page
To update the projects page:
1. Edit `data/projects.json` to add/modify projects
2. Run `Rscript data/projects.R` to regenerate `public/projects.html`

### PhD Students Page
To update the PhD students page:
1. Edit `data/phd_students.json` to add/modify students
2. Run `Rscript data/phd_students.R` to regenerate `public/phd_students.html`

All research pages use a consistent Magazine/Grid layout with:
- Responsive card design
- Hover effects and animations
- VS Code dark theme colors
- FontAwesome icons

## Adding a New Blog Post

The blog is built using **Quarto**. Follow these steps to add a new post:

### 1. Create a New Post File
Navigate to the blog posts directory and create a new `.qmd` file:
```bash
cd blog/posts
# Create a new file, e.g., my-new-post.qmd
```

### 2. Write Your Post
Create a Quarto markdown file with YAML frontmatter:
```yaml
---
title: "Your Post Title"
author: "Your Name"
date: "2025-11-23"
categories: [category1, category2]
---

Your content here...
```

### 3. Render the Blog
From the blog directory, run Quarto to generate the HTML:
```bash
cd blog
quarto render
```

This will:
- Generate HTML files in `public/blog/`
- Update the blog index
- Create the post at `public/blog/posts/your-post-name.html`

### 4. Add to Command Palette (Optional)
To make the new post searchable in the site's command palette, edit `src/components/CommandPalette.jsx` and add an entry to the `files` array:
```javascript
{ name: 'my-new-post.html', path: 'my-new-post.html' }
```

### 5. Update Editor Routing (Optional)
If needed, update `src/components/Editor.jsx` to map the filename to the correct path in the iframe source.

## Project Structure

- `src/` - React application source code
- `blog/` - Quarto blog source files
- `public/blog/` - Generated blog HTML files
- `data/` - Data files (JSON) and R scripts for generating HTML pages
  - `publications.json` - Auto-generated from ORCID
  - `projects.json` - Manually maintained
  - `phd_students.json` - Manually maintained
  - `*.R` - R scripts for generating HTML from JSON
- `scripts/` - Node.js scripts for automation
  - `fetch_orcid_publications.js` - ORCID API integration

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Quarto** - Blog generation
- **R** (tidyverse, jsonlite) - HTML page generation
- **Bootstrap** - Styling
- **React Icons** - VS Code icons
- **ORCID Public API** - Publications data source

