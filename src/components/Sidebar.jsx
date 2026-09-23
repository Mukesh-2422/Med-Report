import { NavLink } from 'react-router-dom'
import { LayoutGrid, FilePlus2, History, Users, Settings, LogOut } from 'lucide-react'
import Logo from './Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutGrid },
  { to: '/analysis/new', label: 'New Analysis', icon: FilePlus2 },
  { to: '/reports', label: 'Case History', icon: History },
  { to: '/patients', label: 'Patients', icon: Users },
]

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { logout } = useAuth()

  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-[14px] transition-colors ${
      isActive
        ? 'bg-forest text-surface dark:bg-forest/90 dark:text-surface shadow-xs'
        : 'text-charcoal/80 dark:text-darktext/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
    }`

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-charcoal/40 dark:bg-black/60 lg:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 border-r border-border dark:border-darkborder bg-surface dark:bg-darksurface flex flex-col transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-6 py-6 border-b border-border dark:border-darkborder">
          <Logo />
        </div>
        <nav className="flex-1 px-4 py-5 flex flex-col gap-1" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkCls} onClick={onCloseMobile}>
              <item.icon size={17} strokeWidth={1.8} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-5 border-t border-border dark:border-darkborder flex flex-col gap-1">
          <NavLink to="/settings" className={linkCls} onClick={onCloseMobile}>
            <Settings size={17} strokeWidth={1.8} />
            Settings
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-[14px] text-charcoal/80 dark:text-darktext/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors text-left"
          >
            <LogOut size={17} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
