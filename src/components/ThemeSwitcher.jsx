import React from 'react';
import { VscCheck } from 'react-icons/vsc';

const ThemeSwitcher = ({ currentTheme, setTheme }) => {
    const themes = [
        { id: 'dark', name: 'Dark+ (Default)', color: '#1e1e1e', textColor: '#d4d4d4' },
        { id: 'light', name: 'Light+', color: '#ffffff', textColor: '#333333' },
        { id: 'monokai', name: 'Monokai', color: '#272822', textColor: '#f8f8f2' },
        { id: 'github-dark', name: 'GitHub Dark', color: '#0d1117', textColor: '#c9d1d9' }
    ];

    return (
        <div className="p-4" style={{ color: 'var(--vscode-text)', maxWidth: '800px' }}>
            <h2 className="mb-4">Color Themes</h2>
            <p className="mb-4" style={{ opacity: 0.8 }}>Select a color theme for the workbench.</p>

            <div className="d-flex flex-column gap-2">
                {themes.map(theme => (
                    <div
                        key={theme.id}
                        className="d-flex align-items-center p-3 rounded"
                        style={{
                            backgroundColor: 'var(--vscode-list-hover-bg)',
                            cursor: 'pointer',
                            border: currentTheme === theme.id ? '1px solid var(--vscode-focusBorder)' : '1px solid transparent'
                        }}
                        onClick={() => setTheme(theme.id)}
                    >
                        <div
                            className="me-3 rounded-circle"
                            style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: theme.color,
                                border: '1px solid #555'
                            }}
                        ></div>
                        <div className="flex-grow-1">
                            <div style={{ fontWeight: 'bold' }}>{theme.name}</div>
                            <div style={{ fontSize: '12px', opacity: 0.7 }}>{theme.id}</div>
                        </div>
                        {currentTheme === theme.id && <VscCheck size={20} color="var(--vscode-accent)" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
