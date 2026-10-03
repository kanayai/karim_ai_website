import React, { useEffect, useRef, useState } from 'react';
import { VscFolder, VscFile, VscIssues, VscGitPullRequest, VscPlay, VscBook, VscFiles, VscHistory, VscCopy, VscCheck } from 'react-icons/vsc';
import publicationsRSource from '../../data/publications.R?raw';
import { FaGithub, FaStar, FaEye, FaCodeBranch, FaTag, FaCaretDown, FaSearch } from 'react-icons/fa';
import { VscColorMode } from 'react-icons/vsc';
import useSiteMode from '../hooks/useSiteMode';
import GitHubCodeMenu from './GitHubCodeMenu';
import './GitHubLayout.css';

// Repo contents. `path` is where the source lives in the real repo (for Raw).
const FILES = [
    { file: 'projects.html', name: 'projects', folder: true, msg: 'Update active research projects', age: 'yesterday', path: 'public/projects.html' },
    { file: 'publications.html', name: 'publications', folder: true, msg: 'Fetch latest articles from ORCID', age: '2 days ago', path: 'public/publications.html' },
    { file: 'phd_students.html', name: 'phd_students', folder: true, msg: 'Update SAMBa thesis abstracts', age: 'last week', path: 'public/phd_students.html' },
    { file: 'publications.R', name: 'publications.R', folder: false, msg: 'Initial publication loading script', age: 'last month', path: 'data/publications.R' },
];
const RAW = 'https://raw.githubusercontent.com/kanayai/karim_ai_website/main/';

// Source text for the Code view, line count and copy button.
const useSource = (entry) => {
    const [fetched, setFetched] = useState({});
    const file = entry?.file;
    const isHtml = file?.endsWith('.html');
    useEffect(() => {
        if (!isHtml || fetched[file] !== undefined) return;
        fetch(`/${file}`).then((r) => (r.ok ? r.text() : '')).catch(() => '')
            .then((t) => setFetched((f) => ({ ...f, [file]: t })));
    }, [file, isHtml, fetched]);
    if (file === 'publications.R') return publicationsRSource;
    return isHtml ? fetched[file] : undefined;
};

const SourceView = ({ text }) => (
    <div className="gh-source">
        {text.replace(/\n$/, '').split('\n').map((l, i) => (
            <div className="gh-source-line" key={i}><span className="gh-ln">{i + 1}</span><code>{l || ' '}</code></div>
        ))}
    </div>
);

