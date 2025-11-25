import React from 'react';
import NotebookViewer from './NotebookViewer';
import CodeViewer from './CodeViewer';
import RCodeViewer from './RCodeViewer';
import WelcomePage from './WelcomePage';
import { VscClose } from 'react-icons/vsc';
import { FaMarkdown, FaPython, FaJs, FaReact } from 'react-icons/fa';

const Editor = ({ activeFile, openFiles, setActiveFile, onCloseFile }) => {

    const getIcon = (filename) => {
        if (filename === 'Welcome') return <img src="/images/Bath_Crest.png" alt="Welcome" style={{ width: '16px', height: '16px' }} />;
        if (filename.endsWith('.md')) return <FaMarkdown color="#519aba" />;
        if (filename.endsWith('.ipynb')) return <FaPython color="#3776ab" />;
        if (filename.endsWith('.js')) return <FaJs color="#f7df1e" />;
        if (filename.endsWith('.css')) return <FaReact color="#61dafb" />;
        if (filename.endsWith('.html')) return <span style={{ color: '#e34c26', fontWeight: 'bold', fontSize: '12px' }}>&lt;&gt;</span>;
        if (filename.endsWith('.R')) return <span style={{ color: '#276dc3', fontWeight: 'bold', fontSize: '10px' }}>R</span>;
        return null;
    };

    // Mock content for files that don't exist on disk
    const fileContent = {
        'about_me.md': `# About Me

My name is **Karim Anaya‑Izquierdo**. It is pronounced *is‑key‑air‑dow*.

I am a Senior Lecturer (Associate Professor) in Statistics in the Department of Mathematical Sciences at the University of Bath. I was a research fellow at the Department of Statistics in the Open University in Milton Keynes and then Lecturer in Medical Statistics within the Tropical Epidemiology Group based at the London School of Hygiene and Tropical Medicine before coming to the University of Bath in September 2013.

## Education

- **PhD in Statistics**, 2006 – National University of Mexico
- **MSc in Statistics**, 2001 – National University of Mexico
- **BSc in Actuarial Sciences**, 2000 – ITAM Mexico

## Experience

- **LSHTM** – Lecturer in Medical Statistics (2011‑2013)
- **Open University** – Postdoctoral Research Fellow (2005‑2011)
`,
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
        'contact.css': `/* Contact Details */
.contact-info {
  /* Name */
  --contact-name: "Prof. Karim AI (Anaya-Izquierdo)";
  --contact-department: "Mathematical Sciences";
  --contact-university: "University of Bath, United Kingdom";
  --contact-email: "kai21@bath.ac.uk";
  --contact-office: "4West 4.13";
  --contact-address: "Claverton Down, BA2 7AY, Bath, United Kingdom";
}

/* Display contact info using pseudo-element */
.contact-info::before {
  content: var(--contact-name) " | " var(--contact-department) " | " var(--contact-university) " | " var(--contact-email) " | " var(--contact-office) " | " var(--contact-address);
  white-space: pre-wrap;
}
`
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

            return (
                <iframe
                    src={src}
                    style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#ffffff' }}
                    title="Blog Post"
                />
            );
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

        // Use CodeViewer for MD and CSS
        if (activeFile.endsWith('.md') || activeFile.endsWith('.css')) {
            const content = fileContent[activeFile] || `Content for ${activeFile} not found.`;
            const language = activeFile.endsWith('.css') ? 'css' : 'markdown';
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
            <div className="d-flex" style={{ backgroundColor: 'var(--vscode-bg)', overflowX: 'auto', height: '35px' }}>
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
                        <VscClose
                            className="ms-auto close-icon"
                            onClick={(e) => onCloseFile(e, file)}
                            style={{ opacity: 0.7 }}
                        />
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Editor;
