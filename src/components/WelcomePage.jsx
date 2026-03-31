import React from 'react';
import { VscBook, VscPreview, VscProject, VscAccount, VscCode, VscExtensions, VscFolderOpened } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { formatRelativeTime } from '../hooks/useRecentFiles';

const WelcomePage = ({ onNavigate, recentFiles = [] }) => {
    const { t } = useTranslation();

    const startItems = [
        {
            icon: <VscFolderOpened size={20} color="#c5c5c5" />,
            title: 'Open Folder',
            description: 'Browse the workspace structure in the Explorer.',
            action: () => onNavigate('Welcome')
        },
        {
            icon: <VscBook size={20} color="#3794ff" />,
            title: t('welcome.view_publications'),
            description: t('welcome.view_publications_desc'),
            action: () => onNavigate('publications.R')
        },
        {
            icon: <VscPreview size={20} color="#e44d26" />,
            title: t('welcome.read_blog'),
            description: t('welcome.read_blog_desc'),
            action: () => onNavigate('blog.html')
        },
        {
            icon: <VscProject size={20} color="#519aba" />,
            title: t('welcome.explore_projects'),
            description: t('welcome.explore_projects_desc'),
            action: () => onNavigate('projects.html')
        },
        {
            icon: <VscAccount size={20} color="#4ec9b0" />,
            title: t('welcome.about_me'),
            description: t('welcome.about_me_desc'),
            action: () => onNavigate('about_me.html')
        }
    ];

    // Default recent items (shown when no history)
    const defaultRecentItems = [
        { name: 'phd_students.html', path: 'Research/phd_students.html' },
        { name: 'current_courses.ipynb', path: 'Teaching/current_courses.ipynb' },
        { name: 'gkn_prosperity.html', path: 'Research/Projects/gkn_prosperity.html' },
    ];

    // Use dynamic recent files if available, otherwise fall back to defaults
    const displayRecentItems = recentFiles.length > 0
        ? recentFiles.map(f => ({
            name: f.name,
            path: f.name,
            timestamp: f.timestamp
        }))
        : defaultRecentItems;

    return (
        <div className="h-100 w-100 p-3 p-md-4 vscode-welcome-page" style={{
            backgroundColor: 'var(--vscode-editor-bg)',
            color: 'var(--vscode-text)',
            overflowY: 'auto'
        }}>
            <div className="welcome-shell" style={{ maxWidth: '1180px', margin: '0 auto' }}>
                <div className="row g-4 align-items-start">
                    <div className="col-lg-5 col-xl-4">
                        <div className="d-flex flex-column align-items-start welcome-hero">
                            <img src="/images/blackboard.png" alt="Logo" className="welcome-hero-image" />
                            <div className="welcome-title">Get Started</div>
                            <div className="welcome-subtitle">
                                {t('welcome.subtitle')}
                            </div>

                            <div className="d-flex flex-column gap-1 w-100 welcome-start-list">
                                {startItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-start gap-3 px-2 py-2 start-item"
                                        style={{ cursor: 'pointer' }}
                                        onClick={item.action}
                                    >
                                        <div className="mt-1">{item.icon}</div>
                                        <div>
                                            <div className="welcome-link-title">{item.title}</div>
                                            <div className="welcome-link-description">{item.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 col-xl-8">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <h2 className="welcome-section-title">Recent</h2>
                                <div className="d-flex flex-column gap-1 welcome-section-list">
                                    {displayRecentItems.map((item, index) => (
                                        <div
                                            key={item.name + index}
                                            className="d-flex align-items-center gap-2 py-1 px-2 welcome-list-row"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => onNavigate(item.name)}
                                        >
                                            <span className="welcome-link-title">{item.name}</span>
                                            <span className="path welcome-link-description ms-auto">
                                                {item.timestamp ? formatRelativeTime(item.timestamp) : item.path}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h2 className="welcome-section-title">Walkthroughs</h2>
                                <div className="d-flex flex-column gap-1 welcome-section-list">
                                    <div className="d-flex align-items-start gap-2 px-2 py-2 start-item" style={{ cursor: 'pointer' }} onClick={() => onNavigate('README.md')}>
                                        <VscCode size={18} style={{ marginTop: '2px', color: 'var(--vscode-accent)' }} />
                                        <div>
                                            <div className="welcome-link-title">Open Workspace README</div>
                                            <div className="welcome-link-description">View the main project guide in editor preview.</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start gap-2 px-2 py-2 start-item" style={{ cursor: 'pointer' }} onClick={() => onNavigate('git-graph')}>
                                        <VscExtensions size={18} style={{ marginTop: '2px', color: 'var(--vscode-accent)' }} />
                                        <div>
                                            <div className="welcome-link-title">Explore Career Timeline</div>
                                            <div className="welcome-link-description">Open the Git Graph style view from the activity bar.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h2 className="welcome-section-title">Help</h2>
                                <div className="d-flex flex-column gap-2 welcome-section-list">
                                    <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                        <a href="https://github.com/kanayai/karim_ai_website" target="_blank" rel="noreferrer" className="welcome-help-link">{t('welcome.github_repo')}</a>
                                    </div>
                                    <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                        <a href="https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/" target="_blank" rel="noreferrer" className="welcome-help-link">{t('welcome.research_portal')}</a>
                                    </div>
                                    <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                        <a href="https://github.com/kanayai/karim_ai_website/issues/new" target="_blank" rel="noreferrer" className="welcome-help-link">{t('welcome.report_issue')}</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h2 className="welcome-section-title">Tips</h2>
                                <div className="d-flex flex-column gap-2 welcome-section-list" style={{ fontSize: '13px', color: 'var(--vscode-descriptionForeground)' }}>
                                    <div>Use the Activity Bar to switch between Explorer, Search, Git Graph, Debug, and Extensions.</div>
                                    <div>Press <span style={{ color: 'var(--vscode-text)' }}>Shift+Cmd+P</span> to open Quick Open.</div>
                                    <div>Use the status bar to toggle the integrated terminal and change language.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--vscode-border)' }}>
                    <div className="d-flex align-items-center gap-2">
                        <input type="checkbox" id="showWelcome" defaultChecked disabled />
                        <label htmlFor="showWelcome" style={{ fontSize: '13px', opacity: 0.8 }}>{t('welcome.show_welcome')}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
