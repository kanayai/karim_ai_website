import React from 'react';

const NotebookViewer = ({ fileName }) => {
    const notebooks = {
        'current_courses.ipynb': [
            {
                type: 'code',
                input: [
                    { type: 'comment', text: '# Import necessary libraries' },
                    { type: 'code', text: 'import pandas as pd' },
                    { type: 'code', text: 'import numpy as np' },
                    { type: 'code', text: 'import matplotlib.pyplot as plt' }
                ],
                executionCount: 1
            },
            {
                type: 'code',
                input: [
                    { type: 'comment', text: '# Load the dataset' },
                    { type: 'code', text: "df = pd.read_csv('teaching_data.csv')" },
                    { type: 'code', text: 'df.head()' }
                ],
                output: {
                    type: 'table',
                    headers: ['Course ID', 'Course Name', 'Semester', 'Students'],
                    rows: [
                        ['CS101', 'Intro to Data Science', 'Fall 2024', '120'],
                        ['CS202', 'Machine Learning', 'Spring 2025', '85'],
                        ['CS303', 'Deep Learning', 'Fall 2025', '60']
                    ]
                },
                executionCount: 2
            },
            {
                type: 'markdown',
                content: `<h3>Teaching Philosophy</h3>
                <p>My teaching approach focuses on <strong>active learning</strong> and <strong>practical application</strong>. I believe that students learn best when they are engaged in solving real-world problems.</p>`
            }
        ],
        'previous_courses.ipynb': [
            {
                type: 'code',
                input: [
                    { type: 'comment', text: '# Load previous courses data' },
                    { type: 'code', text: "history_df = pd.read_csv('course_history.csv')" },
                    { type: 'code', text: 'history_df.groupby("Year").count()' }
                ],
                output: {
                    type: 'table',
                    headers: ['Year', 'Courses Taught', 'Total Students', 'Avg Rating'],
                    rows: [
                        ['2023', '4', '350', '4.8'],
                        ['2022', '3', '280', '4.7'],
                        ['2021', '3', '265', '4.9']
                    ]
                },
                executionCount: 1
            },
            {
                type: 'markdown',
                content: `<h3>Past Course Highlights</h3>
                <ul>
                    <li><strong>Advanced NLP (2023)</strong>: Introduced transformer architectures and large language models.</li>
                    <li><strong>Computer Vision (2022)</strong>: Focus on CNNs and object detection.</li>
                    <li><strong>Intro to AI (2021)</strong>: Foundational concepts and search algorithms.</li>
                </ul>`
            }
        ]
    };

    const content = notebooks[fileName] || [];

    return (
        <div className="p-4" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', height: '100%', overflowY: 'auto' }}>
            <div className="notebook-container">
                {content.map((cell, index) => (
                    <div key={index} className="cell mb-4">
                        {cell.type === 'code' ? (
                            <>
                                <div className="input-area d-flex gap-2 mb-2">
                                    <div style={{ color: '#306998', fontFamily: 'monospace', width: '50px', textAlign: 'right', flexShrink: 0 }}>In [{cell.executionCount}]:</div>
                                    <div className="code-cell flex-grow-1 d-flex" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '2px', fontFamily: 'monospace', color: '#333', overflow: 'hidden' }}>
                                        {/* Line Numbers Gutter */}
                                        <div className="line-numbers p-2 text-end" style={{ backgroundColor: '#eee', borderRight: '1px solid #e0e0e0', color: '#999', userSelect: 'none', minWidth: '30px' }}>
                                            {cell.input.map((_, i) => (
                                                <div key={i} style={{ lineHeight: '1.5' }}>{i + 1}</div>
                                            ))}
                                        </div>
                                        {/* Code Content */}
                                        <div className="code-content p-2 flex-grow-1" style={{ overflowX: 'auto' }}>
                                            {cell.input.map((line, i) => (
                                                <div key={i} style={{ lineHeight: '1.5', whiteSpace: 'pre' }}>
                                                    {line.type === 'comment' ? (
                                                        <span style={{ color: '#008000' }}>{line.text}</span>
                                                    ) : (
                                                        // Simple syntax highlighting simulation
                                                        <span dangerouslySetInnerHTML={{
                                                            __html: line.text
                                                                .replace('import', '<span style="color: #a71d5d">import</span>')
                                                                .replace('as', '<span style="color: #a71d5d">as</span>')
                                                                .replace(/'([^']*)'/g, '<span style="color: #df5000">\'$1\'</span>')
                                                                .replace(/"([^"]*)"/g, '<span style="color: #df5000">"$1"</span>')
                                                        }} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {cell.output && (
                                    <div className="output-area d-flex gap-2">
                                        <div style={{ color: '#d14', fontFamily: 'monospace', width: '50px', textAlign: 'right' }}>Out[{cell.executionCount}]:</div>
                                        <div className="output-content flex-grow-1 p-2" style={{ overflowX: 'auto' }}>
                                            {cell.output.type === 'table' && (
                                                <table className="table table-bordered table-sm" style={{ fontSize: '12px', color: 'var(--vscode-text)' }}>
                                                    <thead>
                                                        <tr>
                                                            {cell.output.headers.map((h, i) => <th key={i}>{h}</th>)}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cell.output.rows.map((row, i) => (
                                                            <tr key={i}>
                                                                {row.map((cell, j) => <td key={j}>{cell}</td>)}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="markdown-cell p-3" style={{ fontFamily: 'sans-serif' }} dangerouslySetInnerHTML={{ __html: cell.content }} />
                        )}
                    </div>
                ))}

                {content.length === 0 && (
                    <div className="text-center text-muted p-5">
                        Notebook content not found for {fileName}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotebookViewer;
