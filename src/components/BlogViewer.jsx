import React, { useEffect, useMemo, useState } from 'react';
import {
    VscBook,
    VscChromeClose,
    VscNewFile,
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
        reply: 'These notes focus on making computational work easier to rerun, inspect, and trust.',
    },
    {
        label: 'Help me organise academic work',
        query: 'workflow',
        tags: ['workflow'],
        reply: 'These notes are about keeping research, teaching, code, and files coherent across machines.',
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
    const [activePrompt, setActivePrompt] = useState(null);
    const [hasInteracted, setHasInteracted] = useState(false);

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

    const visiblePosts = filteredPosts;
    const hasActiveFilters = Boolean(searchTerm.trim() || selectedTags.length > 0);
    const userPrompt = searchTerm.trim() || activePrompt?.label || "Browse Karim's journal";
    const assistantReply = hasActiveFilters
        ? `I found ${filteredPosts.length} ${filteredPosts.length === 1 ? 'note' : 'notes'} matching ${searchTerm.trim() ? `"${searchTerm.trim()}"` : 'your selected tags'}${selectedTags.length ? ` (${formatTags(selectedTags)})` : ''}.`
        : activePrompt?.reply || 'Choose a prompt, search the notes, or open one of the latest entries.';

    const applyPrompt = (prompt) => {
        setActivePrompt(prompt);
        setSearchTerm(prompt.query);
        setSelectedTags(prompt.tags);
        setHasInteracted(true);
    };

    const toggleTag = (tag) => {
        setActivePrompt(null);
        setHasInteracted(true);
        setSearchTerm('');
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const resetJournal = () => {
        setSearchTerm('');
        setSelectedTags([]);
        setActivePrompt(null);
        setHasInteracted(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setActivePrompt(null);
        setHasInteracted(true);
    };

    return (
        <div className="ai-home">
            <aside className="ai-home-rail" aria-label="Journal controls">
                <div className="ai-home-mark">
                    <VscRobot />
                </div>
                <button type="button" className="ai-rail-button active" onClick={resetJournal} aria-label="New journal search">
                    <VscNewFile />
                </button>
                <button type="button" className="ai-rail-button" onClick={() => applyPrompt(promptPresets[0])} aria-label="Suggested reading">
                    <VscSparkle />
                </button>
            </aside>

            <main className={`ai-home-main ${hasInteracted ? 'conversation-open' : ''}`}>
                <section className="ai-home-panel" aria-label="Journal assistant">
                    <div className="ai-home-intro">
                        <div className="ai-home-kicker">Journal Agent</div>
                        <h1>Ask Karim's Journal</h1>
                        <p>Search the notes or tap a suggested prompt.</p>
                    </div>

                    <form className="ai-home-prompt" onSubmit={handleSubmit}>
                        <textarea
                            rows="3"
                            placeholder="Ask about reproducibility, Git, workflow, Python tutorials..."
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                                setActivePrompt(null);
                            }}
                        />
                        <div className="ai-home-prompt-footer">
                            <div className="ai-home-model-pill">
                                <VscSparkle />
                                <span>Journal search</span>
                            </div>
                            {hasActiveFilters && (
                                <button type="button" className="ai-home-clear" onClick={resetJournal} aria-label="Clear journal search">
                                    <VscChromeClose />
                                </button>
                            )}
                            <button type="submit" className="ai-home-send">
                                <VscSend />
                                <span>Ask</span>
                            </button>
                        </div>
                    </form>

                    {!hasInteracted && (
                        <div className="ai-suggestion-grid">
                            {promptPresets.map(prompt => (
                                <button key={prompt.label} type="button" onClick={() => applyPrompt(prompt)}>
                                    <span>{prompt.label}</span>
                                    <small>{prompt.reply}</small>
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                {hasInteracted && (
                    <section className="ai-conversation" aria-live="polite">
                        <div className="ai-turn ai-turn-user">
                            <div className="ai-turn-avatar">K</div>
                            <div className="ai-turn-content">
                                <div className="ai-turn-name">Visitor</div>
                                <p>{userPrompt}</p>
                            </div>
                        </div>

                        <div className="ai-turn ai-turn-assistant">
                            <div className="ai-turn-avatar">
                                <VscSparkle />
                            </div>
                            <div className="ai-turn-content">
                                <div className="ai-turn-name">Journal Agent</div>
                                <p>{assistantReply}</p>
                            </div>
                        </div>

                        <div className="ai-note-strip">
                            <div className="ai-note-strip-header">
                                <span>Recommended notes</span>
                                <span>{visiblePosts.length} shown</span>
                            </div>
                            <div className="ai-note-list">
                                {visiblePosts.map(post => (
                                    <article key={post.id} className="ai-note-card">
                                        <button type="button" className="ai-note-main" onClick={() => setActiveFile(post.id)}>
                                            <span className="ai-note-meta">{post.date} / {post.readingTime} min read</span>
                                            <strong>{post.title}</strong>
                                            <span>{post.description}</span>
                                        </button>
                                        <div className="ai-note-tags">
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
                                        <button type="button" className="ai-note-open" onClick={() => setActiveFile(post.id)}>
                                            <VscBook />
                                            <span>Open</span>
                                        </button>
                                    </article>
                                ))}
                            </div>

                            {filteredPosts.length === 0 && (
                                <div className="ai-no-results">
                                    <VscSearch />
                                    <span>No matching notes yet.</span>
                                    <button type="button" onClick={resetJournal}>Reset</button>
                                </div>
                            )}
                        </div>

                        <div className="ai-mobile-tags" aria-label="Journal tags">
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
                    </section>
                )}
            </main>
        </div>
    );
};

export default BlogViewer;
