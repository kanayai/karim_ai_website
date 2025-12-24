import React, { useState } from 'react';
import { VscQuote, VscCopy, VscCheck } from 'react-icons/vsc';
import { useToast } from '../contexts/ToastContext';

const CitationGenerator = () => {
    const toast = useToast();
    const [doi, setDoi] = useState('');
    const [citation, setCitation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const generateCitation = async () => {
        if (!doi) return;
        setLoading(true);
        setError(null);
        setCitation('');
        setCopied(false);

        try {
            // Clean DOI
            const cleanDoi = doi.replace('https://doi.org/', '').trim();
            const response = await fetch(`https://api.crossref.org/works/${cleanDoi}`);

            if (!response.ok) {
                throw new Error('DOI not found or API error');
            }

            const data = await response.json();
            const item = data.message;

            // Simple BibTeX generation
            const type = item.type === 'journal-article' ? 'article' : 'misc';
            const id = item.author ? `${item.author[0].family}${item.created['date-parts'][0][0]}` : `doi${cleanDoi}`;
            const title = item.title ? item.title[0] : 'No Title';
            const author = item.author ? item.author.map(a => `${a.family}, ${a.given}`).join(' and ') : 'Unknown';
            const year = item.created['date-parts'][0][0];
            const journal = item['container-title'] ? item['container-title'][0] : '';
            const volume = item.volume || '';
            const issue = item.issue || '';
            const pages = item.page || '';

            let bibtex = `@${type}{${id},\n`;
            bibtex += `  title = {${title}},\n`;
            bibtex += `  author = {${author}},\n`;
            bibtex += `  year = {${year}},\n`;
            if (journal) bibtex += `  journal = {${journal}},\n`;
            if (volume) bibtex += `  volume = {${volume}},\n`;
            if (issue) bibtex += `  number = {${issue}},\n`;
            if (pages) bibtex += `  pages = {${pages}},\n`;
            bibtex += `  doi = {${cleanDoi}}\n`;
            bibtex += `}`;

            setCitation(bibtex);
            toast.showSuccess('Citation generated successfully');
        } catch (err) {
            setError(err.message);
            toast.showError('Failed to generate citation');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(citation);
        setCopied(true);
        toast.showSuccess('Citation copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 d-flex flex-column h-100" style={{ color: 'var(--vscode-text)', maxWidth: '800px' }}>
            <h2 className="mb-4">Citation Generator</h2>
            <p className="mb-4" style={{ opacity: 0.8 }}>Enter a DOI to generate a BibTeX citation.</p>

            <div className="d-flex gap-2 mb-4">
                <input
                    type="text"
                    className="form-control"
                    style={{
                        backgroundColor: 'var(--vscode-input-bg)',
                        color: 'var(--vscode-input-fg)',
                        border: '1px solid var(--vscode-input-border)'
                    }}
                    placeholder="e.g., 10.1038/nature123"
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateCitation()}
                />
                <button
                    className="btn"
                    style={{
                        backgroundColor: 'var(--vscode-button-background)',
                        color: 'var(--vscode-button-foreground)',
                        border: 'none',
                        minWidth: '100px'
                    }}
                    onClick={generateCitation}
                    disabled={loading}
                >
                    {loading ? 'Fetching...' : 'Generate'}
                </button>
            </div>

            {error && (
                <div className="alert alert-danger" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', border: '1px solid red', color: 'var(--vscode-text)' }}>
                    {error}
                </div>
            )}

            {citation && (
                <div className="position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ fontWeight: 'bold' }}>BibTeX</span>
                        <button
                            className="btn btn-sm d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: 'transparent',
                                color: 'var(--vscode-text)',
                                border: '1px solid var(--vscode-border)'
                            }}
                            onClick={copyToClipboard}
                        >
                            {copied ? <VscCheck color="green" /> : <VscCopy />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <pre
                        className="p-3 rounded"
                        style={{
                            backgroundColor: 'var(--vscode-editor-bg)',
                            border: '1px solid var(--vscode-border)',
                            color: 'var(--vscode-text)',
                            fontFamily: 'monospace',
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        {citation}
                    </pre>
                </div>
            )}

            <div className="mt-auto p-3 rounded" style={{ backgroundColor: 'var(--vscode-textBlockQuote-background)', borderLeft: '4px solid var(--vscode-textBlockQuote-border)' }}>
                <strong>Note:</strong> This tool uses the CrossRef API to fetch metadata.
            </div>
        </div>
    );
};

export default CitationGenerator;
