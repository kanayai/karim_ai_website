import React from 'react';
import { VscBook, VscPreview, VscProject, VscAccount, VscRepo, VscNewFile, VscFolderOpened } from 'react-icons/vsc';

const WelcomePage = ({ onNavigate }) => {
    const startItems = [
        {
            icon: <VscBook size={20} color="#3794ff" />,
            title: 'View Publications',
            description: 'Browse academic publications and citations',
            action: () => onNavigate('publications.R')
        },
        {
            icon: <VscPreview size={20} color="#e44d26" />,
            title: 'Read Blog',
            description: 'Explore thoughts and articles',
            action: () => onNavigate('index.html')
        },
        {
            icon: <VscProject size={20} color="#519aba" />,
            title: 'Explore Projects',
            description: 'See current and past research projects',
            action: () => onNavigate('projects.md')
        },
        {
            icon: <VscAccount size={20} color="#4ec9b0" />,
            title: 'About Me',
            description: 'Learn more about my background',
            action: () => onNavigate('about_me.md')
        }
    ];

    const recentItems = [
        { name: 'phd_students.html', path: 'Research/phd_students.html', action: () => onNavigate('phd_students.html') },
        { name: 'current_courses.ipynb', path: 'Teaching/current_courses.ipynb', action: () => onNavigate('current_courses.ipynb') },
        { name: 'gkn_prosperity.html', path: 'Research/Projects/gkn_prosperity.html', action: () => onNavigate('gkn_prosperity.html') },
    ];

    return (
        <div className="h-100 w-100 p-5" style={{
            backgroundColor: 'var(--vscode-editor-bg)',
            color: 'var(--vscode-text)',
            overflowY: 'auto'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Header */}
                <div className="mb-5">
                    <div className="d-flex flex-column align-items-start gap-3 mb-2">
                        <img src="/images/blackboard.png" alt="Logo" style={{ width: '300px', height: '300px', objectFit: 'contain' }} />
                        <h1 style={{ fontSize: '36px', fontWeight: '300' }}>Karim AI</h1>
                    </div>
                    <p style={{ fontSize: '18px', opacity: 0.8, fontWeight: '300' }}>
                        Senior Lecturer in Statistics at the University of Bath
                    </p>
                </div>

                <div className="row">
                    {/* Start Section */}
                    <div className="col-md-7 mb-4">
                        <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '16px' }}>Start</h2>
                        <div className="d-flex flex-column gap-2">
                            {startItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-start gap-3 p-2 rounded start-item"
                                    style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                                    onClick={item.action}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-list-hover-bg)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <div style={{ color: '#3794ff', marginBottom: '2px' }}>{item.title}</div>
                                        <div style={{ fontSize: '13px', opacity: 0.7 }}>{item.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Section */}
                    <div className="col-md-5">
                        <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '16px' }}>Recent</h2>
                        <div className="d-flex flex-column gap-1">
                            {recentItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center gap-2 py-1 px-2 rounded"
                                    style={{ cursor: 'pointer' }}
                                    onClick={item.action}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--vscode-list-hover-bg)';
                                        e.currentTarget.querySelector('.path').style.color = 'var(--vscode-text)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.querySelector('.path').style.color = 'var(--vscode-descriptionForeground)';
                                    }}
                                >
                                    <span style={{ color: '#3794ff' }}>{item.name}</span>
                                    <span className="path" style={{ fontSize: '12px', color: 'var(--vscode-descriptionForeground)', marginLeft: 'auto' }}>
                                        {item.path}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '16px' }}>Help</h2>
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://github.com/kanayai/karim_ai_website" target="_blank" rel="noreferrer" style={{ color: '#3794ff', textDecoration: 'none' }}>GitHub Repository</a>
                                </div>
                                <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                                    <a href="https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/" target="_blank" rel="noreferrer" style={{ color: '#3794ff', textDecoration: 'none' }}>Research Portal</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--vscode-border)' }}>
                    <div className="d-flex align-items-center gap-2">
                        <input type="checkbox" id="showWelcome" defaultChecked disabled />
                        <label htmlFor="showWelcome" style={{ fontSize: '13px', opacity: 0.8 }}>Show welcome page on startup</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
