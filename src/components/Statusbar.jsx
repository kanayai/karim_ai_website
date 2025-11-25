import React from 'react';
import { VscSourceControl, VscBell, VscCheck, VscFeedback, VscTerminal } from 'react-icons/vsc';

const Statusbar = ({ activeFile, isTerminalOpen, toggleTerminal }) => {
    const getLanguage = (filename) => {
        if (!filename) return 'Plain Text';
        if (filename === 'Welcome') return 'Markdown';
        if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'JavaScript React';
        if (filename.endsWith('.md')) return 'Markdown';
        if (filename.endsWith('.css')) return 'CSS';
        if (filename.endsWith('.html')) return 'HTML';
        if (filename.endsWith('.R')) return 'R';
        if (filename.endsWith('.ipynb')) return 'Jupyter';
        if (filename.endsWith('.json')) return 'JSON';
        return 'Plain Text';
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
                    <span>main*</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <VscCheck />
                    <span>0 errors</span>
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
                    <span>{isTerminalOpen ? 'Close Terminal' : 'Terminal'}</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <span>Ln 12, Col 45</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <span>UTF-8</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <span>{getLanguage(activeFile)}</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <VscFeedback />
                </div>
                <div className="d-flex align-items-center gap-1">
                    <VscBell />
                </div>
                <div className="d-flex align-items-center gap-1" title="Powered by Gemini Antigravity">
                    <span style={{ fontSize: '10px' }}>⚡ Gemini</span>
                </div>
            </div>
        </div>
    );
};

export default Statusbar;
