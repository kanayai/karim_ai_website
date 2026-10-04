import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TerminalLayout.css';

const ASCII_LOGO = `
██╗  ██╗    █████╗ ██╗    ██████╗ ███████╗
██║ ██╔╝   ██╔══██╗██║   ██╔═══██╗██╔════╝
█████╔╝    ███████║██║   ██║   ██║███████╗
██╔═██╗    ██╔══██║██║   ██║   ██║╚════██║
██║  ██╗██╗██║  ██║██║   ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝    ╚═════╝ ╚══════╝
`;

const PAGES = {
    about: { file: 'wiki.html', desc: 'public profile (encyclopaedia layout)' },
    workspace: { file: 'workspace.md', desc: 'academic workbench (VS Code layout)' },
    research: { file: 'projects.html', desc: 'publications & active projects (GitHub layout)' },
    teaching: { file: 'current_courses.ipynb', desc: 'current & past courses (PyPI layout)' },
    blog: { file: 'blog.html', desc: 'the Quarto blog' },
};

const CONTACT_LINKS = [
    { label: 'Email ', text: 'kai21@bath.ac.uk', href: 'mailto:kai21@bath.ac.uk' },
    { label: 'ORCID ', text: 'orcid.org/0000-0001-9718-5256', href: 'https://orcid.org/0000-0001-9718-5256' },
    { label: 'GitHub', text: 'github.com/kanayai', href: 'https://github.com/kanayai' },
    { label: 'Bath  ', text: 'researchportal.bath.ac.uk', href: 'https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo' },
];

const COMMAND_NAMES = [
    'help', 'about', 'workspace', 'research', 'teaching', 'blog', 'wiki', 'contact', 'whoami',
    'ls', 'map', 'open', 'theme', 'fastfetch', 'history', 'date', 'echo', 'clear',
];

const bathUptime = () => {
    const start = new Date(2013, 8, 1); // September 2013, University of Bath
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    months = months % 12;
    return `${years} years, ${months} months`;
};

const QUICK_COMMANDS = ['about', 'workspace', 'research', 'teaching', 'blog', 'contact', 'help'];

