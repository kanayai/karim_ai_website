// Command logic for the minimal home terminal. Pure: returns what to print / do.
export const COMMANDS = [
    'help', 'ls', 'cd', 'open', 'cat', 'man', 'whoami', 'whois', 'where', 'find', 'pwd', 'date', 'uptime',
    'contact', 'mail', 'fastfetch', 'coffee', 'tea', 'theme', 'clear',
    'history', 'grep', 'exit', 'quit', 'logout', 'vim', 'sudo',
    'git', 'google', 'orcid', 'github', 'curl',
];

const GITHUB = 'https://github.com/kanayai';
const REPO = `${GITHUB}/karim_ai_website`;
const ORCID = 'https://orcid.org/0000-0001-9718-5256';

// Career as a commit history, newest first: [hash, date, message].
const CAREER = [
    ['a3f9c1e', 'Sep 2013', 'Join Mathematical Sciences, University of Bath'],
    ['7b2d40f', 'Jan 2011', 'Lecturer in Medical Statistics, LSHTM'],
    ['e91c6a2', 'Jun 2006', 'PhD in Statistics, National University of Mexico'],
    ['4d07b8e', 'Oct 2005', 'Postdoctoral Research Fellow, Open University'],
    ['c5a2f13', 'Jul 2001', 'MSc in Statistics, National University of Mexico'],
    ['0f1e2d3', 'Jul 2000', 'Initial commit: BSc in Actuarial Sciences, ITAM'],
];

const gitLog = (oneline) => (oneline
    ? CAREER.map(([h, , m], i) => `${h} ${i === 0 ? '(HEAD -> bath) ' : ''}${m}`)
    : CAREER.flatMap(([h, d, m], i) => [
        `commit ${h}${'0'.repeat(33)}${i === 0 ? ' (HEAD -> bath)' : ''}`,
        'Author: Karim Anaya-Izquierdo <kai21@bath.ac.uk>',
        `Date:   ${d}`,
        '',
        `    ${m}`,
        '',
    ]));

const GIT_STATUS = [
    'On branch research',
    "Your branch is ahead of 'origin/research' by 2 papers.",
    '',
    'Changes not staged for commit:',
    '        modified:   paper_1.tex',
    '        modified:   paper_2.tex',
    '',
    'no changes added to commit (use "git add" and keep writing)',
];

const GOOGLE_301 = ['HTTP/1.1 301 Moved → https://www.google.com/'];

const bathUptime = () => {
    const start = new Date(2013, 8, 1); // September 2013, University of Bath
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return `${Math.floor(months / 12)} years, ${months % 12} months`;
};

const COFFEE = [
    '      ) )',
    '     ( (',
    '   ........',
    '   |      |]',
    '   \\      /',
    '    `----\'',
    '  (fuel for the proofs)',
];

const TEA = [
    '       ~  ~',
    '      ~  ~',
    '   .--------.',
    '   |        |==.',
    '   |        |  |',
    '   \'.______.\'==\'',
    '  (milk after, obviously)',
];

const BIO = [
    'Karim Anaya-Izquierdo',
    'Senior Lecturer in Statistics, Department of Mathematical Sciences, University of Bath.',
    'Research: information geometry, uncertainty quantification in engineering,',
    'survival analysis, spatial epidemiology, applied Bayesian methods.',
    'Teaching: probability for data science, data science, design of experiments.',
];

const HELP = [
    'ls                 list sections',
    'cd <section>       open a section',
    'cat bio            short bio',
    'contact            email and ORCID',
    'grep <word>        search the site',
    'coffee, tea        ASCII refreshments',
    'theme              toggle dark / light',
    'clear              wipe the screen',
    'history            commands so far',
    'pwd, date, uptime',
    'curl, git, google',
    'Tab completes, ↑/↓ recall history.',
];

const strip = (s) => (s || '').replace(/\/+$/, '').toLowerCase();

