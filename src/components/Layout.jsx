import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Statusbar from './Statusbar';
import CommandPalette from './CommandPalette';
import TitleBar from './TitleBar';

const Layout = ({ children, activeFile, setActiveFile, theme, toggleTheme, isSidebarOpen, toggleSidebar }) => {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                setIsPaletteOpen(true);
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
                {children}
            </div>
            <Statusbar />
        </div>
    );
};

export default Layout;
