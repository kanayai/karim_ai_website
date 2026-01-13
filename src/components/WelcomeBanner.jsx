import React, { useState, useEffect } from 'react';
import { VscClose } from 'react-icons/vsc';

const STORAGE_KEY = 'karim-ai-welcome-dismissed';

const WelcomeBanner = ({ onSimpleModeClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (!dismissed) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem(STORAGE_KEY, 'true');
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '50px',
                left: '50%',
                transform: `translateX(-50%) ${isAnimatingOut ? 'translateY(-10px)' : 'translateY(0)'}`,
                zIndex: 1000,
                opacity: isAnimatingOut ? 0 : 1,
                transition: 'all 0.3s ease-out',
                animation: !isAnimatingOut ? 'fadeSlideIn 0.4s ease-out' : 'none',
                maxWidth: '500px',
                width: '90%'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 16px',
                    backgroundColor: 'var(--vscode-notifications-bg)',
                    border: '1px solid var(--vscode-notifications-border)',
                    borderRadius: '6px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    color: 'var(--vscode-notifications-foreground)',
                    fontSize: '13px'
                }}
            >
                <span style={{ fontSize: '20px', flexShrink: 0 }}>👋</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                        Welcome to Karim's Portfolio!
                    </div>
                    <div style={{ opacity: 0.85, lineHeight: 1.5 }}>
                        This site is designed to look like VS Code. Explore using the sidebar, or{' '}
                        <button
                            onClick={() => {
                                if (onSimpleModeClick) onSimpleModeClick();
                                handleDismiss();
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--vscode-accent)',
                                cursor: 'pointer',
                                padding: 0,
                                textDecoration: 'underline',
                                fontSize: 'inherit'
                            }}
                        >
                            switch to Simple Mode
                        </button>{' '}
                        for a cleaner view.
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--vscode-descriptionForeground)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        opacity: 0.7,
                        flexShrink: 0
                    }}
                    title="Dismiss"
                    aria-label="Dismiss welcome message"
                >
                    <VscClose size={16} />
                </button>
            </div>
        </div>
    );
};

export default WelcomeBanner;
