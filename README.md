# Karim AI Portfolio Website

A personal academic portfolio website designed to mimic the Visual Studio Code interface. It features a React-based frontend, R-generated content for research data, and a Quarto-powered blog.

## 🚀 Quick Start

### Prerequisites
- Node.js & npm
- R (with `tidyverse` and `jsonlite` packages)
- Quarto CLI

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

---

## 🏗️ Project Structure

```
karim_ai_website/
├── public/                  # Static assets
│   ├── blog/                # Generated Quarto blog HTML
│   ├── images/              # Images (Bath_Crest.png, blackboard.png)
│   ├── *.html               # Generated research pages (publications.html, etc.)
│   └── welcome.md           # (Legacy) Welcome content
├── src/
│   ├── components/          # React Components
│   │   ├── App.jsx          # Main application logic & state
│   │   ├── Layout.jsx       # Main layout (Sidebar + Editor area)
│   │   ├── Sidebar.jsx      # File explorer, Extensions view & activity bar
│   │   ├── Editor.jsx       # Tab management & content rendering
│   │   ├── WelcomePage.jsx  # VS Code-style "Get Started" page
│   │   ├── CodeViewer.jsx   # Renders Markdown & CSS content
│   │   ├── NotebookViewer.jsx # Renders Jupyter Notebook-style content
│   │   ├── RCodeViewer.jsx  # Renders R code & output
│   │   ├── RetroGame.jsx    # Snake game accessible via Extensions view
│   │   ├── CommandPalette.jsx # Cmd+Shift+P search functionality
│   │   ├── TitleBar.jsx     # Navigation controls & command palette trigger
│   │   ├── Statusbar.jsx    # Dynamic status bar
│   │   └── Terminal.jsx     # Collapsible terminal panel
│   ├── styles/
│   │   └── vscode-theme.css # CSS variables for VS Code theming
│   └── main.jsx             # Entry point
├── data/                    # Data sources for R scripts
│   ├── publications.json    # Auto-fetched from ORCID
│   ├── projects.json        # Manual project entries
│   ├── phd_students.json    # Manual PhD student entries
│   └── *.R                  # R scripts to generate HTML from JSON
├── blog/                    # Quarto blog source
│   ├── posts/               # .qmd blog post files
│   └── _quarto.yml          # Quarto configuration
├── scripts/                 # Node.js automation scripts
│   └── fetch_orcid_publications.js
└── package.json             # Dependencies & scripts
```

---

## 🧩 Key Components Guide

If you need to recreate the frontend logic, here is how the core components interact:

### 1. `App.jsx` (State Manager)
- **Role**: Holds the global state: `openFiles` (array of strings), `activeFile` (string), `theme` ('dark'/'light'), and `isSidebarOpen`.
- **Logic**:
    - Passes these states and their setters down to `Layout` and `Editor`.
    - Handles file opening/closing logic.
    - **Close All**: `handleCloseAllFiles` resets state to show only the Welcome page.

### 2. `Layout.jsx` (Container)
- **Role**: Structure of the page. Contains the `Sidebar` (left) and `children` (Editor area).
- **Logic**:
    - Manages the `CommandPalette` visibility (Cmd+Shift+P).
    - **Mobile**: Handles sidebar overlay and responsive transitions.
    - **Terminal**: Manages the visibility of the `Terminal` panel.

### 3. `Sidebar.jsx` (Navigation)
- **Role**: Renders the "Explorer" tree, "Extensions" view, and "Activity Bar" (icons on far left).
- **Logic**:
    - **View Switching**: Uses `activeView` state to toggle between `'explorer'` and `'extensions'` views.
    - **Explorer View**: Uses a `structure` array to define folders and files. `renderItem` recursively renders folders.
    - **Extensions View**: Displays available extensions (e.g., Retro Snake Game) with install/launch capabilities.
    - Clicking a file calls `setActiveFile`.
    - **Accounts Menu**: Dropdown menu with social/academic profile links (GitHub, ORCID, etc.).
    - "Welcome" item uses a custom icon (`Bath_Crest.png`).