const GitHubLayout = ({ activeFile, setActiveFile, children }) => {
    const [activeTab, setActiveTab] = useState('code');
    const [mode, setMode] = useSiteMode();
    // 'home' = repo front page with README; 'file' = GitHub file view with tree.
    const [view, setView] = useState(activeFile === 'projects.html' ? 'home' : 'file');
    const [fileMode, setFileMode] = useState('preview'); // preview | code
    const [copied, setCopied] = useState(false);
    const wrapRef = useRef(null);

    const entry = FILES.find((f) => f.file === activeFile);
    const source = useSource(entry);
    const isHtml = activeFile.endsWith('.html');
    const lines = source ? source.replace(/\n$/, '').split('\n').length : null;

    const handleFileClick = (file) => {
        setActiveFile(file);
        setView('file');
        setFileMode(file.endsWith('.html') ? 'preview' : 'code');
        wrapRef.current?.scrollTo({ top: 0 });
    };
    const goHome = () => { setActiveTab('code'); setView('home'); };
    const copySource = () => {
        if (!source) return;
        navigator.clipboard?.writeText(source).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
    };

    return (
        <div ref={wrapRef} className={`github-layout-wrapper${mode === 'light' ? ' is-light' : ''}`}>
            {/* GitHub Global Header */}
            <header className="github-header d-flex align-items-center justify-content-between px-3 py-2">
                <div className="d-flex align-items-center gap-3">
                    <FaGithub size={32} className="github-logo" onClick={() => setActiveFile('Welcome')} />
                    <div className="github-search-container d-none d-md-flex align-items-center">
                        <input type="text" placeholder="Search or jump to..." className="github-search-input" readOnly />
                        <span className="github-search-slash">/</span>
                    </div>
                    <nav className="github-nav-links d-none d-lg-flex gap-3">
                        <span className="github-nav-item">Pull requests</span>
                        <span className="github-nav-item">Issues</span>
                        <span className="github-nav-item">Codespaces</span>
                        <span className="github-nav-item">Marketplace</span>
                        <span className="github-nav-item">Explore</span>
                    </nav>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <button
                        className="github-btn-outline github-mode-toggle"
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme`}
                        title={`Switch to ${mode === 'light' ? 'dark' : 'light'} theme`}
                    >
                        <VscColorMode size={16} />
                    </button>
                    <button className="github-btn-outline back-to-os" onClick={() => setActiveFile('Welcome')}>Back to OS</button>
                    <img src="/images/Bath_Crest.png" alt="User Profile" className="github-avatar" />
                </div>
            </header>

            {/* Repository Sub-header */}
            <div className="github-repo-subheader px-3 pt-3 pb-0">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2 repo-title-area">
                        <span className="repo-owner">kanayai</span>
                        <span className="repo-separator">/</span>
                        <span className="repo-name" onClick={goHome}>research</span>
                        <span className="repo-badge">Public</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 repo-stats-buttons">
                        <button className="repo-stat-btn"><FaEye /> Watch <span className="stat-count">3</span></button>
                        <button className="repo-stat-btn"><FaCodeBranch /> Fork <span className="stat-count">2</span></button>
                        <button className="repo-stat-btn"><FaStar /> Star <span className="stat-count">14</span></button>
                    </div>
                </div>

                {/* Repository Navigation Tabs */}
                <div className="d-flex repo-nav-tabs">
                    <button 
                        className={`repo-tab-item ${activeTab === 'code' ? 'active' : ''}`}
                        onClick={goHome}
                    >
                        <VscBook /> Code
                    </button>
                    <button 
                        className={`repo-tab-item ${activeTab === 'issues' ? 'active' : ''}`}
                        onClick={() => setActiveTab('issues')}
                    >
                        <VscIssues /> Issues <span className="tab-counter">2</span>
                    </button>
                    <button 
                        className={`repo-tab-item ${activeTab === 'prs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('prs')}
                    >
                        <VscGitPullRequest /> Pull requests <span className="tab-counter">1</span>
                    </button>
                    <button 
                        className={`repo-tab-item ${activeTab === 'actions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('actions')}
                    >
                        <VscPlay /> Actions
                    </button>
                </div>
            </div>

            {/* Repository Body Content */}
            <div className="github-repo-body p-3 p-md-4">
                <div className="repo-container">
                {activeTab === 'code' && view === 'home' && (
                    <div className="row g-4">
                        {/* Main Code View Area */}
                        <div className="col-lg-9 col-md-8">
                            {/* Branch / Go to file / Add file / Code toolbar */}
                            <div className="repo-toolbar d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <button className="gh-btn"><FaCodeBranch /> main <FaCaretDown className="gh-caret" /></button>
                                    <span className="repo-meta-link d-none d-md-inline"><FaCodeBranch /> <strong>1</strong> Branch</span>
                                    <span className="repo-meta-link d-none d-md-inline"><FaTag /> <strong>0</strong> Tags</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="repo-goto d-none d-md-flex align-items-center">
                                        <FaSearch className="repo-goto-icon" />
                                        <input type="text" placeholder="Go to file" readOnly aria-label="Go to file" />
                                        <kbd>t</kbd>
                                    </div>
                                    <button className="gh-btn d-none d-sm-inline-flex">Add file <FaCaretDown className="gh-caret" /></button>
                                    <GitHubCodeMenu />
                                </div>
                            </div>
                            <div className="repo-file-card rounded mb-4">
                                <div className="repo-file-header d-flex align-items-center justify-content-between p-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src="/images/Bath_Crest.png" alt="Owner" className="commit-avatar" />
                                        <span className="commit-author">kanayai</span>
                                        <span className="commit-message">Add Neal Alexander kickoff communications and model setup</span>
                                    </div>
                                    <span className="commit-date">yesterday</span>
                                </div>
                                <div className="repo-file-list">
                                    {FILES.map((f) => (
                                        <div key={f.file} className="file-row d-flex align-items-center justify-content-between" onClick={() => handleFileClick(f.file)}>
                                            <div className="d-flex align-items-center gap-2">
                                                {f.folder ? <VscFolder className="folder-icon" /> : <VscFile className="file-icon" />}
                                                <span className="file-name">{f.name}</span>
                                            </div>
                                            <span className="file-commit-msg">{f.msg}</span>
                                            <span className="file-age">{f.age}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* README, as on a GitHub repo front page */}
                            <div className="gh-readme rounded mb-4">
                                <div className="gh-readme-head"><VscBook /> README</div>
                                <div className="gh-readme-body">
                                    <h1>research</h1>
                                    <p>Research repository of <strong>Karim Anaya-Izquierdo</strong>, Senior Lecturer in Statistics, Department of Mathematical Sciences, University of Bath.</p>
                                    <h2>Research areas</h2>
                                    <ul>
                                        <li>Information geometry</li>
                                        <li>Uncertainty quantification in mechanical engineering</li>
                                        <li>Survival analysis</li>
                                        <li>Spatial methods in epidemiology</li>
                                        <li>Applied Bayesian methods</li>
                                    </ul>
                                    <h2>What&rsquo;s in here</h2>
                                    <ul>
                                        {FILES.map((f) => (
                                            <li key={f.file}>
                                                <button type="button" className="gh-readme-link" onClick={() => handleFileClick(f.file)}><code>{f.name}{f.folder ? '/' : ''}</code></button>
                                                {' '}{{ 'projects.html': 'active research projects', 'publications.html': 'journal articles, pulled from ORCID', 'phd_students.html': 'current and former PhD students', 'publications.R': 'the R script that builds the publications list' }[f.file]}
                                            </li>
                                        ))}
                                    </ul>
                                    <h2>Contact</h2>
                                    <p><a href="mailto:kai21@bath.ac.uk">kai21@bath.ac.uk</a> · <a href="https://orcid.org/0000-0001-9718-5256" target="_blank" rel="noreferrer">ORCID</a></p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-3 col-md-4">
                            <div className="repo-sidebar-section mb-4">
                                <h3 className="sidebar-section-title">About</h3>
                                <p className="sidebar-desc">
                                    Karim Anaya-Izquierdo's academic research repository. Investigating spatial-spillover models, geometric MCMC, and statistical methods.
                                </p>
                                <div className="sidebar-links d-flex flex-column gap-2 mt-3">
                                    <a href="https://researchportal.bath.ac.uk" target="_blank" rel="noreferrer">University Profile</a>
                                    <a href="https://orcid.org/0000-0001-9718-5256" target="_blank" rel="noreferrer">ORCID Record</a>
                                </div>
                            </div>

                            <div className="repo-sidebar-section mb-4">
                                <h3 className="sidebar-section-title">Contributors</h3>
                                <div className="d-flex flex-column gap-2 mt-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src="/images/Bath_Crest.png" alt="Karim" className="contributor-avatar" />
                                        <div>
                                            <div className="contributor-name">Karim Anaya-Izquierdo</div>
                                            <div className="contributor-role">Maintainer</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="contributor-avatar placeholder-avatar">NA</div>
                                        <div>
                                            <div className="contributor-name">Neal Alexander</div>
                                            <div className="contributor-role">Collaborator</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="contributor-avatar placeholder-avatar">AR</div>
                                        <div>
                                            <div className="contributor-name">Andrew Rhead</div>
                                            <div className="contributor-role">Collaborator</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="repo-sidebar-section">
                                <h3 className="sidebar-section-title">Languages</h3>
                                <div className="languages-bar d-flex rounded overflow-hidden my-2">
                                    <div className="lang-percent r-lang" style={{ width: '70%' }} title="R: 70%" />
                                    <div className="lang-percent py-lang" style={{ width: '20%' }} title="Python: 20%" />
                                    <div className="lang-percent web-lang" style={{ width: '10%' }} title="HTML/JS: 10%" />
                                </div>
                                <ul className="languages-list p-0 m-0">
                                    <li className="d-flex align-items-center justify-content-between">
                                        <span><span className="lang-dot r-dot" /> R</span>
                                        <span>70.0%</span>
                                    </li>
                                    <li className="d-flex align-items-center justify-content-between">
                                        <span><span className="lang-dot py-dot" /> Python</span>
                                        <span>20.0%</span>
                                    </li>
                                    <li className="d-flex align-items-center justify-content-between">
                                        <span><span className="lang-dot web-dot" /> HTML/JS</span>
                                        <span>10.0%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'code' && view === 'file' && (
                    <div className="gh-file-view">
                        {/* File tree, as in GitHub's file view */}
                        <aside className="gh-tree d-none d-md-block">
                            <div className="gh-tree-head"><VscFiles /> Files</div>
                            <button className="gh-btn gh-tree-branch"><FaCodeBranch /> main <FaCaretDown className="gh-caret" /></button>
                            <div className="repo-goto d-flex align-items-center gh-tree-goto">
                                <FaSearch className="repo-goto-icon" />
                                <input type="text" placeholder="Go to file" readOnly aria-label="Go to file" />
                                <kbd>t</kbd>
                            </div>
                            <ul className="gh-tree-list">
                                {FILES.map((f) => (
                                    <li key={f.file}>
                                        <button type="button" className={f.file === activeFile ? 'active' : ''} onClick={() => handleFileClick(f.file)}>
                                            {f.folder ? <VscFolder className="folder-icon" /> : <VscFile className="file-icon" />} {f.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        <section className="gh-file-main">
                            <div className="gh-crumbs">
                                <button type="button" className="gh-crumb-link" onClick={goHome}>research</button>
                                <span className="gh-crumb-sep">/</span>
                                <strong>{entry?.name ?? activeFile}</strong>
                            </div>

                            <div className="gh-commit-bar">
                                <img src="/images/Bath_Crest.png" alt="" className="commit-avatar" />
                                <span className="commit-author">kanayai</span>
                                <span className="commit-message">{entry?.msg ?? 'Update'}</span>
                                <span className="gh-commit-right">{entry?.age ?? 'yesterday'} · <span className="gh-history"><VscHistory /> History</span></span>
                            </div>

                            <div className="gh-file-box">
                                <div className="gh-file-head">
                                    {entry && (
                                        <div className="gh-seg">
                                            {isHtml && <button type="button" className={fileMode === 'preview' ? 'active' : ''} onClick={() => setFileMode('preview')}>Preview</button>}
                                            <button type="button" className={fileMode === 'code' || !isHtml ? 'active' : ''} onClick={() => setFileMode('code')}>Code</button>
                                            <button type="button">Blame</button>
                                        </div>
                                    )}
                                    {lines && <span className="gh-file-meta d-none d-sm-inline">{lines} lines · {(new Blob([source]).size / 1024).toFixed(1)} KB</span>}
                                    {entry && (
                                        <div className="gh-file-actions">
                                            <a className="gh-btn gh-btn-sm" href={RAW + entry.path} target="_blank" rel="noreferrer">Raw</a>
                                            <button type="button" className="gh-btn gh-btn-sm" onClick={copySource} aria-label="Copy raw file" title="Copy raw file">
                                                {copied ? <VscCheck className="gh-copied" /> : <VscCopy />}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="gh-file-body">
                                    {isHtml && fileMode === 'code'
                                        ? (source ? <SourceView text={source} /> : <p className="gh-loading">Loading…</p>)
                                        : <div className="render-frame-container">{children}</div>}
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'issues' && (
                    <div className="github-issues-list rounded p-3">
                        <h3 className="mb-3 text-white">Open Issues</h3>
                        <div className="issue-row p-3 border-bottom d-flex gap-2">
                            <VscIssues className="issue-icon" />
                            <div>
                                <div className="issue-title">Refactor paper Word to Quarto (#2)</div>
                                <div className="issue-meta">opened 2 days ago by kanayai</div>
                            </div>
                        </div>
                        <div className="issue-row p-3 border-bottom d-flex gap-2">
                            <VscIssues className="issue-icon" />
                            <div>
                                <div className="issue-title">Adapt spatial-spillover count outcome to binary (#1)</div>
                                <div className="issue-meta">opened 5 days ago by kanayai</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'prs' && (
                    <div className="github-issues-list rounded p-3">
                        <h3 className="mb-3 text-white">Pull Requests</h3>
                        <div className="issue-row p-3 border-bottom d-flex gap-2">
                            <VscGitPullRequest className="pr-icon" />
                            <div>
                                <div className="issue-title">Neal: update collaboration decision choices (#3)</div>
                                <div className="issue-meta">opened yesterday by neal-alexander</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'actions' && (
                    <div className="github-issues-list rounded p-3 text-center py-5">
                        <VscPlay size={40} className="mb-3 text-muted" />
                        <h4 className="text-white">GitHub Actions</h4>
                        <p className="text-muted">Workflow runs are building the Quarto static website bundle automatically.</p>
                        <div className="badge bg-success p-2">All checks passing</div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default GitHubLayout;
