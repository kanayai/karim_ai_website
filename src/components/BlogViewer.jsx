import React, { useEffect, useMemo, useState } from 'react';
import {
    VscBook,
    VscClose,
    VscCommentDiscussion,
    VscRobot,
    VscSearch,
    VscSend,
    VscSparkle,
} from 'react-icons/vsc';
import Fuse from 'fuse.js';
import { blogPosts } from '../constants/blogData';

const promptPresets = [
    {
        label: 'What should I read first?',
        query: '',
        tags: [],
        reply: 'Start with the workflow notes if you want the organising system, then move to reproducibility once the project structure makes sense.',
    },
    {
        label: 'Show reproducibility notes',
        query: 'reproducibility',
        tags: ['reproducibility'],
        reply: 'I found notes about making computational work easier to rerun, inspect, and trust.',
    },
    {
        label: 'Help me organise academic work',
        query: 'workflow',
        tags: ['workflow'],
        reply: 'These notes focus on project organisation, syncing, and keeping research, teaching, and code coherent across machines.',
    },
    {
        label: 'Find statistics tutorials',
        query: 'tutorial python',
        tags: ['tutorial'],
        reply: 'Here are the tutorial-style notes with code or statistical examples.',
    },
];

const formatTags = (tags) => tags.map(tag => `#${tag}`).join(' ');