### 4. `Editor.jsx` (Content Display)
- **Role**: The main workspace. Renders tabs at the top and the active file's content below.
- **Logic**:
    - **Tabs**: Maps through `openFiles`. Includes a **"Close All"** button with a text label for mobile usability.
    - **Breadcrumbs**: Displays the file path below the tabs (e.g., `karim_ai_website > data > publications.R`).
    - **Content Router**: `renderContent()` switches based on file extension:
        - `'Welcome'`: Renders `<WelcomePage />`.
        - `.md`, `.css`, `.json`, `.txt`, `.gitignore`: Renders `<CodeViewer />`.
        - `.ipynb`: Renders `<NotebookViewer />`.
        - `.R`: Renders `<RCodeViewer />`.
        - `.html`: Renders an `<iframe>` pointing to `public/`.
        - `retro_game.exe`: Renders `<RetroGame />` - a playable Snake game.

### 5. `WelcomePage.jsx` (Home)
- **Role**: The "Get Started" screen.
- **Features**:
    - **Header**: Image (`blackboard.png`) stacked above name "Karim AI". Responsive image sizing and padding for mobile.
    - **Start Section**: Quick links to main sections.
    - **Recent Section**: Links to specific files.
    - **Help Section**: Links to GitHub (including "Report Issue") and Research Portal.

### 6. `Statusbar.jsx` & `Terminal.jsx`
- **Status Bar**: Dynamically displays the language of the active file (e.g., "Markdown", "JavaScript React"). Includes a button to toggle the Terminal and a "Powered by Gemini" acknowledgement.
- **Terminal**: A collapsible panel at the bottom of the screen that mimics a terminal interface. Can be toggled via the Status Bar or `Ctrl + Backtick`.

---

## 🔄 Data & Automation Workflows

### Publications (`npm run update-publications`)
1.  **Fetch**: `scripts/fetch_orcid_publications.js` calls ORCID API (`0000-0001-9718-5256`).
2.  **Save**: Writes raw data to `data/publications.json`.
3.  **Generate**: Runs `Rscript data/publications.R`.
4.  **Render**: R script reads JSON, formats it using `tidyverse`, and saves HTML to `public/publications.html`.

### Research Pages (Projects, PhDs)
- **Source**: Manually edit `data/projects.json` or `data/phd_students.json`.
- **Generate**: Run `Rscript data/projects.R` or `Rscript data/phd_students.R`.
- **Output**: Generates `public/projects.html` and `public/phd_students.html`.

### Blog (Quarto)
1.  **Write**: Create `.qmd` files in `blog/posts/`.
2.  **Build**: Run `quarto render` inside `blog/`.
3.  **Output**: HTML files are generated in `public/blog/`.
4.  **Link**: Add the new file to `Sidebar.jsx` or `CommandPalette.jsx` if desired.

---

## 🎨 Theming & Responsive Design

### VS Code Theme (`vscode-theme.css`)
The site uses CSS variables to handle theming.
- **Colors**: Defined in `:root` (dark) and `[data-theme="light"]`.
- **Key Variables**:
    - `--vscode-editor-bg`: Main background.
    - `--vscode-sidebar-bg`: Sidebar background.
    - `--vscode-text`: Main text color.
    - `--vscode-accent`: Blue accent color.
- **Recent Updates**:
    - **True Black/White**: Backgrounds are now pure black (`#000000`) in dark mode and pure white (`#ffffff`) in light mode for a sharper contrast.
    - **UI Enhancements**: Added mock "Outline" and "Timeline" panels to the sidebar and a terminal selector to the terminal panel for increased realism.

### Responsive Design (`index.css`)
- **Command Palette**: Responsive width using `.command-palette-trigger` class
    - Mobile (< 768px): 280px
    - Desktop (≥ 768px): 500px
- **Sidebar**: Collapsible on mobile with hamburger menu. Includes a dividing line between the activity bar and sidebar content.
- **Status Bar**: Adaptive layout with hidden elements on small screens

---

## 🛠️ Recreation Guide (If everything is lost)

1.  **Scaffold React**: `npm create vite@latest . -- --template react`
2.  **Install Deps**: `npm install react-icons bootstrap react-bootstrap`
3.  **Setup CSS**: Copy `vscode-theme.css` to `src/styles/` and import in `main.jsx`.
4.  **Create Components**: Rebuild the component tree as described in "Key Components Guide".
5.  **Setup Data**: Create `data/` folder and add the R scripts.
6.  **Setup Blog**: Initialize Quarto in `blog/` folder.
7.  **Connect**: Ensure `Editor.jsx` correctly routes file extensions to their respective viewers/iframes.

---

## 🤖 Built With

This website was built with the assistance of **Gemini Antigravity**, an advanced agentic AI coding assistant by Google Deepmind.
