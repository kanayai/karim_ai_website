import React from 'react';
import { VscSourceControl, VscBell, VscCheck, VscFeedback } from 'react-icons/vsc';

const Statusbar = () => {
    return (
        <div className="d-flex justify-content-between align-items-center px-2"
            style={{
                backgroundColor: 'var(--vscode-status-bar-bg)',
                color: '#ffffff',
                height: '22px',
                fontSize: '12px',
                userSelect: 'none'
            }}>
            <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                    <VscSourceControl />
                    <span>main*</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <VscCheck />
                    <span>0 errors</span>
                </div>
            </div>
            <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                    <span>Ln 12, Col 45</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <span>UTF-8</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <span>React</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <VscFeedback />
                </div>
                <div className="d-flex align-items-center gap-1">
                    <VscBell />
                </div>
            </div>
        </div>
    );
};

export default Statusbar;
