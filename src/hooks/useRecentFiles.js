import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'karim-ai-recent-files';
const MAX_RECENT_FILES = 5;

/**
 * Custom hook for managing recently opened files
 * Persists to localStorage with timestamps
 */
export const useRecentFiles = () => {
    const [recentFiles, setRecentFiles] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setRecentFiles(parsed);
            }
        } catch (e) {
            console.warn('Failed to load recent files:', e);
        }
    }, []);

    // Add a file to recent list
    const addRecentFile = useCallback((fileName) => {
        // Skip welcome page and certain special files
        if (!fileName || fileName === 'Welcome' || fileName.startsWith('lofi-') || fileName === 'LaTeX' || fileName === 'cite-gen' || fileName === 'data-viz') {
            return;
        }

        setRecentFiles(prev => {
            // Remove if already exists
            const filtered = prev.filter(f => f.name !== fileName);

            // Add to beginning with timestamp
            const updated = [
                { name: fileName, timestamp: Date.now() },
                ...filtered
            ].slice(0, MAX_RECENT_FILES);

            // Persist to localStorage
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                console.warn('Failed to save recent files:', e);
            }

            return updated;
        });
    }, []);

    // Clear all recent files
    const clearRecentFiles = useCallback(() => {
        setRecentFiles([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return { recentFiles, addRecentFile, clearRecentFiles };
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return days === 1 ? 'Yesterday' : `${days} days ago`;
    if (hours > 0) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    if (minutes > 0) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    return 'Just now';
};

export default useRecentFiles;
