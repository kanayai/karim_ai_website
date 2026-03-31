import React from 'react';
import { VscBook, VscPreview, VscProject, VscAccount, VscColorMode } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { formatRelativeTime } from '../hooks/useRecentFiles';
import { themes } from '../constants/themes';

const WelcomePage = ({ onNavigate, simpleMode, toggleSimpleMode, recentFiles = [], theme, setTheme }) => {
    const { t } = useTranslation();

    const startItems = [
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
        <div className="h-100 w-100 p-3 p-md-4" style={{
            backgroundColor: 'var(--vscode-editor-bg)',
            color: 'var(--vscode-text)',
            overflowY: 'auto'
        }}>
            <div style={{ maxWidth: '980px', margin: '0 auto' }}>
                <div className="d-flex align-items-center gap-3 mb-4 pb-3" style={{ borderBottom: '1px solid var(--vscode-border)' }}>
                    <img src="/images/blackboard.png" alt="Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                    <div>
                        <div style={{ fontSize: '28px', fontWeight: 300 }}>Get Started</div>
                        <div style={{ fontSize: '13px', color: 'var(--vscode-descriptionForeground)' }}>karim_ai_website</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-7 mb-4">
                        <div style={{ fontSize: '13px', color: 'var(--vscode-descriptionForeground)', marginBottom: '16px' }}>
                            {t('welcome.subtitle')}
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '12px' }}>{t('welcome.start')}</h2>
                        <div className="d-flex flex-column gap-1">
                            {startItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-start gap-3 px-2 py-2 rounded start-item"
                                    style={{ cursor: 'pointer', transition: 'background-color 0.12s', border: '1px solid transparent' }}
                                    onClick={item.action}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--vscode-list-hover-bg)';
                                        e.currentTarget.style.borderColor = 'var(--vscode-border)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                >
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <div style={{ color: 'var(--vscode-accent)', marginBottom: '2px', fontSize: '13px' }}>{item.title}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)' }}>{item.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="mb-4">
                            <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <VscColorMode size={18} />
                                Customize
                            </h2>
                            <div className="d-flex flex-wrap gap-2">
                                {themes.slice(0, 6).map((themeItem) => (
                                    <button
                                        key={themeItem.id}
                                        onClick={() => setTheme && setTheme(themeItem.id)}
                                        style={{
                                            padding: '6px 10px',
                                            borderRadius: '4px',
                                            border: theme === themeItem.id ? '2px solid var(--vscode-accent)' : '1px solid var(--vscode-border)',
                                            backgroundColor: theme === themeItem.id ? 'var(--vscode-list-hover-bg)' : 'transparent',
                                            color: 'var(--vscode-text)',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            transition: 'all 0.12s',
                                            fontWeight: theme === themeItem.id ? '500' : '400'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (theme !== themeItem.id) {
                                                e.currentTarget.style.borderColor = 'var(--vscode-accent)';
                                                e.currentTarget.style.backgroundColor = 'var(--vscode-list-hover-bg)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (theme !== themeItem.id) {
                                                e.currentTarget.style.borderColor = 'var(--vscode-border)';
                                                e.currentTarget.style.backgroundColor = 'var(--vscode-button-secondary-bg)';
                                            }
                                        }}
                                    >
                                        {themeItem.name}
                                    </button>
                                ))}
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--vscode-descriptionForeground)', marginTop: '8px' }}>
                                Click to preview. Changes apply instantly.
                            </p>
                        </div>

                        <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '12px' }}>{t('welcome.recent')}</h2>
                        <div className="d-flex flex-column gap-1">
                            {displayRecentItems.map((item, index) => (
                                <div
                                    key={item.name + index}
                                    className="d-flex align-items-center gap-2 py-1 px-2 rounded"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onNavigate(item.name)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--vscode-list-hover-bg)';
                                        const pathEl = e.currentTarget.querySelector('.path');
                                        if (pathEl) pathEl.style.color = 'var(--vscode-text)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        const pathEl = e.currentTarget.querySelector('.path');
                                        if (pathEl) pathEl.style.color = 'var(--vscode-descriptionForeground)';
                                    }}
                                >
                                    <span style={{ color: 'var(--vscode-accent)', fontSize: '13px' }}>{item.name}</span>
                                    <span className="path" style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)', marginLeft: 'auto' }}>
                                        {item.timestamp ? formatRelativeTime(item.timestamp) : item.path}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '12px' }}>{t('welcome.help')}</h2>
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://github.com/kanayai/karim_ai_website" target="_blank" rel="noreferrer" style={{ color: 'var(--vscode-accent)', textDecoration: 'none' }}>{t('welcome.github_repo')}</a>
                                </div>
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/" target="_blank" rel="noreferrer" style={{ color: 'var(--vscode-accent)', textDecoration: 'none' }}>{t('welcome.research_portal')}</a>
                                </div>
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://github.com/kanayai/karim_ai_website/issues/new" target="_blank" rel="noreferrer" style={{ color: 'var(--vscode-accent)', textDecoration: 'none' }}>{t('welcome.report_issue')}</a>
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
