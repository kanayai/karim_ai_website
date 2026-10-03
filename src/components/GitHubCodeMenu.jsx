import React, { useEffect, useRef, useState } from 'react';
import { FaCode, FaCaretDown } from 'react-icons/fa';
import { VscCopy, VscCheck, VscQuestion, VscDesktopDownload, VscFileZip, VscRepoClone } from 'react-icons/vsc';

// The real repo behind this site, so clone / ZIP actually work.
const REPO = 'kanayai/karim_ai_website';
const CLONE = {
    https: { label: 'HTTPS', value: `https://github.com/${REPO}.git`, hint: 'Clone using the web URL.' },
    ssh: { label: 'SSH', value: `git@github.com:${REPO}.git`, hint: 'Use a password-protected SSH key.' },
    cli: { label: 'GitHub CLI', value: `gh repo clone ${REPO}`, hint: 'Work fast with our official CLI.' },
};

const GitHubCodeMenu = () => {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState('local');
    const [proto, setProto] = useState('https');
    const [copied, setCopied] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
        const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', close);
        document.addEventListener('keydown', esc);
        return () => {
            document.removeEventListener('mousedown', close);
            document.removeEventListener('keydown', esc);
        };
    }, [open]);

    const copy = () => {
        navigator.clipboard?.writeText(CLONE[proto].value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <div className="gh-code-menu" ref={ref}>
            <button className="gh-btn gh-btn-primary" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                <FaCode /> Code <FaCaretDown className="gh-caret" />
            </button>
            {open && (
                <div className="gh-code-panel" role="dialog" aria-label="Clone options">
                    <div className="gh-code-tabs">
                        <button className={tab === 'local' ? 'active' : ''} onClick={() => setTab('local')}>Local</button>
                        <button className={tab === 'spaces' ? 'active' : ''} onClick={() => setTab('spaces')}>Codespaces</button>
                    </div>
                    {tab === 'local' ? (
                        <>
                            <div className="gh-code-section">
                                <div className="gh-code-title"><VscRepoClone /> Clone <VscQuestion className="gh-code-help" /></div>
                                <div className="gh-code-protos">
                                    {Object.entries(CLONE).map(([k, c]) => (
                                        <button key={k} className={proto === k ? 'active' : ''} onClick={() => { setProto(k); setCopied(false); }}>{c.label}</button>
                                    ))}
                                </div>
                                <div className="gh-code-url">
                                    <input readOnly value={CLONE[proto].value} aria-label="Clone URL" onFocus={(e) => e.target.select()} />
                                    <button onClick={copy} aria-label="Copy to clipboard" title="Copy to clipboard">
                                        {copied ? <VscCheck className="gh-copied" /> : <VscCopy />}
                                    </button>
                                </div>
                                <p className="gh-code-hint">{CLONE[proto].hint}</p>
                            </div>
                            <a className="gh-code-item" href={`x-github-client://openRepo/https://github.com/${REPO}`}>
                                <VscDesktopDownload /> Open with GitHub Desktop
                            </a>
                            <a className="gh-code-item" href={`https://github.com/${REPO}/archive/refs/heads/main.zip`}>
                                <VscFileZip /> Download ZIP
                            </a>
                        </>
                    ) : (
                        <div className="gh-code-section gh-code-empty">
                            <div className="gh-code-title">Codespaces</div>
                            <p className="gh-code-hint">Your workspaces in the cloud</p>
                            <p className="gh-code-none"><strong>No codespaces</strong><br />You don&rsquo;t have any codespaces with this repository checked out</p>
                            <button className="gh-btn gh-btn-primary" disabled>Create codespace on main</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GitHubCodeMenu;
