import React, { useEffect } from 'react';
import { VscCheck, VscInfo, VscWarning, VscError, VscClose } from 'react-icons/vsc';
import './Toast.css';

const Toast = ({ id, message, type = 'info', duration = 3000, onClose }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const icons = {
        success: <VscCheck />,
        info: <VscInfo />,
        warning: <VscWarning />,
        error: <VscError />
    };

    const icon = icons[type] || icons.info;

    return (
        <div
            className={`vscode-toast vscode-toast-${type}`}
            role="status"
            aria-live={type === 'error' ? 'assertive' : 'polite'}
        >
            <div className="vscode-toast-icon">{icon}</div>
            <div className="vscode-toast-message">{message}</div>
            <button
                className="vscode-toast-close"
                onClick={() => onClose(id)}
                aria-label="Close notification"
            >
                <VscClose />
            </button>
        </div>
    );
};

export default Toast;
