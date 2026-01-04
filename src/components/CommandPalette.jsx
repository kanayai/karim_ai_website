import React, { useState, useEffect, useRef } from 'react';
import { VscSearch, VscArrowRight, VscHome, VscFile, VscBook, VscExtensions } from 'react-icons/vsc';
import Fuse from 'fuse.js';

import { blogPosts } from '../constants/blogData';

const CommandPalette = ({ isOpen, onClose, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    // Convert blog posts to command palette format
    const blogFiles = blogPosts.map(post => ({
        name: post.title,
        path: post.id,
        category: 'Blog',
        icon: 'book',
        description: post.description,
        tags: post.tags
    }));

    // Categorized file structure
    const files = [
        // Navigation
        { name: 'Welcome', path: 'Welcome', category: 'Navigation', icon: 'home' },
        { name: 'about_me.html', path: 'about_me.html', category: 'Navigation', icon: 'file' },
        { name: 'contact.html', path: 'contact.html', category: 'Navigation', icon: 'file' },

        // Content
        { name: 'projects.html', path: 'projects.html', category: 'Content', icon: 'file' },
        { name: 'phd_students.html', path: 'phd_students.html', category: 'Content', icon: 'file' },
        { name: 'publications.R', path: 'publications.R', category: 'Content', icon: 'file' },
        { name: 'current_courses.ipynb', path: 'current_courses.ipynb', category: 'Content', icon: 'file' },
        { name: 'previous_courses.ipynb', path: 'previous_courses.ipynb', category: 'Content', icon: 'file' },
        { name: 'certest.html', path: 'certest.html', category: 'Content', icon: 'file' },
        { name: 'gkn_prosperity.html', path: 'gkn_prosperity.html', category: 'Content', icon: 'file' },

        // Blog
        ...blogFiles,

        // Extensions
        { name: 'git-graph', path: 'git-graph', category: 'Extensions', icon: 'extensions' },
        { name: 'lofi-radio', path: 'lofi-radio', category: 'Extensions', icon: 'extensions' },
        { name: 'retro_game.exe', path: 'retro_game.exe', category: 'Extensions', icon: 'extensions' },
        { name: 'LICENSE.txt', path: 'LICENSE.txt', category: 'Extensions', icon: 'file' },
    ];

    // Configure Fuse.js for fuzzy search
    const fuse = new Fuse(files, {
        keys: [
            { name: 'name', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'tags', weight: 1 },
            { name: 'category', weight: 0.5 }
        ],
        threshold: 0.4, // 0 = perfect match, 1 = match anything
        ignoreLocation: true,
        includeMatches: true, // For highlighting
    });

    // Get filtered results
    const getFilteredFiles = () => {
        if (!query.trim()) {
            return files;
        }
        const results = fuse.search(query);
        return results.map(result => ({
            ...result.item,
            matches: result.matches
        }));
    };

    const filteredFiles = getFilteredFiles();

    // Group files by category
    const groupedFiles = filteredFiles.reduce((acc, file) => {
        const category = file.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(file);
        return acc;
    }, {});

    const categoryOrder = ['Navigation', 'Content', 'Blog', 'Extensions', 'Other'];
    const sortedCategories = categoryOrder.filter(cat => groupedFiles[cat]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        setQuery('');
        setSelectedIndex(0);
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredFiles.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
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

    // Get the icon component based on icon type
    const getIcon = (iconType) => {
        switch (iconType) {
            case 'home': return <VscHome />;
            case 'book': return <VscBook />;
            case 'extensions': return <VscExtensions />;
            default: return <VscFile />;
        }
    };

    // Highlight matching characters
    const highlightMatch = (text, matches) => {
        if (!matches || matches.length === 0) return text;

        // Get the match for the 'name' field
        const nameMatch = matches.find(m => m.key === 'name');
        if (!nameMatch) return text;

        const indices = nameMatch.indices;
        const chars = text.split('');
        const highlighted = [];
        let lastIndex = 0;

        indices.forEach(([start, end]) => {
            // Add non-highlighted text
            if (start > lastIndex) {
                highlighted.push(
                    <span key={`normal-${lastIndex}`}>{chars.slice(lastIndex, start).join('')}</span>
                );
            }
            // Add highlighted text
            highlighted.push(
                <span
                    key={`highlight-${start}`}
                    style={{
                        color: 'var(--vscode-accent)',
                        fontWeight: '600'
                    }}
                >
                    {chars.slice(start, end + 1).join('')}
                </span>
            );
            lastIndex = end + 1;
        });

        // Add remaining text
        if (lastIndex < chars.length) {
            highlighted.push(
                <span key={`normal-${lastIndex}`}>{chars.slice(lastIndex).join('')}</span>
            );
        }

        return highlighted;
    };

    if (!isOpen) return null;

    let globalIndex = 0;

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
                    maxHeight: '500px',
                    backgroundColor: 'var(--vscode-sidebar-bg)',
                    border: '1px solid var(--vscode-accent)',
                    color: 'var(--vscode-text)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="p-2 border-bottom border-secondary">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bg-transparent border-0 text-white">
                            <VscSearch />
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="form-control bg-transparent border-0 text-white shadow-none command-palette-input"
                            placeholder="search site (fuzzy matching enabled)"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{ color: 'var(--vscode-text)' }}
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="overflow-auto p-1" style={{ flex: 1 }}>
                    {sortedCategories.map(category => {
                        const categoryFiles = groupedFiles[category];

                        return (
                            <div key={category} className="mb-2">
                                {/* Category Header */}
                                <div
                                    className="px-3 py-1"
                                    style={{
                                        fontSize: '11px',
                                        opacity: 0.6,
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    {category}
                                </div>

                                {/* Files in Category */}
                                {categoryFiles.map((file) => {
                                    const currentGlobalIndex = globalIndex++;
                                    const isSelected = currentGlobalIndex === selectedIndex;

                                    return (
                                        <div
                                            key={`${category}-${file.name}`}
                                            className={`px-3 py-2 rounded mx-1 ${isSelected ? 'bg-primary text-white' : ''}`}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: isSelected ? 'var(--vscode-accent)' : 'transparent',
                                                transition: 'background-color 0.1s'
                                            }}
                                            onClick={() => {
                                                onNavigate(file.path);
                                                onClose();
                                            }}
                                            onMouseEnter={() => setSelectedIndex(currentGlobalIndex)}
                                        >
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span style={{ opacity: 0.7, fontSize: '14px' }}>
                                                        {getIcon(file.icon)}
                                                    </span>
                                                    <span>
                                                        {query ? highlightMatch(file.name, file.matches) : file.name}
                                                    </span>
                                                </div>
                                                <VscArrowRight style={{ opacity: 0.5 }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}

                    {filteredFiles.length === 0 && (
                        <div className="p-3 text-center text-muted">
                            <div style={{ fontSize: '14px', marginBottom: '8px' }}>No matching files found</div>
                            <div style={{ fontSize: '12px', opacity: 0.7 }}>
                                Try a different search term
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer hint */}
                <div
                    className="px-3 py-2 border-top"
                    style={{
                        fontSize: '11px',
                        opacity: 0.5,
                        borderTopColor: 'var(--vscode-border) !important'
                    }}
                >
                    <span className="me-3">↑↓ to navigate</span>
                    <span className="me-3">↵ to select</span>
                    <span>ESC to close</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
