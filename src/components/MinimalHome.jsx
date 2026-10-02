import React, { useEffect, useRef, useState } from 'react';
import './MinimalHome.css';

const entries = [
    { name: 'research/', file: 'projects.html', blurb: 'Projects, publications, PhD students', preview: '/previews/research.webp' },
    { name: 'teaching/', file: 'current_courses.ipynb', blurb: 'Courses, lecture materials, datasets', preview: '/previews/teaching.webp' },
    { name: 'bio/', file: 'wiki.html', blurb: 'Senior Lecturer in Statistics, Bath', preview: '/previews/bio.webp' },
    { name: 'journal/', file: 'blog.html', blurb: 'Notes and articles', preview: '/previews/journal.webp' },
    { name: 'workspace/', file: 'workspace.md', blurb: 'Tools and working setup', preview: '/previews/workspace.webp' },
    { name: 'contact/', file: 'contact.html', blurb: 'Get in touch', preview: '/previews/contact.webp' },
    { name: 'terminal/', file: 'terminal.html', blurb: 'The interactive shell', preview: '/previews/terminal.webp' },
];

const SEEN_KEY = 'minimal-home-seen';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const readSeen = () => {
    try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
};
const writeSeen = () => {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
};

export default function MinimalHome({ setActiveFile }) {
    const reduced = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const instant = reduced || readSeen();

    const [command, setCommand] = useState(instant ? 'whoami' : '');
    const [name, setName] = useState(instant ? 'Karim AI' : '');
    const [phase, setPhase] = useState(instant ? 'done' : 'typing'); // typing | done
    const [active, setActive] = useState(null);
    const [armed, setArmed] = useState(null); // touch: first tap previews
    const skipRef = useRef(false);

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
            await wait(500);
            await type('whoami', setCommand, '', 90);
            await wait(350);
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
            setCommand('whoami');
            setName('Karim AI');
            setPhase('done');
            writeSeen();
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

    const onClick = (e, entry) => {
        const touch = window.matchMedia('(hover: none)').matches;
        e.preventDefault();
        if (touch && armed !== entry.file) {
            setArmed(entry.file);
            setActive(entry);
            return;
        }
        setActiveFile(entry.file);
    };

    const done = phase === 'done';

    return (
        <main className="mh-screen">
            <div className="mh-body">
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
                            <nav className="mh-ls" aria-label="Site sections">
                                {entries.map((e, i) => (
                                    <a
                                        key={e.file}
                                        href={`#${e.file}`}
                                        className={`mh-entry${active?.file === e.file ? ' is-active' : ''}`}
                                        style={{ animationDelay: `${instant ? 0 : i * 90}ms` }}
                                        onClick={(ev) => onClick(ev, e)}
                                        onMouseEnter={() => setActive(e)}
                                        onFocus={() => setActive(e)}
                                    >
                                        {e.name}
                                    </a>
                                ))}
                            </nav>
                            <p className="mh-line mh-line--end">
                                <span className="mh-prompt">karim@bath ~ %</span>
                                <span className="mh-cursor mh-cursor--blink" />
                            </p>
                        </>
                    )}
            </div>

            <aside className={`mh-preview${active ? ' is-visible' : ''}`} aria-hidden="true">
                {active && (
                    <>
                        <img
                            key={active.preview}
                            src={active.preview}
                            alt=""
                            onError={(ev) => { ev.currentTarget.style.display = 'none'; }}
                        />
                        <div className="mh-preview-cap">
                            <strong>{active.name}</strong>
                            <span>{active.blurb}</span>
                            {armed === active.file && <em>tap again to open</em>}
                        </div>
                    </>
                )}
            </aside>
        </main>
    );
}
