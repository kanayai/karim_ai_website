import React, { useState } from 'react';
import { VscEye, VscCode } from 'react-icons/vsc';
import CodeViewer from './CodeViewer';

const MarkdownViewer = ({ content }) => {
    const [viewMode, setViewMode] = useState('preview');

    const renderMarkdown = (text) => {
        const lines = text.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('# ')) {
                return <h1 key={index} style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 18px', color: 'var(--vscode-text)' }}>{line.replace('# ', '')}</h1>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} style={{ color: 'var(--vscode-text)', fontSize: '20px', margin: '28px 0 10px' }}>{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
                return <h3 key={index} style={{ color: 'var(--vscode-text)', fontSize: '16px', margin: '22px 0 8px' }}>{line.replace('### ', '')}</h3>;
            }
            if (line.trim() === '---') {
                return <hr key={index} style={{ borderColor: 'var(--vscode-border)', margin: '20px 0' }} />;
            }
            if (/^\d+\.\s/.test(line)) {
                return <div key={index} style={{ marginBottom: '6px', lineHeight: '1.7', color: 'var(--vscode-text)' }}>{line}</div>;
            }
            if (line.startsWith('* ') || line.startsWith('- ')) {
                return <div key={index} style={{ marginBottom: '6px', lineHeight: '1.7', color: 'var(--vscode-text)' }}>{line}</div>;
            }

            const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                const [full, text, url] = linkMatch;
                const parts = line.split(full);
                return (
                    <p key={index} style={{ marginBottom: '0.8rem', lineHeight: '1.7', color: 'var(--vscode-text)' }}>
                        {parts[0]}
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{
                            color: 'var(--vscode-accent)',
                            textDecoration: 'none',
                            textDecorationLine: 'underline'
                        }}>
                            {text}
                        </a>
                        {parts[1]}
                    </p>
                );
            }

            if (line.includes('**')) {
                const parts = line.split('**');
                return (
                    <p key={index} style={{ marginBottom: '0.8rem', lineHeight: '1.7', color: 'var(--vscode-text)' }}>
                        {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} style={{ color: 'var(--vscode-text)', fontWeight: 600 }}>{part}</strong> : part))}
                    </p>
                );
            }

            if (line.trim() === '') return <br key={index} />;

            return <p key={index} style={{ marginBottom: '0.8rem', lineHeight: '1.7', color: 'var(--vscode-text)' }}>{line}</p>;
        });
    };

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', position: 'relative' }}>
            <div className="d-flex align-items-center gap-2 px-3 border-bottom" style={{ minHeight: '35px', borderColor: 'var(--vscode-border)', backgroundColor: 'var(--vscode-bg)' }}>
                <button
                    type="button"
                    style={{
                        border: 'none',
                        background: 'transparent',
                        color: viewMode === 'preview' ? 'var(--vscode-text)' : 'var(--vscode-descriptionForeground)',
                        borderBottom: viewMode === 'preview' ? '1px solid var(--vscode-accent)' : '1px solid transparent',
                        borderRadius: 0,
                        padding: '8px 0'
                    }}
                    onClick={() => setViewMode('preview')}
                >
                    <VscEye className="me-1" /> Preview
                </button>
                <button
                    type="button"
                    style={{
                        border: 'none',
                        background: 'transparent',
                        color: viewMode === 'code' ? 'var(--vscode-text)' : 'var(--vscode-descriptionForeground)',
                        borderBottom: viewMode === 'code' ? '1px solid var(--vscode-accent)' : '1px solid transparent',
                        borderRadius: 0,
                        padding: '8px 0'
                    }}
                    onClick={() => setViewMode('code')}
                >
                    <VscCode className="me-1" /> Source
                </button>
            </div>

            <div className="flex-grow-1" style={{ overflow: 'auto', position: 'relative' }}>
                {viewMode === 'preview' ? (
                    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '24px 32px', fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
                        <div className="markdown-body" style={{ color: 'var(--vscode-text)' }}>
                            {renderMarkdown(content)}
                        </div>
                    </div>
                ) : (
                    <CodeViewer content={content} language="markdown" />
                )}
            </div>
        </div>
    );
};

export default MarkdownViewer;
