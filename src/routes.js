import { blogPosts } from './constants/blogData';

// Address bar <-> open file. Every page the app can show has one canonical path.
// Bio also has /es/bio for Spanish. Paths avoid dots so dev and Netlify both fall back to the app (see public/_redirects).

export const journalPosts = [
    'academic_workflow.html',
    'anscombe_quartet.html',
    'git-vs-onedrive.html',
    'reproducibility_guide.html',
];

const paths = {
    Welcome: '/',
    // Research (GitHub look-alike)
    'projects.html': '/research',
    'publications.html': '/research/publications',
    'phd_students.html': '/research/phd-students',
    'publications.R': '/research/publications-r',
    'git-graph': '/research/history',
    'certest.html': '/research/certest',
    'gkn_prosperity.html': '/research/gkn-prosperity',
    // Teaching
    'current_courses.ipynb': '/teaching',
    'previous_courses.ipynb': '/teaching/previous',
    // Bio, Journal, Contact
    'wiki.html': '/bio',
    'blog.html': '/journal',
    'contact.html': '/contact',
    // Workspace (VS Code look-alike) and its extras
    'workspace.md': '/workspace',
    'README.md': '/workspace/readme',
    'LICENSE.txt': '/workspace/license',
    '.gitignore': '/workspace/gitignore',
    'about_me.html': '/workspace/about-me',
    'retro_game.exe': '/workspace/retro-game',
    'lofi-radio': '/workspace/lofi-radio',
    LaTeX: '/workspace/latex',
    'cite-gen': '/workspace/cite-gen',
    'data-viz': '/workspace/data-viz',
};
journalPosts.forEach((file) => { paths[file] = `/journal/${file.replace(/\.html$/, '')}`; });

const files = Object.fromEntries(Object.entries(paths).map(([file, path]) => [path, file]));
files['/es/bio'] = 'wiki.html';

const clean = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname).toLowerCase();

export const pathForFile = (file, bioLang = 'en') => {
    if (file === 'wiki.html' && bioLang === 'es') return '/es/bio';
    return paths[file] ?? '/';
};

// Unknown paths return null (caller falls back to Home).
export const fileForPath = (pathname) => files[clean(pathname)] ?? null;

// Bio language named by the address (/bio is English, /es/bio Spanish); null elsewhere.
export const bioLangForPath = (pathname) => {
    const path = clean(pathname);
    if (path === '/es/bio') return 'es';
    return path === '/bio' ? 'en' : null;
};

const NAME = 'Karim Anaya-Izquierdo';
const sections = { research: 'Research', teaching: 'Teaching', journal: 'Journal', workspace: 'Workspace', contact: 'Contact' };

export const titleForFile = (file, bioLang = 'en') => {
    if (file === 'Welcome') return `${NAME} — Senior Lecturer in Statistics, University of Bath`;
    if (file === 'wiki.html') return `${bioLang === 'es' ? 'Biografía' : 'Bio'} — ${NAME}`;
    const post = blogPosts.find((p) => p.id === file);
    if (post) return `${post.title} — ${NAME}`;
    const section = sections[pathForFile(file).split('/')[1]];
    return section ? `${section} — ${NAME}` : NAME;
};

// Old links used #file (e.g. /#projects.html).
export const fileForHash = (hash) => {
    const file = decodeURIComponent(hash.replace(/^#/, ''));
    return paths[file] ? file : null;
};
