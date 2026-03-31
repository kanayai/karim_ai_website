import React from 'react';
import { VscLaw } from 'react-icons/vsc';
import CodeViewer from './CodeViewer';

const LicenseViewer = ({ content }) => {
    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)' }}>
            <div className="p-2 border-bottom d-flex align-items-center gap-2" style={{ borderColor: 'var(--vscode-border)', backgroundColor: 'var(--vscode-bg)', fontSize: '12px' }}>
                <VscLaw size={14} />
                <span>MIT License</span>
                <span style={{ marginLeft: 'auto', color: 'var(--vscode-descriptionForeground)' }}>Plain Text</span>
            </div>
            <CodeViewer content={content} language="plaintext" />
        </div>
    );
};

export default LicenseViewer;
