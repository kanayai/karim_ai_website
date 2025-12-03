import React, { useState, useEffect, useRef } from 'react';
import { VscSearch, VscArrowRight } from 'react-icons/vsc';

const CommandPalette = ({ isOpen, onClose, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    const files = [
        { name: 'Welcome', path: 'Welcome' },
        { name: 'about_me.html', path: 'about_me.html' },
        { name: 'contact.html', path: 'contact.html' },
        { name: 'projects.html', path: 'projects.html' },
        { name: 'phd_students.html', path: 'phd_students.html' },
        { name: 'publications.R', path: 'publications.R' },
        { name: 'current_courses.ipynb', path: 'current_courses.ipynb' },
        { name: 'previous_courses.ipynb', path: 'previous_courses.ipynb' },
        { name: 'index.html (Blog)', path: 'index.html' },
        { name: 'certest.html', path: 'certest.html' },
        { name: 'gkn_prosperity.html', path: 'gkn_prosperity.html' },
        { name: 'git-graph', path: 'git-graph' },
        { name: 'lofi-radio', path: 'lofi-radio' },
        { name: 'retro_game.exe', path: 'retro_game.exe' },
        { name: 'anscombe_quartet.html', path: 'anscombe_quartet.html' },
        { name: 'LICENSE.txt', path: 'LICENSE.txt' },
    ];

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        setQuery('');
        setSelectedIndex(0);
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => (prev + 1) % filteredFiles.length);
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => (prev - 1 + filteredFiles.length) % filteredFiles.length);
        } else if (e.key === 'Enter') {
            if (filteredFiles.length > 0) {
                onNavigate(filteredFiles[selectedIndex].path);
                onClose();
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center pt-5"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000 }}
            onClick={onClose}
        >
            <div
                className="rounded shadow-lg d-flex flex-column"
                style={{
                    width: '1000px',
                    maxWidth: '90%',
                    maxHeight: '400px',
                    backgroundColor: 'var(--vscode-sidebar-bg)',
                    border: '1px solid var(--vscode-accent)',
                    color: 'var(--vscode-text)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-2 border-bottom border-secondary">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-transparent border-0 text-white">
                            <VscSearch />
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="form-control bg-transparent border-0 text-white shadow-none command-palette-input"
                            placeholder="search site"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{ color: 'var(--vscode-text)' }}
                        />
                    </div>
                </div>
                <div className="overflow-auto p-1">
                    {filteredFiles.map((file, index) => (
                        <div
                            key={file.name}
                            className={`px-3 py-2 rounded ${index === selectedIndex ? 'bg-primary text-white' : ''}`}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: index === selectedIndex ? 'var(--vscode-accent)' : 'transparent'
                            }}
                            onClick={() => {
                                onNavigate(file.path);
                                onClose();
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div className="d-flex align-items-center justify-content-between">
                                <span>{file.name}</span>
                                <VscArrowRight style={{ opacity: 0.5 }} />
                            </div>
                        </div>
                    ))}
                    {filteredFiles.length === 0 && (
                        <div className="p-3 text-center text-muted">No matching files found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
