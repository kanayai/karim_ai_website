import React, { Suspense, lazy } from 'react';
import CodeViewer from './CodeViewer';
import WelcomePage from './WelcomePage';
import MarkdownViewer from './MarkdownViewer';
import LicenseViewer from './LicenseViewer';
import GitIgnoreViewer from './GitIgnoreViewer';
import { VscClose, VscCloseAll, VscChevronRight, VscLaw, VscGame, VscCode, VscGitMerge, VscRadioTower, VscPaintcan, VscSymbolKeyword, VscQuote, VscGraph } from 'react-icons/vsc';
import { FaMarkdown, FaPython, FaJs, FaReact, FaHtml5 } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import readmeContent from '../../README.md?raw';
import licenseContent from '../../LICENSE.txt?raw';
import gitignoreContent from '../../.gitignore?raw';
import projectsContent from '../../projects.md?raw';
import phdStudentsContent from '../../phd_students.md?raw';
import aboutMeContent from '../../about_me.md?raw';
import welcomeContent from '../../welcome.md?raw';
import quartoGuideContent from '../../QUARTO_GUIDE.md?raw';
import syncInstructionsContent from '../../SYNC_INSTRUCTIONS.md?raw';
import futureImprovementsContent from '../../FUTURE_IMPROVEMENTS.md?raw';
import websiteDocumentationContent from '../../WEBSITE_DOCUMENTATION.md?raw';

const NotebookViewer = lazy(() => import('./NotebookViewer'));
const RCodeViewer = lazy(() => import('./RCodeViewer'));
const HtmlViewer = lazy(() => import('./HtmlViewer'));
const RetroGame = lazy(() => import('./RetroGame'));
const GitGraph = lazy(() => import('./GitGraph'));
const MusicPlayer = lazy(() => import('./MusicPlayer'));
const LatexPlayground = lazy(() => import('./LatexPlayground'));
const CitationGenerator = lazy(() => import('./CitationGenerator'));
const DataVizGallery = lazy(() => import('./DataVizGallery'));

