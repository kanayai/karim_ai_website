import React from 'react';

const CodeViewer = ({ content, language }) => {
    const lines = content.split('\n');

    return (
        <div className="d-flex h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', fontFamily: 'var(--vscode-font-family)', fontSize: '13px', overflow: 'hidden' }}>
            <div
                className="line-numbers py-3 text-end"
                style={{
                    backgroundColor: 'var(--vscode-editor-bg)',
                    color: 'var(--vscode-descriptionForeground)',
                    userSelect: 'none',
                    minWidth: '50px',
                    paddingRight: '15px',
                    borderRight: '1px solid color-mix(in srgb, var(--vscode-border) 55%, transparent 45%)'
                }}
            >
                {lines.map((_, i) => (
                    <div key={i} style={{ lineHeight: '1.5' }}>{i + 1}</div>
                ))}
            </div>

            <div className="code-content flex-grow-1 py-3 px-3" style={{ overflow: 'auto' }}>
                {lines.map((line, i) => (
                    <div key={i} style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {line || ' '}
                    </div>
                ))}
            </div>

            <div
                className="d-none d-xl-block"
                style={{
                    width: '84px',
                    borderLeft: '1px solid color-mix(in srgb, var(--vscode-border) 55%, transparent 45%)',
                    background: 'linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--vscode-hover-bg) 30%, transparent 70%) 100%)',
                    opacity: 0.45
                }}
            />
        </div>
    );
};

export default CodeViewer;
