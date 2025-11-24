import React from 'react';
import NotebookViewer from './NotebookViewer';
import CodeViewer from './CodeViewer';
import { VscClose } from 'react-icons/vsc';
import { FaMarkdown, FaPython, FaJs, FaReact } from 'react-icons/fa';

const Editor = ({ activeFile, openFiles, setActiveFile, onCloseFile }) => {

    const getIcon = (filename) => {
        if (filename.endsWith('.md')) return <FaMarkdown color="#519aba" />;
        if (filename.endsWith('.ipynb')) return <FaPython color="#3776ab" />;
        if (filename.endsWith('.js')) return <FaJs color="#f7df1e" />;
        if (filename.endsWith('.css')) return <FaReact color="#61dafb" />;
        if (filename.endsWith('.html')) return <span style={{ color: '#e34c26', fontWeight: 'bold', fontSize: '10px' }}>HTML</span>;
        if (filename.endsWith('.R')) return <span style={{ color: '#276dc3', fontWeight: 'bold', fontSize: '10px' }}>R</span>;
        return null;
    };

    // Mock content for files that don't exist on disk
    const fileContent = {
        'welcome.md': `# Welcome

![Blackboard](/images/blackboard.png)

Welcome to my academic portfolio.
`,
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
        'projects.md': `# Projects

## AI for Good
Developing AI models to assist in disaster relief efforts.

## Code Assistant
Building an intelligent coding assistant to help developers write better code faster.

## Smart Campus
Using IoT and AI to optimize energy consumption on university campuses.
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

        if (activeFile.endsWith('.ipynb')) {
            return <NotebookViewer fileName={activeFile} />;
        }

        if (activeFile.endsWith('.html')) {
            // Construct path for blog posts
            // If the file is in the 'Blog' folder in Sidebar, we need to know its full path.
            // For simplicity, we'll map the filename to the expected public path.
            let src = '';
            if (activeFile === 'index.html') src = '/blog/index.html';
            else if (activeFile === 'first-post.html') src = '/blog/posts/first-post.html';
            else if (activeFile === 'anscombe_quartet.html') src = '/blog/posts/anscombe_quartet.html';
            else if (activeFile === 'publications.html') src = '/publications.html';

            return (
                <iframe
                    src={src}
                    style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#ffffff' }}
                    title="Blog Post"
                />
            );
        }

        if (activeFile.endsWith('.R')) {
            // Display R code with syntax highlighting
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