// Returns { out: string[], action?: 'clear' | 'theme' | 'ls' | {open: entry} | {url} | {fetch} }
export function run(input, { entries, history, light }) {
    const raw = input.trim();
    if (!raw) return { out: [] };
    const [cmd, ...args] = raw.split(/\s+/);
    const arg = strip(args[0]);
    const find = (a) => entries.find((e) => strip(e.name) === a || e.file === a);

    switch (cmd) {
        case 'help': case '?': return { out: HELP };
        case 'ls': return { out: [], action: 'ls' };
        case 'cd': case 'open': {
            if (!args.length || ['..', '~', '/', '.'].includes(args[0])) return { out: [] };
            const hit = find(arg);
            if (hit) return { out: [`opening ${hit.name} …`], action: { open: hit } };
            return { out: [`${cmd}: no such section: ${args[0]}  (try ls)`] };
        }
        case 'cat':
            if (arg === 'bio' || arg === 'bio.txt') return { out: BIO };
            return { out: [`cat: ${args[0] || ''}: ${args.length ? 'No such file' : 'missing operand'}`] };
        case 'man':
            return arg === 'karim' ? { out: BIO } : { out: [`No manual entry for ${args[0] || ''}`.trim()] };
        case 'where': case 'find':
            if (arg !== 'karim') return { out: [`zsh: command not found: ${raw}`] };
            return { out: ['Department of Mathematical Sciences', 'University of Bath, Claverton Down', 'Bath BA2 7AY'] };
        case 'whoami': return { out: ['guest'] };
        case 'whois':
            return arg === 'karim' ? { out: ['Karim AI: Senior Lecturer in Statistics, University of Bath'] }
                : { out: [`whois: no match for "${args.join(' ')}"`.replace(' ""', '')] };
        case 'pwd': return { out: ['/home/karim/bath'] };
        case 'date': return { out: [new Date().toString()] };
        case 'uptime': return { out: [`up ${bathUptime()} in academia (at Bath)`] };
        case 'contact': case 'mail':
            return { out: ['email  kai21@bath.ac.uk', 'orcid  orcid.org/0000-0001-9718-5256', 'github github.com/kanayai'] };
        case 'neofetch': case 'fastfetch':
            return { out: [
                'karim@kai-os', '------------',
                'Role:      Senior Lecturer in Statistics',
                'Host:      University of Bath, Mathematical Sciences',
                `Uptime:    ${bathUptime()} at Bath`,
                'Research:  info geometry · UQ · survival · spatial epi',
                'Stack:     R (tidyverse) · Python · Quarto · LaTeX',
                `Theme:     ${light ? 'light' : 'dark'}`,
            ] };
        case 'coffee': return { out: COFFEE, art: true };
        case 'tea': return { out: TEA, art: true };
        case 'theme': {
            if (args.length > 1 || (args.length && !['light', 'dark'].includes(arg))) return { out: [`zsh: command not found: ${raw}`] };
            const next = args.length ? arg : (light ? 'dark' : 'light');
            return { out: [`theme: ${next}`], action: (next === 'light') !== light ? 'theme' : undefined };
        }
        case 'clear': return { out: [], action: 'clear' };
        case 'history': return { out: history.map((c, i) => `${String(i + 1).padStart(3)}  ${c}`) };
        case 'exit': case 'quit': case 'logout':
            return { out: ['There is no escape. Try `cd teaching`.'] };
        case 'vim': case 'vi': case 'nano': case 'emacs':
            return { out: ['How do I exit?'] };
        case 'sudo':
            return { out: ['karim is not in the sudoers file. This incident will be reported.'] };
        case 'rm':
            if (/(^|\s)(-\w*[rf]\w*|\/|\*|~)(\s|$)/.test(args.join(' '))) return { out: ['Nice try.', 'rm: operation not permitted (permission denied).'] };
            return { out: ['rm: permission denied'] };
        case 'grep': {
            // Searches section blurbs and the bio; flags are ignored, matching is case-insensitive.
            const pat = args.filter((a) => !a.startsWith('-')).join(' ').replace(/^["']|["']$/g, '').toLowerCase();
            if (!pat) return { out: ['usage: grep <pattern>'] };
            const lines = entries.map((e) => [`${e.name}${e.file}`, e.blurb])
                .concat(BIO.map((l) => ['bio.txt', l]));
            const hits = lines.filter(([, l]) => l.toLowerCase().includes(pat)).map(([f, l]) => `${f}: ${l}`);
            return { out: hits.length ? hits : ['(no matches)'] };
        }
        case 'mkdir': case 'touch': case 'mv': case 'cp': case 'chmod': case 'chown':
            return { out: [`${cmd}: ${args[0] || ''}: Read-only file system`, 'Look, don’t touch.'] };
        case 'git': {
            const sub = args[0];
            if (sub === 'log') return { out: gitLog(args.includes('--oneline')) };
            if (sub === 'status') return { out: GIT_STATUS };
            if (sub === 'clone') return { out: ["Cloning into 'karim_ai_website'...", `remote: opening ${REPO}`], action: { url: REPO } };
            if (!sub) return { out: ['usage: git <command>', '   try: log, status, clone'] };
            return { out: [`git: '${sub}' is not a git command. See 'git --help'.`] };
        }
        case 'google': {
            const q = args.join(' ');
            return { out: [q ? `searching Google for "${q}" …` : 'opening google.com …'],
                action: { url: q ? `https://www.google.com/search?q=${encodeURIComponent(q)}` : 'https://www.google.com/' } };
        }
        case 'orcid': return { out: [`opening ${ORCID} …`], action: { url: ORCID } };
        case 'github': return { out: [`opening ${GITHUB} …`], action: { url: GITHUB } };
        case 'curl': {
            // Flags are ignored; only a couple of hosts are "reachable".
            const target = args.filter((a) => !a.startsWith('-'))[0];
            if (!target) return { out: ['curl: try \'curl --help\' or \'curl --manual\' for more information'] };
            const url = target.replace(/^https?:\/\//i, '');
            const host = url.split('/')[0].toLowerCase();
            if (host === 'google.com' || host === 'www.google.com') return { out: GOOGLE_301, action: { url: 'https://www.google.com/' } };
            if (host === 'wttr.in') {
                const place = url.split('/')[1] || 'Bath';
                return { out: [], action: { fetch: `https://wttr.in/${encodeURIComponent(place)}?0TA`, host } };
            }
            return { out: [`curl: (6) Could not resolve host: ${host}`] };
        }
        default: return { out: [`zsh: command not found: ${cmd}`] };
    }
}

export function complete(value, entries) {
    const parts = value.split(/\s+/);
    if (parts.length === 1) {
        const m = COMMANDS.filter((c) => c.startsWith(parts[0]));
        return m.length === 1 ? `${m[0]} ` : null;
    }
    if (['cd', 'open', 'cat'].includes(parts[0]) && parts.length === 2) {
        const names = entries.map((e) => e.name.replace(/\/$/, '')).concat(parts[0] === 'cat' ? ['bio.txt'] : []);
        const m = names.filter((n) => n.startsWith(parts[1].toLowerCase()));
        return m.length === 1 ? `${parts[0]} ${m[0]}` : null;
    }
    return null;
}
