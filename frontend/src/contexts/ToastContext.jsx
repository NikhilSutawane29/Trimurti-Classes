import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X, Info, AlertTriangle } from 'lucide-react';

// Create Toast Context
const ToastContext = createContext(null);

// Toast types with their corresponding styles and icons
const TOAST_TYPES = {
  success: {
    icon: Check,
    className: 'bg-green-50 dark:bg-green-900 border-green-400 dark:border-green-700 text-green-800 dark:text-green-100',
    iconClassName: 'text-green-500 dark:text-green-300'
  },
  error: {
    icon: X,
    className: 'bg-red-50 dark:bg-red-900 border-red-400 dark:border-red-700 text-red-800 dark:text-red-100',
    iconClassName: 'text-red-500 dark:text-red-300'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 dark:bg-blue-900 border-blue-400 dark:border-blue-700 text-blue-800 dark:text-blue-100',
    iconClassName: 'text-blue-500 dark:text-blue-300'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-100',
    iconClassName: 'text-yellow-500 dark:text-yellow-300'
  }
};

// Default toast duration in milliseconds
const DEFAULT_DURATION = 5000;

// ToastProvider Component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = useCallback((message, type = 'info', duration = DEFAULT_DURATION) => {
    if (!message) return;

    const id = Date.now().toString();

    const newToast = {
      id,
      message,
      type,
      duration
    };

    setToasts(prevToasts => [...prevToasts, newToast]);

    // Auto-dismiss toast after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  // Shorthand methods for specific toast types
  const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);

  // Clear all toasts
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Context value
  const value = {
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
    clearToasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Toast Container Component
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`p-4 border rounded-lg shadow-md flex items-start gap-3 ${TOAST_TYPES[toast.type]?.className || TOAST_TYPES.info.className}`}
          >
            {/* Icon */}
            <div className={`mt-0.5 ${TOAST_TYPES[toast.type]?.iconClassName || TOAST_TYPES.info.iconClassName}`}>
              {React.createElement(TOAST_TYPES[toast.type]?.icon || TOAST_TYPES.info.icon, { size: 18 })}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>

            {/* Close button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Custom hook for using toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
