import React, { useEffect, useState } from 'react';
import {
    FaApple,
    FaBookOpen,
    FaCode,
    FaEnvelope,
    FaGithub,
    FaGraduationCap,
    FaTerminal,
    FaUser,
} from 'react-icons/fa';
import {
    VscAccount,
    VscBook,
    VscChevronRight,
    VscCode,
    VscGithub,
    VscMail,
    VscMortarBoard,
    VscSearch,
    VscSettingsGear,
} from 'react-icons/vsc';
import { BsBatteryFull, BsWifi } from 'react-icons/bs';
import './MacDesktopLayout.css';

const desktopWindows = [
    {
        id: 'about',
        title: 'About — Profile',
        eyebrow: 'ENCYCLOPAEDIA',
        heading: 'Karim Anaya-Izquierdo',
        copy: 'Senior Lecturer in Statistics at the University of Bath.',
        file: 'wiki.html',
        icon: VscAccount,
        accent: '#80a8ff',
    },
    {
        id: 'research',
        title: 'Research — GitHub',
        eyebrow: 'kanayai / research',
        heading: 'Research',
        copy: 'Projects, publications and PhD supervision.',
        file: 'projects.html',
        icon: VscGithub,
        accent: '#7ee787',
    },
    {
        id: 'teaching',
        title: 'Teaching — PyPI',
        eyebrow: 'bath-statistics  ·  latest',
        heading: 'Teaching',
        copy: 'Courses, lecture materials and datasets.',
        file: 'current_courses.ipynb',
        icon: VscMortarBoard,
        accent: '#ffd45a',
    },
    {
        id: 'journal',
        title: 'Journal — Safari',
        eyebrow: 'NOTES & ARTICLES',
        heading: 'Journal',
        copy: 'Longer notes on statistics, code and academic practice.',
        file: 'blog.html',
        icon: VscBook,
        accent: '#ff8aa5',
    },
    {
        id: 'workspace',
        title: 'Workspace — Code',
        eyebrow: 'workspace.md',
        heading: 'Academic workbench',
        copy: 'Methods, tools and the working stack behind the site.',
        file: 'workspace.md',
        icon: VscCode,
        accent: '#79d7ff',
    },
    {
        id: 'contact',
        title: 'Contact — Mail',
        eyebrow: 'NEW MESSAGE',
        heading: 'Get in touch',
        copy: 'Email, ORCID, GitHub and University of Bath profile.',
        file: 'contact.html',
        icon: VscMail,
        accent: '#c6a0ff',
    },
];

const dockItems = [
    { label: 'Finder', file: 'Welcome', icon: null, app: 'finder' },
    { label: 'Terminal', file: 'terminal.html', icon: FaTerminal, app: 'terminal' },
    { label: 'About', file: 'wiki.html', icon: FaUser, app: 'contacts' },
    { label: 'Research', file: 'projects.html', icon: FaGithub, app: 'github' },
    { label: 'Teaching', file: 'current_courses.ipynb', icon: FaGraduationCap, app: 'teaching' },
    { label: 'Journal', file: 'blog.html', icon: FaBookOpen, app: 'books' },
    { label: 'Workspace', file: 'workspace.md', icon: FaCode, app: 'xcode' },
    { label: 'Contact', file: 'contact.html', icon: FaEnvelope, app: 'mail' },
];

const MacWindowControls = () => (
    <span className="mac-window-controls" aria-hidden="true">
        <span className="mac-control-close" />
        <span className="mac-control-minimise" />
        <span className="mac-control-expand" />
    </span>
);

const SectionWindow = ({ section, onOpen }) => {
    const Icon = section.icon;

    return (
        <button
            type="button"
            className={`mac-section-window mac-section-window--${section.id}`}
            style={{ '--window-accent': section.accent }}
            onClick={() => onOpen(section.file)}
            aria-label={`Open ${section.heading}`}
        >
            <span className="mac-section-titlebar">
                <MacWindowControls />
                <span>{section.title}</span>
            </span>
            <span className="mac-section-content">
                <span className="mac-section-icon"><Icon aria-hidden="true" /></span>
                <span className="mac-section-copy">
                    <span className="mac-section-eyebrow">{section.eyebrow}</span>
                    <strong>{section.heading}</strong>
                    <span>{section.copy}</span>
                </span>
                <VscChevronRight className="mac-section-arrow" aria-hidden="true" />
            </span>
        </button>
    );
};

const TerminalPreview = ({ onOpen }) => (
    <button
        type="button"
        className="mac-terminal-preview"
        onClick={() => onOpen('terminal.html')}
        aria-label="Open the interactive terminal"
    >
        <span className="mac-terminal-preview-titlebar">
            <MacWindowControls />
            <span>guest@karim-anaya.io — zsh</span>
        </span>
        <span className="mac-terminal-preview-body">
            <span><b>guest</b>@karim-anaya.io ~ % fastfetch</span>
            <span className="mac-terminal-preview-name">K.AI OS</span>
            <span>Karim Anaya-Izquierdo</span>
            <span>Senior Lecturer in Statistics</span>
            <span>University of Bath · Mathematical Sciences</span>
            <span className="mac-terminal-preview-command">Open the interactive terminal <VscChevronRight /></span>
        </span>
    </button>
);

const MacDesktopLayout = ({ setActiveFile }) => {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 30_000);
        return () => window.clearInterval(timer);
    }, []);

    const dateTime = new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(now);

    return (
        <main className="mac-desktop">
            <div className="mac-wallpaper-glow mac-wallpaper-glow--one" aria-hidden="true" />
            <div className="mac-wallpaper-glow mac-wallpaper-glow--two" aria-hidden="true" />

            <header className="mac-menu-bar">
                <div className="mac-menu-left">
                    <FaApple className="mac-apple-mark" aria-label="Desktop menu" />
                    <strong>Finder</strong>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Go</span>
                    <span>Window</span>
                    <span>Help</span>
                </div>
                <div className="mac-menu-right">
                    <BsBatteryFull aria-label="Battery" />
                    <BsWifi aria-label="Wi-Fi" />
                    <VscSearch aria-label="Spotlight" />
                    <VscSettingsGear aria-label="Control Centre" />
                    <time dateTime={now.toISOString()}>{dateTime}</time>
                </div>
            </header>

            <section className="mac-desktop-stage" aria-label="Karim's website desktop">
                <TerminalPreview onOpen={setActiveFile} />

                {desktopWindows.map(section => (
                    <SectionWindow key={section.id} section={section} onOpen={setActiveFile} />
                ))}
            </section>

            <nav className="mac-dock" aria-label="Website sections">
                {dockItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <button
                            type="button"
                            key={item.label}
                            className={`mac-dock-item mac-dock-item--${item.app}`}
                            onClick={() => setActiveFile(item.file)}
                            aria-label={item.label}
                            data-tooltip={item.label}
                        >
                            {Icon ? <Icon aria-hidden="true" /> : <span className="mac-finder-face" aria-hidden="true" />}
                        </button>
                    );
                })}
            </nav>
        </main>
    );
};

export default MacDesktopLayout;
