import React, { useEffect, useRef, useState } from 'react';
import './MinimalHome.css';
import { run, complete } from './minimalShell';
import useSiteMode from '../hooks/useSiteMode';
import { pathForFile } from '../routes';

const entries = [
    { name: 'research/', file: 'projects.html', blurb: 'Projects, publications, PhD students', preview: '/previews/research.webp' },
    { name: 'teaching/', file: 'current_courses.ipynb', blurb: 'Courses and Moodle links', preview: '/previews/teaching.webp' },
    { name: 'bio/', file: 'wiki.html', blurb: 'Senior Lecturer in Statistics, Bath', preview: '/previews/bio.webp' },
    { name: 'journal/', file: 'blog.html', blurb: 'Notes and articles', preview: '/previews/journal.webp' },
    { name: 'workspace/', file: 'workspace.md', blurb: 'Tools and working setup', preview: '/previews/workspace.webp' },
    { name: 'contact/', file: 'contact.html', blurb: 'Get in touch', preview: '/previews/contact.webp' },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const FULL_NAME = 'Karim Anaya-Izquierdo';

export default function MinimalHome({ setActiveFile }) {
    const reduced = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const instant = reduced;

    const command = 'whois Karim';
    const [name, setName] = useState(FULL_NAME);
    const [phase, setPhase] = useState(instant ? 'done' : 'intro'); // intro | done
    const [active, setActive] = useState(null);
    const inputRef = useRef(null);
    const rowRef = useRef(null);
    const [value, setValue] = useState('');
    const [blocks, setBlocks] = useState([]); // typed commands and their output
    const [morphKey, setMorphKey] = useState(0); // bumped by `clear` to replay the name morph
    const [siteMode, setSiteModeValue] = useSiteMode();
    const light = siteMode === 'light';
    const setLight = (fn) => setSiteModeValue((typeof fn === 'function' ? fn(light) : fn) ? 'light' : 'dark');
    const [cmds, setCmds] = useState([]);
    const [cursor, setCursor] = useState(-1); // history position

    const renderList = (listId) => (
        <nav className="mh-ls" aria-label="Site sections">
            {entries.map((e, i) => (
                <a
                    key={e.file}
                    href={pathForFile(e.file)}
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

    // Identity shows at once; the folder list follows after a short beat (any key/tap skips it).
    useEffect(() => {
        if (instant) return undefined;
        const finish = () => setPhase('done');
        const timer = setTimeout(finish, 450);
        window.addEventListener('keydown', finish);
        window.addEventListener('pointerdown', finish);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', finish);
            window.removeEventListener('pointerdown', finish);
        };
    }, [instant]);

    // ~2 s after load, then every 10 s, the name briefly morphs to "Karim AI" and back.
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
            let delay = morphKey > 0 ? 600 : 2000; // after `clear`, straight away
            while (!cancelled) {
                await wait(delay);
                if (cancelled) return;
                const started = Date.now();
                await unstep(FULL_NAME, 'Karim ', setName, 45);
                await step('AI', setName, 'Karim ', 160);
                await wait(1500);
                await unstep('Karim AI', 'Karim ', setName, 90);
                await step('Anaya-Izquierdo', setName, 'Karim ', 55);
                delay = Math.max(0, 10000 - (Date.now() - started)); // 10 s start to start
            }
        })();
        return () => { cancelled = true; };
    }, [phase, reduced, morphKey]);

    const onClick = (e, entry) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab etc.
        e.preventDefault();
        setActiveFile(entry.file);
    };

    const done = phase === 'done';

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
            // Back to the opening screen (command history is kept).
            setBlocks([]);
            setActive(null);
            setName(FULL_NAME);
            setMorphKey((k) => k + 1);
            return;
        }
        if (res.action === 'theme') setLight((l) => !l);
        // Open synchronously, inside the keypress, so popup blockers allow it.
        if (res.action?.url) window.open(res.action.url, '_blank', 'noopener');
        const id = Date.now();
        setBlocks((b) => [...b, { id, cmd: text, out: res.out, art: res.art, ls: res.action === 'ls' }]);
        if (res.action?.fetch) {
            const setOut = (out) => setBlocks((b) => b.map((x) => (x.id === id ? { ...x, out } : x)));
            setOut(['  % Total    % Received   Time', '  …']);
            fetch(res.action.fetch, { signal: AbortSignal.timeout(8000) })
                .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
                .then((t) => setOut(t.replace(/\n+$/, '').split('\n')))
                .catch(() => setOut([`curl: (7) Failed to connect to ${res.action.host}`]));
        }
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
                <p className="mh-line">
                    <span className="mh-prompt">karim@bath ~ %</span> {command}
                </p>
                {/* whois-style record: aligned "Field: value" lines, as real whois prints them. */}
                <div className="mh-whois">
                    <span className="mh-key">Name:</span>
                    <h1 className="mh-name" aria-label={FULL_NAME}>{name}</h1>
                    <span className="mh-key">Role:</span>
                    <span>Senior Lecturer in Statistics</span>
                    <span className="mh-key">Organisation:</span>
                    <span>University of Bath</span>
                </div>
                {done && (
                    <>
                        <p className="mh-line">
                            <span className="mh-prompt">karim@bath ~ %</span> ls
                            <span className="mh-comment">  # choose a section</span>
                        </p>
                        {renderList('initial')}
                    </>
                )}
                {/* Screen readers hear each command's output as it appears; ASCII art is skipped. */}
                {done && (
                    <div aria-live="polite">
                        {blocks.map((b) => (
                            <div key={b.id}>
                                {b.cmd !== null && (
                                    <p className="mh-line"><span className="mh-prompt">karim@bath ~ %</span> {b.cmd}</p>
                                )}
                                {b.ls && renderList(b.id)}
                                {b.out.length > 0 && (
                                    <pre className={`mh-out${b.art ? ' mh-art' : ''}`} aria-hidden={b.art || undefined}>{b.out.join('\n')}</pre>
                                )}
                            </div>
                        ))}
                    </div>
                )}
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
