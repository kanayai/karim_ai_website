import React from 'react';
import { VscBook, VscPreview, VscProject, VscAccount, VscRepo, VscNewFile, VscFolderOpened, VscColorMode } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { formatRelativeTime } from '../hooks/useRecentFiles';
import { themes } from '../constants/themes';

const WelcomePage = ({ onNavigate, simpleMode, toggleSimpleMode, recentFiles = [], theme, setTheme }) => {
    const { t } = useTranslation();
    const [displayText, setDisplayText] = React.useState('');
    const [loopCount, setLoopCount] = React.useState(0);
    const MAX_LOOPS = 3;

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    React.useEffect(() => {
        let isMounted = true;

        const typeSequence = async () => {
            const initialText = "Karim Anaya-Izquierdo";
            const finalText = "Karim AI";

            // If user prefers reduced motion, just show final text
            if (prefersReducedMotion) {
                setDisplayText(finalText);
                setLoopCount(MAX_LOOPS);
                return;
            }

            let currentLoop = 0;
            while (isMounted && currentLoop < MAX_LOOPS) {
                setDisplayText("");

                // 1. Type full name
                for (let i = 0; i <= initialText.length; i++) {
                    if (!isMounted) return;
                    setDisplayText(initialText.slice(0, i));
                    await new Promise(r => setTimeout(r, 100));
                }

                // 2. Pause
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 1000));

                // 3. Backspace to "Karim "
                for (let i = initialText.length; i >= "Karim ".length; i--) {
                    if (!isMounted) return;
                    setDisplayText(initialText.slice(0, i));
                    await new Promise(r => setTimeout(r, 50));
                }

                // 4. Type "AI"
                const suffix = "AI";
                const base = "Karim ";
                for (let i = 1; i <= suffix.length; i++) {
                    if (!isMounted) return;
                    setDisplayText(base + suffix.slice(0, i));
                    await new Promise(r => setTimeout(r, 150));
                }

                currentLoop++;
                setLoopCount(currentLoop);

                // 5. Pause before next loop (or stay on final if last loop)
                if (!isMounted) return;
                if (currentLoop < MAX_LOOPS) {
                    await new Promise(r => setTimeout(r, 3000));
                }
            }
        };

        typeSequence();

        return () => { isMounted = false; };
    }, []);

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
        <div className="h-100 w-100 p-3 p-md-5" style={{
            backgroundColor: 'var(--vscode-editor-bg)',
            color: 'var(--vscode-text)',
            overflowY: 'auto'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Header */}
                <div className="mb-5">
                    <div className="d-flex flex-column align-items-start gap-3 mb-2">
                        <img src="/images/blackboard.png" alt="Logo" style={{ width: '100%', maxWidth: '300px', height: 'auto', objectFit: 'contain' }} />
                        <h1 style={{ fontSize: '36px', fontWeight: '300' }}>
                            {displayText}
                            {loopCount < MAX_LOOPS && <span className="blinking-cursor">|</span>}
                        </h1>
                    </div>
                    <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '300' }}>
                        {t('welcome.subtitle')}
                    </p>

                </div>

                <div className="row">
                    {/* Start Section */}
                    <div className="col-md-7 mb-4">
                        <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '16px' }}>{t('welcome.start')}</h2>
                        <div className="d-flex flex-column gap-2">
                            {startItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-start gap-3 p-2 rounded start-item"
                                    style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                                    onClick={item.action}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-list-hover-bg)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <div style={{ color: '#3794ff', marginBottom: '2px' }}>{item.title}</div>
                                        <div style={{ fontSize: '13px', opacity: 0.7 }}>{item.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Section */}
                    <div className="col-md-5">
                        <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '16px' }}>{t('welcome.recent')}</h2>
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
                                    <span style={{ color: '#3794ff' }}>{item.name}</span>
                                    <span className="path" style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)', marginLeft: 'auto' }}>
                                        {item.timestamp ? formatRelativeTime(item.timestamp) : item.path}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '16px' }}>{t('welcome.help')}</h2>
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://github.com/kanayai/karim_ai_website" target="_blank" rel="noreferrer" style={{ color: '#3794ff', textDecoration: 'none' }}>{t('welcome.github_repo')}</a>
                                </div>
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/" target="_blank" rel="noreferrer" style={{ color: '#3794ff', textDecoration: 'none' }}>{t('welcome.research_portal')}</a>
                                </div>
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://github.com/kanayai/karim_ai_website/issues/new" target="_blank" rel="noreferrer" style={{ color: '#3794ff', textDecoration: 'none' }}>{t('welcome.report_issue')}</a>
                                </div>
                            </div>
                        </div>

                        {/* Theme Showcase */}
                        <div className="mt-5">
                            <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <VscColorMode size={20} />
                                {t('welcome.themes', 'Themes')}
                            </h2>
                            <div className="d-flex flex-wrap gap-2">
                                {themes.map((themeItem) => (
                                    <button
                                        key={themeItem.id}
                                        onClick={() => setTheme && setTheme(themeItem.id)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '4px',
                                            border: theme === themeItem.id ? '2px solid var(--vscode-accent)' : '1px solid var(--vscode-border)',
                                            backgroundColor: theme === themeItem.id ? 'var(--vscode-list-active-selection-bg)' : 'var(--vscode-button-secondary-bg)',
                                            color: theme === themeItem.id ? 'var(--vscode-list-active-selection-foreground)' : 'var(--vscode-text)',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            transition: 'all 0.2s',
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
                            <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
                                {t('welcome.theme_hint', 'Click to preview • Changes apply instantly')}
                            </p>
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
