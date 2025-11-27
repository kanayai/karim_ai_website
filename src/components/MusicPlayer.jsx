import React from 'react';

const MusicPlayer = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100" style={{ color: 'var(--vscode-text)', backgroundColor: 'var(--vscode-editor-bg)' }}>
            <div style={{ width: '100%', maxWidth: '800px', padding: '20px' }}>
                <h2 className="mb-4 text-center">🎵 Lo-Fi Coding Radio</h2>
                <div className="ratio ratio-16x9" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    <iframe
                        src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0"
                        title="lofi hip hop radio - beats to relax/study to"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mt-4 text-center">
                    <p style={{ color: '#858585' }}>
                        "lofi hip hop radio - beats to relax/study to" by Lofi Girl
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <button className="btn btn-sm btn-outline-secondary" disabled>⏮ Prev</button>
                        <button className="btn btn-sm btn-primary" disabled>Play / Pause (Use Video Controls)</button>
                        <button className="btn btn-sm btn-outline-secondary" disabled>Next ⏭</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
