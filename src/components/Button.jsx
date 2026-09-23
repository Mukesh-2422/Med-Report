const variants = {
  primary: 'bg-forest text-surface hover:bg-[#0f2b26] disabled:opacity-40',
  secondary: 'bg-transparent text-forest border border-border hover:border-forest disabled:opacity-40',
  ghost: 'bg-transparent text-charcoal hover:bg-black/[0.03] disabled:opacity-40',
  danger: 'bg-transparent text-warning border border-warning/40 hover:bg-warning/5 disabled:opacity-40',
}

const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-[15px] px-5 py-3',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  loading = false,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        Icon && iconPosition === 'left' && <Icon size={16} strokeWidth={2} />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={16} strokeWidth={2} />}
    </button>
  )
}
