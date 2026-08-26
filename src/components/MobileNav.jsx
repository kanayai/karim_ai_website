import React from 'react';
import { VscHome, VscBook, VscMortarBoard, VscPreview, VscAccount, VscMail } from 'react-icons/vsc';

const items = [
    { label: 'Home', file: 'Welcome', icon: VscHome },
    { label: 'Research', file: 'projects.html', icon: VscBook },
    { label: 'Teaching', file: 'current_courses.ipynb', icon: VscMortarBoard },
    { label: 'Journal', file: 'blog.html', icon: VscPreview },
    { label: 'About', file: 'about_me.html', icon: VscAccount },
    { label: 'Contact', file: 'contact.html', icon: VscMail },
];

const sectionForFile = (file) => {
    if (file === 'Welcome') return 'Welcome';
    if (file === 'wiki.html') return 'about_me.html';
    if (['projects.html', 'publications.html', 'phd_students.html', 'certest.html', 'gkn_prosperity.html', 'publications.R'].includes(file)) return 'projects.html';
    if (['current_courses.ipynb', 'previous_courses.ipynb'].includes(file)) return 'current_courses.ipynb';
    if (file === 'blog.html' || file?.endsWith?.('_guide.html') || file === 'academic_workflow.html' || file === 'anscombe_quartet.html' || file === 'git-vs-onedrive.html') return 'blog.html';
    if (file === 'about_me.html') return 'about_me.html';
    if (file === 'contact.html') return 'contact.html';
    return file;
};

const MobileNav = ({ activeFile, onNavigate }) => {
    const activeSection = sectionForFile(activeFile);

    return (
        <nav className="mobile-primary-nav" aria-label="Primary mobile navigation">
            {items.map((item) => (
                <button
                    key={item.file}
                    type="button"
                    className={`mobile-primary-nav-item ${activeSection === item.file ? 'active' : ''}`}
                    onClick={() => onNavigate(item.file)}
                >
                    {React.createElement(item.icon, { size: 18 })}
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default MobileNav;
