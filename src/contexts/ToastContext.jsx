import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

let toastId = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    console.log('🍞 ToastProvider render, toasts:', toasts);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = toastId++;
        console.log('🍞 Adding toast:', { id, message, type, duration });
        setToasts(prev => {
            const newToasts = [...prev, { id, message, type, duration }];
            console.log('🍞 New toasts array:', newToasts);
            return newToasts;
        });
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        console.log('🍞 Removing toast:', id);
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showSuccess = useCallback((message, duration) => {
        console.log('🍞 showSuccess called:', message);
        return addToast(message, 'success', duration);
    }, [addToast]);

    const showInfo = useCallback((message, duration) => {
        console.log('🍞 showInfo called:', message);
        return addToast(message, 'info', duration);
    }, [addToast]);

    const showWarning = useCallback((message, duration) => {
        console.log('🍞 showWarning called:', message);
        return addToast(message, 'warning', duration);
    }, [addToast]);

    const showError = useCallback((message, duration) => {
        console.log('🍞 showError called:', message);
        return addToast(message, 'error', duration);
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, showSuccess, showInfo, showWarning, showError }}>
            {children}
            <div className="vscode-toast-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10000 }}>
                {console.log('🍞 Rendering toast container with', toasts.length, 'toasts')}
                {toasts.map(toast => {
                    console.log('🍞 Rendering toast:', toast);
                    return (
                        <Toast
                            key={toast.id}
                            id={toast.id}
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={removeToast}
                        />
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
