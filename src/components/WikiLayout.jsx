import React, { useEffect, useRef, useState } from 'react';
import { VscArrowLeft, VscColorMode } from 'react-icons/vsc';
import { MdTranslate } from 'react-icons/md';
import useSiteMode from '../hooks/useSiteMode';
import { wikiLanguages, wikiStrings } from '../constants/wikiStrings';
import './WikiLayout.css';

const LANG_KEY = 'wiki-lang';
const initialLang = () => {
    try {
        const saved = localStorage.getItem(LANG_KEY);
        if (wikiStrings[saved]) return saved;
    } catch { /* storage blocked */ }
    const nav = (typeof navigator !== 'undefined' ? navigator.language : 'en').slice(0, 2);
    return wikiStrings[nav] ? nav : 'en';
};

const WikiLayout = ({ setActiveFile }) => {
    const [mode, setMode] = useSiteMode();
    const [lang, setLang] = useState(initialLang);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const t = wikiStrings[lang];
    const dark = mode === 'dark';

    useEffect(() => {
        if (!menuOpen) return undefined;
        const close = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
        document.addEventListener('pointerdown', close);
        return () => document.removeEventListener('pointerdown', close);
    }, [menuOpen]);

    const chooseLang = (code) => {
        setLang(code);
        setMenuOpen(false);
        try { localStorage.setItem(LANG_KEY, code); } catch { /* storage blocked */ }
    };

    return (
        <div className={`wiki-layout-wrapper${dark ? ' is-dark' : ''}`} lang={lang}>
            <header className="wiki-site-header">
                <div className="wiki-wordmark" onClick={() => setActiveFile('Welcome')}>
                    <span className="wiki-mark">W</span>
                    <div>
                        <div className="wiki-title-small">{t.siteTitle}</div>
                        <div className="wiki-subtitle-small">{t.siteSubtitle}</div>
                    </div>
                </div>
                <div className="wiki-header-actions">
                    <div className="wiki-lang" ref={menuRef}>
                        <button
                            type="button"
                            className="wiki-back-button wiki-lang-button"
                            aria-haspopup="listbox"
                            aria-expanded={menuOpen}
                            aria-label={t.languages}
                            title={t.languages}
                            onClick={() => setMenuOpen((o) => !o)}
                        >
                            <MdTranslate size={18} />
                            <span className="wiki-lang-count">{wikiLanguages.length}</span>
                        </button>
                        {menuOpen && (
                            <ul className="wiki-lang-menu" role="listbox" aria-label={t.languages}>
                                {wikiLanguages.map((l) => (
                                    <li key={l.code} role="option" aria-selected={l.code === lang}>
                                        <button type="button" className={l.code === lang ? 'active' : ''} lang={l.code} onClick={() => chooseLang(l.code)}>
                                            {l.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button
                        type="button"
                        className="wiki-back-button"
                        onClick={() => setMode(dark ? 'light' : 'dark')}
                        aria-label={dark ? t.mode[1] : t.mode[0]}
                        title={dark ? t.mode[1] : t.mode[0]}
                    >
                        <VscColorMode size={16} />
                    </button>
                    <button type="button" className="wiki-back-button" onClick={() => setActiveFile('Welcome')}>
                        <VscArrowLeft size={16} />
                        {t.back}
                    </button>
                </div>
            </header>

            <main className="wiki-page">
                <aside className="wiki-left-rail" aria-label={t.toolsLabel}>
                    <nav>
                        <a href="#overview">{t.navArticle}</a>
                        <a href="#career">{t.career}</a>
                        <a href="#research">{t.research}</a>
                        <a href="#teaching">{t.teaching}</a>
                        <a href="#links">{t.links}</a>
                    </nav>
                </aside>

                <article className="wiki-article">
                    <div className="wiki-article-tabs" aria-label={t.tabsLabel}>
                        {t.tabs.map((label, i) => <span key={label} className={i === 0 ? 'active' : undefined}>{label}</span>)}
                    </div>

                    <h1 id="overview">Karim Anaya-Izquierdo</h1>
                    <p className="wiki-disambiguation">{t.from}</p>

                    <div className="wiki-notice">{t.notice}</div>

                    <aside className="wiki-infobox">
                        <div className="wiki-infobox-title">Karim Anaya-Izquierdo</div>
                        <img src="/images/Bath_Crest.png" alt={t.crestAlt} />
                        <table>
                            <tbody>
                                {t.info.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
                                <tr><th>{t.orcid}</th><td><a href="https://orcid.org/0000-0001-9718-5256" target="_blank" rel="noreferrer">0000-0001-9718-5256</a></td></tr>
                            </tbody>
                        </table>
                    </aside>

                    <p><strong>Karim Anaya-Izquierdo</strong>{t.lead1}</p>
                    <p>{t.lead2}</p>

                    <nav className="wiki-contents" aria-label={t.contentsLabel}>
                        <div className="wiki-contents-title">{t.contentsLabel}</div>
                        <ol>
                            <li><a href="#career">{t.career}</a></li>
                            <li><a href="#research">{t.research}</a></li>
                            <li><a href="#teaching">{t.teaching}</a></li>
                            <li><a href="#selected-topics">{t.topics}</a></li>
                            <li><a href="#links">{t.links}</a></li>
                        </ol>
                    </nav>

                    <h2 id="career">{t.career}</h2>
                    <p>{t.careerText}</p>

                    <h2 id="research">{t.research}</h2>
                    <p>
                        {t.researchText[0]}<button type="button" className="wiki-inline-link" onClick={() => setActiveFile('projects.html')}>{t.research}</button>{t.researchText[1]}
                    </p>

                    <h2 id="teaching">{t.teaching}</h2>
                    <p>
                        {t.teachingText[0]}<button type="button" className="wiki-inline-link" onClick={() => setActiveFile('current_courses.ipynb')}>{t.teaching}</button>{t.teachingText[1]}
                    </p>

                    <h2 id="selected-topics">{t.topics}</h2>
                    <ul>
                        {t.topicList.map((item) => <li key={item}>{item}</li>)}
                    </ul>

                    <h2 id="links">{t.links}</h2>
                    <ul>
                        <li><a href="https://orcid.org/0000-0001-9718-5256" target="_blank" rel="noreferrer">{t.linkList[0]}</a></li>
                        <li><a href="https://github.com/kanayai" target="_blank" rel="noreferrer">{t.linkList[1]}</a></li>
                        <li><a href="https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo" target="_blank" rel="noreferrer">{t.linkList[2]}</a></li>
                    </ul>
                </article>
            </main>
        </div>
    );
};

export default WikiLayout;