const Editor = ({ activeFile, openFiles, setActiveFile, onCloseFile, onCloseAllFiles, theme, setTheme, simpleMode, toggleSimpleMode, recentFiles, htmlAutoHeight = false }) => {
    const { i18n } = useTranslation();

    const workspaceFileContent = {
        'README.md': readmeContent,
        'LICENSE.txt': licenseContent,
        '.gitignore': gitignoreContent,
        'projects.md': projectsContent,
        'phd_students.md': phdStudentsContent,
        'about_me.md': aboutMeContent,
        'welcome.md': welcomeContent,
        'QUARTO_GUIDE.md': quartoGuideContent,
        'SYNC_INSTRUCTIONS.md': syncInstructionsContent,
        'FUTURE_IMPROVEMENTS.md': futureImprovementsContent,
        'WEBSITE_DOCUMENTATION.md': websiteDocumentationContent,
    };

    const workspacePaths = {
        'Welcome': ['home'],
        'publications.R': ['data'],
        'current_courses.ipynb': ['notebooks'],
        'previous_courses.ipynb': ['notebooks'],
        'about_me.html': ['public'],
        'contact.html': ['public'],
        'projects.html': ['public'],
        'phd_students.html': ['public'],
        'certest.html': ['public'],
        'gkn_prosperity.html': ['public'],
        'blog.html': ['public', 'blog'],
        'academic_workflow.html': ['public', 'blog', 'posts'],
        'anscombe_quartet.html': ['public', 'blog', 'posts'],
        'git-vs-onedrive.html': ['public', 'blog', 'posts'],
        'reproducibility_guide.html': ['public', 'blog', 'posts'],
        'git-graph': ['extensions'],
        'lofi-radio': ['extensions'],
        'retro_game.exe': ['extensions'],
        'LaTeX': ['extensions'],
        'cite-gen': ['extensions'],
        'data-viz': ['extensions'],
    };

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

        if (filename === 'LaTeX') return <VscSymbolKeyword color="#569cd6" />;
        if (filename === 'cite-gen') return <VscQuote color="#ce9178" />;
        if (filename === 'data-viz') return <VscGraph color="#b5cea8" />;
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

        if (activeFile === 'Welcome') {
            return <WelcomePage onNavigate={setActiveFile} simpleMode={simpleMode} toggleSimpleMode={toggleSimpleMode} recentFiles={recentFiles} theme={theme} setTheme={setTheme} />;
        }

        if (activeFile.endsWith('.ipynb')) {
            return <NotebookViewer fileName={activeFile} />;
        }

        if (activeFile.endsWith('.html')) {
            return <HtmlViewer activeFile={activeFile} theme={theme} setActiveFile={setActiveFile} i18n={i18n} autoHeight={htmlAutoHeight} />;
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



        if (activeFile === 'LaTeX') {
            return <LatexPlayground />;
        }

        if (activeFile === 'cite-gen') {
            return <CitationGenerator />;
        }

        if (activeFile === 'data-viz') {
            return <DataVizGallery />;
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

        // Specific Viewers for README, LICENSE, .gitignore
        if (activeFile.endsWith('README.md')) {
            const content = workspaceFileContent[activeFile] || `Content for ${activeFile} not found.`;
            return <MarkdownViewer content={content} />;
        }

        if (activeFile.endsWith('LICENSE.txt')) {
            const content = workspaceFileContent[activeFile] || `Content for ${activeFile} not found.`;
            return <LicenseViewer content={content} />;
        }

        if (activeFile === '.gitignore') {
            const content = workspaceFileContent[activeFile] || `Content for ${activeFile} not found.`;
            return <GitIgnoreViewer content={content} />;
        }

        // Use CodeViewer for MD (other than README), CSS, JSON, TXT
        if (activeFile.endsWith('.md') || activeFile.endsWith('.css') || activeFile.endsWith('.json') || activeFile.endsWith('.txt')) {
            const content = workspaceFileContent[activeFile] || `Content for ${activeFile} not found in the current workspace map.`;
            let language = 'markdown';
            if (activeFile.endsWith('.css')) language = 'css';
            if (activeFile.endsWith('.json')) language = 'json';
            if (activeFile.endsWith('.txt')) language = 'plaintext';

            return <CodeViewer content={content} language={language} />;
        }

        // Default fallback
        return (
            <div className="p-4" style={{ color: 'var(--vscode-text)', maxWidth: '800px', overflowY: 'auto', height: '100%' }}>
                <h1>{activeFile}</h1>
                <p className="mt-4">This view does not have a dedicated renderer yet.</p>
                <p>The shell is treating it like a workspace file, but there is no specific content adapter for <code>{activeFile}</code> yet.</p>
                <hr style={{ borderColor: 'var(--vscode-border)' }} />
                <p>Next realism step: add a file-backed loader or a specialized viewer for this file type.</p>
            </div>
        );
    };

    return (
        <div className="d-flex flex-column flex-grow-1 editor-shell" style={{ backgroundColor: 'var(--vscode-editor-bg)', overflow: 'hidden' }}>
            <div className="editor-tabs d-flex align-items-center">
                <div className="d-flex editor-tabs-scroll" style={{ flexGrow: 1, overflowX: 'auto', height: '100%' }}>
                    {openFiles.map(file => (
                        <div
                            key={file}
                            className={`tab-item d-flex align-items-center px-3 gap-2 ${activeFile === file ? 'active' : ''}`}
                            onClick={() => setActiveFile(file)}
                        >
                            {getIcon(file)}
                            <span className="tab-item-label">{file}</span>
                            <div
                                className="tab-close-button ms-auto d-flex align-items-center justify-content-center rounded hover-bg"
                                onClick={(e) => onCloseFile(e, file)}
                            >
                                <VscClose size={16} />
                            </div>
                        </div>
                    ))}
                </div>
                {openFiles.length > 0 && (
                    <div
                        className="editor-close-all d-flex align-items-center justify-content-center px-2 h-100"
                        onClick={onCloseAllFiles}
                        title="Close All Files"
                    >
                        <VscCloseAll size={18} />
                        <span className="ms-1" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>Close All</span>
                    </div>
                )}
            </div>

            {activeFile && (
                <div className="editor-breadcrumbs d-flex align-items-center px-3">
                    <span style={{ cursor: 'pointer' }}>karim_ai_website</span>
                    {(() => {
                        const path = workspacePaths[activeFile] || [];

                        return (
                            <>
                                {path.map((folder) => (
                                    <React.Fragment key={folder}>
                                        <VscChevronRight className="mx-1" size={14} />
                                        <span style={{ cursor: 'pointer' }}>{folder}</span>
                                    </React.Fragment>
                                ))}
                                {activeFile !== 'Welcome' && <VscChevronRight className="mx-1" size={14} />}
                                <span style={{ color: 'var(--vscode-text)', cursor: 'pointer' }}>{activeFile}</span>
                            </>
                        );
                    })()}
                </div>
            )}

            <div
                key={activeFile}
                className="flex-grow-1 editor-content-frame"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'fadeSlideIn 0.3s ease-out forwards'
                }}
            >
                <Suspense fallback={<div className="loading-spinner"><div className="spinner" /></div>}>
                    {renderContent()}
                </Suspense>
            </div>
        </div>
    );
};

export default Editor;
