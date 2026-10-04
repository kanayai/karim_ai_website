// Address bar <-> open file. Every page the app can show has one canonical path.
// Paths avoid dots so dev and Netlify both fall back to the app (see public/_redirects).

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

export const pathForFile = (file) => paths[file] ?? '/';

// Unknown paths return null (caller falls back to Home).
export const fileForPath = (pathname) => {
    const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    return files[clean.toLowerCase()] ?? null;
};

// Old links used #file (e.g. /#projects.html).
export const fileForHash = (hash) => {
    const file = decodeURIComponent(hash.replace(/^#/, ''));
    return paths[file] ? file : null;
};
