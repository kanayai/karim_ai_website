import React from 'react';
import { VscSourceControl, VscBell, VscCheck, VscFeedback, VscTerminal, VscGlobe, VscBook, VscCheckAll } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';

const Statusbar = ({ activeFile, isTerminalOpen, toggleTerminal, simpleMode, toggleSimpleMode }) => {
    const { t, i18n } = useTranslation();

    const getLanguage = (filename) => {
        if (!filename) return t('statusbar.plain_text');
        if (filename === 'Welcome') return t('statusbar.markdown');
        if (filename.endsWith('.js') || filename.endsWith('.jsx')) return t('statusbar.javascript');
        if (filename.endsWith('.md')) return t('statusbar.markdown');
        if (filename.endsWith('.css')) return t('statusbar.css');
        if (filename.endsWith('.html')) return t('statusbar.html');
        if (filename.endsWith('.R')) return t('statusbar.r');
        if (filename.endsWith('.ipynb')) return t('statusbar.jupyter');
        if (filename.endsWith('.json')) return t('statusbar.json');
        return t('statusbar.plain_text');
    };

    const changeLanguage = () => {
        const languages = ['en', 'es', 'fr', 'pt'];
        const currentLangIndex = languages.indexOf(i18n.language);
        const nextLangIndex = (currentLangIndex + 1) % languages.length;
        i18n.changeLanguage(languages[nextLangIndex]);
    };

    return (
        <div className="d-flex justify-content-between align-items-center px-2 flex-shrink-0"
            style={{
                backgroundColor: 'var(--vscode-status-bar-bg)',
                color: '#ffffff',
                height: '22px',
                fontSize: '12px',
                userSelect: 'none'
            }}>
            <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                    <VscSourceControl />
                    <span>{t('statusbar.main')}</span>
                </div>
                {!simpleMode && (
                    <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                        <VscCheck />
                        <span>{t('statusbar.errors')}</span>
                    </div>
                )}
            </div>
            <div className="d-flex align-items-center gap-3">
                {/* Simple Mode Toggle */}
                <div
                    className="d-flex align-items-center gap-1 hover-bg px-1"
                    style={{ cursor: 'pointer', backgroundColor: simpleMode ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                    onClick={toggleSimpleMode}
                    title={simpleMode ? "Exit Reader Mode" : "Enter Reader Mode"}
                >
                    <VscBook />
                    <span>{simpleMode ? "IDE Mode" : "Reader Mode"}</span>
                </div>

                {!simpleMode && (
                    <div
                        className="d-flex align-items-center gap-1 hover-bg px-1"
                        style={{ cursor: 'pointer' }}
                        onClick={toggleTerminal}
                        title="Toggle Terminal (Ctrl+`)"
                    >
                        <VscTerminal />
                        <span className="d-none d-md-inline">{isTerminalOpen ? t('statusbar.close_terminal') : t('statusbar.terminal')}</span>
                    </div>
                )}
                {!simpleMode && (
                    <>
                        <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                            <span style={{ minWidth: '80px', textAlign: 'right' }}>Ln {Math.floor(Math.random() * 100) + 1}, Col {Math.floor(Math.random() * 50) + 1}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                            <span>UTF-8</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                            <span>{getLanguage(activeFile)}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 d-none d-md-flex" title="Prettier">
                            <VscCheckAll />
                            <span style={{ fontSize: '11px' }}>Prettier</span>
                        </div>
                    </>
                )}
                <div
                    className="d-flex align-items-center gap-1 hover-bg px-1"
                    style={{ cursor: 'pointer' }}
                    onClick={changeLanguage}
                    title="Change Language"
                >
                    <VscGlobe />
                    <span className="text-uppercase">{i18n.language}</span>
                </div>
                {!simpleMode && (
                    <>
                        <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                            <VscFeedback />
                        </div>
                        <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                            <VscBell />
                        </div>
                    </>
                )}
                <div
                    className="d-flex align-items-center gap-1 hover-bg px-1"
                    title="Powered by Gemini Antigravity"
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open('https://gemini.google.com', '_blank')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4553 11.835C19.7828 12.1645 22.5 14.9775 22.5 18.5C22.5 18.7761 22.2761 19 22 19H19C18.7239 19 18.5 18.7761 18.5 18.5C18.5 15.4624 16.0376 13 13 13C12.7239 13 12.5 12.7761 12.5 12.5C12.5 12.2239 12.7239 12 13 12C16.0376 12 18.5 9.53757 18.5 6.5C18.5 6.22386 18.7239 6 19 6H22C22.2761 6 22.5 6.22386 22.5 6.5C22.5 10.0225 19.7828 12.8355 16.4553 13.165C16.1789 13.1925 16.1789 11.8075 16.4553 11.835Z" fill="url(#paint0_linear)" />
                        <path d="M7.54469 11.835C4.21721 12.1645 1.5 14.9775 1.5 18.5C1.5 18.7761 1.72386 19 2 19H5C5.27614 19 5.5 18.7761 5.5 18.5C5.5 15.4624 7.96243 13 11 13C11.2761 13 11.5 12.7761 11.5 12.5C11.5 12.2239 11.2761 12 11 12C7.96243 12 5.5 9.53757 5.5 6.5C5.5 6.22386 5.27614 6 5 6H2C1.72386 6 1.5 6.22386 1.5 6.5C1.5 10.0225 4.21721 12.8355 7.54469 13.165C7.82107 13.1925 7.82107 11.8075 7.54469 11.835Z" fill="url(#paint1_linear)" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="13" y1="12.5" x2="22.5" y2="12.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4E86F6" />
                                <stop offset="1" stopColor="#C1D3F8" />
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="1.5" y1="12.5" x2="11" y2="12.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#D96570" />
                                <stop offset="1" stopColor="#F5C6CB" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div >
    );
};

export default Statusbar;
