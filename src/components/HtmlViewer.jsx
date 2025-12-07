import React, { useEffect, useRef } from 'react';
import { VscChevronRight } from 'react-icons/vsc';

const HtmlViewer = ({ activeFile, theme, setActiveFile, i18n }) => {
    const srcRef = useRef('');

    // Construct path logic
    let src = '';
    const lang = i18n.language;

    // Helper to get localized path
    const getLocalizedPath = (baseName) => {
        const supportedLangs = ['es', 'fr', 'pt'];
        if (supportedLangs.includes(lang) && (baseName === 'contact.html' || baseName === 'about_me.html')) {
            return `/${baseName.replace('.html', `.${lang}.html`)}?theme=${theme}`;
        }
        return `/${baseName}?theme=${theme}`;
    };

    if (activeFile === 'index.html') src = '/blog/index.html';
    else if (activeFile === 'anscombe_quartet.html') src = '/blog/posts/anscombe_quartet.html';
    else if (activeFile === 'git-vs-onedrive.html') src = '/blog/posts/git-vs-onedrive.html';
    else if (activeFile === 'academic_workflow.html') src = '/blog/posts/academic_workflow.html';
    else if (activeFile === 'first-post.html') src = '/blog/posts/first-post.html';
    else if (activeFile === 'projects.html') src = '/projects.html';
    else if (activeFile === 'certest.html') src = '/certest.html';
    else if (activeFile === 'gkn_prosperity.html') src = '/gkn_prosperity.html';
    else if (activeFile === 'phd_students.html') src = '/phd_students.html';
    else if (activeFile === 'about_me.html') src = getLocalizedPath('about_me.html');
    else if (activeFile === 'contact.html') src = getLocalizedPath('contact.html');

    const isBlogPost = src.includes('/blog/posts/');

    // Function to inject styles into iframe
    const injectStyles = (iframe) => {
        if (!iframe) return;
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Inject styles to override Quarto theme with VS Code theme
        const styleId = 'vscode-theme-override';
        let style = doc.getElementById(styleId);
        if (!style) {
            style = doc.createElement('style');
            style.id = styleId;
            doc.head.appendChild(style);
        }

        // Get computed styles from the parent document to match the exact theme
        const computedStyle = window.getComputedStyle(document.documentElement);

        // Determine if it's a dark theme based on the theme ID
        const lightThemes = ['light', 'solarized-light', 'github-light'];
        const isDark = !lightThemes.includes(theme);

        const bg = computedStyle.getPropertyValue('--vscode-editor-bg').trim() || (isDark ? '#1e1e1e' : '#ffffff');
        const text = computedStyle.getPropertyValue('--vscode-text').trim() || (isDark ? '#cccccc' : '#333333');
        const link = computedStyle.getPropertyValue('--vscode-accent').trim() || (isDark ? '#3794ff' : '#007acc');
        const border = computedStyle.getPropertyValue('--vscode-border').trim() || (isDark ? '#454545' : '#e4e4e4');
        const hoverBg = computedStyle.getPropertyValue('--vscode-hover-bg').trim() || (isDark ? '#2d2d2d' : '#f0f0f0');

        style.textContent = `
            body {
                background-color: ${bg} !important;
                color: ${text} !important;
            }
            /* Fix Background Image Visibility in Dark Mode */
            body::before {
                ${isDark ? 'filter: invert(1); opacity: 0.05;' : 'opacity: 0.08;'}
            }
            a { color: ${link} !important; }
            h1, h2, h3, h4, h5, h6 { color: ${text} !important; }
            .quarto-title-meta-heading { color: ${text} !important; opacity: 0.8; }
            .quarto-title-meta-contents { color: ${text} !important; }
            blockquote { border-left-color: ${border} !important; color: ${text} !important; opacity: 0.8; }
            code { background-color: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} !important; color: ${text} !important; }
            pre { background-color: ${bg} !important; border: 1px solid ${border} !important; }
            .code-block { background-color: ${bg} !important; color: ${text} !important; border-left-color: ${link} !important; }
            .table { color: ${text} !important; }
            .table th, .table td { border-color: ${border} !important; }

            /* Callout Fixes */
            .callout-tip {
                background-color: ${bg} !important;
                border-left-color: #4caf50 !important;
                color: ${text} !important;
            }
            .callout-tip .callout-header {
                background-color: ${hoverBg} !important;
                color: #4caf50 !important;
            }
            .callout-important {
                background-color: ${bg} !important;
                border-left-color: #f44336 !important;
                color: ${text} !important;
            }
            .callout-important .callout-header {
                background-color: ${hoverBg} !important;
                color: #f44336 !important;
            }

            /* Custom Box Styles for Academic Workflow Post */
            .os-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }

            .os-card {
                background-color: ${hoverBg} !important;
                border: 1px solid ${border} !important;
                border-radius: 8px;
                padding: 15px;
            }

            .mirror-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin: 20px 0;
            }

            .mirror-box {
                flex: 1;
                min-width: 300px;
                background-color: ${hoverBg} !important;
                border: 1px solid ${border} !important;
                border-radius: 8px;
                padding: 15px;
            }

            .mirror-title {
                font-weight: bold;
                font-size: 1.1em;
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid ${border} !important;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .folder-tree {
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                font-size: 0.9em;
                line-height: 1.5;
            }

            .dim {
                opacity: 0.6;
                font-size: 0.9em;
            }
        `;

        // Sync Giscus Theme
        const giscusTheme = isDark ? 'dark_high_contrast' : 'light';

        // Giscus loads asynchronously inside the iframe. We need to wait for it.
        const checkForGiscus = setInterval(() => {
            const giscusFrame = iframe.contentDocument.querySelector('iframe.giscus-frame');
            if (giscusFrame && giscusFrame.contentWindow) {
                giscusFrame.contentWindow.postMessage({
                    giscus: {
                        setConfig: {
                            theme: giscusTheme
                        }
                    }
                }, 'https://giscus.app');
                clearInterval(checkForGiscus);
            }
        }, 500);

        // Clear interval after 10 seconds to avoid infinite loop if Giscus never loads
        setTimeout(() => clearInterval(checkForGiscus), 10000);
    };

    const iframeRef = useRef(null);

    // Re-run injection when theme changes
    useEffect(() => {
        if (iframeRef.current) {
            injectStyles(iframeRef.current);
        }
    }, [theme]);

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-editor-bg)' }}>
            {isBlogPost && (
                <div className="p-2 border-bottom" style={{ borderColor: 'var(--vscode-border)' }}>
                    <button
                        className="btn btn-sm"
                        onClick={() => setActiveFile('blog.html')}
                        style={{
                            color: 'var(--vscode-text)',
                            backgroundColor: 'var(--vscode-button-background)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--vscode-button-hover-background)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--vscode-button-background)'}
                    >
                        <VscChevronRight style={{ transform: 'rotate(180deg)' }} />
                        Back to Blog
                    </button>
                </div>
            )}
            <iframe
                ref={iframeRef}
                key={src} // Key is just src now, no theme param
                src={src}
                style={{ width: '100%', flexGrow: 1, border: 'none', backgroundColor: 'var(--vscode-editor-bg)' }}
                title="Blog Post"
                onLoad={(e) => injectStyles(e.target)}
            />
        </div>
    );
};

export default HtmlViewer;
