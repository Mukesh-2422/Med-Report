import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Global BackButton Component for MEDORA.
 * Navigates to the exact previous page the clinician came from (via navigate(-1)).
 * Uses a safe fallback (e.g. /dashboard) only if accessed via direct URL without history.
 */
export default function BackButton({ fallback = '/dashboard', label = 'Back', className = '' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    // Check if browser has a valid previous history state in this session
    const hasHistory = window.history.state && window.history.state.idx > 0
    if (hasHistory || location.key !== 'default') {
      navigate(-1)
    } else {
      navigate(fallback)
    }
  }

  return (
    <button
      onClick={handleBack}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[12.5px] font-medium text-charcoal/80 dark:text-darktext/80 hover:text-forest dark:hover:text-sage hover:bg-forest/10 dark:hover:bg-forest/20 border border-border dark:border-darkborder bg-surface dark:bg-darksurface transition-all shadow-2xs group cursor-pointer ${className}`}
      aria-label="Go to previous page"
      title="Return to previous page (Back)"
    >
      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5 text-forest dark:text-sage" />
      <span>{label}</span>
    </button>
  )
}
