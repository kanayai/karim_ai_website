import React, { useState } from 'react';
import { VscFolder, VscFile, VscIssues, VscGitPullRequest, VscPlay, VscBook } from 'react-icons/vsc';
import { FaGithub, FaStar, FaEye, FaCodeBranch } from 'react-icons/fa';
import './GitHubLayout.css';

const GitHubLayout = ({ activeFile, setActiveFile, children }) => {
    const [activeTab, setActiveTab] = useState('code');

    const handleFileClick = (file) => {
        setActiveFile(file);
    };

    return (
        <div className="github-layout-wrapper">
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
                        <span className="repo-name">research</span>
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
                        onClick={() => { setActiveTab('code'); setActiveFile('projects.html'); }}
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
                {activeTab === 'code' && (
                    <div className="row g-4">
                        {/* Main Code View Area */}
                        <div className="col-lg-9 col-md-8">
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
                                    <div 
                                        className={`file-row d-flex align-items-center justify-content-between ${activeFile === 'projects.html' ? 'active' : ''}`}
                                        onClick={() => handleFileClick('projects.html')}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <VscFolder className="folder-icon" />
                                            <span className="file-name">projects</span>
                                        </div>
                                        <span className="file-commit-msg">Update active research projects</span>
                                        <span className="file-age">yesterday</span>
                                    </div>
                                    <div 
                                        className={`file-row d-flex align-items-center justify-content-between ${activeFile === 'publications.html' ? 'active' : ''}`}
                                        onClick={() => handleFileClick('publications.html')}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <VscFolder className="folder-icon" />
                                            <span className="file-name">publications</span>
                                        </div>
                                        <span className="file-commit-msg">Fetch latest articles from ORCID</span>
                                        <span className="file-age">2 days ago</span>
                                    </div>
                                    <div 
                                        className={`file-row d-flex align-items-center justify-content-between ${activeFile === 'phd_students.html' ? 'active' : ''}`}
                                        onClick={() => handleFileClick('phd_students.html')}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <VscFolder className="folder-icon" />
                                            <span className="file-name">phd_students</span>
                                        </div>
                                        <span className="file-commit-msg">Update SAMBa thesis abstracts</span>
                                        <span className="file-age">last week</span>
                                    </div>
                                    <div 
                                        className={`file-row d-flex align-items-center justify-content-between ${activeFile === 'publications.R' ? 'active' : ''}`}
                                        onClick={() => handleFileClick('publications.R')}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <VscFile className="file-icon" />
                                            <span className="file-name">publications.R</span>
                                        </div>
                                        <span className="file-commit-msg">Initial publication loading script</span>
                                        <span className="file-age">last month</span>
                                    </div>
                                </div>
                            </div>

                            {/* Render Child (e.g. projects.html in iframe) */}
                            <div className="repo-render-area p-3 rounded mb-4">
                                <div className="render-title-bar px-3 py-2 rounded-top border-bottom">
                                    <VscFile size={16} /> <strong>{activeFile}</strong>
                                </div>
                                <div className="render-frame-container" style={{ height: '550px' }}>
                                    {children}
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
    );
};

export default GitHubLayout;
