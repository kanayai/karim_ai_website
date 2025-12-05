import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ActivityBar from './ActivityBar';
import Statusbar from './Statusbar';
import CommandPalette from './CommandPalette';
import TitleBar from './TitleBar';
import Terminal from './Terminal';

const Layout = ({ children, activeFile, setActiveFile, theme, toggleTheme, setTheme, isSidebarOpen, toggleSidebar, simpleMode, toggleSimpleMode }) => {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false); // Default closed
    const [activeView, setActiveView] = useState('explorer');

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

    return (
        <div className="vscode-app">
            <CommandPalette
                isOpen={isPaletteOpen}
                onClose={() => setIsPaletteOpen(false)}
                onNavigate={setActiveFile}
            />
            <TitleBar
                onSearchClick={() => setIsPaletteOpen(true)}
                toggleSidebar={toggleSidebar}
                simpleMode={simpleMode}
                toggleSimpleMode={toggleSimpleMode}
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
                    <div className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
                        <Sidebar
                            activeFile={activeFile}
                            setActiveFile={setActiveFile}
                            activeView={activeView}
                            setActiveView={setActiveView}
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
                    {/* Hide Terminal in Simple Mode */}
                    {!simpleMode && isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
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
