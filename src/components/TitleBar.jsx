import React from 'react';
import { VscArrowLeft, VscArrowRight, VscSearch, VscLayoutSidebarLeft, VscLayoutSidebarRight, VscLayoutPanel, VscMenu, VscColorMode, VscChromeMinimize, VscChromeMaximize, VscChromeClose } from 'react-icons/vsc';

const TitleBar = ({ onSearchClick, toggleSidebar, simpleMode, toggleSimpleMode, theme, toggleTheme }) => {
    const commandLabel = simpleMode ? 'Search' : 'Search';

    return (
        <div className="title-bar d-flex align-items-center justify-content-between px-2" data-tauri-drag-region="">
            <div className="d-flex align-items-center titlebar-left">
                <div className="titlebar-window-controls d-none d-md-flex" aria-hidden="true">
                    <span className="titlebar-window-button">
                        <VscChromeMinimize size={14} />
                    </span>
                    <span className="titlebar-window-button">
                        <VscChromeMaximize size={12} />
                    </span>
                    <span className="titlebar-window-button close">
                        <VscChromeClose size={13} />
                    </span>
                </div>

                {!simpleMode && (
                    <>
                        <VscMenu
                            className="d-md-none titlebar-icon-button"
                            size={18}
                            onClick={toggleSidebar}
                        />
                        <span
                            className="d-md-none ms-2 titlebar-caption"
                            onClick={toggleSidebar}
                        >
                            Menu
                        </span>
                    </>
                )}
                <span className="titlebar-app-name">karim_ai_website</span>
            </div>

            <div className="titlebar-center">
                <div className="d-flex gap-1 align-items-center">
                    <button className="titlebar-icon-button nav-icon" type="button" aria-label="Back" disabled>
                        <VscArrowLeft size={16} />
                    </button>
                    <button className="titlebar-icon-button nav-icon" type="button" aria-label="Forward" disabled>
                        <VscArrowRight size={16} />
                    </button>
                </div>

                <div
                    className="command-palette-trigger titlebar-command d-flex align-items-center px-2 rounded"
                    onClick={onSearchClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onSearchClick();
                        }
                    }}
                >
                    <VscSearch size={14} className="me-2" />
                    <span className="titlebar-command-label">{commandLabel}</span>
                    <span className="titlebar-command-shortcut d-none d-md-inline">⇧⌘P</span>
                </div>
            </div>

            <div className="d-flex gap-1 align-items-center titlebar-right">
                <div
                    onClick={toggleTheme}
                    className="titlebar-icon-button"
                    title={`Switch to ${theme?.includes('light') ? 'Dark' : 'Light'} Mode`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            toggleTheme();
                        }
                    }}
                >
                    <VscColorMode size={16} />
                </div>
                {!simpleMode && (
                    <>
                        <div className="titlebar-icon-button" title="Toggle Primary Side Bar" role="button" tabIndex={0} onClick={toggleSidebar}>
                            <VscLayoutSidebarLeft size={16} />
                        </div>
                        <div className="titlebar-icon-button" title={simpleMode ? 'Exit Reader Mode' : 'Enter Reader Mode'} role="button" tabIndex={0} onClick={toggleSimpleMode}>
                            <VscLayoutPanel size={16} />
                        </div>
                        <div className="titlebar-icon-button" title="Secondary Side Bar" aria-hidden="true">
                            <VscLayoutSidebarRight size={16} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TitleBar;
