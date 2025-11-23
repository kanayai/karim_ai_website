import React from 'react';
import { VscPlay, VscEllipsis } from 'react-icons/vsc';

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
                    <div key={index} className="cell mb-3">
                        {cell.type === 'code' ? (
                            <div className="d-flex flex-column" style={{
                                border: '1px solid var(--vscode-widget-border)',
                                borderRadius: '4px',
                                padding: '8px'
                            }}>
                                {/* Input Area */}
                                <div className="d-flex gap-2">
                                    {/* Gutter with Play Button */}
                                    <div className="d-flex flex-column align-items-center pt-1" style={{ width: '25px', flexShrink: 0 }}>
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: 'var(--vscode-button-bg)',
                                                cursor: 'pointer',
                                                color: 'var(--vscode-button-fg)'
                                            }}
                                        >
                                            <VscPlay size={10} />
                                        </div>
                                    </div>

                                    {/* Code Editor Box */}
                                    <div className="flex-grow-1 rounded" style={{
                                        backgroundColor: 'var(--vscode-editor-bg)',
                                        border: '1px solid var(--vscode-widget-border)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div className="d-flex">
                                            {/* Line Numbers */}
                                            <div className="py-2 text-end pe-3" style={{
                                                color: '#858585',
                                                minWidth: '40px',
                                                userSelect: 'none',
                                                fontSize: '12px',
                                                fontFamily: 'monospace'
                                            }}>
                                                {cell.input.map((_, i) => (
                                                    <div key={i} style={{ lineHeight: '1.5' }}>{i + 1}</div>
                                                ))}
                                            </div>

                                            {/* Code Content */}
                                            <div className="py-2 flex-grow-1" style={{ fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto' }}>
                                                {cell.input.map((line, i) => (
                                                    <div key={i} style={{ lineHeight: '1.5', whiteSpace: 'pre' }}>
                                                        {line.type === 'comment' ? (
                                                            <span style={{ color: '#6A9955' }}>{line.text}</span>
                                                        ) : (
                                                            <span dangerouslySetInnerHTML={{
                                                                __html: line.text
                                                                    .replace('import', '<span style="color: #C586C0">import</span>')
                                                                    .replace('as', '<span style="color: #C586C0">as</span>')
                                                                    .replace(/'([^']*)'/g, '<span style="color: #CE9178">\'$1\'</span>')
                                                                    .replace(/"([^"]*)"/g, '<span style="color: #CE9178">"$1"</span>')
                                                            }} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Language Indicator */}
                                        <div className="position-absolute bottom-0 end-0 px-2 py-1" style={{
                                            fontSize: '10px',
                                            color: 'var(--vscode-descriptionForeground)',
                                            opacity: 0.8,
                                            pointerEvents: 'none'
                                        }}>
                                            Python
                                        </div>
                                    </div>
                                </div>

                                {/* Output Area */}
                                {cell.output && (
                                    <div className="d-flex gap-2 mt-2">
                                        <div style={{ width: '25px', flexShrink: 0 }}></div> {/* Spacer for alignment */}
                                        <div className="flex-grow-1 position-relative ps-3" style={{ borderLeft: '1px solid var(--vscode-widget-border)' }}>
                                            {/* Output Actions */}
                                            <div className="position-absolute top-0 start-0 ms-1 mt-1" style={{ cursor: 'pointer', opacity: 0.6 }}>
                                                <VscEllipsis size={14} />
                                            </div>

                                            <div className="output-content pt-1 ps-4" style={{ overflowX: 'auto' }}>
                                                {cell.output.type === 'table' && (
                                                    <table className="table table-bordered table-sm mb-0" style={{
                                                        fontSize: '12px',
                                                        color: 'var(--vscode-text)',
                                                        borderColor: 'var(--vscode-widget-border)'
                                                    }}>
                                                        <thead>
                                                            <tr>
                                                                {cell.output.headers.map((h, i) => <th key={i} style={{ backgroundColor: 'var(--vscode-editor-bg)', borderColor: 'var(--vscode-widget-border)' }}>{h}</th>)}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cell.output.rows.map((row, i) => (
                                                                <tr key={i}>
                                                                    {row.map((cell, j) => <td key={j} style={{ borderColor: 'var(--vscode-widget-border)' }}>{cell}</td>)}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
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
