import React, { useState } from 'react';
import { VscSearch, VscClose } from 'react-icons/vsc';
import Fuse from 'fuse.js';
import { blogPosts } from '../constants/blogData';

const BlogViewer = ({ setActiveFile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const posts = blogPosts;

    // Configure Fuse.js for fuzzy search
    const fuse = new Fuse(posts, {
        keys: [
            { name: 'title', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'tags', weight: 1 }
        ],
        threshold: 0.4,
        ignoreLocation: true,
        includeMatches: true,
    });

    // Get all unique tags
    const allTags = [...new Set(posts.flatMap(post => post.tags))].sort();

    // Filter posts by search term and selected tags
    const getFilteredPosts = () => {
        let filtered = posts;

        // Apply fuzzy search if there's a search term
        if (searchTerm.trim()) {
            const results = fuse.search(searchTerm);
            filtered = results.map(result => ({
                ...result.item,
                matches: result.matches
            }));
        }

        // Apply tag filters
        if (selectedTags.length > 0) {
            filtered = filtered.filter(post =>
                selectedTags.every(tag => post.tags.includes(tag))
            );
        }

        return filtered;
    };

    const filteredPosts = getFilteredPosts();

    // Toggle tag selection
    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTags([]);
    };

    const hasActiveFilters = searchTerm.trim() || selectedTags.length > 0;

    return (
        <div className="p-4" style={{ color: 'var(--vscode-text)', maxWidth: '800px', height: '100%', overflowY: 'auto' }}>
            <h1 className="mb-4">Blog Posts</h1>

            {/* Search Input */}
            <div className="d-flex align-items-center mb-3" style={{
                backgroundColor: 'var(--vscode-input-background)',
                border: '1px solid var(--vscode-input-border)',
                padding: '8px 12px',
                borderRadius: '4px',
                maxWidth: '500px'
            }}>
                <VscSearch className="me-2" style={{ color: 'var(--vscode-input-foreground)' }} />
                <input
                    type="text"
                    placeholder="Search posts (fuzzy matching enabled)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'var(--vscode-input-foreground)',
                        outline: 'none',
                        width: '100%'
                    }}
                />
                {searchTerm && (
                    <VscClose
                        className="ms-2"
                        style={{ cursor: 'pointer', opacity: 0.7 }}
                        onClick={() => setSearchTerm('')}
                    />
                )}
            </div>

            {/* Tag Filter */}
            <div className="mb-3">
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px' }}>
                    Filter by tags:
                </div>
                <div className="d-flex gap-2 flex-wrap">
                    {allTags.map(tag => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <span
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                style={{
                                    fontSize: '11px',
                                    backgroundColor: isSelected
                                        ? 'var(--vscode-accent)'
                                        : 'var(--vscode-badge-background)',
                                    color: isSelected
                                        ? 'var(--vscode-button-foreground, #fff)'
                                        : 'var(--vscode-badge-foreground)',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    border: isSelected
                                        ? '1px solid var(--vscode-accent)'
                                        : '1px solid transparent',
                                    transition: 'all 0.2s',
                                    fontWeight: isSelected ? '600' : '400'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.target.style.borderColor = 'var(--vscode-accent)';
                                        e.target.style.opacity = '0.8';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.target.style.borderColor = 'transparent';
                                        e.target.style.opacity = '1';
                                    }
                                }}
                            >
                                #{tag}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Results Summary */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div style={{ fontSize: '13px', opacity: 0.7 }}>
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                    {selectedTags.length > 0 && (
                        <span> with {selectedTags.length} {selectedTags.length === 1 ? 'tag' : 'tags'}</span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        style={{
                            fontSize: '11px',
                            padding: '4px 12px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--vscode-border)',
                            color: 'var(--vscode-text)',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--vscode-hover-bg)';
                            e.target.style.borderColor = 'var(--vscode-accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.borderColor = 'var(--vscode-border)';
                        }}
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Posts Grid */}
            <div className="row g-3">
                {filteredPosts.map(post => (
                    <div key={post.id} className="col-12 col-md-6">
                        <div
                            className="p-3 h-100 d-flex flex-column"
                            style={{
                                backgroundColor: 'var(--vscode-editor-bg)',
                                border: '1px solid var(--vscode-border)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, border-color 0.2s'
                            }}
                            onClick={() => setActiveFile(post.id)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--vscode-focusBorder)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--vscode-border)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h3 className="m-0" style={{ color: 'var(--vscode-text-link-foreground, #3794ff)', fontSize: '1.1rem' }}>{post.title}</h3>
                            </div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <span style={{ fontSize: '12px', opacity: 0.7 }}>{post.date}</span>
                                <span style={{
                                    fontSize: '11px',
                                    backgroundColor: 'var(--vscode-accent)',
                                    color: 'var(--vscode-button-foreground, #fff)',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontWeight: '500'
                                }}>
                                    {post.readingTime} min read
                                </span>
                            </div>
                            <p className="mb-3 flex-grow-1" style={{ opacity: 0.9, fontSize: '0.9rem' }}>{post.description}</p>
                            <div className="d-flex gap-2 flex-wrap mt-auto">
                                {post.tags.map(tag => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <span
                                            key={tag}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleTag(tag);
                                            }}
                                            style={{
                                                fontSize: '11px',
                                                backgroundColor: isSelected
                                                    ? 'var(--vscode-accent)'
                                                    : 'var(--vscode-badge-background)',
                                                color: isSelected
                                                    ? 'var(--vscode-button-foreground, #fff)'
                                                    : 'var(--vscode-badge-foreground)',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                fontWeight: isSelected ? '600' : '400',
                                                border: isSelected
                                                    ? '1px solid var(--vscode-accent)'
                                                    : '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.opacity = '0.8';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.opacity = '1';
                                            }}
                                        >
                                            #{tag}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="text-center opacity-50 mt-5">
                        <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                            No posts found
                        </div>
                        <div style={{ fontSize: '13px' }}>
                            {hasActiveFilters
                                ? 'Try adjusting your search or filters'
                                : 'No blog posts available'
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogViewer;
