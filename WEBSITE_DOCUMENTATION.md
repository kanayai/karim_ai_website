# Karim AI Website Documentation

## Overview
This is a VS Code-themed portfolio website for Karim Anaya-Izquierdo, Senior Lecturer (Associate Professor) in Statistics at the University of Bath. The website features an interactive file explorer interface mimicking Visual Studio Code's layout and functionality.

## Technology Stack
- **Framework**: React with Vite
- **Styling**: Bootstrap + Custom CSS (VS Code theme)
- **Icons**: React Icons (VS Code icons)
- **Blog**: Quarto for static blog generation
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
The Research folder contains:

##### publications.html
- Dynamic HTML page generated from R script
- Displays publications grouped by year
- Includes DOI links for each publication
- Data source: `data/publications.json`

##### projects.md
Two main research projects:

**CerTest – Certification for Design: Reshaping the Testing Pyramid**
- Multi-university collaboration (Bristol, Bath, Southampton, Exeter)
- EPSRC Programme Grant (EP/S017038/1)
- Focus: Lighter, more cost and fuel-efficient composite aero-structures
- Four research challenges:
  1. Multi-scale Performance Modelling
  2. Features and Damage Characterisation
  3. Data-Rich High Fidelity Structural Characterisation
  4. Integration & Methodology Validation
- Website: [composites-certest.com](https://www.composites-certest.com)

**GKN Prosperity Partnership**
- Collaboration between University of Bath and GKN Aerospace
- EPSRC funded
- Focus areas:
  - Hydrogen Storage for zero-emission aircraft
  - Composite Structures (tank boundaries, monocoque structures)
  - Propulsion Systems
  - Material Science (functional and structural composite materials)
- Cross-departmental: Mechanical Engineering, Chemical Engineering, Chemistry, Mathematical Sciences

##### phd_students.md
Three PhD students supervised:

1. **Alice Davis**
   - Thesis: Modelling techniques for time-to-event data analysis
   - Department: Mathematical Sciences

2. **Thomas Pennington**
   - Thesis: Geometric Markov Chain Monte Carlo
   - Department: Mathematical Sciences
   - Programme: SAMBa (EPSRC Centre for Doctoral Training in Statistical Applied Mathematics)

3. **James Evans**
   - Thesis: Impact Damage Modelling of Composite Laminates Using Statistical Methods
   - Department: Mechanical Engineering
   - Programme: SAMBa
   - Co-supervisor: Andrew Rhead

#### 3. Teaching
- **current_courses.ipynb**: Jupyter notebook with current teaching assignments
- **previous_courses.ipynb**: Jupyter notebook with past teaching history

#### 4. Blog
- **index.html**: Main blog listing page
- **anscombe_quartet.html**: Blog post about Anscombe's Quartet
- Generated using Quarto from markdown source files in `blog/posts/`

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

## Design Philosophy
- **VS Code Aesthetic**: Mimics the familiar Visual Studio Code interface
- **Professional**: Clean, modern design suitable for academic portfolio
- **Responsive**: Mobile-friendly with collapsible sidebar
- **Interactive**: File-based navigation creates an engaging user experience
- **Content-Rich**: Comprehensive information about research, teaching, and publications

## Technical Notes
- Content for `.md` and `.css` files is hardcoded in `Editor.jsx` for display
- Physical files exist on disk for version control and consistency
- Blog posts are generated via Quarto and served as static HTML
- Publications are managed via JSON and processed with R script
- Bootstrap provides responsive grid and utility classes
- Custom CSS variables enable easy theme switching

## Future Enhancements
The modular structure allows for easy additions:
- Additional blog posts via Quarto
- New research projects in `projects.md`
- Updated publications in `data/publications.json`
- New course materials as Jupyter notebooks
- Additional markdown pages for other content
