export default function Input({ label, error, hint, id, className = '', required, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-[13px] font-medium text-charcoal dark:text-darktext mb-1.5">
          {label} {required && <span className="text-warning">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-surface dark:bg-darkcard border rounded-sm px-3.5 py-2.5 text-[14.5px] text-charcoal dark:text-darktext placeholder:text-muted/70 dark:placeholder:text-darkmuted/70 transition-colors focus:outline-none focus:border-forest dark:focus:border-sage ${
          error ? 'border-warning' : 'border-border dark:border-darkborder'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        required={required}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-[12.5px] text-warning">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-[12.5px] text-muted dark:text-darkmuted">
          {hint}
        </p>
      )}
    </div>
  )
}
