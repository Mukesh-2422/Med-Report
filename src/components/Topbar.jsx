import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  Keyboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Topbar({ title, description, onOpenMobile, onOpenShortcuts }) {
  const { doctor, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const menuRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen])

  const handleLogout = () => {
    setProfileOpen(false)
    logout()
    navigate('/')
  }

  const initials =
    doctor?.name?.replace(/^Dr\.\s*/i, '').split(' ').map((n) => n[0]).join('').slice(0, 2) || 'MD'

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
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-warning" />
        </button>

        {/* Interactive Doctor Profile Dropdown */}
        <div className="relative border-l border-border dark:border-darkborder pl-3" ref={menuRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-md hover:bg-forest/10 dark:hover:bg-forest/20 transition-all cursor-pointer focus:outline-none"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <div className="h-8 w-8 rounded-full bg-forest dark:bg-forest/80 text-surface flex items-center justify-center text-[12.5px] font-semibold">
              {initials}
            </div>
            <div className="leading-tight text-left hidden sm:block">
              <p className="text-[13.5px] font-medium text-charcoal dark:text-darktext flex items-center gap-1">
                <span>{doctor?.name || 'Dr. Mukesh'}</span>
                <ChevronDown size={14} className={`text-muted transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </p>
              <p className="text-[11.5px] text-muted dark:text-darkmuted">{doctor?.specialty || 'Radiology'}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-surface dark:bg-darkcard border border-border dark:border-darkborder shadow-xl py-2 z-50 animate-fade-in text-[13.5px]">
              {/* Profile Card Header */}
              <div className="px-4 py-3 border-b border-border dark:border-darkborder">
                <p className="font-semibold text-charcoal dark:text-darktext">{doctor?.name || 'Dr. Mukesh'}</p>
                <p className="text-[12px] text-muted dark:text-darkmuted truncate">{doctor?.email || 'doctor@medora.ai'}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] bg-forest/10 dark:bg-forest/30 text-forest dark:text-sage px-2 py-0.5 rounded font-medium">
                  <ShieldCheck size={12} />
                  <span>{doctor?.specialty || 'Radiologist'}</span>
                </div>
              </div>

              {/* Menu Actions */}
              <div className="py-1">
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-charcoal/85 dark:text-darktext/85 hover:bg-forest/10 dark:hover:bg-forest/20 hover:text-forest dark:hover:text-champagne transition-colors"
                >
                  <Settings size={16} />
                  <span>Account & Clinical Settings</span>
                </Link>

                {onOpenShortcuts && (
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      onOpenShortcuts()
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-charcoal/85 dark:text-darktext/85 hover:bg-forest/10 dark:hover:bg-forest/20 hover:text-forest dark:hover:text-champagne transition-colors"
                  >
                    <Keyboard size={16} />
                    <span>Keyboard Shortcuts</span>
                  </button>
                )}
              </div>

              {/* Logout Item */}
              <div className="border-t border-border dark:border-darkborder pt-1 mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors font-medium"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
