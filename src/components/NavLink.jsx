import React from 'react';
import { pathForFile } from '../routes';

// A real link to a page's address: plain clicks stay in the app, modified clicks
// (new tab, new window) and copy-link work like any other link.
const NavLink = ({ file, onNavigate, children, ...rest }) => (
    <a
        href={pathForFile(file)}
        onClick={(e) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            onNavigate(file);
        }}
        {...rest}
    >
        {children}
    </a>
);

export default NavLink;