const BlogViewer = ({ setActiveFile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [generatedPosts, setGeneratedPosts] = useState(null);
    const [activePrompt, setActivePrompt] = useState(promptPresets[0]);

    useEffect(() => {
        let isMounted = true;

        const loadGeneratedMetadata = async () => {
            try {
                const [listingResponse, searchResponse] = await Promise.all([
                    fetch('/blog/listings.json'),
                    fetch('/blog/search.json'),
                ]);
                if (!listingResponse.ok || !searchResponse.ok) return;

                const [listingData, searchData] = await Promise.all([
                    listingResponse.json(),
                    searchResponse.json(),
                ]);

                const listedHrefs = listingData?.[0]?.items || [];
                const rootEntries = searchData.filter(item =>
                    item.href?.startsWith('posts/') &&
                    !item.href.includes('#') &&
                    !item.section
                );
                const searchByFile = new Map(rootEntries.map(item => [
                    item.href.replace('posts/', ''),
                    item,
                ]));
                const fallbackByFile = new Map(blogPosts.map(post => [post.id, post]));

                const mergedPosts = listedHrefs.map(href => {
                    const id = href.replace('/posts/', '').replace('posts/', '');
                    const generated = searchByFile.get(id);
                    const fallback = fallbackByFile.get(id);
                    const excerpt = generated?.text?.split('\n').find(Boolean);

                    return {
                        ...(fallback || {
                            id,
                            date: '',
                            tags: [],
                            readingTime: 5,
                        }),
                        id,
                        title: generated?.title || fallback?.title || id,
                        description: fallback?.description || excerpt || '',
                    };
                });

                if (isMounted && mergedPosts.length > 0) {
                    setGeneratedPosts(mergedPosts);
                }
            } catch {
                // Keep the local fallback; the generated Quarto JSON may not exist in dev yet.
            }
        };

        loadGeneratedMetadata();
        return () => {
            isMounted = false;
        };
    }, []);

    const posts = generatedPosts || blogPosts;

    const fuse = useMemo(() => new Fuse(posts, {
        keys: [
            { name: 'title', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'tags', weight: 1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
    }), [posts]);

    const allTags = useMemo(() => [...new Set(posts.flatMap(post => post.tags))].sort(), [posts]);

    const filteredPosts = useMemo(() => {
        let filtered = posts;

        if (searchTerm.trim()) {
            filtered = fuse.search(searchTerm).map(result => result.item);
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter(post =>
                selectedTags.every(tag => post.tags.includes(tag))
            );
        }

        return filtered;
    }, [fuse, posts, searchTerm, selectedTags]);

    const hasActiveFilters = Boolean(searchTerm.trim() || selectedTags.length > 0);
    const assistantReply = hasActiveFilters
        ? `I found ${filteredPosts.length} ${filteredPosts.length === 1 ? 'note' : 'notes'} matching ${searchTerm.trim() ? `"${searchTerm.trim()}"` : 'your selected tags'}${selectedTags.length ? ` (${formatTags(selectedTags)})` : ''}.`
        : activePrompt.reply;

    const topicGroups = useMemo(() => {
        const groups = [
            { label: 'Reproducibility', tags: ['reproducibility'], count: 0 },
            { label: 'Workflow', tags: ['workflow'], count: 0 },
            { label: 'Code + Tools', tags: ['git', 'python', 'r'], count: 0 },
            { label: 'Statistics', tags: ['tutorial'], count: 0 },
        ];

        return groups.map(group => ({
            ...group,
            count: posts.filter(post => group.tags.some(tag => post.tags.includes(tag))).length,
        }));
    }, [posts]);

    const applyPrompt = (prompt) => {
        setActivePrompt(prompt);
        setSearchTerm(prompt.query);
        setSelectedTags(prompt.tags);
    };

    const applyTopic = (tags) => {
        setActivePrompt(null);
        setSearchTerm('');
        setSelectedTags(tags);
    };

    const toggleTag = (tag) => {
        setActivePrompt(null);
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTags([]);
        setActivePrompt(promptPresets[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setActivePrompt(null);
    };

    return (
        <div className="blog-viewer ai-journal">
            <aside className="ai-agent-sidebar" aria-label="Journal topics">
                <div className="ai-agent-brand">
                    <div className="ai-agent-orb" aria-hidden="true">
                        <VscRobot />
                    </div>
                    <div>
                        <div className="ai-agent-label">Journal Agent</div>
                        <div className="ai-agent-status">Curated from Karim's notes</div>
                    </div>
                </div>

                <div className="ai-agent-section-label">Topics</div>
                <div className="ai-topic-list">
                    {topicGroups.map(topic => {
                        const isActive = topic.tags.every(tag => selectedTags.includes(tag));
                        return (
                            <button
                                key={topic.label}
                                type="button"
                                className={`ai-topic-button ${isActive ? 'active' : ''}`}
                                onClick={() => applyTopic(topic.tags)}
                            >
                                <span>{topic.label}</span>
                                <span>{topic.count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="ai-agent-section-label">Available Tags</div>
                <div className="ai-mini-tags">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            className={selectedTags.includes(tag) ? 'active' : ''}
                            onClick={() => toggleTag(tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </aside>

            <main className="ai-agent-main">
                <header className="ai-agent-header">
                    <div>
                        <div className="blog-viewer-kicker">AI-style Journal</div>
                        <h1>Research Companion</h1>
                        <p>Ask a question or tap a prompt to browse the current blog notes.</p>
                    </div>
                    <div className="blog-viewer-count">{posts.length} notes</div>
                </header>

                <section className="ai-chat-thread" aria-live="polite">
                    <div className="ai-message user-message">
                        <div className="ai-message-avatar">
                            <VscCommentDiscussion />
                        </div>
                        <div className="ai-message-body">
                            <div className="ai-message-name">Visitor</div>
                            <p>{searchTerm.trim() || activePrompt?.label || 'What is in this journal?'}</p>
                        </div>
                    </div>

                    <div className="ai-message assistant-message">
                        <div className="ai-message-avatar">
                            <VscSparkle />
                        </div>
                        <div className="ai-message-body">
                            <div className="ai-message-name">Research Companion</div>
                            <p>{assistantReply}</p>
                        </div>
                    </div>

                    <div className="ai-result-grid">
                        {filteredPosts.map(post => (
                            <article key={post.id} className="ai-result-card">
                                <div className="ai-result-card-topline">
                                    <span>{post.date}</span>
                                    <span>{post.readingTime} min read</span>
                                </div>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <div className="ai-result-tags">
                                    {post.tags.map(tag => (
                                        <button
                                            key={tag}
                                            type="button"
                                            className={selectedTags.includes(tag) ? 'active' : ''}
                                            onClick={() => toggleTag(tag)}
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="ai-open-note"
                                    onClick={() => setActiveFile(post.id)}
                                >
                                    <VscBook />
                                    <span>Open note</span>
                                </button>
                            </article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="ai-empty-state">
                            <VscSearch />
                            <div>No matching notes yet.</div>
                            <button type="button" onClick={clearFilters}>Reset conversation</button>
                        </div>
                    )}
                </section>

                <section className="ai-composer-panel" aria-label="Journal prompt controls">
                    <div className="ai-prompt-chips">
                        {promptPresets.map(prompt => (
                            <button
                                key={prompt.label}
                                type="button"
                                className={activePrompt?.label === prompt.label ? 'active' : ''}
                                onClick={() => applyPrompt(prompt)}
                            >
                                {prompt.label}
                            </button>
                        ))}
                    </div>

                    <form className="ai-composer" onSubmit={handleSubmit}>
                        <VscSearch className="ai-composer-search" />
                        <input
                            type="text"
                            placeholder="Ask about Git, reproducibility, workflow, Python..."
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                                setActivePrompt(null);
                            }}
                        />
                        {hasActiveFilters && (
                            <button type="button" className="ai-composer-icon" onClick={clearFilters} aria-label="Clear journal filters">
                                <VscClose />
                            </button>
                        )}
                        <button type="submit" className="ai-send-button" aria-label="Search journal">
                            <VscSend />
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default BlogViewer;
