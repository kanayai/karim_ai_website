import React from 'react';
import publicationsData from '../../data/publications.json';

const RCodeViewer = ({ fileName }) => {
    // The R code to display in the editor
    const rCode = `library(jsonlite)
publications <- fromJSON("data/publications.json")
publications_df <- as_tibble(publications)
publications_df`;

    // Convert publications to tibble format
    const createTibble = () => {
        const tibbleData = publicationsData.map(pub => ({
            year: pub.year,
            title: pub.title.length > 60 ? pub.title.substring(0, 60) + '...' : pub.title,
            authors: pub.authors.length > 40 ? pub.authors.substring(0, 40) + '...' : pub.authors,
            journal: pub.journal.length > 35 ? pub.journal.substring(0, 35) + '...' : pub.journal,
            link: pub.link ? 'Yes' : 'No'
        }));
        return tibbleData;
    };

    const tibbleData = createTibble();
    const numRows = tibbleData.length;

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)' }}>
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
                        {rCode.split('\n').map((line, i) => (
                            <div key={i} style={{ lineHeight: '1.5', whiteSpace: 'pre' }}>
                                <span dangerouslySetInnerHTML={{
                                    __html: line
                                        .replace(/^(library)/g, '<span style="color: #C586C0">$1</span>')
                                        .replace(/(fromJSON|as_tibble)/g, '<span style="color: #DCDCAA">$1</span>')
                                        .replace(/"([^"]*)"/g, '<span style="color: #CE9178">"$1"</span>')
                                        .replace(/(&lt;-)/g, '<span style="color: #D4D4D4">←</span>')
                                        .replace(/<-/g, '<span style="color: #D4D4D4">←</span>')
                                }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Terminal/Console Area - Tibble Output */}
            <div className="d-flex flex-column" style={{
                height: '50%',
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
                        # A tibble: {numRows} × 5
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
                                    <th style={{
                                        textAlign: 'left',
                                        padding: '8px 12px',
                                        fontWeight: 'bold',
                                        color: '#4EC9B0'
                                    }}>link</th>
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
                                    <tr key={idx} style={{
                                        backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(128, 128, 128, 0.05)'
                                    }}>
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
                                        <td style={{
                                            padding: '6px 12px',
                                            color: '#CE9178'
                                        }}>{row.link}</td>
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
