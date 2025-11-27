import React from 'react';
import NotebookViewer from './NotebookViewer';
import CodeViewer from './CodeViewer';
import RCodeViewer from './RCodeViewer';
import WelcomePage from './WelcomePage';
import RetroGame from './RetroGame';
import { VscClose, VscCloseAll, VscChevronRight, VscLaw, VscGame } from 'react-icons/vsc';
import { FaMarkdown, FaPython, FaJs, FaReact, FaHtml5 } from 'react-icons/fa';

const Editor = ({ activeFile, openFiles, setActiveFile, onCloseFile, onCloseAllFiles, theme }) => {

    const getIcon = (filename) => {
        if (filename === 'Welcome') return <img src="/images/Bath_Crest.png" alt="Welcome" style={{ width: '16px', height: '16px' }} />;
        if (filename.endsWith('.md')) return <FaMarkdown color="#519aba" />;
        if (filename.endsWith('.ipynb')) return <FaPython color="#3776ab" />;
        if (filename.endsWith('.js')) return <FaJs color="#f7df1e" />;
        if (filename.endsWith('.css')) return <FaReact color="#61dafb" />;
        if (filename.endsWith('.html')) return <span style={{ color: '#e34c26', fontWeight: 'bold', fontSize: '12px' }}>&lt;&gt;</span>;

        if (filename.endsWith('.R')) return <span style={{ color: '#276dc3', fontWeight: 'bold', fontSize: '10px' }}>R</span>;
        if (filename.endsWith('.txt')) return <VscLaw color="#d4d4d4" />;
        if (filename.endsWith('.exe')) return <VscGame color="#ea8616" />;
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
            if (activeFile === 'index.html') src = '/blog/index.html';
            else if (activeFile === 'anscombe_quartet.html') src = '/blog/posts/anscombe_quartet.html';
            else if (activeFile === 'projects.html') src = '/projects.html';
            else if (activeFile === 'certest.html') src = '/certest.html';
            else if (activeFile === 'gkn_prosperity.html') src = '/gkn_prosperity.html';
            else if (activeFile === 'phd_students.html') src = '/phd_students.html';
            else if (activeFile === 'about_me.html') src = '/about_me.html';
            else if (activeFile === 'contact.html') src = '/contact.html';

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
