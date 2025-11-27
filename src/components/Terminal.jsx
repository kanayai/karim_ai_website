import React from 'react';
import { VscClose, VscTrash, VscSplitHorizontal, VscAdd } from 'react-icons/vsc';

const Terminal = ({ onClose }) => {
    return (
        <div className="terminal-panel" style={{
            backgroundColor: 'var(--vscode-editor-bg)',
            borderTop: '1px solid var(--vscode-border)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            fontSize: '12px',
            color: 'var(--vscode-text)'
        }}>
            {/* Terminal Header */}
            <div className="d-flex align-items-center justify-content-between px-3 py-1" style={{
                backgroundColor: 'var(--vscode-bg)',
                borderBottom: '1px solid var(--vscode-border)',
                textTransform: 'uppercase',
                fontSize: '11px',
                letterSpacing: '0.5px'
            }}>
                <div className="d-flex gap-3">
                    <span style={{ borderBottom: '1px solid var(--vscode-text)', paddingBottom: '2px' }}>Terminal</span>
                    <span style={{ opacity: 0.5, cursor: 'pointer' }}>Output</span>
                    <span style={{ opacity: 0.5, cursor: 'pointer' }}>Debug Console</span>
                    <span style={{ opacity: 0.5, cursor: 'pointer' }}>Problems</span>
                </div>
                <VscClose
                    style={{ cursor: 'pointer' }}
                    size={16}
                    onClick={onClose}
                    title="Close Panel"
                />
            </div>

            {/* Terminal Content */}
            {/* Terminal Content & Selector */}
            <div className="d-flex flex-grow-1" style={{ overflow: 'hidden' }}>
                <div className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
                    <div style={{ marginBottom: '4px', color: '#4EC9B0' }}>Ready on http://localhost:5173</div>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{ color: '#98C379' }}>➜</span> <span style={{ color: '#61AFEF' }}>~</span> <span style={{ opacity: 0.8 }}>npm run dev</span>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                        <span style={{ color: '#98C379' }}>➜</span> <span style={{ color: '#61AFEF' }}>~</span> <span className="blinking-cursor">_</span>
                    </div>
                </div>

                {/* Mock Terminal Selector */}
                <div className="d-flex flex-column" style={{
                    width: '150px',
                    borderLeft: '1px solid var(--vscode-border)',
                    backgroundColor: 'var(--vscode-sidebar-bg)',
                    fontSize: '11px'
                }}>
                    <div className="d-flex align-items-center justify-content-between px-2 py-1" style={{ backgroundColor: 'var(--vscode-list-hover-bg)', cursor: 'pointer' }}>
                        <div className="d-flex align-items-center gap-2">
                            <span style={{ color: 'var(--vscode-text)' }}>1: zsh</span>
                        </div>
                        <div className="d-flex gap-2">
                            <VscSplitHorizontal size={12} />
                            <VscTrash size={12} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center px-2 py-1 gap-2" style={{ cursor: 'pointer', opacity: 0.7 }}>
                        <span style={{ color: 'var(--vscode-text)' }}>2: node</span>
                    </div>
                    <div className="d-flex align-items-center px-2 py-1 gap-2" style={{ cursor: 'pointer', opacity: 0.7 }}>
                        <VscAdd size={12} />
                    </div>
                </div>
            </div>
            <style>
                {`
                    .terminal-panel {
                        height: 200px;
                    }
                    @media (max-width: 768px) {
                        .terminal-panel {
                            height: 120px;
                        }
                    }
                    .blinking-cursor {
                        animation: blink 1s step-end infinite;
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
};

export default Terminal;
