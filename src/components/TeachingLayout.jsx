import React from 'react';
import { VscLinkExternal, VscColorMode } from 'react-icons/vsc';
import NavLink from './NavLink';
import useSiteMode from '../hooks/useSiteMode';
import { teachingTerms } from '../constants/teachingData';
import './TeachingLayout.css';

// Moodle look-alike for Teaching (revamp plan M4): course cards linking to the real Bath Moodle.
const CourseCard = ({ course }) => (
    <li className="tm-card">
        <div className="tm-card-image" style={{ '--tm-hue': course.hue }} aria-hidden="true">
            <span>{course.code}</span>
        </div>
        <div className="tm-card-body">
            <p className="tm-card-category">{course.level} · {course.when}</p>
            <h3 className="tm-card-title">
                {course.moodle ? (
                    <a href={course.moodle} target="_blank" rel="noreferrer">
                        {course.code}: {course.title}
                    </a>
                ) : (
                    <>{course.code}: {course.title}</>
                )}
            </h3>
            <p className="tm-card-role"><span className="tm-badge">{course.role}</span></p>
            {course.summary && <p className="tm-card-summary">{course.summary}</p>}
        </div>
        <div className="tm-card-footer">
            {course.moodle ? (
                <a className="tm-button" href={course.moodle} target="_blank" rel="noreferrer">
                    Open on Bath Moodle <VscLinkExternal size={13} aria-hidden="true" />
                </a>
            ) : (
                <span className="tm-muted">Tutorials only</span>
            )}
        </div>
    </li>
);

const TeachingLayout = ({ setActiveFile }) => {
    const [mode, setMode] = useSiteMode();
    const dark = mode === 'dark';
    const modeLabel = `Switch to ${dark ? 'light' : 'dark'} theme`;

    return (
    <div className={`tm-shell${dark ? ' is-dark' : ''}`}>
        <header className="tm-navbar">
            <NavLink file="Welcome" onNavigate={setActiveFile} className="tm-brand">
                <span className="tm-brand-mark" aria-hidden="true">K</span>
                K.AI OS Learning
            </NavLink>
            <nav className="tm-primary-nav" aria-label="Teaching">
                <span className="tm-primary-nav-item is-active" aria-current="page">My courses</span>
            </nav>
            <button type="button" className="tm-mode" onClick={() => setMode(dark ? 'light' : 'dark')} aria-label={modeLabel} title={modeLabel}>
                <VscColorMode size={16} />
            </button>
            <NavLink file="Welcome" onNavigate={setActiveFile} className="tm-back">Back to OS</NavLink>
        </header>

        <main className="tm-page">
            <h1 className="tm-page-title">My courses</h1>
            <p className="tm-notice">
                A Moodle-style view of my teaching, not the University&rsquo;s Moodle. Course pages and
                materials are on <strong>Bath Moodle</strong> and need a University of Bath login.
            </p>

            {teachingTerms.map((term) => (
                <section key={term.id} className="tm-block" aria-labelledby={`tm-${term.id}`}>
                    <div className="tm-block-header">
                        <h2 id={`tm-${term.id}`}>{term.title}</h2>
                        <span className="tm-muted">{term.subtitle}</span>
                    </div>
                    <ul className="tm-grid">
                        {term.courses.map((course) => <CourseCard key={course.code} course={course} />)}
                    </ul>
                </section>
            ))}
        </main>
    </div>
    );
};

export default TeachingLayout;
