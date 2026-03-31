import React from 'react';

const CodeViewer = ({ content, language }) => {
    const lines = content.split('\n');
    const minimapBlocks = lines.slice(0, 80).map((line, index) => {
        const width = Math.max(18, Math.min(72, line.trim().length * 3));
        const opacity = line.trim() ? 0.45 : 0.12;
        return { key: index, width, opacity };
    });

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
                    <div key={i} style={{ lineHeight: '19px' }}>{i + 1}</div>
                ))}
            </div>

            <div className="code-content flex-grow-1 py-3 px-3" style={{ overflow: 'auto' }}>
                {lines.map((line, i) => (
                    <div key={i} style={{ lineHeight: '19px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {line || ' '}
                    </div>
                ))}
            </div>

            <div
                className="d-none d-xl-block"
                style={{
                    width: '84px',
                    borderLeft: '1px solid color-mix(in srgb, var(--vscode-border) 55%, transparent 45%)',
                    backgroundColor: 'var(--vscode-editor-bg)',
                    padding: '10px 8px',
                    overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {minimapBlocks.map((block) => (
                        <div
                            key={block.key}
                            style={{
                                height: '2px',
                                width: `${block.width}%`,
                                backgroundColor: 'var(--vscode-descriptionForeground)',
                                opacity: block.opacity,
                                borderRadius: '999px'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CodeViewer;
