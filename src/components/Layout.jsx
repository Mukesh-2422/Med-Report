import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import BackButton from './BackButton.jsx'
import ShortcutsModal from './ShortcutsModal.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Layout({ title, description, showBack, backFallback, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const { toggleTheme } = useTheme()
  const location = useLocation()

  // Determine whether to display Back button
  // Defaults to false for root workspace and landing pages, true for all secondary/detail pages
  const isRootPage = ['/dashboard', '/', '/intro'].includes(location.pathname)
  const shouldShowBack = showBack !== undefined ? showBack : !isRootPage

  // Contextual fallback in case of direct URL access with empty session history
  const defaultFallback =
    backFallback ||
    (location.pathname.startsWith('/patients/')
      ? '/patients'
      : location.pathname.startsWith('/reports/')
      ? '/reports'
      : location.pathname.startsWith('/analysis/verification')
      ? '/analysis/result'
      : location.pathname.startsWith('/analysis/result')
      ? '/analysis/new'
      : '/dashboard')

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing inside inputs or textareas
      const tag = e.target.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return

      if (e.key === '?') {
        e.preventDefault()
        setShortcutsOpen((prev) => !prev)
      } else if (e.key === 'd' || e.key === 'D') {
        toggleTheme()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme])

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg text-charcoal dark:text-darktext flex transition-colors duration-200">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          title={title}
          description={description}
          showBack={shouldShowBack}
          backFallback={defaultFallback}
          onOpenMobile={() => setMobileOpen(true)}
          onOpenShortcuts={() => setShortcutsOpen(true)}
        />
        <main className="flex-1 px-5 lg:px-10 py-6 lg:py-8 animate-fade-in">
          {shouldShowBack && (
            <div className="mb-5">
              <BackButton fallback={defaultFallback} />
            </div>
          )}
          {children}
        </main>
      </div>

      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  )
}
