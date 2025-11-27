import React from 'react';
import NotebookViewer from './NotebookViewer';
import CodeViewer from './CodeViewer';
import RCodeViewer from './RCodeViewer';
import WelcomePage from './WelcomePage';
import RetroGame from './RetroGame';
import GitGraph from './GitGraph';
import MusicPlayer from './MusicPlayer';
import { VscClose, VscCloseAll, VscChevronRight, VscLaw, VscGame, VscCode, VscGitMerge, VscRadioTower } from 'react-icons/vsc';
import { FaMarkdown, FaPython, FaJs, FaReact, FaHtml5 } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Editor = ({ activeFile, openFiles, setActiveFile, onCloseFile, onCloseAllFiles, theme }) => {
    const { i18n } = useTranslation();

    const getIcon = (filename) => {
        if (filename === 'Welcome') return <img src="/images/Bath_Crest.png" alt="Welcome" style={{ width: '16px', height: '16px' }} />;
        if (filename.endsWith('.md')) return <FaMarkdown color="#519aba" />;
        if (filename.endsWith('.ipynb')) return <FaPython color="#3776ab" />;
        if (filename.endsWith('.js')) return <FaJs color="#f7df1e" />;
        if (filename.endsWith('.css')) return <FaReact color="#61dafb" />;
        if (filename.endsWith('.html')) return <VscCode color="#e34c26" />;

        if (filename.endsWith('.R')) return <span style={{ color: '#276dc3', fontWeight: 'bold', fontSize: '10px' }}>R</span>;
        if (filename.endsWith('.txt')) return <VscLaw color="#d4d4d4" />;
        if (filename.endsWith('.exe')) return <VscGame color="#ea8616" />;
        if (filename === 'git-graph') return <VscGitMerge color="#e91e63" />;
        if (filename === 'lofi-radio') return <VscRadioTower color="#4caf50" />;
        return null;
    };

    // Mock content for files that don't exist on disk
    const fileContent = {

        'projects.md': `# Research Projects

## CerTest – Certification for Design: Reshaping the Testing Pyramid
**Website:** [composites-certest.com](https://www.composites-certest.com)

CerTest develops new approaches to enable lighter, more cost and fuel-efficient composite aero-structures. It addresses the challenges that are hindering step-changes in future engineering design by reshaping the testing pyramid.

The project combines world-class expertise from the Universities of Bristol, Bath, Southampton, and Exeter. It aims to reduce empiricism and enable a new integrated approach to design and validation at hitherto unattainable levels of fidelity and design freedom.

**Key Research Challenges:**
1.  Multi-scale Performance Modelling
2.  Features and Damage Characterisation
3.  Data-Rich High Fidelity Structural Characterisation
4.  Integration & Methodology Validation

## GKN Prosperity Partnership
**Website:** [GKN Prosperity Partnership](https://researchportal.bath.ac.uk/en/projects/gkn-prosperity-partnership)

This is a major collaborative research partnership between the University of Bath and GKN Aerospace, funded by the EPSRC.

**Focus Areas:**
The project, often referred to as "Fingerprint", focuses on advancing sustainable aerospace technologies. Key research areas include:
*   **Hydrogen Storage**: Developing solutions for future zero-emission aircraft.
*   **Composite Structures**: Investigating tank boundaries, monocoque structures, and composite parts.
*   **Propulsion Systems**: Researching next-generation propulsion integration.
*   **Material Science**: Advancing functional and structural composite materials.

The partnership brings together expertise from the Departments of Mechanical Engineering, Chemical Engineering, Chemistry, and Mathematical Sciences to solve complex engineering challenges.
`,
        'phd_students.md': `# PhD Students

## Alice Davis
**Thesis:** Modelling techniques for time-to-event data analysis  
**Department:** Mathematical Sciences  
**Supervisor:** Karim Anaya-Izquierdo  
**Link:** [View Thesis](https://researchportal.bath.ac.uk/en/studentTheses/modelling-techniques-for-time-to-event-data-analysis)

---

## Thomas Pennington
**Thesis:** Geometric Markov Chain Monte Carlo  
**Department:** Mathematical Sciences  
**Programme:** EPSRC Centre for Doctoral Training in Statistical Applied Mathematics (SAMBa)  
**Supervisor:** Karim Anaya-Izquierdo  
**Link:** [View Thesis](https://researchportal.bath.ac.uk/en/studentTheses/geometric-markov-chain-monte-carlo)

---

## James Evans
**Thesis:** Impact Damage Modelling of Composite Laminates Using Statistical Methods to Assess Strength Reduction for Rapid Design  
**Department:** Mechanical Engineering  
**Programme:** EPSRC Centre for Doctoral Training in Statistical Applied Mathematics (SAMBa)  
**Supervisors:** Andrew Rhead, Karim Anaya-Izquierdo  
**Link:** [View Thesis](https://researchportal.bath.ac.uk/en/studentTheses/impact-damage-modelling-of-composite-laminates-using-statistical-)
`,

        'LICENSE.txt': `MIT License
        
Copyright (c) 2025 Karim Anaya-Izquierdo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,

        '.gitignore': `node_modules
.DS_Store
dist
.env`,

        'README.md': `# Karim AI Portfolio Website

This README serves as the central documentation for the Karim AI Portfolio Website. It outlines the project's structure, key components, data workflows, and installation instructions. Use this guide to understand how the React frontend, R data processing, and Quarto blog integration work together to create this VS Code-themed portfolio.

A personal academic portfolio website designed to mimic the Visual Studio Code interface. It features a React-based frontend, R-generated content for research data, and a Quarto-powered blog.

## 🚀 Quick Start

### Prerequisites
- Node.js & npm
- R (with \`tidyverse\` and \`jsonlite\` packages)
- Quarto CLI

### Installation
1.  Clone the repository.
2.  Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`
3.  Start the development server:
    \`\`\`bash
    npm run dev
    \`\`\`

---

## 🏗️ Project Structure

\`\`\`
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
├── LICENSE.txt              # MIT License
├── README.md                # Central documentation: structure, components, and workflows.
└── package.json             # Dependencies & scripts
\`\`\`

---

## 🧩 Key Components Guide

If you need to recreate the frontend logic, here is how the core components interact:

### 1. \`App.jsx\` (State Manager)
- **Role**: Holds the global state: \`openFiles\` (array of strings), \`activeFile\` (string), \`theme\` ('dark'/'light'), and \`isSidebarOpen\`.
- **Logic**:
    - Passes these states and their setters down to \`Layout\` and \`Editor\`.
    - Handles file opening/closing logic.
    - **Close All**: \`handleCloseAllFiles\` resets state to show only the Welcome page.

### 2. \`Layout.jsx\` (Container)
- **Role**: Structure of the page. Contains the \`Sidebar\` (left) and \`children\` (Editor area).
- **Logic**:
    - Manages the \`CommandPalette\` visibility (Cmd+Shift+P).
    - **Mobile**: Handles sidebar overlay and responsive transitions.
    - **Terminal**: Manages the visibility of the \`Terminal\` panel.

### 3. \`Sidebar.jsx\` (Navigation)
- **Role**: Renders the "Explorer" tree, "Extensions" view, and "Activity Bar" (icons on far left).
- **Logic**:
    - **View Switching**: Uses \`activeView\` state to toggle between \`'explorer'\` and \`'extensions'\` views.
    - **Explorer View**: Uses a \`structure\` array to define folders and files. \`renderItem\` recursively renders folders.
    - **Extensions View**: Displays available extensions (e.g., Retro Snake Game) with install/launch capabilities.
    - Clicking a file calls \`setActiveFile\`.
    - **Accounts Menu**: Dropdown menu with social/academic profile links (GitHub, ORCID, etc.).
    - "Welcome" item uses a custom icon (\`Bath_Crest.png\`).

### 4. \`Editor.jsx\` (Content Display)
- **Role**: The main workspace. Renders tabs at the top and the active file's content below.
- **Logic**:
    - **Tabs**: Maps through \`openFiles\`. Includes a **"Close All"** button with a text label for mobile usability.
    - **Breadcrumbs**: Displays the file path below the tabs (e.g., \`karim_ai_website > data > publications.R\`).
    - **Content Router**: \`renderContent()\` switches based on file extension:
        - \`'Welcome'\`: Renders \`<WelcomePage />\`.
        - \`.md\`, \`.css\`, \`.json\`, \`.txt\`, \`.gitignore\`: Renders \`<CodeViewer />\`.
        - \`.ipynb\`: Renders \`<NotebookViewer />\`.
        - \`.R\`: Renders \`<RCodeViewer />\`.
        - \`.html\`: Renders an \`<iframe>\` pointing to \`public/\`.
        - \`retro_game.exe\`: Renders \`<RetroGame />\` - a playable Snake game.

### 5. \`WelcomePage.jsx\` (Home)
- **Role**: The "Get Started" screen.
- **Features**:
    - **Header**: Image (\`blackboard.png\`) stacked above name "Karim AI". Responsive image sizing and padding for mobile.
    - **Start Section**: Quick links to main sections.
    - **Recent Section**: Links to specific files.
    - **Help Section**: Links to GitHub (including "Report Issue") and Research Portal.

### 6. \`Statusbar.jsx\` & \`Terminal.jsx\`
- **Status Bar**: Dynamically displays the language of the active file (e.g., "Markdown", "JavaScript React"). Includes a button to toggle the Terminal and a "Powered by Gemini" acknowledgement.
- **Terminal**: A collapsible panel at the bottom of the screen that mimics a terminal interface. Can be toggled via the Status Bar or \`Ctrl + Backtick\`.

---

## 🔄 Data & Automation Workflows

### Publications (\`npm run update-publications\`)
1.  **Fetch**: \`scripts/fetch_orcid_publications.js\` calls ORCID API (\`0000-0001-9718-5256\`).
2.  **Save**: Writes raw data to \`data/publications.json\`.
3.  **Generate**: Runs \`Rscript data/publications.R\`.
4.  **Render**: R script reads JSON, formats it using \`tidyverse\`, and saves HTML to \`public/publications.html\`.

### Research Pages (Projects, PhDs)
- **Source**: Manually edit \`data/projects.json\` or \`data/phd_students.json\`.
- **Generate**: Run \`Rscript data/projects.R\` or \`Rscript data/phd_students.R\`.
- **Output**: Generates \`public/projects.html\` and \`public/phd_students.html\`.

### Blog (Quarto)
1.  **Write**: Create \`.qmd\` files in \`blog/posts/\`.
2.  **Build**: Run \`quarto render\` inside \`blog/\`.
3.  **Output**: HTML files are generated in \`public/blog/\`.
4.  **Link**: Add the new file to \`Sidebar.jsx\` or \`CommandPalette.jsx\` if desired.

---

## 🌐 Multilingual Support

The website now supports multiple languages: **English (en)**, **Spanish (es)**, **French (fr)**, **Italian (it)**, **Portuguese (pt)**, and **German (de)**.

### Features
- **Language Switcher**: Located in the **Settings Menu** (Gear icon in the Activity Bar). Click the icon and select your preferred language from the dropdown.
- **Translated UI**: Sidebar items, status bar text, and welcome page content are fully translated.
- **Localized Content**: Static pages like \`contact.html\` and \`about_me.html\` automatically load the localized version (e.g., \`contact.es.html\`) based on the selected language.

### ⚙️ Settings Menu
Located at the bottom of the Activity Bar, the Gear icon opens a menu with quick access to:
-   **Command Palette**: (\`Shift+Cmd+P\`)
-   **Color Theme**: Toggle between Dark and Light modes.
-   **Language**: Switch the website's language.

### 📝 Translation Workflow for Future Content

To ensure new features and content are translated, follow these steps:

#### 1. React Components
1.  **Add Keys**: Add new JSON keys to \`src/locales/en/translation.json\` and all other language files in \`src/locales/[lang]/\`.
2.  **Use Hook**: In your component, import \`useTranslation\`:
    \`\`\`javascript
    import { useTranslation } from 'react-i18next';
    // ...
    const { t } = useTranslation();
    // ...
    <h1>{t('namespace.key')}</h1>
    \`\`\`

#### 2. Static HTML Pages
For static content loaded via \`iframe\` (like \`contact.html\`):
1.  **Create Files**: Create a copy of the HTML file for each language with the format \`filename.[lang].html\` (e.g., \`new_page.es.html\`).
2.  **Update Editor**: The \`Editor.jsx\` component is already configured to look for these files. Ensure your file naming follows the convention.

#### 3. Blog Posts & R Output
Currently, blog posts (Quarto) and R-generated pages (Publications) are **not** automatically translated. To support this in the future, you would need to:
-   **Quarto**: Configure Quarto profiles for different languages.
-   **R Scripts**: Modify R scripts to generate separate HTML outputs for each language (e.g., \`publications.es.html\`).

---

## 🎨 Theming & Responsive Design

### VS Code Theme (\`vscode-theme.css\`)
The site uses CSS variables to handle theming.
- **Colors**: Defined in \`:root\` (dark) and \`[data-theme="light"]\`.
- **Key Variables**:
    - \`--vscode-editor-bg\`: Main background.
    - \`--vscode-sidebar-bg\`: Sidebar background.
    - \`--vscode-text\`: Main text color.
    - \`--vscode-accent\`: Blue accent color.
- **Recent Updates**:
    - **True Black/White**: Backgrounds are now pure black (\`#000000\`) in dark mode and pure white (\`#ffffff\`) in light mode for a sharper contrast.
    - **UI Enhancements**: Added mock "Outline" and "Timeline" panels to the sidebar and a terminal selector to the terminal panel for increased realism.

### Responsive Design (\`index.css\`)
- **Command Palette**: Responsive width using \`.command-palette-trigger\` class
    - Mobile (< 768px): 280px
    - Desktop (≥ 768px): 500px
- **Sidebar**: Collapsible on mobile with hamburger menu. Includes a dividing line between the activity bar and sidebar content.
- **Status Bar**: Adaptive layout with hidden elements on small screens
- **New Features (v2.0)**:
    - **Portfolio Copilot**: A simulated AI chat interface (Sparkle icon) that answers questions about the portfolio using real data from \`data/\`.
    - **PhD Students Page**: Redesigned to mimic the VS Code Extensions Marketplace.
    - **Run and Debug View**: Displays personal stats ("Variables") and skills ("Unit Tests").
    - **Git Graph**: Visualizes career timeline as a commit graph (Source Control icon).
    - **GitHub Link**: Direct link to the repository via the GitHub icon in the Activity Bar.
    - **Lo-Fi Radio**: Embedded music player for focus.

---

## 🛠️ Recreation Guide (If everything is lost)

1.  **Scaffold React**: \`npm create vite@latest . -- --template react\`
2.  **Install Deps**: \`npm install react-icons bootstrap react-bootstrap\`
3.  **Setup CSS**: Copy \`vscode-theme.css\` to \`src/styles/\` and import in \`main.jsx\`.
4.  **Create Components**: Rebuild the component tree as described in "Key Components Guide".
5.  **Setup Data**: Create \`data/\` folder and add the R scripts.
6.  **Setup Blog**: Initialize Quarto in \`blog/\` folder.
7.  **Connect**: Ensure \`Editor.jsx\` correctly routes file extensions to their respective viewers/iframes.

---

## 🤖 Built With

This website was built with the assistance of **Gemini Antigravity**, an advanced agentic AI coding assistant by Google Deepmind.`,
    };

    const renderContent = () => {
        if (!activeFile) {
            return (
                <div className="d-flex flex-column align-items-center justify-content-center h-100" style={{ color: 'var(--vscode-text)', opacity: 0.5 }}>
                    <div style={{ fontSize: '200px', opacity: 0.1 }}>∞</div>
                    <h3>Show Research & Teaching</h3>
                    <p>Select a file from the explorer to start</p>
                </div>
            );
        }

        if (activeFile === 'Welcome') {
            return <WelcomePage onNavigate={setActiveFile} />;
        }

        if (activeFile.endsWith('.ipynb')) {
            return <NotebookViewer fileName={activeFile} />;
        }

        if (activeFile.endsWith('.html')) {
            // Construct path for blog posts
            // If the file is in the 'Blog' folder in Sidebar, we need to know its full path.
            // For simplicity, we'll map the filename to the expected public path.
            let src = '';
            const lang = i18n.language;

            // Helper to get localized path if it exists, otherwise fallback to default
            const getLocalizedPath = (baseName) => {
                const supportedLangs = ['es', 'fr', 'it', 'pt', 'de'];
                if (supportedLangs.includes(lang) && (baseName === 'contact.html' || baseName === 'about_me.html')) {
                    return `/${baseName.replace('.html', `.${lang}.html`)}`;
                }
                return `/${baseName}`;
            };

            if (activeFile === 'index.html') src = '/blog/index.html';
            else if (activeFile === 'anscombe_quartet.html') src = '/blog/posts/anscombe_quartet.html';
            else if (activeFile === 'projects.html') src = '/projects.html';
            else if (activeFile === 'certest.html') src = '/certest.html';
            else if (activeFile === 'gkn_prosperity.html') src = '/gkn_prosperity.html';
            else if (activeFile === 'phd_students.html') src = '/phd_students.html';
            else if (activeFile === 'about_me.html') src = getLocalizedPath('about_me.html');
            else if (activeFile === 'contact.html') src = getLocalizedPath('contact.html');

            // Append theme param
            if (src) {
                src += `?theme=${theme}`;
            }

            return (
                <iframe
                    src={src}
                    style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#ffffff' }}
                    title="Blog Post"
                />
            );
        }

        if (activeFile === 'retro_game.exe') {
            return <RetroGame />;
        }

        if (activeFile === 'git-graph') {
            return <GitGraph />;
        }

        if (activeFile === 'lofi-radio') {
            return <MusicPlayer />;
        }

        if (activeFile.endsWith('.R')) {
            // Use RCodeViewer for publications.R
            if (activeFile === 'publications.R') {
                return <RCodeViewer fileName={activeFile} />;
            }

            // Display R code with syntax highlighting for other R files
            return (
                <div className="p-4" style={{ color: 'var(--vscode-text)', maxWidth: '1200px', overflowY: 'auto', height: '100%' }}>
                    <h2 style={{ marginBottom: '20px' }}>📊 Publications</h2>
                    <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                        This R script reads publications from <code>data/publications.json</code> and displays them grouped by year with clickable DOI links.
                    </p>
                    <div style={{
                        backgroundColor: 'var(--vscode-bg)',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid var(--vscode-border)'
                    }}>
                        <p><strong>To view the formatted output:</strong></p>
                        <ol>
                            <li>Open your terminal</li>
                            <li>Run: <code style={{ backgroundColor: 'var(--vscode-hover-bg)', padding: '2px 6px', borderRadius: '3px' }}>Rscript data/publications.R</code></li>
                        </ol>
                        <p style={{ marginTop: '15px', opacity: 0.7 }}>
                            The script will display all {/* count publications */} publications with formatted citations and links.
                        </p>
                    </div>
                </div>
            );
        }

        // Use CodeViewer for MD, CSS, JSON, TXT, and .gitignore
        if (activeFile.endsWith('.md') || activeFile.endsWith('.css') || activeFile.endsWith('.json') || activeFile.endsWith('.txt') || activeFile === '.gitignore') {
            const content = fileContent[activeFile] || `Content for ${activeFile} not found.`;
            let language = 'markdown';
            if (activeFile.endsWith('.css')) language = 'css';
            if (activeFile.endsWith('.json')) language = 'json';
            if (activeFile.endsWith('.txt') || activeFile === '.gitignore') language = 'plaintext';

            return <CodeViewer content={content} language={language} />;
        }

        // Default fallback
        return (
            <div className="p-4" style={{ color: 'var(--vscode-text)', maxWidth: '800px', overflowY: 'auto', height: '100%' }}>
                <h1>{activeFile}</h1>
                <p className="mt-4">This is a placeholder for the content of <code>{activeFile}</code>.</p>
                <p>Content will be loaded dynamically here.</p>
                <hr style={{ borderColor: 'var(--vscode-border)' }} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        );
    };

    return (
        <div className="d-flex flex-column flex-grow-1" style={{ backgroundColor: 'var(--vscode-editor-bg)', overflow: 'hidden' }}>
            {/* Tabs */}
            <div className="d-flex align-items-center" style={{ backgroundColor: 'var(--vscode-bg)', overflowX: 'auto', height: '35px', minHeight: '35px', flexShrink: 0 }}>
                <div className="d-flex" style={{ flexGrow: 1, overflowX: 'auto', height: '100%' }}>
                    {openFiles.map(file => (
                        <div
                            key={file}
                            className="d-flex align-items-center px-3 gap-2"
                            style={{
                                backgroundColor: activeFile === file ? 'var(--vscode-editor-bg)' : 'var(--vscode-tab-inactive-bg)',
                                borderTop: activeFile === file ? '1px solid var(--vscode-accent)' : '1px solid transparent',
                                borderRight: '1px solid var(--vscode-border)',
                                color: activeFile === file ? 'var(--vscode-text)' : '#969696',
                                cursor: 'pointer',
                                minWidth: '120px',
                                height: '100%'
                            }}
                            onClick={() => setActiveFile(file)}
                        >
                            {getIcon(file)}
                            <span style={{ fontSize: '13px' }}>{file}</span>
                            <div
                                className="ms-auto d-flex align-items-center justify-content-center rounded hover-bg"
                                style={{ width: '20px', height: '20px' }}
                                onClick={(e) => onCloseFile(e, file)}
                            >
                                <VscClose size={16} />
                            </div>
                        </div>
                    ))}
                </div>
                {/* Close All Button */}
                {openFiles.length > 0 && (
                    <div
                        className="d-flex align-items-center justify-content-center px-2 h-100"
                        style={{
                            cursor: 'pointer',
                            color: 'var(--vscode-text)',
                            borderLeft: '1px solid var(--vscode-border)',
                            minWidth: 'fit-content',
                            paddingRight: '8px'
                        }}
                        onClick={onCloseAllFiles}
                        title="Close All Files"
                    >
                        <VscCloseAll size={18} />
                        <span className="ms-1" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>Close All</span>
                    </div>
                )}
            </div>

            {/* Breadcrumbs */}
            {activeFile && (
                <div className="d-flex align-items-center px-3" style={{
                    height: '22px',
                    minHeight: '22px',
                    flexShrink: 0,
                    backgroundColor: 'var(--vscode-editor-bg)',
                    borderBottom: '1px solid var(--vscode-border)', // Optional: subtle separator
                    fontSize: '13px',
                    color: '#858585', // Dimmed text color
                    userSelect: 'none'
                }}>
                    <span style={{ cursor: 'pointer' }}>karim_ai_website</span>
                    <VscChevronRight className="mx-1" size={14} />
                    {(() => {
                        let path = [];
                        if (activeFile === 'Welcome') path = [];
                        else if (activeFile.includes('blog')) path = ['blog']; // Simplified logic
                        else if (activeFile.endsWith('.R') || activeFile.endsWith('.json')) path = ['data'];
                        else if (activeFile.endsWith('.html')) path = ['public'];
                        else if (activeFile.endsWith('.ipynb')) path = ['notebooks'];

                        return (
                            <>
                                {path.map((folder, i) => (
                                    <React.Fragment key={folder}>
                                        <span style={{ cursor: 'pointer' }}>{folder}</span>
                                        <VscChevronRight className="mx-1" size={14} />
                                    </React.Fragment>
                                ))}
                                <span style={{ color: 'var(--vscode-text)', cursor: 'pointer' }}>{activeFile}</span>
                            </>
                        );
                    })()}
                </div>
            )}

            {/* Content Area */}
            <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Editor;
