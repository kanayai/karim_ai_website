import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Statusbar from './Statusbar';
import CommandPalette from './CommandPalette';
import TitleBar from './TitleBar';
import Terminal from './Terminal';

const Layout = ({ children, activeFile, setActiveFile, theme, toggleTheme, isSidebarOpen, toggleSidebar }) => {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(true); // Default open for demo

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
            />
            <div className="main-container" style={{ position: 'relative' }}>
                <div className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <Sidebar
                        activeFile={activeFile}
                        setActiveFile={setActiveFile}
                        theme={theme}
                        toggleTheme={toggleTheme}
                        onSearchClick={() => setIsPaletteOpen(true)}
                    />
                </div>
                {/* Overlay for mobile when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        className="sidebar-overlay d-md-none"
                        onClick={toggleSidebar}
                    />
                )}

                <div className="d-flex flex-column flex-grow-1" style={{ overflow: 'hidden' }}>
                    {children}
                    {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
                </div>
            </div>
            <Statusbar
                activeFile={activeFile}
                isTerminalOpen={isTerminalOpen}
                toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
            />
        </div>
    );
};

export default Layout;
