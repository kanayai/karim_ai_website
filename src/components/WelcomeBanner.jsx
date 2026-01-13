import React, { useState, useEffect } from 'react';
import { VscShield } from 'react-icons/vsc';

const STORAGE_KEY = 'karim-ai-welcome-dismissed';

// Keyhole SVG icon matching VS Code's workspace trust dialog
const KeyholeIcon = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield shape background */}
        <path
            d="M40 4L8 16V36C8 54.8 21.6 72.4 40 76C58.4 72.4 72 54.8 72 36V16L40 4Z"
            fill="var(--vscode-accent, #0078d4)"
        />
        {/* Keyhole */}
        <circle cx="40" cy="32" r="10" fill="#1e1e1e" />
        <path d="M34 38L32 56H48L46 38H34Z" fill="#1e1e1e" />
    </svg>
);

const WelcomeBanner = ({ onSimpleModeClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (!dismissed) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 300);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem(STORAGE_KEY, 'true');
        }, 250);
    };

    const handleSimpleMode = () => {
        if (onSimpleModeClick) onSimpleModeClick();
        handleDismiss();
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isAnimatingOut ? 0 : 1,
                transition: 'opacity 0.25s ease-out',
                padding: '20px'
            }}
            onClick={handleDismiss}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'var(--vscode-editor-bg, #1e1e1e)',
                    border: '1px solid var(--vscode-panel-border, #454545)',
                    borderRadius: '6px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    maxWidth: '500px',
                    width: '100%',
                    overflow: 'hidden',
                    transform: isAnimatingOut ? 'scale(0.95)' : 'scale(1)',
                    transition: 'transform 0.25s ease-out'
                }}
            >
                {/* Header with keyhole icon */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '40px 32px 24px',
                        textAlign: 'center'
                    }}
                >
                    <KeyholeIcon />
                    <h2
                        style={{
                            fontSize: '18px',
                            fontWeight: 400,
                            color: 'var(--vscode-foreground, #cccccc)',
                            margin: '24px 0 12px 0',
                            lineHeight: 1.4
                        }}
                    >
                        Do you trust the authors of this portfolio?
                    </h2>
                    <p
                        style={{
                            fontSize: '13px',
                            color: 'var(--vscode-descriptionForeground, #8b8b8b)',
                            margin: 0,
                            lineHeight: 1.6,
                            maxWidth: '400px'
                        }}
                    >
                        This site is designed to look like VS Code. You can explore using the
                        sidebar on the left, or switch to a simplified view if you prefer.
                    </p>
                </div>

                {/* Side-by-side Trust Buttons */}
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '0 32px 32px',
                        justifyContent: 'center'
                    }}
                >
                    <button
                        onClick={handleSimpleMode}
                        style={{
                            flex: 1,
                            maxWidth: '180px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            fontWeight: 400,
                            backgroundColor: 'transparent',
                            color: 'var(--vscode-foreground, #cccccc)',
                            border: '1px solid var(--vscode-panel-border, #454545)',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            transition: 'background-color 0.1s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--vscode-list-hover-bg, #2a2d2e)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        No, browse safely
                    </button>
                    <button
                        onClick={handleDismiss}
                        style={{
                            flex: 1,
                            maxWidth: '180px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            fontWeight: 400,
                            backgroundColor: 'var(--vscode-accent, #0078d4)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            transition: 'background-color 0.1s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--vscode-accent-hover, #005a9e)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--vscode-accent, #0078d4)'}
                    >
                        Yes, I trust the authors
                    </button>
                </div>

                {/* Learn more link */}
                <div
                    style={{
                        borderTop: '1px solid var(--vscode-panel-border, #454545)',
                        padding: '12px 32px',
                        textAlign: 'center'
                    }}
                >
                    <span
                        style={{
                            fontSize: '12px',
                            color: 'var(--vscode-textLink-foreground, #3794ff)',
                            cursor: 'pointer'
                        }}
                        onClick={handleDismiss}
                    >
                        Learn more about workspace trust
                    </span>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;
