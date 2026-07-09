import React, { useState, useEffect, useRef } from 'react';
import './TerminalLayout.css';

const TerminalLayout = ({ activeFile, setActiveFile, theme, toggleTheme }) => {
    const [history, setHistory] = useState([
        { text: 'Type "help" to see list of available commands.', type: 'info' },
        { text: 'Welcome to K.A.I. O.S. (Karim Anaya-Izquierdo Operating System)', type: 'success' },
        { text: 'Logged in as guest@karim-anaya.io', type: 'dim' },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const asciiLogo = `
██╗  ██╗    █████╗ ██╗     ██████╗ ███████╗
██║ ██╔╝   ██╔══██╗██║    ██╔═══██╗██╔════╝
█████╔╝    ███████║██║    ██║   ██║███████╗
██╔═██╗    ██╔══██║██║    ██║   ██║╚════██║
██║  ██╗██╗██║  ██║██║    ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝     ╚═════╝ ╚══════╝
`;

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const runCommand = (cmdText) => {
        const trimmed = cmdText.trim().toLowerCase();
        const parts = trimmed.split(' ');
        const mainCommand = parts[0];

        setHistory(prev => [...prev, { text: `guest@karim-anaya.io ~ % ${cmdText}`, type: 'prompt' }]);

        if (!trimmed) return;

        switch (mainCommand) {
            case 'help':
                setHistory(prev => [
                    ...prev,
                    { text: 'Available commands:', type: 'success' },
                    { text: '  about      - View biographical details, education, CV (opens VS Code layout)', type: 'info' },
                    { text: '  research   - View publications, active projects (opens GitHub layout)', type: 'info' },
                    { text: '  teaching   - View current and past courses (opens PyPI layout)', type: 'info' },
                    { text: '  blog       - Open the Quarto blog', type: 'info' },
                    { text: '  theme      - Toggle website visual theme', type: 'info' },
                    { text: '  fastfetch  - Show system and profile stats', type: 'info' },
                    { text: '  clear      - Clear the screen', type: 'info' }
                ]);
                break;
            case 'about':
            case 'cv':
            case 'bio':
                setHistory(prev => [...prev, { text: 'Loading profile in VS Code environment...', type: 'success' }]);
                setTimeout(() => setActiveFile('about_me.md'), 600);
                break;
            case 'research':
            case 'publications':
            case 'projects':
                setHistory(prev => [...prev, { text: 'Loading repository files in GitHub environment...', type: 'success' }]);
                setTimeout(() => setActiveFile('projects.html'), 600);
                break;
            case 'teaching':
            case 'courses':
                setHistory(prev => [...prev, { text: 'Loading package installation in PyPI environment...', type: 'success' }]);
                setTimeout(() => setActiveFile('current_courses.ipynb'), 600);
                break;
            case 'blog':
                setHistory(prev => [...prev, { text: 'Opening blog view...', type: 'success' }]);
                setTimeout(() => setActiveFile('blog.html'), 600);
                break;
            case 'theme':
                toggleTheme();
                setHistory(prev => [...prev, { text: 'Theme toggled successfully.', type: 'success' }]);
                break;
            case 'clear':
                setHistory([]);
                break;
            case 'fastfetch':
            case 'neofetch':
                setHistory(prev => [
                    ...prev,
                    { text: 'Refreshing system metrics...', type: 'success' },
                    { text: 'OS: macOS Sequoia 15.0', type: 'info' },
                    { text: 'Host: Karim\'s Portfolio Computer', type: 'info' },
                    { text: 'Kernel: Darwin 24.0.0', type: 'info' },
                    { text: 'Shell: zsh 5.9', type: 'info' },
                    { text: 'Terminal: Ghostty (Web Edition)', type: 'info' },
                    { text: `Theme: ${theme}`, type: 'info' },
                    { text: 'AI Agent: Gemini Antigravity', type: 'info' }
                ]);
                break;
            default:
                setHistory(prev => [
                    ...prev,
                    { text: `zsh: command not found: ${mainCommand}. Type "help" for a list of commands.`, type: 'error' }
                ]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        runCommand(input);
        setInput('');
    };

    return (
        <div className="terminal-layout-wrapper" onClick={handleContainerClick}>
            <div className="crt-overlay" />
            <div className="terminal-layout-header d-flex align-items-center justify-content-between px-3 py-2">
                <div className="d-flex align-items-center gap-2">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                    <span className="ms-2 terminal-window-title">zsh — guest@karim-anaya.io (Ghostty) (Active File: {activeFile})</span>
                </div>
                <div className="d-flex gap-3 align-items-center terminal-nav-links">
                    <button className="nav-btn" onClick={() => runCommand('about')}>About</button>
                    <button className="nav-btn" onClick={() => runCommand('research')}>Research</button>
                    <button className="nav-btn" onClick={() => runCommand('teaching')}>Teaching</button>
                    <button className="nav-btn" onClick={() => runCommand('theme')}>Toggle Theme</button>
                </div>
            </div>

            <div className="terminal-layout-body p-3 p-md-4" ref={containerRef}>
                <div className="row g-4 align-items-start mb-4">
                    <div className="col-xl-6 col-lg-7">
                        <pre className="ascii-logo text-warning">{asciiLogo}</pre>
                    </div>
                    <div className="col-xl-6 col-lg-5">
                        <div className="fastfetch-block p-3 rounded">
                            <div className="fastfetch-title text-success">karim@kai-os</div>
                            <div className="fastfetch-divider">----------------------</div>
                            <div className="d-flex flex-column gap-1 fastfetch-list">
                                <div><span className="ff-key">OS:</span> <span className="ff-val">macOS Sequoia 15.0</span></div>
                                <div><span className="ff-key">Host:</span> <span className="ff-val">Karim's Mac Hub</span></div>
                                <div><span className="ff-key">Kernel:</span> <span className="ff-val">Darwin 24.0.0</span></div>
                                <div><span className="ff-key">Uptime:</span> <span className="ff-val">9 days, 4 hours, 12 mins</span></div>
                                <div><span className="ff-key">Shell:</span> <span className="ff-val">zsh 5.9</span></div>
                                <div><span className="ff-key">Terminal:</span> <span className="ff-val">Ghostty (Web App)</span></div>
                                <div><span className="ff-key">AI System:</span> <span className="ff-val">Gemini Antigravity</span></div>
                                <div><span className="ff-key">Active Page:</span> <span className="ff-val text-warning">Welcome (Terminal Layout)</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="history-console d-flex flex-column gap-1 mb-3">
                    {history.map((line, idx) => (
                        <div key={idx} className={`terminal-output-line type-${line.type}`}>
                            {line.text}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="d-flex align-items-center terminal-input-line">
                    <span className="terminal-prompt">guest@karim-anaya.io ~ % </span>
                    <input
                        type="text"
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow-1 terminal-command-input"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};

export default TerminalLayout;
