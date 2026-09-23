import React, { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback((message, type = 'info') => {
    const id = ++idCounter
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => dismiss(id), 4200)
  }, [dismiss])

  const icons = {
    success: <CheckCircle2 size={18} className="text-success shrink-0" />,
    warning: <AlertTriangle size={18} className="text-warning shrink-0" />,
    info: <Info size={18} className="text-forest shrink-0" />,
  }

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-[min(92vw,360px)]">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="animate-fade-in flex items-start gap-3 bg-charcoal text-surface rounded-sm shadow-card px-4 py-3 text-sm"
          >
            {icons[t.type]}
            <p className="flex-1 leading-snug">{t.message}</p>
            <button onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="text-sage hover:text-surface">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
