import React, { useState, useEffect, useRef } from 'react';
import { VscSearch, VscArrowRight } from 'react-icons/vsc';

const CommandPalette = ({ isOpen, onClose, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    const files = [
        { name: 'about_me.md', path: 'about_me.md' },
        { name: 'publications.md', path: 'publications.md' },
        { name: 'projects.md', path: 'projects.md' },
        { name: 'current_courses.ipynb', path: 'current_courses.ipynb' },
        { name: 'previous_courses.md', path: 'previous_courses.md' },
        { name: 'contact.css', path: 'contact.css' },
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
                    width: '600px',
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
                            className="form-control bg-transparent border-0 text-white shadow-none"
                            placeholder="Search files..."
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
