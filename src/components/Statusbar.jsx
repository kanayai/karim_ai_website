import React from 'react';
import { VscSourceControl, VscBell, VscCheck, VscFeedback, VscTerminal, VscGlobe } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';

const Statusbar = ({ activeFile, isTerminalOpen, toggleTerminal }) => {
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
        const languages = ['en', 'es', 'fr', 'it', 'pt', 'de'];
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
                <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                    <VscCheck />
                    <span>{t('statusbar.errors')}</span>
                </div>
            </div>
            <div className="d-flex align-items-center gap-3">
                <div
                    className="d-flex align-items-center gap-1 hover-bg px-1"
                    style={{ cursor: 'pointer' }}
                    onClick={toggleTerminal}
                    title="Toggle Terminal (Ctrl+`)"
                >
                    <VscTerminal />
                    <span className="d-none d-md-inline">{isTerminalOpen ? t('statusbar.close_terminal') : t('statusbar.terminal')}</span>
                </div>
                <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                    <span>Ln 12, Col 45</span>
                </div>
                <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                    <span>UTF-8</span>
                </div>
                <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                    <span>{getLanguage(activeFile)}</span>
                </div>
                <div
                    className="d-flex align-items-center gap-1 hover-bg px-1"
                    style={{ cursor: 'pointer' }}
                    onClick={changeLanguage}
                    title="Change Language"
                >
                    <VscGlobe />
                    <span className="text-uppercase">{i18n.language}</span>
                </div>
                <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                    <VscFeedback />
                </div>
                <div className="d-flex align-items-center gap-1 d-none d-md-flex">
                    <VscBell />
                </div>
                <div
                    className="d-flex align-items-center gap-1 hover-bg px-1"
                    title="Powered by Gemini Antigravity"
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open('https://gemini.google.com', '_blank')}
                >
                    <span style={{ fontSize: '10px' }}>⚡ Gemini</span>
                </div>
            </div>
        </div>
    );
};

export default Statusbar;
