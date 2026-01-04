import React, { useState, useEffect } from 'react';
import { VscClose, VscLightbulb } from 'react-icons/vsc';

const STORAGE_KEY = 'karim-ai-onboarding-dismissed';
const AUTO_DISMISS_DELAY = 7000; // Auto-dismiss after 7 seconds

// Detect platform for keyboard shortcut display
const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const searchKey = isMac ? '⌘K' : 'Ctrl+K';

const OnboardingTip = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        // Check if user has already dismissed the tip
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (!dismissed) {
            // Small delay for better UX - let the page load first
            const showTimer = setTimeout(() => setIsVisible(true), 1000);

            // Auto-dismiss after 7 seconds
            const autoDismissTimer = setTimeout(() => {
                if (!localStorage.getItem(STORAGE_KEY)) {
                    handleDismiss(false);
                }
            }, 1000 + AUTO_DISMISS_DELAY);

            return () => {
                clearTimeout(showTimer);
                clearTimeout(autoDismissTimer);
            };
        }
    }, []);

    const handleDismiss = (permanently = false) => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsVisible(false);
            if (permanently) {
                localStorage.setItem(STORAGE_KEY, 'true');
            }
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '28px', // Position above status bar
                right: '20px',
                zIndex: 1001,
                opacity: isAnimatingOut ? 0 : 1,
                transform: isAnimatingOut ? 'translateY(10px)' : 'translateY(0)',
                transition: 'all 0.3s ease-out',
                animation: !isAnimatingOut ? 'fadeSlideIn 0.4s ease-out' : 'none',
                maxWidth: '420px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--vscode-notifications-bg)',
                    border: '1px solid var(--vscode-notifications-border)',
                    borderRadius: '4px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.25)',
                    color: 'var(--vscode-notifications-foreground)',
                    fontSize: '12px'
                }}
            >
                <VscLightbulb size={16} color="var(--vscode-accent)" style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>
                    Press <kbd style={{
                        backgroundColor: 'var(--vscode-hover-bg)',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        border: '1px solid var(--vscode-border)',
                        fontFamily: 'monospace'
                    }}>{searchKey}</kbd> to search
                </span>
                <button
                    onClick={() => handleDismiss(true)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--vscode-descriptionForeground)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        opacity: 0.8
                    }}
                    title="Don't show again"
                    aria-label="Dismiss tip"
                >
                    <VscClose size={14} />
                </button>
            </div>
        </div>
    );
};

export default OnboardingTip;
