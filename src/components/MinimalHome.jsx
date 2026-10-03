import React, { useEffect, useRef, useState } from 'react';
import './MinimalHome.css';
import { run, complete } from './minimalShell';

const entries = [
    { name: 'research/', file: 'projects.html', blurb: 'Projects, publications, PhD students', preview: '/previews/research.webp' },
    { name: 'teaching/', file: 'current_courses.ipynb', blurb: 'Courses, lecture materials, datasets', preview: '/previews/teaching.webp' },
    { name: 'bio/', file: 'wiki.html', blurb: 'Senior Lecturer in Statistics, Bath', preview: '/previews/bio.webp' },
    { name: 'journal/', file: 'blog.html', blurb: 'Notes and articles', preview: '/previews/journal.webp' },
    { name: 'workspace/', file: 'workspace.md', blurb: 'Tools and working setup', preview: '/previews/workspace.webp' },
    { name: 'contact/', file: 'contact.html', blurb: 'Get in touch', preview: '/previews/contact.webp' },
    { name: 'terminal/', file: 'terminal.html', blurb: 'The interactive shell', preview: '/previews/terminal.webp' },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function MinimalHome({ setActiveFile }) {
    const reduced = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const instant = reduced;

    const [command, setCommand] = useState('whois Karim');
    const [name, setName] = useState(instant ? 'Karim AI' : '');
    const [phase, setPhase] = useState(instant ? 'done' : 'typing'); // typing | done
    const [active, setActive] = useState(null);
    const skipRef = useRef(false);
    const inputRef = useRef(null);
    const rowRef = useRef(null);
    const [value, setValue] = useState('');
    const [blocks, setBlocks] = useState([]); // typed commands and their output
    const [cleared, setCleared] = useState(false);
    const [light, setLight] = useState(true);
    const [cmds, setCmds] = useState([]);
    const [cursor, setCursor] = useState(-1); // history position

    const renderList = (listId) => (
        <nav className="mh-ls" aria-label="Site sections">
            {entries.map((e, i) => (
                <a
                    key={e.file}
                    href={`#${e.file}`}
                    className={`mh-entry${active?.file === e.file && active?.listId === listId ? ' is-active' : ''}`}
                    style={{ animationDelay: `${instant ? 0 : i * 90}ms` }}
                    onClick={(ev) => onClick(ev, { ...e, listId })}
                    onMouseEnter={() => setActive({ ...e, listId })}
                    onFocus={() => setActive({ ...e, listId })}
                >
                    {e.name}
                </a>
            ))}
        </nav>
    );

    useEffect(() => {
        if (instant) return undefined;
        let cancelled = false;
        const type = async (text, set, base = '', delay = 70) => {
            for (let i = 1; i <= text.length; i++) {
                if (cancelled || skipRef.current) return;
                set(base + text.slice(0, i));
                await wait(delay + Math.random() * 40);
            }
        };
        const erase = async (from, to, set, delay = 45) => {
            for (let i = from.length; i >= to.length; i--) {
                if (cancelled || skipRef.current) return;
                set(from.slice(0, i));
                await wait(delay);
            }
        };
        (async () => {
            await wait(900);
            const full = 'Karim Anaya-Izquierdo';
            await type(full, setName, '', 55);
            await wait(900);
            await erase(full, 'Karim ', setName);
            await wait(250);
            await type('AI', setName, 'Karim ', 160);
            await wait(500);
            if (cancelled) return;
            finish();
        })();
        const finish = () => {
            setCommand('whois Karim');
            setName('Karim AI');
            setPhase('done');
        };
        const skip = () => {
            skipRef.current = true;
            finish();
        };
        window.addEventListener('keydown', skip);
        window.addEventListener('pointerdown', skip);
        return () => {
            cancelled = true;
            window.removeEventListener('keydown', skip);
            window.removeEventListener('pointerdown', skip);
        };
    }, [instant]);

    // After the intro, replay the Karim AI <-> full-name morph every 30 s.
    useEffect(() => {
        if (phase !== 'done' || reduced) return undefined;
        let cancelled = false;
        const step = async (text, set, base, delay) => {
            for (let i = 1; i <= text.length; i++) {
                if (cancelled) return;
                set(base + text.slice(0, i));
                await wait(delay);
            }
        };
        const unstep = async (from, to, set, delay) => {
            for (let i = from.length; i >= to.length; i--) {
                if (cancelled) return;
                set(from.slice(0, i));
                await wait(delay);
            }
        };
        (async () => {
            let first = instant; // intro already skipped/seen: morph straight away
            while (!cancelled) {
                await wait(first ? 600 : 30000);
                first = false;
                if (cancelled) return;
                await unstep('Karim AI', 'Karim ', setName, 90);
                await step('Anaya-Izquierdo', setName, 'Karim ', 55);
                await wait(900);
                await unstep('Karim Anaya-Izquierdo', 'Karim ', setName, 45);
                await wait(250);
                await step('AI', setName, 'Karim ', 160);
            }
        })();
        return () => { cancelled = true; };
    }, [phase, reduced, instant]);

    const onClick = (e, entry) => {
        e.preventDefault();
        setActiveFile(entry.file);
    };

    const done = phase === 'done';

    useEffect(() => {
        // Desktop only: on phones focusing would pop the keyboard.
        if (done && window.matchMedia('(hover: hover)').matches) inputRef.current?.focus();
    }, [done]);

    // Keep the prompt in view as output grows or the user types.
    useEffect(() => {
        rowRef.current?.scrollIntoView({ block: 'end', behavior: 'auto' });
    }, [blocks, value, done]);

    const submit = () => {
        const text = value;
        setValue('');
        setCursor(-1);
        const res = run(text, { entries, history: cmds, light });
        if (text.trim()) setCmds((c) => [...c, text.trim()]);
        if (res.action === 'clear') {
            setCleared(true);
            setBlocks([{ id: Date.now(), cmd: null, ls: true, out: [] }]); // list returns so nobody is lost
            return;
        }
        if (res.action === 'theme') setLight((l) => !l);
        setBlocks((b) => [...b, { id: Date.now() + b.length, cmd: text, out: res.out, art: res.art, ls: res.action === 'ls' }]);
        if (res.action?.open) setTimeout(() => setActiveFile(res.action.open.file), 350);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); submit(); }
        else if (e.key === 'Tab') {
            e.preventDefault();
            const c = complete(value, entries);
            if (c) setValue(c);
        } else if (e.key === 'ArrowUp' && cmds.length) {
            e.preventDefault();
            const n = cursor < 0 ? cmds.length - 1 : Math.max(0, cursor - 1);
            setCursor(n); setValue(cmds[n]);
        } else if (e.key === 'ArrowDown' && cursor >= 0) {
            e.preventDefault();
            const n = cursor + 1;
            if (n >= cmds.length) { setCursor(-1); setValue(''); } else { setCursor(n); setValue(cmds[n]); }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault(); setValue('clear');
        }
    };

    return (
        <main className={`mh-screen${light ? ' is-light' : ''}`} onClick={() => { if (done && !window.getSelection()?.toString()) inputRef.current?.focus(); }}>
            <div className="mh-body">
                {!cleared && (
                    <>
                        <p className="mh-line">
                            <span className="mh-prompt">karim@bath ~ %</span> {command}
                            {!done && !name && <span className="mh-cursor" />}
                        </p>
                        {name && (
                            <h1 className="mh-name">
                                {name}
                                {!done && <span className="mh-cursor" />}
                            </h1>
                        )}
                        {done && (
                            <>
                                <p className="mh-line">
                                    <span className="mh-prompt">karim@bath ~ %</span> ls
                                </p>
                                {renderList('initial')}
                            </>
                        )}
                    </>
                )}
                {done && blocks.map((b) => (
                    <div key={b.id}>
                        {b.cmd !== null && (
                            <p className="mh-line"><span className="mh-prompt">karim@bath ~ %</span> {b.cmd}</p>
                        )}
                        {b.ls && renderList(b.id)}
                        {b.out.length > 0 && <pre className={`mh-out${b.art ? ' mh-art' : ''}`}>{b.out.join('\n')}</pre>}
                    </div>
                ))}
                {done && (
                    <>
                        <label ref={rowRef} className="mh-line mh-line--end mh-input-row">
                            <span className="mh-prompt">karim@bath ~ %</span>
                            <input
                                ref={inputRef}
                                className="mh-input"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={onKeyDown}
                                aria-label="Terminal command"
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck={false}
                                enterKeyHint="go"
                            />
                        </label>
                        <p className="mh-hint">type <b>help</b> or click a folder</p>
                    </>
                )}
            </div>
        </main>
    );
}
