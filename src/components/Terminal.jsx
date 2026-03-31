import React from 'react';
import { VscChevronDown, VscClose, VscTrash, VscSplitHorizontal, VscAdd, VscEllipsis } from 'react-icons/vsc';

const Terminal = ({ onClose, height = 220 }) => {
    return (
        <div className="terminal-panel" style={{ height }}>
            <div className="terminal-header d-flex align-items-center justify-content-between px-3 py-1">
                <div className="d-flex gap-3 align-items-center">
                    <span className="terminal-tab active">Terminal</span>
                    <span className="terminal-tab">Problems</span>
                    <span className="terminal-tab">Output</span>
                    <span className="terminal-tab">Debug Console</span>
                    <span className="terminal-tab">Ports</span>
                </div>
                <div className="d-flex align-items-center gap-1 terminal-actions">
                    <button className="terminal-icon-button" type="button" title="Split Terminal">
                        <VscSplitHorizontal size={14} />
                    </button>
                    <button className="terminal-icon-button" type="button" title="More Actions">
                        <VscEllipsis size={14} />
                    </button>
                    <button className="terminal-icon-button" type="button" title="Close Panel" onClick={onClose}>
                        <VscClose size={16} />
                    </button>
                </div>
            </div>

            <div className="d-flex flex-grow-1 terminal-body" style={{ overflow: 'hidden' }}>
                <div className="flex-grow-1 terminal-console">
                    <div className="terminal-toolbar d-flex align-items-center justify-content-between px-3 py-2">
                        <div className="d-flex align-items-center gap-2">
                            <button className="terminal-dropdown" type="button">
                                1: zsh <VscChevronDown size={13} />
                            </button>
                            <button className="terminal-icon-button" type="button" title="New Terminal">
                                <VscAdd size={13} />
                            </button>
                            <button className="terminal-icon-button" type="button" title="Split Terminal">
                                <VscSplitHorizontal size={13} />
                            </button>
                            <button className="terminal-icon-button" type="button" title="Kill Terminal">
                                <VscTrash size={13} />
                            </button>
                        </div>
                        <span className="terminal-shell-label">bash integration ready</span>
                    </div>

                    <div className="terminal-output px-3 py-2">
                        <div className="terminal-line terminal-info">Ready in 184ms on http://localhost:5173</div>
                        <div className="terminal-line terminal-dim">watching for file changes...</div>
                        <div className="terminal-line">
                            <span className="terminal-prompt-mark">➜</span>
                            <span className="terminal-prompt-path"> karim_ai_website </span>
                            <span className="terminal-command">npm run dev</span>
                        </div>
                        <div className="terminal-line">
                            <span className="terminal-prompt-mark">➜</span>
                            <span className="terminal-prompt-path"> karim_ai_website </span>
                            <span className="terminal-command muted">press ^C to stop</span>
                        </div>
                        <div className="terminal-line">
                            <span className="terminal-prompt-mark">➜</span>
                            <span className="terminal-prompt-path"> karim_ai_website </span>
                            <span className="blinking-cursor"> </span>
                        </div>
                    </div>
                </div>

                <div className="d-none d-md-flex flex-column terminal-sessions">
                    <div className="terminal-sessions-header px-2 py-1">TERMINALS</div>
                    <div className="terminal-session-row active d-flex align-items-center justify-content-between px-2 py-1">
                        <div className="d-flex align-items-center gap-2">
                            <span className="terminal-session-dot" />
                            <span>1: zsh</span>
                        </div>
                        <div className="d-flex gap-2">
                            <VscSplitHorizontal size={12} />
                            <VscTrash size={12} />
                        </div>
                    </div>
                    <div className="terminal-session-row d-flex align-items-center px-2 py-1 gap-2">
                        <span className="terminal-session-dot idle" />
                        <span>2: node</span>
                    </div>
                    <div className="terminal-session-row d-flex align-items-center px-2 py-1 gap-2">
                        <VscAdd size={12} />
                        <span>New Terminal</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
