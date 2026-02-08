import { useEffect, useState, useCallback } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: Check,
  error: X,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-terminal-bg border-terminal-green text-terminal-green shadow-[0_0_15px_rgba(63,185,80,0.2)]',
  error: 'bg-terminal-bg border-terminal-red text-terminal-red shadow-[0_0_15px_rgba(248,81,73,0.2)]',
  warning: 'bg-terminal-bg border-terminal-yellow text-terminal-yellow shadow-[0_0_15px_rgba(210,153,34,0.2)]',
  info: 'bg-terminal-bg border-terminal-blue text-terminal-blue shadow-[0_0_15px_rgba(88,166,255,0.2)]',
};

function ToastItem({ toast, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);
  const Icon = icons[toast.type] || Info;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 font-mono text-sm ${colors[toast.type]
        } ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-terminal-text">{toast.message}</span>
      <button
        onClick={handleClose}
        className="ml-auto p-1 hover:bg-terminal-bg-light rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-24 right-4 z-[150] flex flex-col gap-2 max-w-md w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// Custom hook for toast management
let toastId = 0;
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = `toast-${++toastId}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}
