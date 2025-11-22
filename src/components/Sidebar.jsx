import React, { useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscGear, VscColorMode, VscChevronRight, VscChevronDown } from 'react-icons/vsc';
import { FaReact, FaJs, FaMarkdown, FaPython } from 'react-icons/fa';

const Sidebar = ({ activeFile, setActiveFile, theme, toggleTheme }) => {
    const [expandedFolders, setExpandedFolders] = useState({ 'Research': true, 'Teaching': true });

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
                { name: 'publications.R', icon: <FaPython color="#3776ab" />, type: 'r' },
                { name: 'publications.md', icon: <FaMarkdown color="#519aba" />, type: 'markdown' },
                { name: 'projects.md', icon: <FaMarkdown color="#519aba" />, type: 'markdown' },
            ]
        },
        {
            name: 'Teaching',
            type: 'folder',
            children: [
                { name: 'current_courses.ipynb', icon: <FaPython color="#3776ab" />, type: 'notebook' },
                { name: 'previous_courses.md', icon: <FaMarkdown color="#519aba" />, type: 'markdown' },
            ]
        },
        {
            name: 'Blog',
            type: 'folder',
            children: [
                { name: 'index.html', icon: <span>HTML</span>, type: 'html', path: '/blog/index.html' },
                { name: 'first-post.html', icon: <span>HTML</span>, type: 'html', path: '/blog/posts/first-post.html' },
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
                <div className="d-flex flex-column gap-4">
                    <VscColorMode size={24} onClick={toggleTheme} style={{ cursor: 'pointer' }} title="Toggle Theme" />
                    <VscAccount size={24} style={{ cursor: 'pointer' }} />
                    <VscGear size={24} style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Explorer */}
            <div className="d-flex flex-column" style={{ width: '250px', backgroundColor: 'var(--vscode-sidebar-bg)', borderRight: '1px solid var(--vscode-border)' }}>
                <div className="px-3 py-2 text-uppercase" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--vscode-text)' }}>Explorer</div>

                <div className="d-flex flex-column">
                    <div className="px-2 py-1 d-flex align-items-center" style={{ fontWeight: 'bold', cursor: 'pointer', color: 'var(--vscode-text)' }}>
                        <VscChevronDown className="me-1" /> PORTFOLIO
                    </div>

                    {structure.map(item => renderItem(item))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
