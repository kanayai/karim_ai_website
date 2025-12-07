import React from 'react';
import { VscBook, VscPreview, VscProject, VscAccount, VscRepo, VscNewFile, VscFolderOpened } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';

const WelcomePage = ({ onNavigate, simpleMode, toggleSimpleMode }) => {
    const { t } = useTranslation();
    const [displayText, setDisplayText] = React.useState('');

    React.useEffect(() => {
        let isMounted = true;

        const typeSequence = async () => {
            const initialText = "Karim Anaya-Izquierdo";

            while (isMounted) {
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

                // 5. Final Pause before restarting
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 3000));
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

    const recentItems = [
        { name: 'phd_students.html', path: 'Research/phd_students.html', action: () => onNavigate('phd_students.html') },
        { name: 'current_courses.ipynb', path: 'Teaching/current_courses.ipynb', action: () => onNavigate('current_courses.ipynb') },
        { name: 'gkn_prosperity.html', path: 'Research/Projects/gkn_prosperity.html', action: () => onNavigate('gkn_prosperity.html') },
    ];

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
                            <span className="blinking-cursor">|</span>
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
                            {recentItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center gap-2 py-1 px-2 rounded"
                                    style={{ cursor: 'pointer' }}
                                    onClick={item.action}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--vscode-list-hover-bg)';
                                        e.currentTarget.querySelector('.path').style.color = 'var(--vscode-text)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.querySelector('.path').style.color = 'var(--vscode-descriptionForeground)';
                                    }}
                                >
                                    <span style={{ color: '#3794ff' }}>{item.name}</span>
                                    <span className="path" style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)', marginLeft: 'auto' }}>
                                        {item.path}
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
