import React, { useState, useEffect } from 'react';
import { VscClose, VscLightbulb } from 'react-icons/vsc';

const STORAGE_KEY = 'karim-ai-onboarding-dismissed';

const OnboardingTip = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        // Check if user has already dismissed the tip
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (!dismissed) {
            // Small delay for better UX - let the page load first
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
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
                top: '60px',
                left: '50%',
                transform: `translateX(-50%) ${isAnimatingOut ? 'translateY(-20px)' : 'translateY(0)'}`,
                zIndex: 1001,
                opacity: isAnimatingOut ? 0 : 1,
                transition: 'all 0.3s ease-out',
                animation: !isAnimatingOut ? 'fadeSlideIn 0.4s ease-out' : 'none'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--vscode-sidebar-bg)',
                    border: '1px solid var(--vscode-accent)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    color: 'var(--vscode-text)',
                    fontSize: '13px',
                    maxWidth: '90vw'
                }}
            >
                <VscLightbulb size={18} color="var(--vscode-accent)" style={{ flexShrink: 0 }} />
                <span>
                    <strong>Tip:</strong> Press <kbd style={{
                        backgroundColor: 'var(--vscode-hover-bg)',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontSize: '12px',
                        border: '1px solid var(--vscode-border)'
                    }}>⌘K</kbd> to search • Explore the <strong>sidebar</strong> to navigate
                </span>
                <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
                    <button
                        onClick={() => handleDismiss(false)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--vscode-descriptionForeground)',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        title="Dismiss"
                    >
                        <VscClose size={16} />
                    </button>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '8px'
                }}
            >
                <button
                    onClick={() => handleDismiss(true)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--vscode-descriptionForeground)',
                        cursor: 'pointer',
                        fontSize: '11px',
                        textDecoration: 'underline',
                        opacity: 0.7
                    }}
                >
                    Don't show again
                </button>
            </div>
        </div>
    );
};

export default OnboardingTip;
