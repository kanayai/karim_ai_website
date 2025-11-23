import React from 'react';
import { VscArrowLeft, VscArrowRight, VscSearch, VscLayoutSidebarLeft, VscLayoutSidebarRight, VscLayoutPanel, VscMenu } from 'react-icons/vsc';

const TitleBar = ({ onSearchClick, toggleSidebar }) => {
    return (
        <div className="d-flex align-items-center justify-content-between px-2"
            style={{
                height: '35px',
                backgroundColor: 'var(--vscode-activity-bar-bg)',
                borderBottom: '1px solid var(--vscode-border)',
                userSelect: 'none'
            }}>

            {/* Left: Menu (Mobile only) */}
            <div className="d-flex align-items-center">
                <VscMenu
                    className="d-md-none"
                    size={18}
                    color="var(--vscode-text)"
                    style={{ cursor: 'pointer' }}
                    onClick={toggleSidebar}
                />
            </div>

            {/* Center: Navigation Controls & Search */}
            <div className="position-absolute start-50 translate-middle-x d-flex align-items-center gap-3">
                <div className="d-flex gap-2 align-items-center">
                    <VscArrowLeft className="nav-icon" size={16} color="var(--vscode-text)" style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                    <VscArrowRight className="nav-icon" size={16} color="var(--vscode-text)" style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                </div>

                {/* Search / Command Palette Trigger */}
                <div
                    className="d-flex align-items-center px-2 rounded"
                    style={{
                        backgroundColor: 'var(--vscode-bg)',
                        border: '1px solid var(--vscode-border)',
                        width: '400px',
                        height: '24px',
                        cursor: 'pointer',
                        color: 'var(--vscode-text)',
                        opacity: 0.8
                    }}
                    onClick={onSearchClick}
                >
                    <VscSearch size={14} className="me-2" />
                    <span style={{ fontSize: '12px' }}>search site</span>
                </div>
            </div>

            {/* Right: Layout Controls */}
            <div className="d-flex gap-3">
                <VscLayoutSidebarLeft size={16} color="var(--vscode-text)" style={{ cursor: 'pointer' }} />
                <VscLayoutPanel size={16} color="var(--vscode-text)" style={{ cursor: 'pointer' }} />
                <VscLayoutSidebarRight size={16} color="var(--vscode-text)" style={{ cursor: 'pointer' }} />
            </div>
        </div>
    );
};

export default TitleBar;
