import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscFiles, VscSearch, VscGitMerge, VscDebugAlt, VscExtensions, VscGithub, VscAccount, VscSettingsGear, VscColorMode } from 'react-icons/vsc';
import { themes } from '../constants/themes';

const ActivityBar = ({ activeView, setActiveView, activeFile, setActiveFile, theme, toggleTheme, setTheme, onSearchClick }) => {
    const [showAccountsMenu, setShowAccountsMenu] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showThemeSubmenu, setShowThemeSubmenu] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleClickOutside = () => {
            setShowAccountsMenu(false);
            setShowSettingsMenu(false);
            setShowThemeSubmenu(false);
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/kanayai' },
        { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en' },
        { name: 'ORCID', url: 'https://orcid.org/0000-0001-9718-5256' },
        { name: 'Web of Science', url: 'https://www.webofscience.com/wos/author/record/E-9369-2013' },
        { name: 'Bath University', url: 'https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/' }
    ];

    const IconWrapper = ({ children, onClick, active, title }) => (
        <div
            className="d-flex justify-content-center align-items-center py-3"
            style={{
                width: '100%',
                cursor: 'pointer',
                borderLeft: active ? '2px solid var(--vscode-activity-bar-active-border)' : '2px solid transparent',
                color: active ? 'var(--vscode-activity-bar-foreground)' : 'var(--vscode-activity-bar-inactive-foreground)',
                fontSize: '20px',
                lineHeight: '1'
            }}
            onClick={onClick}
            title={title}
        >
            {children}
        </div>
    );

    const currentThemeLabel = themes.find(t => t.id === theme)?.label || 'Dark';

    return (
        <div className="d-flex flex-column justify-content-between align-items-center py-2 activity-bar"
            style={{
                width: '48px',
                minWidth: '48px',
                backgroundColor: 'var(--vscode-activity-bar-bg)',
                backdropFilter: 'blur(10px)',
                borderRight: '1px solid var(--vscode-border)',
                zIndex: 101,
                height: '100%'
            }}>
            <div className="d-flex flex-column gap-0" style={{ width: '100%' }}>
                <IconWrapper active={activeView === 'explorer'} onClick={() => setActiveView('explorer')} title={t('sidebar.explorer')}>
                    <VscFiles />
                </IconWrapper>
                <IconWrapper onClick={onSearchClick} title="Search">
                    <VscSearch />
                </IconWrapper>
                <IconWrapper active={activeView === 'git-graph'} onClick={() => setActiveView('git-graph')} title="Git Graph">
                    <VscGitMerge />
                </IconWrapper>

                <IconWrapper active={activeView === 'debug'} onClick={() => setActiveView('debug')} title="Run and Debug">
                    <VscDebugAlt />
                </IconWrapper>
                <IconWrapper active={activeView === 'extensions'} onClick={() => setActiveView('extensions')} title={t('sidebar.extensions')}>
                    <VscExtensions />
                </IconWrapper>
                <IconWrapper onClick={() => window.open('https://github.com/kanayai/karim_ai_website', '_blank')} title="GitHub Repository">
                    <VscGithub />
                </IconWrapper>
            </div>
            <div className="d-flex flex-column gap-0 align-items-center" style={{ width: '100%' }}>
                <IconWrapper onClick={toggleTheme} title="Toggle Theme">
                    <VscColorMode />
                </IconWrapper>

                <div style={{ position: 'relative', width: '100%' }}>
                    <IconWrapper onClick={(e) => {
                        e.stopPropagation();
                        setShowAccountsMenu(!showAccountsMenu);
                        setShowSettingsMenu(false);
                    }} title="Accounts">
                        <VscAccount />
                    </IconWrapper>
                    {showAccountsMenu && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '48px',
                                backgroundColor: 'var(--vscode-sidebar-bg)',
                                border: '1px solid var(--vscode-border)',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                                zIndex: 1000,
                                minWidth: '180px',
                                padding: '5px 0',
                                borderRadius: '5px',
                                color: 'var(--vscode-text)'
                            }}>
                            <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--vscode-border)', fontWeight: 'bold', fontSize: '12px', opacity: 0.8 }}>
                                Find me on:
                            </div>
                            {socialLinks.map(link => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-block px-3 py-2 text-decoration-none"
                                    style={{ color: 'var(--vscode-text)', fontSize: '13px', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    onClick={() => setShowAccountsMenu(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ position: 'relative', width: '100%' }}>
                    <IconWrapper onClick={(e) => {
                        e.stopPropagation();
                        setShowSettingsMenu(prev => !prev);
                        setShowAccountsMenu(false);
                    }} title="Settings">
                        <VscSettingsGear />
                    </IconWrapper>
                    {showSettingsMenu && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '48px',
                                backgroundColor: 'var(--vscode-sidebar-bg)',
                                border: '1px solid var(--vscode-border)',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                                zIndex: 1000,
                                minWidth: '220px',
                                padding: '5px 0',
                                borderRadius: '5px',
                                color: 'var(--vscode-text)'
                            }}>
                            <div
                                className="px-3 py-2 d-flex align-items-center justify-content-between"
                                style={{ cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => {
                                    onSearchClick();
                                    setShowSettingsMenu(false);
                                }}
                            >
                                <span>Command Palette...</span>
                                <span style={{ fontSize: '11px', opacity: 0.7 }}>⇧⌘P</span>
                            </div>
                            <div style={{ height: '1px', backgroundColor: 'var(--vscode-border)', margin: '4px 0' }}></div>

                            {/* Theme Selection */}
                            <div
                                className="px-3 py-2 d-flex align-items-center justify-content-between"
                                style={{ cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowThemeSubmenu(prev => !prev);
                                }}
                            >
                                <span>Color Theme</span>
                                <span style={{ fontSize: '11px', opacity: 0.7 }}>{currentThemeLabel} ›</span>
                            </div>

                            {showThemeSubmenu && (
                                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '4px 0' }}>
                                    {themes.map(tOption => (
                                        <div
                                            key={tOption.id}
                                            className="px-4 py-1 d-flex align-items-center justify-content-between"
                                            style={{ cursor: 'pointer', fontSize: '12px', transition: 'background 0.2s' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            onClick={() => {
                                                setTheme(tOption.id);
                                                setShowSettingsMenu(false);
                                                setShowThemeSubmenu(false);
                                            }}
                                        >
                                            <span>{tOption.label}</span>
                                            {theme === tOption.id && <span>✓</span>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ height: '1px', backgroundColor: 'var(--vscode-border)', margin: '4px 0' }}></div>
                            <div className="px-3 py-2" style={{ fontWeight: 'bold', fontSize: '12px', opacity: 0.8 }}>
                                Language
                            </div>
                            {['en', 'es', 'fr', 'pt'].map(lang => (
                                <div
                                    key={lang}
                                    className="px-3 py-2 d-flex align-items-center justify-content-between"
                                    style={{ cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    onClick={() => {
                                        i18n.changeLanguage(lang);
                                        setShowSettingsMenu(false);
                                    }}
                                >
                                    <span className="text-uppercase">{lang}</span>
                                    {i18n.language === lang && <span>✓</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityBar;
