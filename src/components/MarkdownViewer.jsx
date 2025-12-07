import React, { useState } from 'react';
import { VscEye, VscCode } from 'react-icons/vsc';
import CodeViewer from './CodeViewer';

const MarkdownViewer = ({ content }) => {
    const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'code'

    const renderMarkdown = (text) => {
        // Simple parser for the specific README content structure we have
        const lines = text.split('\n');
        return lines.map((line, index) => {
            // Headers
            if (line.startsWith('# ')) {
                return <h1 key={index} className="fade-in" style={{
                    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                    fontWeight: '800'
                }}>{line.replace('# ', '')}</h1>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} className="fade-in-delayed" style={{
                    color: 'var(--vscode-text)',
                    borderBottom: '1px solid var(--vscode-accent)',
                    paddingBottom: '5px',
                    marginTop: '1.5rem',
                    display: 'inline-block'
                }}>{line.replace('## ', '')}</h2>;
            }

            // Bold
            let formattedLine = line;
            // Links [text](url) - Simple regex for single link per line
            const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                const [full, text, url] = linkMatch;
                const parts = line.split(full);
                return (
                    <p key={index} style={{ marginBottom: '0.8rem', lineHeight: '1.6' }}>
                        {parts[0]}
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{
                            color: 'var(--vscode-accent)',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            borderBottom: '1px dashed var(--vscode-accent)'
                        }}>
                            {text}
                        </a>
                        {parts[1]}
                    </p>
                );
            }

            // Bold **text**
            if (line.includes('**')) {
                const parts = line.split('**');
                return (
                    <p key={index} style={{ marginBottom: '0.8rem', lineHeight: '1.6' }}>
                        {parts.map((Part, i) => (i % 2 === 1 ? <strong key={i} style={{ color: 'var(--vscode-foreground)', fontWeight: 'bold' }}>{Part}</strong> : Part))}
                    </p>
                );
            }

            if (line.trim() === '') return <br key={index} />;

            return <p key={index} style={{ marginBottom: '0.8rem', lineHeight: '1.6', opacity: 0.9 }}>{line}</p>;
        });
    };

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', position: 'relative' }}>
            {/* Toolbar */}
            <div className="d-flex justify-content-end p-2 border-bottom" style={{ borderColor: 'var(--vscode-border)', backgroundColor: 'var(--vscode-bg)' }}>
                <div className="btn-group" role="group">
                    <button
                        type="button"
                        className={`btn btn-sm ${viewMode === 'preview' ? 'active' : ''}`}
                        style={{
                            backgroundColor: viewMode === 'preview' ? 'var(--vscode-button-background)' : 'transparent',
                            color: viewMode === 'preview' ? 'var(--vscode-button-foreground)' : 'var(--vscode-text)',
                            border: '1px solid var(--vscode-border)'
                        }}
                        onClick={() => setViewMode('preview')}
                    >
                        <VscEye className="me-1" /> Preview
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm ${viewMode === 'code' ? 'active' : ''}`}
                        style={{
                            backgroundColor: viewMode === 'code' ? 'var(--vscode-button-background)' : 'transparent',
                            color: viewMode === 'code' ? 'var(--vscode-button-foreground)' : 'var(--vscode-text)',
                            border: '1px solid var(--vscode-border)'
                        }}
                        onClick={() => setViewMode('code')}
                    >
                        <VscCode className="me-1" /> Code
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow-1" style={{ overflow: 'auto', position: 'relative' }}>
                {viewMode === 'preview' ? (
                    <div className="p-5" style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'var(--vscode-font-family)' }}>
                        <div className="markdown-body">
                            {renderMarkdown(content)}
                        </div>
                    </div>
                ) : (
                    <CodeViewer content={content} language="markdown" />
                )}
            </div>

            <style>{`
                .fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
                .fade-in-delayed { animation: fadeIn 0.5s ease-out 0.2s forwards; opacity: 0; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default MarkdownViewer;
