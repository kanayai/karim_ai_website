import React, { useState, useEffect, useRef } from 'react';

/**
 * Reading progress indicator bar that shows scroll progress
 * Displays as a thin accent-colored bar at the top of the content
 */
const ReadingProgress = ({ containerRef }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const scrollableHeight = scrollHeight - clientHeight;
            if (scrollableHeight > 0) {
                const currentProgress = (scrollTop / scrollableHeight) * 100;
                setProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        container.addEventListener('scroll', handleScroll);
        // Initial calculation
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, [containerRef]);

    // Don't show if there's nothing to scroll
    if (progress === 0 && containerRef?.current?.scrollHeight <= containerRef?.current?.clientHeight) {
        return null;
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: 'var(--vscode-border)',
                zIndex: 10
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: 'var(--vscode-accent)',
                    transition: 'width 0.1s ease-out',
                    boxShadow: progress > 0 ? '0 0 8px var(--vscode-accent)' : 'none'
                }}
            />
        </div>
    );
};

export default ReadingProgress;
