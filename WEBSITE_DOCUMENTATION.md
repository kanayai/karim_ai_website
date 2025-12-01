# Karim AI Website Documentation

## Overview
This is a VS Code-themed portfolio website for Karim Anaya-Izquierdo, Senior Lecturer (Associate Professor) in Statistics at the University of Bath. The website features an interactive file explorer interface mimicking Visual Studio Code's layout and functionality.

## Technology Stack
- **Framework**: React with Vite
- **Styling**: Bootstrap + Custom CSS (VS Code theme)
- **Icons**: React Icons (VS Code icons)
- **Blog**: Quarto for static blog generation
- **Data Processing**: R (tidyverse, jsonlite) for generating HTML pages
- **API Integration**: ORCID Public API for publications
- **Deployment**: Netlify

## Website Structure

### Navigation & Layout
The website uses a VS Code-inspired interface with:
- **Activity Bar**: Left-most vertical bar with icons for Files, Search, Source Control, Debug, Extensions, Theme Toggle, Accounts, and Settings
- **Sidebar**: File explorer showing the project structure
- **Editor**: Main content area displaying selected files
- **Tabs**: Open files appear as tabs at the top of the editor

### Content Sections

#### 1. Home
- **welcome.md**: Landing page featuring:
  - Blackboard image
  - Brief biography
  - Professional title and current position
  - Career history (LSHTM, Open University, University of Bath)

#### 2. Research
The Research folder contains three dynamically generated HTML pages with a modern Magazine/Grid layout:

##### publications.html
- **Auto-generated** from ORCID public API (`0000-0001-9718-5256`)
- **Update Command**: `npm run update-publications` (fetches latest from ORCID and regenerates HTML)
- **Features**:
  - Responsive grid layout with hover effects
  - Full author lists (not "et al.")
  - Publication cards with year badges and type icons
  - Direct links to DOI/publication sources
  - VS Code dark theme styling
- **Data Flow**:
  1. `scripts/fetch_orcid_publications.js` → fetches from ORCID API
  2. `data/publications.json` → stores publication data
  3. `data/publications.R` → generates HTML with tidyverse
  4. `public/publications.html` → final output

##### projects.html
- **Auto-generated** from `data/projects.json` using R
- **Update Command**: `Rscript data/projects.R`
- **Features**:
  - Magazine-style grid layout
  - Project cards with role badges
  - Tags for quick categorization
  - Links to project websites
- **Current Projects**:
  - **GKN Prosperity Partnership**: Aerospace sustainability research (EPSRC funded)
  - **CerTest**: Composite structures certification methodology (Programme Grant EP/S017038/1)

##### phd_students.html
- **Auto-generated** from `data/phd_students.json` using R
- **Update Command**: `Rscript data/phd_students.R`
- **Features**:
  - Grid layout with student cards
  - Full thesis abstracts (text-clamped to 4 lines)
  - Department and supervisor information
  - Tags for research areas
  - Links to thesis pages on Bath Research Portal
- **Current Students**:
  1. **Alice Davis**: Time-to-event data analysis
  2. **Thomas Pennington**: Geometric MCMC (SAMBa)
  3. **James Evans**: Composite laminates impact damage (SAMBa, co-supervised with Andrew Rhead)

#### 3. Teaching
- **current_courses.ipynb**: Jupyter notebook with current teaching assignments
- **previous_courses.ipynb**: Jupyter notebook with past teaching history

#### 4. Blog
### Blog (Quarto)
1.  **Write**: Create `.qmd` files in `blog/posts/`.
2.  **Build**: Run `npm run build-blog` (or `quarto render blog`).
3.  **Output**: HTML files are generated in `public/blog/`.
4.  **Navigation**:
    -   Clicking a post opens it in an iframe.
    -   A **"Back to Blog"** button appears above the post to return to the list.
5.  **Guide**: See `QUARTO_GUIDE.md` for detailed instructions.

