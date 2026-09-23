import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function Layout({ title, description, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} description={description} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 px-5 lg:px-10 py-8 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
