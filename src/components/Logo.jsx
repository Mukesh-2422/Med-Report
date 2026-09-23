export default function Logo({ size = 32, showWordmark = true, variant = 'auto', className = '' }) {
  const isExplicitLight = variant === 'light'
  const isExplicitDark = variant === 'dark'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className={
          isExplicitLight
            ? 'text-[#FCFBF8]'
            : isExplicitDark
            ? 'text-[#173C35]'
            : 'text-forest dark:text-champagne'
        }
      >
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 24L18 14L23 22L28 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="14" r="1.8" fill="#C8A96B" />
        <circle cx="23" cy="22" r="1.8" fill="currentColor" />
        <circle cx="28" cy="15" r="1.8" fill="currentColor" />
      </svg>
      {showWordmark && (
        <div className="leading-none">
          <div
            className={`font-serif text-lg tracking-tight ${
              isExplicitLight
                ? 'text-surface'
                : isExplicitDark
                ? 'text-forest'
                : 'text-forest dark:text-darktext'
            }`}
          >
            MEDORA
          </div>
        </div>
      )}
    </div>
  )
}
