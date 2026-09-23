import { ChevronDown } from 'lucide-react'

export default function Select({ label, error, id, className = '', required, children, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-[13px] font-medium text-charcoal mb-1.5">
          {label} {required && <span className="text-warning">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          className={`w-full appearance-none bg-surface border rounded-sm px-3.5 py-2.5 pr-9 text-[14.5px] text-charcoal transition-colors focus:outline-none focus:border-forest ${
            error ? 'border-warning' : 'border-border'
          }`}
          required={required}
          {...props}
        >
          {children}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
      {error && <p className="mt-1.5 text-[12.5px] text-warning">{error}</p>}
    </div>
  )
}
