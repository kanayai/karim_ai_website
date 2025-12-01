import React, { useState } from 'react';
import { VscSearch } from 'react-icons/vsc';

const BlogViewer = ({ setActiveFile }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const posts = [
        {
            id: 'git-vs-onedrive.html',
            title: 'Git vs OneDrive',
            date: '28/11/2025',
            description: 'Why you should use Git instead of OneDrive for version control.',
            tags: ['git', 'version-control', 'productivity']
        },
        {
            id: 'academic_workflow.html',
            title: 'The Academic Workflow',
            date: '28/11/2025',
            description: 'A master guide to managing Teaching, Research, and Code across multiple computers.',
            tags: ['workflow', 'academic', 'git', 'onedrive']
        },
        {
            id: 'anscombe_quartet.html',
            title: "Anscombe's Quartet",
            date: '24/11/2025',
            description: 'The importance of visualizing data before analyzing it.',
            tags: ['statistics', 'visualization', 'r']
        }
    ];

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-4" style={{ color: 'var(--vscode-text)', maxWidth: '800px', height: '100%', overflowY: 'auto' }}>
            <h1 className="mb-4">Blog Posts</h1>

            <div className="d-flex align-items-center mb-4" style={{
                backgroundColor: 'var(--vscode-input-background)',
                border: '1px solid var(--vscode-input-border)',
                padding: '8px 12px',
                borderRadius: '4px',
                maxWidth: '400px'
            }}>
                <VscSearch className="me-2" style={{ color: 'var(--vscode-input-foreground)' }} />
                <input
                    type="text"
                    placeholder="Search posts..."
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
            </div>

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
                            <span className="mb-2 d-block" style={{ fontSize: '12px', opacity: 0.7 }}>{post.date}</span>
                            <p className="mb-3 flex-grow-1" style={{ opacity: 0.9, fontSize: '0.9rem' }}>{post.description}</p>
                            <div className="d-flex gap-2 flex-wrap mt-auto">
                                {post.tags.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '11px',
                                        backgroundColor: 'var(--vscode-badge-background)',
                                        color: 'var(--vscode-badge-foreground)',
                                        padding: '2px 8px',
                                        borderRadius: '10px'
                                    }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="text-center opacity-50 mt-5">
                        No posts found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogViewer;
