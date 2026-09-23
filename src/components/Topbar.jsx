import { Bell, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Topbar({ title, description, onOpenMobile }) {
  const { doctor } = useAuth()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur px-5 lg:px-10 py-5">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden text-charcoal shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          <h1 className="font-serif text-xl md:text-2xl text-charcoal truncate">{title}</h1>
          {description && <p className="text-[13.5px] text-muted mt-0.5 truncate">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <button aria-label="Notifications" className="relative text-charcoal/70 hover:text-charcoal">
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-warning" />
        </button>
        <div className="hidden sm:flex items-center gap-2.5 border-l border-border pl-4">
          <div className="h-8 w-8 rounded-full bg-forest text-surface flex items-center justify-center text-[12.5px] font-semibold">
            {doctor?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2) || 'DR'}
          </div>
          <div className="leading-tight hidden md:block">
            <p className="text-[13.5px] font-medium text-charcoal">{doctor?.name}</p>
            <p className="text-[11.5px] text-muted">{doctor?.specialty}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
