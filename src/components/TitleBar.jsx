import React from 'react';
import { VscArrowLeft, VscArrowRight, VscSearch, VscLayoutSidebarLeft, VscLayoutSidebarRight, VscLayoutPanel, VscMenu, VscBook } from 'react-icons/vsc';

const TitleBar = ({ onSearchClick, toggleSidebar, simpleMode, toggleSimpleMode }) => {
    return (
        <div className="d-flex align-items-center justify-content-between px-2 title-bar"
            style={{
                height: '35px',
                flexShrink: 0,
                background: 'var(--vscode-titlebar-gradient)',
                backgroundColor: 'var(--vscode-activity-bar-bg)',
                borderBottom: '1px solid var(--vscode-border)',
                userSelect: 'none'
            }}>

            {/* Left: Menu (Mobile only) - Hide in Simple Mode if desired, or keep for basic nav */}
            <div className="d-flex align-items-center">
                {!simpleMode && (
                    <>
                        <VscMenu
                            className="d-md-none"
                            size={18}
                            color="var(--vscode-text)"
                            style={{ cursor: 'pointer' }}
                            onClick={toggleSidebar}
                        />
                        <span
                            className="d-md-none ms-2"
                            style={{
                                fontSize: '12px',
                                color: 'var(--vscode-text)',
                                cursor: 'pointer'
                            }}
                            onClick={toggleSidebar}
                        >
                            Menu
                        </span>
                    </>
                )}
                {simpleMode && (
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--vscode-text)' }}>Karim AI</span>
                )}
            </div>

            {/* Center: Navigation Controls & Search */}
            <div className="position-absolute start-50 translate-middle-x d-flex align-items-center gap-3">
                <div className="d-flex gap-2 align-items-center">
                    <VscArrowLeft className="nav-icon" size={16} color="var(--vscode-text)" style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                    <VscArrowRight className="nav-icon" size={16} color="var(--vscode-text)" style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                </div>

                {/* Search / Command Palette Trigger */}
                <div
                    className="command-palette-trigger d-flex align-items-center px-2 rounded"
                    style={{
                        backgroundColor: 'var(--vscode-bg)',
                        border: '1px solid var(--vscode-border)',
                        height: '24px',
                        width: '400px',
                        maxWidth: '50vw',
                        cursor: 'pointer',
                        color: 'var(--vscode-text)',
                        opacity: 0.8
                    }}
                    onClick={onSearchClick}
                >
                    <VscSearch size={14} className="me-2" />
                    <span style={{ fontSize: '12px' }}>{simpleMode ? 'search...' : 'search site'}</span>
                </div>
            </div>

            {/* Right: Layout Controls */}
            <div className="d-flex gap-3 align-items-center">
                {!simpleMode && (
                    <>
                        <VscLayoutSidebarLeft size={16} color="var(--vscode-text)" style={{ cursor: 'pointer' }} />
                        <VscLayoutPanel size={16} color="var(--vscode-text)" style={{ cursor: 'pointer' }} />
                        <VscLayoutSidebarRight size={16} color="var(--vscode-text)" style={{ cursor: 'pointer' }} />
                    </>
                )}
            </div>
        </div>
    );
};

export default TitleBar;
