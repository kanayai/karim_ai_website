import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Statusbar from './Statusbar';
import CommandPalette from './CommandPalette';
import TitleBar from './TitleBar';

const Layout = ({ children, activeFile, setActiveFile, theme, toggleTheme }) => {
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
            <TitleBar onSearchClick={() => setIsPaletteOpen(true)} />
            <div className="main-container">
                <Sidebar activeFile={activeFile} setActiveFile={setActiveFile} theme={theme} toggleTheme={toggleTheme} />
                {children}
            </div>
            <Statusbar />
        </div>
    );
};

export default Layout;
