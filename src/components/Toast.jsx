import { useEffect, useState } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

// interface Toast {
  id) => void;
}

const icons, React.ElementType> = {
  success,
  error,
  warning,
  info,
};

const colors, string> = {
  success,
  error,
  warning,
  info,
};

function ToastItem({ toast, onRemove }) => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const Icon = icons[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
        colors[toast.type]
      } ${isExiting ? 'opacity-0 translate-x-full' ) => {
          setIsExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="ml-auto p-1 hover="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// Hook for using toasts
import { useCallback } from 'react';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message) => {
    const id = `toast-${++toastId}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message) => {
    return addToast(message, 'success', duration);
  }, [addToast]);

  const error = useCallback((message) => {
    return addToast(message, 'error', duration);
  }, [addToast]);

  const warning = useCallback((message) => {
    return addToast(message, 'warning', duration);
  }, [addToast]);

  const info = useCallback((message) => {
    return addToast(message, 'info', duration);
  }, [addToast]);

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

