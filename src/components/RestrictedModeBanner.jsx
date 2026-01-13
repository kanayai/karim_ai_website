import React from 'react';

const RestrictedModeBanner = ({ onManage }) => {
    return (
        <div style={{
            backgroundColor: '#4d2a5d', // Purplish warning background
            color: '#fff',
            padding: '4px 12px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #000'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600 }}>Restricted Mode</span>
                <span>Workspace Trust is restricted. Some features may be disabled.</span>
            </div>
            <button
                onClick={onManage}
                style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: 'white',
                    padding: '2px 10px',
                    fontSize: '11px',
                    borderRadius: '2px',
                    cursor: 'pointer'
                }}
            >
                Manage
            </button>
        </div>
    );
};

export default RestrictedModeBanner;
