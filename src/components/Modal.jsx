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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 dark:bg-black/70 px-4 animate-fade-in">
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full ${width} bg-surface dark:bg-darksurface rounded-sm shadow-card border border-border dark:border-darkborder focus:outline-none`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-darkborder">
          <h2 id="modal-title" className="font-serif text-lg text-charcoal dark:text-darktext">
            {title}
          </h2>
          <button onClick={onClose} aria-label="Close dialog" className="text-muted dark:text-darkmuted hover:text-charcoal dark:hover:text-darktext">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border dark:border-darkborder">{footer}</div>}
      </div>
    </div>
  )
}
