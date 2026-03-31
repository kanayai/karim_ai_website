import React from 'react';
import { VscEyeClosed } from 'react-icons/vsc';
import CodeViewer from './CodeViewer';

const GitIgnoreViewer = ({ content }) => {
    const lines = content.split('\n');

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', position: 'relative' }}>
            <div className="p-2 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--vscode-border)', backgroundColor: 'var(--vscode-bg)', fontSize: '12px' }}>
                <div className="d-flex align-items-center gap-2">
                    <VscEyeClosed size={14} />
                    <span style={{ opacity: 0.8 }}>.gitignore rules</span>
                </div>
                <span className="badge bg-secondary" style={{ fontSize: '10px' }}>{lines.filter(l => l.trim() && !l.startsWith('#')).length} rules active</span>
            </div>
            <CodeViewer content={content} language="plaintext" />
        </div>
    );
};

export default GitIgnoreViewer;
