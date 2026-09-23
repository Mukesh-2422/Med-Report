import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer, width = 'max-w-md' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 px-4 animate-fade-in">
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full ${width} bg-surface rounded-sm shadow-card border border-border focus:outline-none`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="font-serif text-lg text-charcoal">
            {title}
          </h2>
          <button onClick={onClose} aria-label="Close dialog" className="text-muted hover:text-charcoal">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">{footer}</div>}
      </div>
    </div>
  )
}
