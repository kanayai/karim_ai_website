import React from 'react';

const CodeViewer = ({ content, language }) => {
    const lines = content.split('\n');

    return (
        <div className="d-flex h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', fontFamily: 'monospace', fontSize: '13px', overflow: 'hidden' }}>
            {/* Line Numbers Gutter */}
            <div
                className="line-numbers py-3 text-end"
                style={{
                    backgroundColor: 'var(--vscode-editor-bg)',
                    color: '#858585',
                    userSelect: 'none',
                    minWidth: '50px',
                    paddingRight: '15px',
                    borderRight: '1px solid var(--vscode-editor-bg)' // Optional: add border if needed
                }}
            >
                {lines.map((_, i) => (
                    <div key={i} style={{ lineHeight: '1.5' }}>{i + 1}</div>
                ))}
            </div>

            {/* Code Content */}
            <div className="code-content flex-grow-1 py-3 px-3" style={{ overflow: 'auto' }}>
                {lines.map((line, i) => (
                    <div key={i} style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {line || ' '}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodeViewer;
