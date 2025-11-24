import React, { useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscGear, VscColorMode, VscChevronRight, VscChevronDown } from 'react-icons/vsc';
import { FaReact, FaJs, FaMarkdown, FaPython } from 'react-icons/fa';

const Sidebar = ({ activeFile, setActiveFile, theme, toggleTheme }) => {
    const [expandedFolders, setExpandedFolders] = useState({});
    const [showAccountsMenu, setShowAccountsMenu] = useState(false);

    const toggleFolder = (folderName) => {
        setExpandedFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
    };

    const structure = [
        {
            name: 'Home',
            type: 'folder',
            children: [
                { name: 'welcome.md', icon: <FaMarkdown color="#519aba" />, type: 'markdown' },
            ]
        },
        {
            name: 'Research',
            type: 'folder',
            children: [
                { name: 'publications.html', icon: <span>HTML</span>, type: 'html', path: '/publications.html' },
                { name: 'publications.R', icon: <span style={{ color: '#276dc3', fontWeight: 'bold', fontSize: '10px' }}>R</span>, type: 'r' },
                {
                    name: 'Projects',
                    type: 'folder',
                    children: [
                        { name: 'certest.html', icon: <span>HTML</span>, type: 'html', path: '/projects.html#certest' },
                        { name: 'gkn_prosperity.html', icon: <span>HTML</span>, type: 'html', path: '/projects.html#gkn' },
                    ]
                },
                { name: 'phd_students.html', icon: <span>HTML</span>, type: 'html', path: '/phd_students.html' },
            ]
        },
        {
            name: 'Teaching',
            type: 'folder',
            children: [
                { name: 'current_courses.ipynb', icon: <FaPython color="#3776ab" />, type: 'notebook' },
                { name: 'previous_courses.ipynb', icon: <FaPython color="#3776ab" />, type: 'notebook' },
            ]
        },
        {
            name: 'Blog',
            type: 'folder',
            children: [
                { name: 'index.html', icon: <span>HTML</span>, type: 'html', path: '/blog/index.html' },
            ]
        },
        { name: 'about_me.md', icon: <FaMarkdown color="#519aba" />, type: 'markdown' },
        { name: 'contact.css', icon: <FaReact color="#61dafb" />, type: 'css' },
    ];

    const renderItem = (item, depth = 0) => {
        if (item.type === 'folder') {
            const isExpanded = expandedFolders[item.name];
            return (
                <div key={item.name}>
                    <div
                        className="px-2 py-1 d-flex align-items-center gap-1"
                        style={{
                            cursor: 'pointer',
                            color: 'var(--vscode-text)',
                            paddingLeft: `${depth * 12 + 10}px`,
                            fontWeight: 'bold'
                        }}
                        onClick={() => toggleFolder(item.name)}
                    >
                        {isExpanded ? <VscChevronDown /> : <VscChevronRight />}
                        <span style={{ fontSize: '13px' }}>{item.name}</span>
                    </div>
                    {isExpanded && item.children.map(child => renderItem(child, depth + 1))}
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
                    paddingLeft: `${depth * 12 + 24}px` // Indent based on depth + icon space
                }}
                onClick={() => setActiveFile(item.name)}
            >
                {item.icon}
                <span style={{ fontSize: '13px' }}>{item.name}</span>
            </div>
        );
    };

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/kanayai' },
        { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en' },
        { name: 'ORCID', url: 'https://orcid.org/0000-0001-9718-5256' },
        { name: 'Web of Science', url: 'https://www.webofscience.com/wos/author/record/E-9369-2013' },
        { name: 'Bath University', url: 'https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/' }
    ];

    return (
        <div className="d-flex" style={{ height: '100%' }}>
            {/* Activity Bar */}
            <div className="d-flex flex-column justify-content-between align-items-center py-2"
                style={{ width: '48px', backgroundColor: 'var(--vscode-activity-bar-bg)', color: '#858585' }}>
                <div className="d-flex flex-column gap-4">
                    <VscFiles size={24} color="var(--vscode-text)" style={{ cursor: 'pointer' }} />
                    <VscSearch size={24} style={{ cursor: 'pointer' }} />
                    <VscSourceControl size={24} style={{ cursor: 'pointer' }} />
                    <VscDebugAlt size={24} style={{ cursor: 'pointer' }} />
                    <VscExtensions size={24} style={{ cursor: 'pointer' }} />
                </div>
                <div className="d-flex flex-column gap-4 align-items-center">
                    <VscColorMode size={24} onClick={toggleTheme} style={{ cursor: 'pointer' }} title="Toggle Theme" />

                    <div style={{ position: 'relative' }}>
                        <VscAccount
                            size={24}
                            style={{ cursor: 'pointer', color: showAccountsMenu ? 'var(--vscode-text)' : 'inherit' }}
                            onClick={() => setShowAccountsMenu(!showAccountsMenu)}
                            title="Accounts"
                        />
                        {showAccountsMenu && (
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '35px',
                                backgroundColor: 'var(--vscode-sidebar-bg)',
                                border: '1px solid var(--vscode-border)',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                                zIndex: 1000,
                                minWidth: '180px',
                                padding: '5px 0',
                                borderRadius: '5px',
                                color: 'var(--vscode-text)'
                            }}>
                                <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--vscode-border)', fontWeight: 'bold', fontSize: '12px', opacity: 0.8 }}>
                                    ACCOUNTS
                                </div>
                                {socialLinks.map(link => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="d-block px-3 py-2 text-decoration-none"
                                        style={{ color: 'var(--vscode-text)', fontSize: '13px', transition: 'background 0.2s' }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        onClick={() => setShowAccountsMenu(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <VscGear size={24} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Explorer */}
            <div className="d-flex flex-column" style={{ width: '250px', backgroundColor: 'var(--vscode-sidebar-bg)', borderRight: '1px solid var(--vscode-border)' }}>
                <div className="px-3 py-2 text-uppercase" style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--vscode-text)' }}>Explorer</div>

                <div className="d-flex flex-column">
                    <div className="px-2 py-1 d-flex align-items-center" style={{ fontWeight: 'bold', cursor: 'pointer', color: 'var(--vscode-text)' }}>
                        <VscChevronDown className="me-1" /> KARIM AI SITE
                    </div>

                    {structure.map(item => renderItem(item))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