#### 5. About Me
- **about_me.md**: Detailed biography including:
  - Full name and pronunciation (Karim Anaya‑Izquierdo, pronounced "is‑key‑air‑dow")
  - Professional background
  - Education:
    - PhD in Statistics (2006) – National University of Mexico
    - MSc in Statistics (2001) – National University of Mexico
    - BSc in Actuarial Sciences (2000) – ITAM Mexico
  - Experience:
    - LSHTM – Lecturer in Medical Statistics (2011‑2013)
    - Open University – Postdoctoral Research Fellow (2005‑2011)

#### 6. Contact Information
- **contact.css**: CSS file containing contact details as CSS variables:
  - Name: Prof. Karim AI (Anaya-Izquierdo)
  - Department: Mathematical Sciences
  - University: University of Bath, United Kingdom
  - Email: kai21@bath.ac.uk
  - Office: 4West 4.13
  - Address: Claverton Down, BA2 7AY, Bath, United Kingdom

## Interactive Features

### Accounts Button
Located in the activity bar, clicking the Accounts icon reveals a dropdown menu with links to:
- **GitHub**: [github.com/kanayai](https://github.com/kanayai)
- **Google Scholar**: [Scholar Profile](https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en)
- **ORCID**: [0000-0001-9718-5256](https://orcid.org/0000-0001-9718-5256)
- **Bath University**: [Research Portal](https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/)

### Theme Toggle
- Dark/Light theme switcher
- Maintains VS Code aesthetic in both modes

### File Explorer
- Expandable/collapsible folders
- All folders closed by default on page load
- Click to open files in the editor
- Multiple files can be open simultaneously in tabs

### Simple Mode (Reader View)
- Toggle button located in the Status Bar (bottom right).
- Hides the Sidebar and Terminal to provide a cleaner, document-focused reading experience.
- Ideal for non-technical visitors who may find the full IDE interface overwhelming.

## Default Behavior
- **Default Page**: `welcome.md` opens automatically on site load
- **Folders**: All folders are collapsed by default
- **Sidebar**: Always visible on desktop, collapsible on mobile

## File Types Supported
- **Markdown (.md)**: Displayed as plain text with syntax highlighting
- **HTML (.html)**: Rendered in iframe
- **Jupyter Notebooks (.ipynb)**: Custom notebook viewer component
- **CSS (.css)**: Displayed as plain text with syntax highlighting
- **R (.R)**: Special handling with instructions for running scripts
- **JSON (.json)**: Displayed as plain text with syntax highlighting

## Design Philosophy
- **VS Code Aesthetic**: Mimics the familiar Visual Studio Code interface
- **Professional**: Clean, modern design suitable for academic portfolio
- **Responsive**: Mobile-friendly with collapsible sidebar
- **Interactive**: File-based navigation creates an engaging user experience
- **Content-Rich**: Comprehensive information about research, teaching, and publications
- **Automated**: ORCID integration keeps publications up-to-date automatically

## Technical Notes
- Content for `.md` and `.css` files is hardcoded in `Editor.jsx` for display
- Physical files exist on disk for version control and consistency
- Blog posts are generated via Quarto and served as static HTML
- **Publications are auto-fetched from ORCID** using Node.js script
- **Projects and PhD students pages are generated from JSON** using R (tidyverse)
- All research pages use a consistent Magazine/Grid layout with VS Code theme colors
- Bootstrap provides responsive grid and utility classes
- Custom CSS variables enable easy theme switching

## Data Management Workflows

### Updating Publications
```bash
# Automatically fetch from ORCID and regenerate HTML
npm run update-publications

# This runs:
# 1. node scripts/fetch_orcid_publications.js  (fetches from ORCID)
# 2. Rscript data/publications.R                (generates HTML)
```

### Updating Projects
1. Edit `data/projects.json` to add/modify projects
2. Run `Rscript data/projects.R` to regenerate `public/projects.html`

### Updating PhD Students
1. Edit `data/phd_students.json` to add/modify students
2. Run `Rscript data/phd_students.R` to regenerate `public/phd_students.html`

## Future Enhancements
The modular structure allows for easy additions:
- Additional blog posts via Quarto
- Automatic fetching of project details from research portal APIs
- Enhanced search/filter functionality for publications
- Timeline visualization for career history
- Integration with other academic profile services

