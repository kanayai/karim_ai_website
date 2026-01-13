import React, { useState } from 'react';
import { VscShield, VscFolder, VscQuestion } from 'react-icons/vsc';

const TrustModal = ({ onTrust, onDistrust }) => {
    const [isChecked, setIsChecked] = useState(true);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px',
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: '#252526',
                color: '#cccccc',
                width: '600px',
                maxWidth: '90vw',
                borderRadius: '5px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                border: '1px solid #454545',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #333333',
                    fontSize: '14px',
                    fontWeight: 500
                }}>
                    Do you trust the authors of the files in this folder?
                </div>

                {/* Body */}
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                        <VscShield size={64} color="#519aba" style={{ flexShrink: 0 }} />
                        <div>
                            <p style={{ margin: '0 0 15px 0', lineHeight: '1.5', fontSize: '13px' }}>
                                <span style={{ fontWeight: 'bold', color: '#fff' }}>Karim AI Website</span> provides features that may automatically execute code from this workspace.
                            </p>
                            <p style={{ margin: '0', lineHeight: '1.5', fontSize: '13px', opacity: 0.8 }}>
                                If you don't trust the authors of these files, we recommend you continue in restricted mode. Some features may be disabled to protect your security.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#1e1e1e',
                        border: '1px solid #3c3c3c',
                        borderRadius: '3px',
                        padding: '10px 15px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <VscFolder size={18} />
                        <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>karim_ai_website</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <input
                            type="checkbox"
                            id="trust-checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            style={{ accentColor: '#0078d4' }}
                        />
                        <label htmlFor="trust-checkbox" style={{ fontSize: '13px', cursor: 'pointer' }}>
                            Trust the authors of all files in the parent folder 'karim_ai_website'
                        </label>
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <button
                        onClick={onTrust}
                        style={{
                            backgroundColor: '#0078d4',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '2px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontWeight: 500
                        }}
                    >
                        Yes, I trust the authors
                    </button>
                    <button
                        onClick={onDistrust}
                        style={{
                            backgroundColor: '#3c3c3c',
                            color: 'white',
                            border: '1px solid transparent',
                            padding: '8px 16px',
                            borderRadius: '2px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}
                    >
                        No, I don't trust the authors
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrustModal;
