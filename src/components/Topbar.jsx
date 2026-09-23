import { Bell, Menu, Moon, Sun, Keyboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Topbar({ title, description, onOpenMobile, onOpenShortcuts }) {
  const { doctor } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border dark:border-darkborder bg-background/95 dark:bg-darkbg/95 backdrop-blur px-5 lg:px-10 py-4 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden text-charcoal dark:text-darktext shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          <h1 className="font-serif text-xl md:text-2xl text-charcoal dark:text-darktext truncate">{title}</h1>
          {description && <p className="text-[13.5px] text-muted dark:text-darkmuted mt-0.5 truncate">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {/* Radiology Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Radiology Dark Theme'}
          title={isDark ? 'Switch to Light Mode' : 'Radiology Dark Room Mode (D)'}
          className="p-2 rounded-sm text-charcoal/75 dark:text-darktext/80 hover:bg-forest/10 dark:hover:bg-forest/30 transition-colors"
        >
          {isDark ? <Sun size={18} className="text-champagne" /> : <Moon size={18} />}
        </button>

        {/* Shortcuts button */}
        {onOpenShortcuts && (
          <button
            onClick={onOpenShortcuts}
            aria-label="Keyboard Shortcuts"
            title="Keyboard Shortcuts (?)"
            className="p-2 rounded-sm text-charcoal/75 dark:text-darktext/80 hover:bg-forest/10 dark:hover:bg-forest/30 transition-colors hidden sm:inline-flex"
          >
            <Keyboard size={18} />
          </button>
        )}

        <button aria-label="Notifications" className="relative p-2 text-charcoal/75 dark:text-darktext/80 hover:text-charcoal dark:hover:text-darktext">
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute 2 top-1.5 right-1.5 h-2 w-2 rounded-full bg-warning" />
        </button>

        <div className="hidden sm:flex items-center gap-2.5 border-l border-border dark:border-darkborder pl-3">
          <div className="h-8 w-8 rounded-full bg-forest dark:bg-forest/80 text-surface flex items-center justify-center text-[12.5px] font-semibold">
            {doctor?.name?.replace(/^Dr\.\s*/i, '').split(' ').map((n) => n[0]).join('').slice(0, 2) || 'MD'}
          </div>
          <div className="leading-tight hidden md:block">
            <p className="text-[13.5px] font-medium text-charcoal dark:text-darktext">{doctor?.name || 'Dr. Mukesh'}</p>
            <p className="text-[11.5px] text-muted dark:text-darkmuted">{doctor?.specialty || 'Radiology'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