const TerminalLayout = ({ setActiveFile, theme, toggleTheme }) => {
    const [history, setHistory] = useState([
        { text: 'Welcome to K.AI OS — the personal site of Karim Anaya-Izquierdo.', type: 'success' },
        { text: 'Type "map" to see the site structure, or tap a command below.', type: 'info' },
        { text: 'Logged in as guest@karim-anaya.io', type: 'dim' },
    ]);
    const [input, setInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [histIndex, setHistIndex] = useState(-1);
    const inputRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        // Autofocus only on desktop: on mobile it forces the keyboard open on load
        if (inputRef.current && window.innerWidth > 768) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleContainerClick = (e) => {
        if (e.target.closest('a, button')) return;
        if (window.getSelection && String(window.getSelection())) return;
        inputRef.current?.focus();
    };

    const print = useCallback((lines) => {
        setHistory(prev => [...prev, ...lines]);
    }, []);

    const openPage = (name) => {
        print([{ text: `Opening ${name} …`, type: 'success' }]);
        setTimeout(() => setActiveFile(PAGES[name].file), 500);
    };

    const runCommand = (cmdText) => {
        const raw = cmdText.trim();
        const parts = raw.split(/\s+/);
        const cmd = (parts[0] || '').toLowerCase();
        const args = parts.slice(1);

        print([{ text: raw, type: 'echo-prompt' }]);
        if (!raw) return;
        setCmdHistory(prev => [...prev, raw]);
        setHistIndex(-1);

        switch (cmd) {
            case 'help':
                print([
                    { text: 'Available commands:', type: 'success' },
                    { text: '  about       open the encyclopaedia-style profile', type: 'info' },
                    { text: '  workspace   open the VS Code academic workbench', type: 'info' },
                    { text: '  research    open publications and active projects', type: 'info' },
                    { text: '  teaching    open current and past courses', type: 'info' },
                    { text: '  blog        open the blog', type: 'info' },
                    { text: '  wiki        open the encyclopaedia-style profile', type: 'info' },
                    { text: '  contact     email, ORCID, GitHub, university profile', type: 'info' },
                    { text: '  whoami      one-line introduction', type: 'info' },
                    { text: '  ls          list available pages', type: 'info' },
                    { text: '  map         show how the site environments fit together', type: 'info' },
                    { text: '  theme       toggle the visual theme', type: 'info' },
                    { text: '  fastfetch   show profile stats', type: 'info' },
                    { text: '  clear       clear the screen', type: 'info' },
                    { text: 'Tips: Tab autocompletes, ↑/↓ recall previous commands.', type: 'dim' },
                ]);
                break;
            case 'about': case 'wiki': case 'wikipedia':
                openPage('about');
                break;
            case 'workspace': case 'workbench': case 'code':
                openPage('workspace');
                break;
            case 'research': case 'publications': case 'projects':
                openPage('research');
                break;
            case 'teaching': case 'courses':
                openPage('teaching');
                break;
            case 'blog':
                openPage('blog');
                break;
            case 'contact':
                print([
                    { text: 'Reach me at:', type: 'success' },
                    ...CONTACT_LINKS.map(l => ({ label: `  ${l.label}  `, text: l.text, href: l.href, type: 'link' })),
                ]);
                break;
            case 'whoami':
                print([
                    { text: 'Karim Anaya-Izquierdo — Senior Lecturer in Statistics, University of Bath.', type: 'info' },
                    { text: 'Information geometry · survival analysis · spatial epidemiology · Bayesian methods.', type: 'dim' },
                ]);
                break;
            case 'ls':
                print(Object.entries(PAGES).map(([name, p]) => (
                    { text: `  ${name.padEnd(10)} ${p.desc}`, type: 'info' }
                )));
                break;
            case 'map':
                print([
                    { text: 'K.AI OS map:', type: 'success' },
                    { text: '  Terminal   home base and command centre', type: 'info' },
                    { text: '  Wiki       factual public profile', type: 'info' },
                    { text: '  VS Code    academic workspace and working stack', type: 'info' },
                    { text: '  GitHub     research projects, publications and students', type: 'info' },
                    { text: '  PyPI       teaching materials and course packages', type: 'info' },
                    { text: '  Journal    blog posts and longer notes', type: 'info' },
                    { text: 'Use Back to OS from any environment to return here.', type: 'dim' },
                ]);
                break;
            case 'open':
                if (args[0] && PAGES[args[0].toLowerCase()]) {
                    openPage(args[0].toLowerCase());
                } else {
                    print([{ text: `usage: open <${Object.keys(PAGES).join('|')}>`, type: 'error' }]);
                }
                break;
            case 'theme':
                toggleTheme();
                print([{ text: 'Theme toggled.', type: 'success' }]);
                break;
            case 'fastfetch': case 'neofetch':
                print([
                    { text: 'karim@kai-os', type: 'success' },
                    { text: '------------', type: 'dim' },
                    { text: `Role:      Senior Lecturer in Statistics`, type: 'info' },
                    { text: `Host:      University of Bath, Dept of Mathematical Sciences`, type: 'info' },
                    { text: `Uptime:    ${bathUptime()} at Bath`, type: 'info' },
                    { text: `Research:  information geometry · UQ · survival · spatial epi`, type: 'info' },
                    { text: `Stack:     R (tidyverse) · Python · Quarto · LaTeX`, type: 'info' },
                    { text: `Shell:     zsh 5.9 · Terminal: Ghostty (Web App)`, type: 'info' },
                    { text: `Theme:     ${theme}`, type: 'info' },
                ]);
                break;
            case 'history':
                print(cmdHistory.map((c, i) => ({ text: `  ${String(i + 1).padStart(3)}  ${c}`, type: 'dim' })));
                break;
            case 'date':
                print([{ text: new Date().toString(), type: 'info' }]);
                break;
            case 'echo':
                print([{ text: args.join(' '), type: 'info' }]);
                break;
            case 'sudo':
                print([{ text: 'guest is not in the sudoers file. This incident will be reported.', type: 'error' }]);
                break;
            case 'clear':
                setHistory([]);
                break;
            default:
                print([{ text: `zsh: command not found: ${cmd} — type "help" for a list of commands.`, type: 'error' }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        runCommand(input);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!cmdHistory.length) return;
            const next = histIndex < 0 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
            setHistIndex(next);
            setInput(cmdHistory[next]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (histIndex < 0) return;
            const next = histIndex + 1;
            if (next >= cmdHistory.length) {
                setHistIndex(-1);
                setInput('');
            } else {
                setHistIndex(next);
                setInput(cmdHistory[next]);
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const stem = input.trim().toLowerCase();
            if (!stem) return;
            const matches = COMMAND_NAMES.filter(c => c.startsWith(stem));
            if (matches.length === 1) {
                setInput(matches[0] + ' ');
            } else if (matches.length > 1) {
                print([{ text: matches.join('   '), type: 'dim' }]);
            }
        }
    };

    const renderLine = (line, idx) => {
        if (line.type === 'echo-prompt') {
            return (
                <div key={idx} className="terminal-output-line type-echo">
                    <span className="echo-user">guest</span>
                    <span className="echo-at">@</span>
                    <span className="echo-host">karim-anaya.io</span>
                    <span className="echo-dir"> ~</span>
                    <span className="echo-chevron"> ❯ </span>
                    {line.text}
                </div>
            );
        }
        if (line.type === 'link') {
            return (
                <div key={idx} className="terminal-output-line type-info">
                    {line.label}
                    <a className="terminal-link" href={line.href} target="_blank" rel="noreferrer">{line.text}</a>
                </div>
            );
        }
        return (
            <div key={idx} className={`terminal-output-line type-${line.type}`}>
                {line.text}
            </div>
        );
    };

    return (
        <div className="terminal-backdrop">
            <div className="terminal-window" onClick={handleContainerClick}>
                <div className="crt-overlay" />
                <header className="terminal-layout-header">
                    <div className="traffic-lights">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                    </div>
                    <span className="terminal-window-title">guest@karim-anaya.io — zsh</span>
                    <nav className="terminal-nav-links">
                        <button className="nav-btn" onClick={() => runCommand('about')}>About</button>
                        <button className="nav-btn" onClick={() => runCommand('research')}>Research</button>
                        <button className="nav-btn" onClick={() => runCommand('teaching')}>Teaching</button>
                        <button className="nav-btn" onClick={() => runCommand('theme')}>Theme</button>
                    </nav>
                </header>

                <div className="terminal-layout-body" ref={bodyRef}>
                    <div className="terminal-hero">
                        <pre className="ascii-logo" aria-label="K.AI OS">{ASCII_LOGO}</pre>
                        <div className="fastfetch-block">
                            <div className="fastfetch-title">karim@kai-os</div>
                            <div className="fastfetch-divider" />
                            <dl className="fastfetch-list">
                                <div><dt>Name</dt><dd>Karim Anaya-Izquierdo</dd></div>
                                <div><dt>Role</dt><dd>Senior Lecturer in Statistics</dd></div>
                                <div><dt>Host</dt><dd>University of Bath — Mathematical Sciences</dd></div>
                                <div><dt>Uptime</dt><dd>{bathUptime()} at Bath</dd></div>
                                <div><dt>Research</dt><dd>info geometry · UQ · survival · spatial epi</dd></div>
                                <div><dt>Stack</dt><dd>R (tidyverse) · Python · Quarto · LaTeX</dd></div>
                                <div><dt>Shell</dt><dd>zsh 5.9 · Ghostty (Web App)</dd></div>
                                <div><dt>Page</dt><dd className="ff-accent">Welcome (Terminal Layout)</dd></div>
                            </dl>
                            <div className="fastfetch-palette" aria-hidden="true">
                                {['#0c0c0c', '#ff5f56', '#4af626', '#ffb000', '#00b0ff', '#c678dd', '#56b6c2', '#dcdcdc'].map(c => (
                                    <span key={c} style={{ backgroundColor: c }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="history-console">
                        {history.map(renderLine)}
                    </div>

                    <form onSubmit={handleSubmit} className="terminal-input-line">
                        <div className="prompt-meta">
                            <span className="echo-user">guest</span>
                            <span className="echo-at">@</span>
                            <span className="echo-host">karim-anaya.io</span>
                            <span className="echo-dir"> ~</span>
                            <span className="prompt-branch"> ⎇ main</span>
                        </div>
                        <div className="prompt-entry">
                            <span className="echo-chevron">❯</span>
                            <input
                                type="text"
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="terminal-command-input"
                                aria-label="Terminal command input"
                                autoComplete="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                enterKeyHint="go"
                            />
                        </div>
                    </form>

                    <div className="quick-commands" role="toolbar" aria-label="Quick commands">
                        {QUICK_COMMANDS.map(c => (
                            <button key={c} className="chip" onClick={() => runCommand(c)}>{c}</button>
                        ))}
                        <button className="chip chip-alt" onClick={() => runCommand('map')}>map</button>
                        <button className="chip chip-alt" onClick={() => runCommand('theme')}>theme</button>
                        <button className="chip chip-alt" onClick={() => runCommand('clear')}>clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalLayout;
