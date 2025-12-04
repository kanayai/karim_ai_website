import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const LatexPlayground = () => {
    const [input, setInput] = useState('\\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}');
    const [html, setHtml] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const rendered = katex.renderToString(input, {
                throwOnError: false,
                displayMode: true
            });
            setHtml(rendered);
            setError(null);
        } catch (e) {
            setError(e.message);
        }
    }, [input]);

    return (
        <div className="p-4 d-flex flex-column h-100" style={{ color: 'var(--vscode-text)' }}>
            <h2 className="mb-4">LaTeX Playground</h2>
            <p className="mb-4" style={{ opacity: 0.8 }}>Type LaTeX math equations below to render them in real-time.</p>

            <div className="d-flex flex-column flex-md-row gap-4 flex-grow-1" style={{ minHeight: 0 }}>
                {/* Input Area */}
                <div className="d-flex flex-column flex-grow-1" style={{ flexBasis: '50%' }}>
                    <label className="mb-2 fw-bold">Input (LaTeX)</label>
                    <textarea
                        className="form-control flex-grow-1"
                        style={{
                            backgroundColor: 'var(--vscode-input-bg)',
                            color: 'var(--vscode-input-fg)',
                            border: '1px solid var(--vscode-input-border)',
                            fontFamily: 'monospace',
                            resize: 'none'
                        }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your LaTeX here..."
                    />
                </div>

                {/* Output Area */}
                <div className="d-flex flex-column flex-grow-1" style={{ flexBasis: '50%' }}>
                    <label className="mb-2 fw-bold">Preview</label>
                    <div
                        className="flex-grow-1 p-4 rounded d-flex align-items-center justify-content-center preview-box"
                        style={{
                            backgroundColor: 'var(--vscode-editor-bg)',
                            border: '1px solid var(--vscode-border)',
                            overflow: 'auto'
                        }}
                    >
                        {error ? (
                            <div className="text-danger">{error}</div>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: html }} style={{ fontSize: '1.5em' }} />
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .preview-box {
                        min-height: 200px !important;
                        flex-grow: 0 !important;
                    }
                }
            `}</style>


        </div>
    );
};

export default LatexPlayground;
