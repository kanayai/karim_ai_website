import React, { useState } from 'react';
import { VscArchive, VscHistory, VscCopy, VscBook, VscInfo } from 'react-icons/vsc';
import './PyPILayout.css';

const PyPILayout = ({ activeFile, setActiveFile, children }) => {
    const [activeTab, setActiveTab] = useState('description');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('pip install ma22019');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="pypi-layout-wrapper">
            {/* PyPI Top Navigation */}
            <header className="pypi-header d-flex align-items-center justify-content-between px-3 px-md-5 py-3">
                <div className="d-flex align-items-center gap-3">
                    <div className="pypi-logo-text" onClick={() => setActiveFile('Welcome')}>
                        <span className="pypi-p">py</span><span className="pypi-pi">pi</span>
                    </div>
                    <div className="pypi-search-bar d-none d-md-flex align-items-center">
                        <input type="text" placeholder="Search projects" className="pypi-search-input" readOnly />
                    </div>
                </div>
                <div className="d-flex align-items-center gap-4 pypi-nav-links">
                    <span className="pypi-nav-link exit-to-os" onClick={() => setActiveFile('Welcome')}>Back to OS</span>
                    <span className="pypi-nav-link">Help</span>
                    <span className="pypi-nav-link">Sponsor</span>
                    <span className="pypi-nav-link">Log in</span>
                </div>
            </header>

            {/* PyPI Banner */}
            <div className="pypi-banner px-3 px-md-5 py-4 text-white">
                <div className="d-flex flex-column gap-2 max-width-container">
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                        <h1 className="pypi-title m-0">ma22019</h1>
                        <span className="pypi-version">v2026.07.09</span>
                    </div>
                    <p className="pypi-subtitle m-0">Probability and Statistics Course Package — University of Bath</p>
                    
                    {/* pip install command box */}
                    <div className="d-flex align-items-center justify-content-between pypi-install-box p-3 rounded mt-3">
                        <div className="d-flex align-items-center gap-2 pypi-install-command">
                            <span className="pypi-prompt-char">$</span>
                            <code className="pypi-command">pip install ma22019</code>
                        </div>
                        <button className="pypi-copy-btn" onClick={handleCopy} title="Copy to clipboard">
                            <VscCopy size={16} /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>

            {/* PyPI Main Section */}
            <div className="pypi-body-section px-3 px-md-5 py-4">
                <div className="row g-4 max-width-container pypi-main-row">
                    {/* Left Navigation Tabs */}
                    <div className="col-lg-3 col-md-4 pypi-rail">
                        <div className="d-flex flex-column pypi-tabs">
                            <button 
                                className={`pypi-tab-item ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                <VscBook size={18} /> Project description
                            </button>
                            <button 
                                className={`pypi-tab-item ${activeTab === 'history' ? 'active' : ''}`}
                                onClick={() => setActiveTab('history')}
                            >
                                <VscHistory size={18} /> Release history
                            </button>
                            <button 
                                className={`pypi-tab-item ${activeTab === 'downloads' ? 'active' : ''}`}
                                onClick={() => setActiveTab('downloads')}
                            >
                                <VscArchive size={18} /> Download files
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="pypi-sidebar-block mt-4">
                            <h4 className="pypi-sidebar-title">Navigation</h4>
                            <ul className="pypi-sidebar-list">
                                <li className={`pypi-sidebar-item ${activeFile === 'current_courses.ipynb' ? 'active' : ''}`} onClick={() => setActiveFile('current_courses.ipynb')}>Current Courses</li>
                                <li className={`pypi-sidebar-item ${activeFile === 'previous_courses.ipynb' ? 'active' : ''}`} onClick={() => setActiveFile('previous_courses.ipynb')}>Previous Courses</li>
                            </ul>
                        </div>

                        {/* Metadata Block */}
                        <div className="pypi-sidebar-block mt-4">
                            <h4 className="pypi-sidebar-title">Meta</h4>
                            <div className="pypi-meta-item">
                                <strong>License:</strong> Academic / Student-Only
                            </div>
                            <div className="pypi-meta-item mt-2">
                                <strong>Author:</strong> Karim Anaya-Izquierdo
                            </div>
                            <div className="pypi-meta-item mt-2">
                                <strong>Requires:</strong> University of Bath Enrollment
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="col-lg-9 col-md-8 pypi-main-content">
                        {activeTab === 'description' && (
                            <div className="pypi-content-card p-4 rounded">
                                <div className="d-flex align-items-center gap-2 mb-3 pypi-card-title">
                                    <VscInfo size={20} className="text-primary" />
                                    <h3 className="m-0 text-white">Course Overview</h3>
                                </div>
                                <div className="pypi-notebook-frame" style={{ minHeight: '500px' }}>
                                    {children}
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="pypi-content-card p-4 rounded">
                                <h3 className="mb-4 text-white">Release History</h3>
                                <div className="pypi-history-timeline">
                                    <div className="history-release-row pb-4 mb-4 border-bottom">
                                        <div className="d-flex align-items-center justify-content-between mb-2 history-release-header">
                                            <span className="release-version">2026.07.09</span>
                                            <span className="release-date">July 9, 2026</span>
                                        </div>
                                        <p className="release-desc">Release of Sheet 3 Statistics solutions and exam walkthrough guide.</p>
                                    </div>
                                    <div className="history-release-row pb-4 mb-4 border-bottom">
                                        <div className="d-flex align-items-center justify-content-between mb-2 history-release-header">
                                            <span className="release-version">2026.06.30</span>
                                            <span className="release-date">June 30, 2026</span>
                                        </div>
                                        <p className="release-desc">Mid-term review checklist and probability distributions reference sheet.</p>
                                    </div>
                                    <div className="history-release-row">
                                        <div className="d-flex align-items-center justify-content-between mb-2 history-release-header">
                                            <span className="release-version">2026.06.01</span>
                                            <span className="release-date">June 1, 2026</span>
                                        </div>
                                        <p className="release-desc">Initial course material package release for the summer term.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'downloads' && (
                            <div className="pypi-content-card p-4 rounded">
                                <h3 className="mb-4 text-white">Course Downloads</h3>
                                <p className="text-muted">Download course files, worksheets, and lecture summaries.</p>
                                <div className="d-flex flex-column gap-3 mt-3">
                                    <div className="download-item p-3 border rounded d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="download-name font-weight-bold">ma22019_syllabus.pdf</div>
                                            <span className="download-size">PDF | 1.2 MB</span>
                                        </div>
                                        <button className="pypi-copy-btn">Download</button>
                                    </div>
                                    <div className="download-item p-3 border rounded d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="download-name font-weight-bold">probability_lecture_notes.pdf</div>
                                            <span className="download-size">PDF | 8.4 MB</span>
                                        </div>
                                        <button className="pypi-copy-btn">Download</button>
                                    </div>
                                    <div className="download-item p-3 border rounded d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="download-name font-weight-bold">statistics_handbook.pdf</div>
                                            <span className="download-size">PDF | 12.1 MB</span>
                                        </div>
                                        <button className="pypi-copy-btn">Download</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PyPILayout;
