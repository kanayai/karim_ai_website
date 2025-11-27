import React from 'react';

const GitGraph = () => {
    const commits = [
        {
            hash: '93a98b',
            message: 'BSc in Actuarial Sciences, ITAM, Mexico',
            date: '1993-1998',
            author: 'Karim AI',
            tag: 'v1.0.0'
        },
        {
            hash: '98a00b',
            message: 'MSc in Statistics, IIMAS, UNAM, Mexico',
            date: '1998-2000',
            author: 'Karim AI',
        },
        {
            hash: '00a05b',
            message: 'PhD in Mathematics, IIMAS, UNAM, Mexico',
            date: '2000-2005',
            author: 'Karim AI',
            tag: 'phd'
        },
        {
            hash: '05a11b',
            message: 'Postdoc Open University, Milton Keynes',
            date: '2005-2011',
            author: 'Karim AI',
        },
        {
            hash: '11a13b',
            message: 'Lecturer in Medical Statistics, LSHTM',
            date: '2011-2013',
            author: 'Karim AI',
        },
        {
            hash: '13a23b',
            message: 'Lecturer in Statistics, University of Bath',
            date: '2013-2023',
            author: 'Karim AI',
        },
        {
            hash: '16a00b',
            message: 'Fellow of the Higher Education Academy',
            date: '2016',
            author: 'Karim AI',
            tag: 'fellow'
        },
        {
            hash: 'HEAD',
            message: 'Senior Lecturer in Statistics, University of Bath',
            date: 'Since 2023',
            author: 'Karim AI',
            tag: 'main'
        }
    ].reverse(); // Show newest first

    return (
        <div className="p-4" style={{ color: 'var(--vscode-text)', height: '100%', overflowY: 'auto' }}>
            <h2 className="mb-4">Git Graph: Career Timeline</h2>

            <div style={{ fontFamily: 'Menlo, Monaco, "Courier New", monospace', fontSize: '13px' }}>
                {commits.map((commit, index) => (
                    <div key={commit.hash} className="d-flex mb-2">
                        {/* Graph Visual */}
                        <div className="d-flex flex-column align-items-center me-3" style={{ width: '20px' }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: commit.tag ? 'var(--vscode-accent)' : '#858585',
                                border: '2px solid var(--vscode-editor-bg)',
                                zIndex: 2
                            }}></div>
                            {index !== commits.length - 1 && (
                                <div style={{
                                    width: '2px',
                                    flexGrow: 1,
                                    backgroundColor: '#555',
                                    marginTop: '-2px',
                                    marginBottom: '-10px'
                                }}></div>
                            )}
                        </div>

                        {/* Commit Details */}
                        <div className="flex-grow-1 pb-3">
                            <div className="d-flex align-items-baseline gap-2">
                                <span style={{ color: 'var(--vscode-accent)', fontWeight: 'bold' }}>*</span>
                                <span style={{ color: '#d4d4d4' }}>{commit.hash}</span>
                                <span style={{ color: '#858585' }}>-</span>
                                <span style={{ fontWeight: 'bold' }}>{commit.message}</span>
                                {commit.tag && (
                                    <span style={{
                                        backgroundColor: 'rgba(0, 122, 204, 0.2)',
                                        color: 'var(--vscode-accent)',
                                        padding: '0 4px',
                                        borderRadius: '3px',
                                        fontSize: '11px'
                                    }}>
                                        {commit.tag}
                                    </span>
                                )}
                            </div>
                            <div className="d-flex gap-3 mt-1" style={{ fontSize: '12px', color: '#858585', marginLeft: '15px' }}>
                                <span>{commit.author}</span>
                                <span>{commit.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GitGraph;
