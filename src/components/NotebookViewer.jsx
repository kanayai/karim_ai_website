import React from 'react';

const NotebookViewer = ({ content }) => {
    return (
        <div className="p-4" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', height: '100%', overflowY: 'auto' }}>
            <div className="notebook-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Mock Notebook Content */}
                <div className="cell mb-4">
                    <div className="input-area d-flex gap-2 mb-2">
                        <div style={{ color: '#306998', fontFamily: 'monospace', width: '50px', textAlign: 'right' }}>In [1]:</div>
                        <div className="code-cell flex-grow-1 p-2" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '2px', fontFamily: 'monospace', color: '#333' }}>
                            <span style={{ color: '#008000' }}># Import necessary libraries</span><br />
                            <span style={{ color: '#a71d5d' }}>import</span> pandas <span style={{ color: '#a71d5d' }}>as</span> pd<br />
                            <span style={{ color: '#a71d5d' }}>import</span> numpy <span style={{ color: '#a71d5d' }}>as</span> np<br />
                            <span style={{ color: '#a71d5d' }}>import</span> matplotlib.pyplot <span style={{ color: '#a71d5d' }}>as</span> plt
                        </div>
                    </div>
                </div>

                <div className="cell mb-4">
                    <div className="input-area d-flex gap-2 mb-2">
                        <div style={{ color: '#306998', fontFamily: 'monospace', width: '50px', textAlign: 'right' }}>In [2]:</div>
                        <div className="code-cell flex-grow-1 p-2" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '2px', fontFamily: 'monospace', color: '#333' }}>
                            <span style={{ color: '#008000' }}># Load the dataset</span><br />
                            df = pd.read_csv(<span style={{ color: '#df5000' }}>'teaching_data.csv'</span>)<br />
                            df.head()
                        </div>
                    </div>
                    <div className="output-area d-flex gap-2">
                        <div style={{ color: '#d14', fontFamily: 'monospace', width: '50px', textAlign: 'right' }}>Out[2]:</div>
                        <div className="output-content flex-grow-1 p-2" style={{ overflowX: 'auto' }}>
                            <table className="table table-bordered table-sm" style={{ fontSize: '12px', color: 'var(--vscode-text)' }}>
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Course Name</th>
                                        <th>Semester</th>
                                        <th>Students</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CS101</td>
                                        <td>Intro to Data Science</td>
                                        <td>Fall 2024</td>
                                        <td>120</td>
                                    </tr>
                                    <tr>
                                        <td>CS202</td>
                                        <td>Machine Learning</td>
                                        <td>Spring 2025</td>
                                        <td>85</td>
                                    </tr>
                                    <tr>
                                        <td>CS303</td>
                                        <td>Deep Learning</td>
                                        <td>Fall 2025</td>
                                        <td>60</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="cell mb-4">
                    <div className="markdown-cell p-3" style={{ fontFamily: 'sans-serif' }}>
                        <h3>Teaching Philosophy</h3>
                        <p>My teaching approach focuses on <strong>active learning</strong> and <strong>practical application</strong>. I believe that students learn best when they are engaged in solving real-world problems.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotebookViewer;
