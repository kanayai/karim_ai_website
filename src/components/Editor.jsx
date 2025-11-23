import React from 'react';
import NotebookViewer from './NotebookViewer';
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
            return <NotebookViewer />;
        }

        if (activeFile.endsWith('.html')) {
            // Construct path for blog posts
            // If the file is in the 'Blog' folder in Sidebar, we need to know its full path.
            // For simplicity, we'll map the filename to the expected public path.
            let src = '';
            if (activeFile === 'index.html') src = '/blog/index.html';
            else if (activeFile === 'first-post.html') src = '/blog/posts/first-post.html';
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

        // Default Markdown/Text content
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
