import React from 'react';
import { VscEyeClosed } from 'react-icons/vsc';

const GitIgnoreViewer = ({ content }) => {
    const lines = content.split('\n');

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', position: 'relative' }}>
            {/* Context Header */}
            <div className="p-2 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--vscode-border)', backgroundColor: 'var(--vscode-bg)', fontSize: '12px' }}>
                <span style={{ opacity: 0.7 }}>.gitignore rules</span>
                <span className="badge bg-secondary" style={{ fontSize: '10px' }}>{lines.filter(l => l.trim() && !l.startsWith('#')).length} rules active</span>
            </div>

            <div className="flex-grow-1 p-3" style={{ overflow: 'auto', fontFamily: 'monospace', fontSize: '13px' }}>
                {lines.map((line, index) => {
                    const trimmed = line.trim();
                    const isComment = trimmed.startsWith('#');
                    const isEmpty = trimmed === '';

                    return (
                        <div key={index} className="d-flex align-items-center" style={{
                            minHeight: '20px',
                            opacity: isComment ? 0.6 : 1,
                            marginBottom: '2px'
                        }}>
                            {/* Line Number */}
                            <span style={{ minWidth: '30px', color: '#858585', userSelect: 'none', marginRight: '10px', textAlign: 'right' }}>{index + 1}</span>

                            {/* Content */}
                            <div className="flex-grow-1 d-flex align-items-center">
                                {isComment ? (
                                    <span style={{ color: '#6a9955' }}>{line}</span>
                                ) : isEmpty ? (
                                    <span>&nbsp;</span>
                                ) : (
                                    <div className="d-flex align-items-center gap-2 ignored-item">
                                        <span style={{ color: '#ce9178' }}>{line}</span>
                                        <VscEyeClosed className="ghost-icon" size={14} style={{ color: '#858585', opacity: 0 }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .ignored-item:hover .ghost-icon {
                    opacity: 1 !important;
                    animation: float 2s ease-in-out infinite;
                }
                .ignored-item:hover span {
                    text-shadow: 0 0 5px rgba(206, 145, 120, 0.5);
                }
                @keyframes float {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default GitIgnoreViewer;
