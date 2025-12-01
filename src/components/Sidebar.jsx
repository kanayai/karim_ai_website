import React, { useState } from 'react';
import { VscChevronRight, VscChevronDown, VscEllipsis, VscCode, VscRadioTower, VscSourceControl, VscLaw } from 'react-icons/vsc';
import { FaReact, FaJs, FaMarkdown, FaPython, FaHtml5 } from 'react-icons/fa';
import CopilotChat from './CopilotChat';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ activeFile, setActiveFile, activeView, setActiveView }) => {
    const [expandedFolders, setExpandedFolders] = useState({});
    const { t } = useTranslation();

    const toggleFolder = (folderName) => {
        setExpandedFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
    };

    const structure = [
        {
            name: t('sidebar.home'),
            type: 'folder',
            children: [
                { name: 'Welcome', icon: <img src="/images/Bath_Crest.png" alt="Welcome" style={{ width: '16px', height: '16px' }} />, type: 'welcome' },
            ]
        },
        {
            name: t('sidebar.research'),
            type: 'folder',
            children: [
                {
                    name: t('sidebar.projects'),
                    type: 'folder',
                    children: [
                        { name: 'certest.html', icon: <VscCode color="#e44d26" />, type: 'html', path: '/certest.html' },
                        { name: 'gkn_prosperity.html', icon: <VscCode color="#e44d26" />, type: 'html', path: '/gkn_prosperity.html' },
                    ]
                },
                { name: 'phd_students.html', icon: <VscCode color="#e44d26" />, type: 'html', path: '/phd_students.html' },
                { name: 'publications.R', icon: <span style={{ color: '#276dc3', fontWeight: 'bold', fontSize: '10px' }}>R</span>, type: 'r' },
            ]
        },
        {
            name: t('sidebar.teaching'),
            type: 'folder',
            children: [
                { name: 'current_courses.ipynb', icon: <FaPython color="#3776ab" />, type: 'notebook' },
                { name: 'previous_courses.ipynb', icon: <FaPython color="#3776ab" />, type: 'notebook' },
            ]
        },
        {
            name: t('sidebar.blog'),
            type: 'folder',
            children: [
                { name: 'blog.html', icon: <VscCode color="#e44d26" />, type: 'html', path: '/blog.html' },
            ]
        },
        { name: 'about_me.html', icon: <VscCode color="#e34c26" />, type: 'html' },
        { name: 'contact.html', icon: <VscCode color="#e34c26" />, type: 'html' },
        { name: '.gitignore', icon: <VscSourceControl color="#858585" />, type: 'git' },
        { name: 'LICENSE.txt', icon: <VscLaw color="#d4d4d4" />, type: 'text' },
        { name: 'README.md', icon: <FaMarkdown color="#519aba" />, type: 'markdown' },
    ];

    const renderItem = (item) => {
        if (item.type === 'folder') {
            const isExpanded = expandedFolders[item.name];
            return (
                <div key={item.name}>
                    <div
                        className="px-2 py-1 d-flex align-items-center gap-1"
                        style={{
                            cursor: 'pointer',
                            color: 'var(--vscode-text)',
                            paddingLeft: '10px',
                            fontWeight: 'bold'
                        }}
                        onClick={() => toggleFolder(item.name)}
                    >
                        {isExpanded ? <VscChevronDown /> : <VscChevronRight />}
                        <span style={{ fontSize: '13px' }}>{item.name}</span>
                    </div>
                    {isExpanded && (
                        <div style={{
                            marginLeft: '14px',
                            borderLeft: '1px solid var(--vscode-tree-indentGuidesStroke)'
                        }}>
                            {item.children.map(child => renderItem(child))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div
                key={item.name}
                className={`py-1 d-flex align-items-center gap-2 ${activeFile === item.name ? 'active-file' : ''}`}
                style={{
                    cursor: 'pointer',
                    backgroundColor: activeFile === item.name ? 'var(--vscode-hover-bg)' : 'transparent',
                    color: 'var(--vscode-text)',
                    paddingLeft: '10px',
                    marginLeft: '4px'
                }}
                onClick={() => setActiveFile(item.name)}
            >
                {item.icon}
                <span style={{ fontSize: '13px' }}>{item.name}</span>
            </div>
        );
    };

    return (
        <div className="d-flex flex-column" style={{ width: '250px', backgroundColor: 'var(--vscode-sidebar-bg)', borderRight: '1px solid var(--vscode-border)', height: '100%' }}>
            {activeView === 'explorer' ? (
                <>
                    <div className="px-3 py-2 text-uppercase" style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--vscode-text)' }}>{t('sidebar.explorer')}</div>
                    <div className="d-flex flex-column">
                        <div className="px-2 py-1 d-flex align-items-center" style={{ fontWeight: 'bold', cursor: 'pointer', color: 'var(--vscode-text)' }}>
                            <VscChevronDown className="me-1" /> KARIM AI SITE
                            <VscEllipsis className="ms-auto" />
                        </div>
                        {structure.map(item => renderItem(item))}
                    </div>

                    {/* Mock Outline Panel */}
                    <div className="mt-auto">
                        <div className="px-2 py-1 d-flex align-items-center gap-1" style={{ cursor: 'pointer', color: 'var(--vscode-text)', fontWeight: 'bold', borderTop: '1px solid var(--vscode-border)' }}>
                            <VscChevronRight />
                            <span style={{ fontSize: '11px' }}>{t('sidebar.outline')}</span>
                        </div>
                    </div>

                    {/* Mock Timeline Panel */}
                    <div>
                        <div className="px-2 py-1 d-flex align-items-center gap-1" style={{ cursor: 'pointer', color: 'var(--vscode-text)', fontWeight: 'bold', borderTop: '1px solid var(--vscode-border)' }}>
                            <VscChevronRight />
                            <span style={{ fontSize: '11px' }}>{t('sidebar.timeline')}</span>
                        </div>
                    </div>
                </>
            ) : activeView === 'extensions' ? (
                <>
                    <div className="px-3 py-2 text-uppercase" style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--vscode-text)' }}>{t('sidebar.extensions')}</div>
                    <div className="d-flex flex-column p-2">


                        <div
                            className="d-flex p-2 gap-2"
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'var(--vscode-list-hover-bg)',
                                borderRadius: '4px',
                                border: '1px solid var(--vscode-border)',
                                marginBottom: '8px'
                            }}
                            onClick={() => setActiveFile('lofi-radio')}
                        >
                            <div style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}><VscRadioTower color="#4caf50" /></div>
                            <div className="d-flex flex-column">
                                <div style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--vscode-text)' }}>Lo-Fi Radio</div>
                                <div style={{ fontSize: '11px', color: '#858585' }}>Focus music player.</div>
                                <div style={{ fontSize: '10px', color: '#0e639c', marginTop: '4px' }}>Karim AI • Installed</div>
                            </div>
                        </div>

                        <div
                            className="d-flex p-2 gap-2"
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'var(--vscode-list-hover-bg)',
                                borderRadius: '4px',
                                border: '1px solid var(--vscode-border)'
                            }}
                            onClick={() => setActiveFile('retro_game.exe')}
                        >
                            <div style={{ fontSize: '24px' }}>👾</div>
                            <div className="d-flex flex-column">
                                <div style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--vscode-text)' }}>Retro Snake Game</div>
                                <div style={{ fontSize: '11px', color: '#858585' }}>A classic 8-bit style snake game.</div>
                                <div style={{ fontSize: '10px', color: '#0e639c', marginTop: '4px' }}>Karim AI • Installed</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : activeView === 'debug' ? (
                <>
                    <div className="px-3 py-2 text-uppercase d-flex align-items-center justify-content-between" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--vscode-text)', backgroundColor: 'var(--vscode-sidebar-bg)', cursor: 'pointer' }}>
                        <span><VscChevronDown className="me-1" /> {t('sidebar.variables')}</span>
                        <div className="d-flex gap-2">
                            {/* Mock icons */}
                        </div>
                    </div>
                    <div className="d-flex flex-column px-3 pb-2" style={{ fontSize: '13px', color: 'var(--vscode-text)', fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}>
                        <div className="d-flex"><span style={{ color: '#9cdcfe' }}>h_index</span>: <span style={{ color: '#b5cea8' }}>18</span></div>
                        <div className="d-flex"><span style={{ color: '#9cdcfe' }}>citations</span>: <span style={{ color: '#b5cea8' }}>1250+</span></div>
                        <div className="d-flex"><span style={{ color: '#9cdcfe' }}>coffee_level</span>: <span style={{ color: '#ce9178' }}>"Critical" ☕</span></div>
                        <div className="d-flex"><span style={{ color: '#9cdcfe' }}>next_deadline</span>: <span style={{ color: '#ce9178' }}>"Tomorrow"</span></div>
                    </div>

                    <div className="px-3 py-2 text-uppercase d-flex align-items-center" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--vscode-text)', backgroundColor: 'var(--vscode-sidebar-bg)', cursor: 'pointer', marginTop: '10px' }}>
                        <span><VscChevronDown className="me-1" /> {t('sidebar.watch')}</span>
                    </div>
                    <div className="d-flex flex-column px-3 pb-2" style={{ fontSize: '13px', color: 'var(--vscode-text)', fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}>
                        <div className="d-flex"><span style={{ color: '#9cdcfe' }}>grant_proposal</span>: <span style={{ color: '#ce9178' }}>"Pending Review"</span></div>
                        <div className="d-flex"><span style={{ color: '#9cdcfe' }}>phd_students</span>: <span style={{ color: '#b5cea8' }}>3</span></div>
                        <div className="d-flex"><span style={{ color: '#9cdcfe' }}>marking_pile</span>: <span style={{ color: '#b5cea8' }}>999</span></div>
                    </div>

                    <div className="px-3 py-2 text-uppercase d-flex align-items-center" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--vscode-text)', backgroundColor: 'var(--vscode-sidebar-bg)', cursor: 'pointer', marginTop: '10px' }}>
                        <span><VscChevronDown className="me-1" /> {t('sidebar.call_stack')}</span>
                    </div>
                    <div className="d-flex flex-column px-3 pb-2" style={{ fontSize: '13px', color: 'var(--vscode-text)', fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}>
                        <div className="d-flex align-items-center gap-2 mb-1"><span>Teaching</span> <span style={{ color: '#858585' }}>(main.js:45)</span></div>
                        <div className="d-flex align-items-center gap-2 mb-1"><span>Research</span> <span style={{ color: '#858585' }}>(paper.tex:120)</span></div>
                        <div className="d-flex align-items-center gap-2 mb-1"><span>Admin</span> <span style={{ color: '#858585' }}>(meetings.cal:9)</span></div>
                    </div>
                </>
            ) : activeView === 'chat' ? (
                <CopilotChat />
            ) : (
                <div className="p-3" style={{ color: 'var(--vscode-text)' }}>
                    Select a view from the activity bar.
                </div>
            )}
        </div>
    );
};

export default Sidebar;
