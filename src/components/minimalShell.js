// Command logic for the minimal home terminal. Pure: returns what to print / do.
export const COMMANDS = [
    'help', 'ls', 'cd', 'open', 'cat', 'man', 'whoami', 'pwd', 'date', 'uptime',
    'contact', 'mail', 'fastfetch', 'coffee', 'tea', 'theme', 'clear',
    'history', 'grep', 'exit', 'quit', 'logout', 'vim', 'sudo',
];

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
    'cd <section>       open a section (also: open <section>)',
    'cat bio            short bio (also: man karim)',
    'whoami, pwd, date, uptime',
    'contact            email and ORCID (also: mail)',
    'grep <word>        search the site',
    'fastfetch          spec block',
    'coffee, tea        ASCII refreshments',
    'theme              toggle dark / light',
    'clear              wipe the screen',
    'history            commands so far',
    'Tab completes, ↑/↓ recall history.',
];

const strip = (s) => (s || '').replace(/\/+$/, '').toLowerCase();

// Returns { out: string[], action?: 'clear' | 'theme' | 'ls' | {open: entry} }
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
        case 'whoami': return { out: ['Karim AI: Senior Lecturer in Statistics, University of Bath'] };
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
        case 'theme': return { out: [`theme: ${light ? 'dark' : 'light'}`], action: 'theme' };
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
