import React, { useState } from 'react';
import publicationsData from '../../data/publications.json';

const RCodeViewer = ({ fileName }) => {
    const [consoleHeight, setConsoleHeight] = useState(60); // percentage
    const [isDragging, setIsDragging] = useState(false);

    // The R code to display in the editor
    // The R code to display in the editor
    const rCode = `library(tidyverse)
library(jsonlite)

publications_df <- fromJSON("data/publications.json")

publications_df <- publications_df %>%
  select(year, title, authors, journal) %>%
  arrange(desc(year)) %>%
  as_tibble()

publications_df`;

    // Simple R syntax highlighter
    const highlightRCode = (code) => {
        const lines = code.split('\n');
        return lines.map((line, i) => {
            // Very basic tokenization
            // Very basic tokenization
            let formattedLine = line;

            // If line is empty, add a non-breaking space to ensure it renders height
            if (formattedLine.trim() === '') {
                formattedLine = '\u00A0';
            } else {
                // Strings
                formattedLine = formattedLine.replace(/(".*?")/g, '<span style="color: #ce9178">$1</span>');

                // Keywords
                formattedLine = formattedLine.replace(/\b(library|if|else|for|while|return|function)\b/g, '<span style="color: #569cd6">$1</span>');

                // Operators
                formattedLine = formattedLine.replace(/(<-|%>%)/g, '<span style="color: #569cd6">$1</span>');

                // Functions (heuristic: word followed by ()
                formattedLine = formattedLine.replace(/\b([a-zA-Z0-9_.]+)(?=\()/g, '<span style="color: #dcdcaa">$1</span>');
            }

            return (
                <div key={i} style={{ lineHeight: '1.5', whiteSpace: 'pre', minHeight: '1.5em' }} dangerouslySetInnerHTML={{ __html: formattedLine }} />
            );
        });
    };

    // Convert publications to tibble format
    const createTibble = () => {
        const tibbleData = publicationsData.map(pub => ({
            year: pub.year,
            title: pub.title.length > 60 ? pub.title.substring(0, 60) + '...' : pub.title,
            authors: pub.authors.length > 40 ? pub.authors.substring(0, 40) + '...' : pub.authors,
            journal: pub.journal.length > 35 ? pub.journal.substring(0, 35) + '...' : pub.journal,
            url: pub.link || ''
        }));
        return tibbleData;
    };

    const tibbleData = createTibble();
    const numRows = tibbleData.length;

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const newConsoleHeight = ((rect.bottom - e.clientY) / rect.height) * 100;

        // Limit between 20% and 80%
        if (newConsoleHeight >= 20 && newConsoleHeight <= 80) {
            setConsoleHeight(newConsoleHeight);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="d-flex flex-column h-100"
            style={{ backgroundColor: 'var(--vscode-editor-bg)', cursor: isDragging ? 'ns-resize' : 'default' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Top Editor Area - R Code */}
            <div className="flex-grow-1 d-flex flex-column" style={{
                borderBottom: '1px solid var(--vscode-border)',
                minHeight: '0'
            }}>
                {/* File tab */}
                <div className="px-3 py-1 d-flex align-items-center gap-2" style={{
                    backgroundColor: 'var(--vscode-bg)',
                    borderBottom: '1px solid var(--vscode-border)',
                    fontSize: '13px',
                    color: 'var(--vscode-text)'
                }}>
                    <span style={{ color: '#276dc3', fontWeight: 'bold', fontSize: '10px' }}>R</span>
                    <span>{fileName}</span>
                </div>

                {/* Code editor area */}
                <div className="flex-grow-1 d-flex" style={{ overflowY: 'auto' }}>
                    {/* Line numbers */}
                    <div className="py-3 px-2 text-end" style={{
                        backgroundColor: 'var(--vscode-editor-bg)',
                        color: '#858585',
                        minWidth: '50px',
                        userSelect: 'none',
                        fontSize: '13px',
                        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                        borderRight: '1px solid rgba(128, 128, 128, 0.2)'
                    }}>
                        {rCode.split('\n').map((_, i) => (
                            <div key={i} style={{ lineHeight: '1.5' }}>{i + 1}</div>
                        ))}
                    </div>

                    {/* Code content with syntax highlighting */}
                    <div className="py-3 px-3 flex-grow-1" style={{
                        color: 'var(--vscode-text)',
                        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                        fontSize: '13px',
                        overflowX: 'auto'
                    }}>
                        {highlightRCode(rCode)}
                    </div>
                </div>
            </div>

            {/* Resize Handle */}
            <div
                onMouseDown={handleMouseDown}
                style={{
                    height: '4px',
                    backgroundColor: 'var(--vscode-border)',
                    cursor: 'ns-resize',
                    position: 'relative',
                    zIndex: 10,
                    transition: isDragging ? 'none' : 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3794ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-border)'}
            />

            {/* Bottom Terminal/Console Area - Tibble Output */}
            <div className="d-flex flex-column" style={{
                height: `${consoleHeight}%`,
                backgroundColor: 'var(--vscode-bg)',
                color: 'var(--vscode-text)'
            }}>
                {/* Terminal header */}
                <div className="px-3 py-1 d-flex align-items-center justify-content-between" style={{
                    backgroundColor: 'var(--vscode-bg)',
                    borderBottom: '1px solid var(--vscode-border)',
                    fontSize: '13px'
                }}>
                    <div className="d-flex align-items-center gap-2">
                        <span style={{ fontWeight: 'bold' }}>R Console</span>
                        <span style={{ opacity: 0.6, fontSize: '11px' }}>Output</span>
                    </div>
                </div>

                {/* Console output */}
                <div className="flex-grow-1 p-3" style={{
                    overflowY: 'auto',
                    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                    fontSize: '12px'
                }}>
                    {/* Tibble header */}
                    <div style={{ color: '#6A9955', marginBottom: '10px' }}>
                        # A tibble: {numRows} × 4
                    </div>

                    {/* Tibble table */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            borderCollapse: 'collapse',
                            width: '100%',
                            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                            fontSize: '12px'
                        }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--vscode-border)' }}>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        fontWeight: 'bold',
                                        color: '#4EC9B0'
                                    }}></th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        fontWeight: 'bold',
                                        color: '#4EC9B0'
                                    }}>year</th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        fontWeight: 'bold',
                                        color: '#4EC9B0'
                                    }}>title</th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        fontWeight: 'bold',
                                        color: '#4EC9B0'
                                    }}>authors</th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        fontWeight: 'bold',
                                        color: '#4EC9B0'
                                    }}>journal</th>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--vscode-border)' }}>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '4px 12px',
                                        fontWeight: 'normal',
                                        color: '#858585',
                                        fontStyle: 'italic',
                                        fontSize: '11px'
                                    }}></th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '4px 12px',
                                        fontWeight: 'normal',
                                        color: '#858585',
                                        fontStyle: 'italic',
                                        fontSize: '11px'
                                    }}>&lt;chr&gt;</th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '4px 12px',
                                        fontWeight: 'normal',
                                        color: '#858585',
                                        fontStyle: 'italic',
                                        fontSize: '11px'
                                    }}>&lt;chr&gt;</th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '4px 12px',
                                        fontWeight: 'normal',
                                        color: '#858585',
                                        fontStyle: 'italic',
                                        fontSize: '11px'
                                    }}>&lt;chr&gt;</th>
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '4px 12px',
                                        fontWeight: 'normal',
                                        color: '#858585',
                                        fontStyle: 'italic',
                                        fontSize: '11px'
                                    }}>&lt;chr&gt;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tibbleData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => row.url && window.open(row.url, '_blank')}
                                        style={{
                                            backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(128, 128, 128, 0.05)',
                                            cursor: row.url ? 'pointer' : 'default',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (row.url) {
                                                e.currentTarget.style.backgroundColor = 'rgba(79, 201, 176, 0.15)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (row.url) {
                                                e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'transparent' : 'rgba(128, 128, 128, 0.05)';
                                            }
                                        }}
                                    >
                                        <td style={{
                                            padding: '6px 12px',
                                            color: '#858585',
                                            textAlign: 'right',
                                            width: '40px'
                                        }}>{idx + 1}</td>
                                        <td style={{
                                            padding: '6px 12px',
                                            color: '#CE9178'
                                        }}>{row.year}</td>
                                        <td style={{
                                            padding: '6px 12px',
                                            color: '#CE9178',
                                            maxWidth: '300px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>{row.title}</td>
                                        <td style={{
                                            padding: '6px 12px',
                                            color: '#CE9178',
                                            maxWidth: '250px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>{row.authors}</td>
                                        <td style={{
                                            padding: '6px 12px',
                                            color: '#CE9178',
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>{row.journal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer info like R tibbles */}
                    <div style={{
                        marginTop: '10px',
                        color: '#6A9955',
                        fontSize: '11px',
                        fontStyle: 'italic'
                    }}>
                        # ... with {numRows} more rows
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RCodeViewer;
