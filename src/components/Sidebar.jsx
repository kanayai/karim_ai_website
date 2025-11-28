import React, { useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscGear, VscColorMode, VscChevronRight, VscChevronDown, VscLaw, VscEllipsis, VscCode, VscGitMerge, VscRadioTower, VscSparkle, VscGithub } from 'react-icons/vsc';
import { FaReact, FaJs, FaMarkdown, FaPython, FaHtml5 } from 'react-icons/fa';
import CopilotChat from './CopilotChat';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ activeFile, setActiveFile, theme, toggleTheme, onSearchClick }) => {
    const [activeView, setActiveView] = useState('explorer');
    const [expandedFolders, setExpandedFolders] = useState({});
    const [showAccountsMenu, setShowAccountsMenu] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const { t, i18n } = useTranslation();

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
                { name: 'index.html', icon: <VscCode color="#e44d26" />, type: 'html', path: '/blog/index.html' },
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
                style={{
                    width: '48px',
                    minWidth: '48px',
                    backgroundColor: 'var(--vscode-activity-bar-bg)',
                    borderRight: '1px solid var(--vscode-border)',
                    zIndex: 10
                }}>
                <div className="d-flex flex-column gap-0">
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer', borderLeft: activeView === 'explorer' ? '2px solid var(--vscode-activity-bar-active-border)' : '2px solid transparent' }}>
                        <VscFiles
                            size={24}
                            color={activeView === 'explorer' ? "var(--vscode-activity-bar-foreground)" : "var(--vscode-activity-bar-inactive-foreground)"}
                            onClick={() => setActiveView('explorer')}
                            title={t('sidebar.explorer')}
                        />
                    </div>
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer' }}>
                        <VscSearch
                            size={24}
                            color="var(--vscode-activity-bar-inactive-foreground)"
                            onClick={onSearchClick}
                        />
                    </div>
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer' }}>
                        <VscSourceControl
                            size={24}
                            color="var(--vscode-activity-bar-inactive-foreground)"
                            onClick={() => setActiveFile('git-graph')}
                            title="Git Graph (Career Timeline)"
                        />
                    </div>
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer', borderLeft: activeView === 'chat' ? '2px solid var(--vscode-activity-bar-active-border)' : '2px solid transparent' }}>
                        <VscSparkle
                            size={24}
                            color={activeView === 'chat' ? "var(--vscode-activity-bar-foreground)" : "var(--vscode-activity-bar-inactive-foreground)"}
                            onClick={() => setActiveView('chat')}
                            title="Portfolio Copilot"
                        />
                    </div>
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer', borderLeft: activeView === 'debug' ? '2px solid var(--vscode-activity-bar-active-border)' : '2px solid transparent' }}>
                        <VscDebugAlt
                            size={24}
                            color={activeView === 'debug' ? "var(--vscode-activity-bar-foreground)" : "var(--vscode-activity-bar-inactive-foreground)"}
                            onClick={() => setActiveView('debug')}
                            title="Run and Debug (Skills & Stats)"
                        />
                    </div>
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer', borderLeft: activeView === 'extensions' ? '2px solid var(--vscode-activity-bar-active-border)' : '2px solid transparent' }}>
                        <VscExtensions
                            size={24}
                            color={activeView === 'extensions' ? "var(--vscode-activity-bar-foreground)" : "var(--vscode-activity-bar-inactive-foreground)"}
                            onClick={() => setActiveView('extensions')}
                            title={t('sidebar.extensions')}
                        />
                    </div>
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer' }}>
                        <VscGithub
                            size={24}
                            color="var(--vscode-activity-bar-inactive-foreground)"
                            onClick={() => window.open('https://github.com/kanayai/karim_ai_website', '_blank')}
                            title="GitHub Repository"
                        />
                    </div>
                </div>
                <div className="d-flex flex-column gap-0 align-items-center">
                    <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer' }}>
                        <VscColorMode
                            size={24}
                            color="var(--vscode-activity-bar-inactive-foreground)"
                            onClick={toggleTheme}
                            title="Toggle Theme"
                        />
                    </div>

                    <div style={{ position: 'relative', width: '100%' }}>
                        <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer' }}>
                            <VscAccount
                                size={24}
                                color={showAccountsMenu ? "var(--vscode-activity-bar-foreground)" : "var(--vscode-activity-bar-inactive-foreground)"}
                                onClick={() => setShowAccountsMenu(!showAccountsMenu)}
                                title="Accounts"
                            />
                        </div>
                        {showAccountsMenu && (
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '48px',
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
                                    Find me on:
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

                    <div style={{ position: 'relative', width: '100%' }}>
                        <div className="d-flex justify-content-center py-3" style={{ width: '100%', cursor: 'pointer' }}>
                            <VscGear
                                size={24}
                                color={showSettingsMenu ? "var(--vscode-activity-bar-foreground)" : "var(--vscode-activity-bar-inactive-foreground)"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSettingsMenu(prev => !prev);
                                }}
                                title="Settings"
                            />
                        </div>
                        {showSettingsMenu && (
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '48px',
                                backgroundColor: 'var(--vscode-sidebar-bg)',
                                border: '1px solid var(--vscode-border)',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                                zIndex: 1000,
                                minWidth: '200px',
                                padding: '5px 0',
                                borderRadius: '5px',
                                color: 'var(--vscode-text)'
                            }}>
                                <div
                                    className="px-3 py-2 d-flex align-items-center justify-content-between"
                                    style={{ cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    onClick={() => {
                                        onSearchClick();
                                        setShowSettingsMenu(false);
                                    }}
                                >
                                    <span>Command Palette...</span>
                                    <span style={{ fontSize: '11px', opacity: 0.7 }}>⇧⌘P</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--vscode-border)', margin: '4px 0' }}></div>
                                <div
                                    className="px-3 py-2 d-flex align-items-center justify-content-between"
                                    style={{ cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    onClick={() => {
                                        toggleTheme();
                                        setShowSettingsMenu(false);
                                    }}
                                >
                                    <span>Color Theme</span>
                                    <span style={{ fontSize: '11px', opacity: 0.7 }}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--vscode-border)', margin: '4px 0' }}></div>
                                <div className="px-3 py-2" style={{ fontWeight: 'bold', fontSize: '12px', opacity: 0.8 }}>
                                    Language
                                </div>
                                {['en', 'es', 'fr', 'pt'].map(lang => (
                                    <div
                                        key={lang}
                                        className="px-3 py-2 d-flex align-items-center justify-content-between"
                                        style={{ cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover-bg)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        onClick={() => {
                                            i18n.changeLanguage(lang);
                                            setShowSettingsMenu(false);
                                        }}
                                    >
                                        <span className="text-uppercase">{lang}</span>
                                        {i18n.language === lang && <span>✓</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Content */}
            <div className="d-flex flex-column" style={{ width: '250px', backgroundColor: 'var(--vscode-sidebar-bg)', borderRight: '1px solid var(--vscode-border)' }}>
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
                            <div className="d-flex"><span style={{ color: '#9cdcfe' }}>currentRole</span>: <span style={{ color: '#ce9178' }}>"Senior Lecturer"</span></div>
                            <div className="d-flex"><span style={{ color: '#9cdcfe' }}>location</span>: <span style={{ color: '#ce9178' }}>"Bath, UK"</span></div>
                            <div className="d-flex"><span style={{ color: '#9cdcfe' }}>status</span>: <span style={{ color: '#ce9178' }}>"Open to collaborations"</span></div>
                            <div className="d-flex"><span style={{ color: '#9cdcfe' }}>coffeeLevel</span>: <span style={{ color: '#ce9178' }}>"High" ☕</span></div>
                            <div className="d-flex"><span style={{ color: '#9cdcfe' }}>publications</span>: <span style={{ color: '#b5cea8' }}>20+</span></div>
                        </div>

                        <div className="px-3 py-2 text-uppercase d-flex align-items-center" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--vscode-text)', backgroundColor: 'var(--vscode-sidebar-bg)', cursor: 'pointer', marginTop: '10px' }}>
                            <span><VscChevronDown className="me-1" /> {t('sidebar.unit_tests')}</span>
                        </div>
                        <div className="d-flex flex-column px-3 pb-2" style={{ fontSize: '13px', color: 'var(--vscode-text)', fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}>
                            <div className="d-flex align-items-center gap-2 mb-1"><span style={{ color: '#4caf50' }}>✅</span> <span>test_statistical_modelling</span></div>
                            <div className="d-flex align-items-center gap-2 mb-1"><span style={{ color: '#4caf50' }}>✅</span> <span>test_r_programming</span></div>
                            <div className="d-flex align-items-center gap-2 mb-1"><span style={{ color: '#4caf50' }}>✅</span> <span>test_python_development</span></div>
                            <div className="d-flex align-items-center gap-2 mb-1"><span style={{ color: '#4caf50' }}>✅</span> <span>test_teaching_excellence</span></div>
                            <div className="d-flex align-items-center gap-2 mb-1"><span style={{ color: '#4caf50' }}>✅</span> <span>test_machine_learning</span></div>
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
        </div>
    );
};

export default Sidebar;
