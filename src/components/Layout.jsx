import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ActivityBar from './ActivityBar';
import Statusbar from './Statusbar';
import CommandPalette from './CommandPalette';
import TitleBar from './TitleBar';
import Terminal from './Terminal';
import OnboardingTip from './OnboardingTip';

const Layout = ({ children, activeFile, setActiveFile, theme, toggleTheme, setTheme, isSidebarOpen, toggleSidebar, simpleMode, toggleSimpleMode }) => {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false); // Default closed
    const [activeView, setActiveView] = useState('explorer');
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [terminalHeight, setTerminalHeight] = useState(220);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                setIsPaletteOpen(true);
            }
            // Toggle terminal with Ctrl+`
            if ((e.ctrlKey || e.metaKey) && e.key === '`') {
                e.preventDefault();
                setIsTerminalOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const handleToggleSidebar = () => toggleSidebar();
        const handleToggleTerminal = () => setIsTerminalOpen(prev => !prev);

        window.addEventListener('__toggle_sidebar__', handleToggleSidebar);
        window.addEventListener('__toggle_terminal__', handleToggleTerminal);

        return () => {
            window.removeEventListener('__toggle_sidebar__', handleToggleSidebar);
            window.removeEventListener('__toggle_terminal__', handleToggleTerminal);
        };
    }, [toggleSidebar]);

    const startSidebarResize = () => {
        const handlePointerMove = (event) => {
            const nextWidth = Math.max(220, Math.min(480, event.clientX - 48));
            setSidebarWidth(nextWidth);
        };

        const stopResize = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', stopResize);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', stopResize);
    };

    const startTerminalResize = () => {
        const handlePointerMove = (event) => {
            const nextHeight = Math.max(140, Math.min(420, window.innerHeight - event.clientY - 22));
            setTerminalHeight(nextHeight);
        };

        const stopResize = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', stopResize);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', stopResize);
    };

    return (
        <div className="vscode-app">
            <CommandPalette
                isOpen={isPaletteOpen}
                onClose={() => setIsPaletteOpen(false)}
                onNavigate={setActiveFile}
            />
            <OnboardingTip />
            <TitleBar
                onSearchClick={() => setIsPaletteOpen(true)}
                toggleSidebar={toggleSidebar}
                simpleMode={simpleMode}
                toggleSimpleMode={toggleSimpleMode}
                theme={theme}
                toggleTheme={toggleTheme}
            />
            <div className={`main-container ${simpleMode ? 'simple-mode' : ''}`} style={{ position: 'relative' }}>
                {/* Activity Bar - Always visible unless in Simple Mode */}
                {!simpleMode && (
                    <ActivityBar
                        activeView={activeView}
                        setActiveView={(view) => {
                            if (activeView === view) {
                                toggleSidebar();
                            } else {
                                setActiveView(view);
                                if (!isSidebarOpen) toggleSidebar();
                            }
                        }}
                        activeFile={activeFile}
                        setActiveFile={setActiveFile}
                        theme={theme}
                        toggleTheme={toggleTheme}
                        setTheme={setTheme}
                        onSearchClick={() => setIsPaletteOpen(true)}
                    />
                )}

                {/* Sidebar - Collapsible */}
                {!simpleMode && (
                    <div
                        className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}
                        style={{ width: isSidebarOpen ? `${sidebarWidth}px` : 0 }}
                    >
                        <Sidebar
                            activeFile={activeFile}
                            setActiveFile={setActiveFile}
                            activeView={activeView}
                            setActiveView={setActiveView}
                        />
                        <div
                            className="sidebar-resizer d-none d-md-block"
                            onPointerDown={startSidebarResize}
                            role="separator"
                            aria-orientation="vertical"
                            aria-label="Resize sidebar"
                        />
                    </div>
                )}

                {/* Overlay for mobile when sidebar is open (only if not in simple mode) */}
                {!simpleMode && isSidebarOpen && (
                    <div
                        className="sidebar-overlay d-md-none"
                        onClick={toggleSidebar}
                    />
                )}

                <div className="d-flex flex-column flex-grow-1" style={{ overflow: 'hidden' }}>
                    {children}
                    {!simpleMode && isTerminalOpen && (
                        <>
                            <div
                                className="panel-resizer d-none d-md-block"
                                onPointerDown={startTerminalResize}
                                role="separator"
                                aria-orientation="horizontal"
                                aria-label="Resize terminal panel"
                            />
                            <Terminal
                                onClose={() => setIsTerminalOpen(false)}
                                height={terminalHeight}
                            />
                        </>
                    )}
                </div>
            </div>
            {/* Statusbar - Always visible now, but simplified in Simple Mode */}
            <Statusbar
                activeFile={activeFile}
                isTerminalOpen={isTerminalOpen}
                toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
                simpleMode={simpleMode}
                toggleSimpleMode={toggleSimpleMode}
            />
        </div>
    );
};

export default Layout;
