import { useSyncExternalStore } from 'react';

// Light/dark preference shared by the home terminal, GitHub and Wiki pages.
const KEY = 'site-mode';
const listeners = new Set();

const read = () => {
    try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
};
let mode = read();

export const setSiteMode = (next) => {
    mode = next === 'dark' ? 'dark' : 'light';
    try { localStorage.setItem(KEY, mode); } catch { /* storage blocked */ }
    listeners.forEach((l) => l());
};

const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export default function useSiteMode() {
    const current = useSyncExternalStore(subscribe, () => mode, () => 'light');
    return [current, setSiteMode];
}
