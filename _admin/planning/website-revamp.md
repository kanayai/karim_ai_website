# Personal Website Revamp Plan

This plan tracks the redesign and revamp of Karim's personal academic website to move away from the basic Bootstrap-flavored styling and implement a multi-template design.

---

## The Four Layout Templates

Each page of the website will use a distinct, interactive visual theme:

### 1. Retro Terminal (Fastfetch + Starship)
* **Target Page:** Welcome / Home (`welcome.md` context).
* **Aesthetic:** A retro, colorful terminal prompt.
* **Key Features:**
  
  * Displays system details and custom specs using a mock `fastfetch` output.
  * Shows a custom prompt customized with the `starship` style.
  * Interactive shell interface where users can type commands (e.g., `about`, `research`, `teaching`, `theme`, `clear`, `fastfetch`) or click on links to trigger them.

### 2. VS Code IDE Interface
* **Target Page:** About Me / Contact Info (`about_me.md` / `contact.css` context).
* **Aesthetic:** Visual Studio Code theme (reusing the existing decoy UI).
* **Key Features:**
  
  * File explorer sidebar showing biographical markdown and contact files.
  * Open tabs showing career history, education, and credentials with syntax-highlighted code.

### 3. GitHub Repository Layout
* **Target Page:** Research (`publications.html`, `projects.html`, `phd_students.html` context).
* **Aesthetic:** Mimics a repository on GitHub (e.g., `github.com/kanayai/research`).
* **Key Features:**
  
  * **Folders:** Representing active research projects (e.g., `maf_bayesian/`, `iquitos_spillover/`).
  * **Files:** A list of papers/publications represented as files in the repository.
  * **README.md:** Rendered at the bottom, providing a high-level summary of research interests and funding.
  * **Sidebar:**
    
    * **Contributors:** Listing research collaborators (e.g., Neal Alexander, Andrew Rhead).
    * **Releases:** Showing recent publication or model milestones.
    * **Languages:** Showing a breakdown of languages used (e.g., R 70%, Python 20%, LaTeX 10%).
    * **Back to OS:** A blue-accented button (`.back-to-os`) to return to the Terminal welcome screen.

### 4. Python Package (PyPI) Layout
* **Target Page:** Teaching / Courses (`current_courses.ipynb`, `previous_courses.ipynb` context).
* **Aesthetic:** Mimics a PyPI project page (e.g., `pypi.org/project/ma22019/`).
* **Key Features:**
  
  * **Install Command:** Displaying a header like `pip install ma22019` or `pip install bath-statistics`.
  * **Project Description:** Serving as the course syllabus, overview, and schedule.
  * **Sidebar Metadata:**
    
    * **Author:** Karim Anaya-Izquierdo.
    * **License:** `Student-Only / University of Bath`.
    * **Requires:** `enrollment in MA22019` or `Prerequisites: Probability & Statistics`.
  * **Project Tabs:**
    
    * **Project description:** Course details.
    * **Release history:** Course updates, assignments, and solution releases.
    * **Download files:** Lecture slides, sheets, and datasets.
    * **Exit to OS:** A gold-accented button (`.exit-to-os`) to return to the Terminal welcome screen.

---

## Technology & CSS Strategy

* **Framework:** React + Vite (reusing the existing SPA architecture).
* **Styling:** Custom CSS modules/files mimicking GitHub, PyPI, and Terminal styling, completely replacing/hiding Bootstrap elements.
* **Licensing:** Standard fair-use/parody design elements. No functional code from GitHub or PyPI is copied; only visual structure is mimicked.

---

## Implementation Roadmap

### Phase 1: Layout Components
1. Create separate layout containers in React for the three new themes (`TerminalLayout`, `GitHubLayout`, `PyPILayout`) alongside the existing `VSCodeLayout`. (Done 2026-07-09)
2. Connect them via React Router or local state-based routing. (Done 2026-07-09)

### Phase 2: Page Integration
1. **Welcome:** Integrate Terminal layout. (Done 2026-07-09)
2. **Research:** Map R-generated publications and project JSONs into the GitHub file structure, README, and contributors list. (Done 2026-07-09)
3. **Teaching:** Map course notebooks and resources into the PyPI metadata, release history, and downloads. (Done 2026-07-09)

### Phase 3: Polish & Styling
1. Implement high-fidelity CSS styling to replicate the exact colors, borders, and spacings of GitHub and PyPI. (Done 2026-07-09)
2. Add navigation return buttons with themed background colors (blue highlight for GitHub, gold highlight for PyPI). (Done 2026-07-09)
3. Add micro-animations (e.g., terminal cursor blinking, folder hover highlights). (Ongoing)
