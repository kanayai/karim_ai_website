import React from 'react';
import { VscLaw, VscVerified } from 'react-icons/vsc';

const LicenseViewer = ({ content }) => {
    return (
        <div className="d-flex flex-column h-100 align-items-center justify-content-center" style={{ backgroundColor: 'var(--vscode-editor-bg)', color: 'var(--vscode-text)', overflow: 'auto', padding: '20px' }}>

            <div className="license-card fade-in-up" style={{
                maxWidth: '800px',
                backgroundColor: 'var(--vscode-sidebar-bg)',
                border: '4px double var(--vscode-accent)',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                position: 'relative'
            }}>
                {/* Badge */}
                <div style={{ position: 'absolute', top: '-15px', right: '-15px', transform: 'rotate(15deg)' }}>
                    <div style={{
                        backgroundColor: 'var(--vscode-accent)',
                        color: 'var(--vscode-bg)',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <VscVerified size={20} /> APPROVED
                    </div>
                </div>

                <div className="text-center mb-4">
                    <VscLaw size={48} color="var(--vscode-text)" style={{ opacity: 0.8 }} />
                    <h1 style={{ marginTop: '10px', fontSize: '2rem', fontFamily: 'serif', letterSpacing: '2px' }}>MIT License</h1>
                    <div style={{ height: '2px', width: '100px', background: 'var(--vscode-text)', margin: '10px auto', opacity: 0.3 }}></div>
                </div>

                <div style={{
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    opacity: 0.9,
                    whiteSpace: 'pre-wrap',
                    textAlign: 'justify'
                }}>
                    {content}
                </div>

                <div className="mt-5 pt-3 border-top d-flex justify-content-between align-items-end" style={{ borderColor: 'var(--vscode-border)' }}>
                    <div>
                        <small style={{ opacity: 0.5, fontSize: '10px', textTransform: 'uppercase' }}>Licensed to</small>
                        <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: 'var(--vscode-accent)' }}>Karim Anaya-Izquierdo</div>
                    </div>
                    <div className="text-end">
                        <small style={{ opacity: 0.5, fontSize: '10px', textTransform: 'uppercase' }}>Valid indefinitely</small>
                        <div style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>OPEN SOURCE</div>
                    </div>
                </div>
            </div>

            <style>{`
                .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; transform: translateY(20px); }
                @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default LicenseViewer;
