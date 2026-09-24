import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Global BackButton Component for MEDORA.
 * Icon-only navigation button returning the clinician to the exact previous page.
 */
export default function BackButton({ fallback = '/dashboard', className = '' }) {
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
      className={`inline-flex items-center justify-center h-8 w-8 rounded-sm text-charcoal/80 dark:text-darktext/80 hover:text-forest dark:hover:text-sage hover:bg-forest/10 dark:hover:bg-forest/20 border border-border dark:border-darkborder bg-surface dark:bg-darksurface transition-all shadow-2xs group cursor-pointer ${className}`}
      aria-label="Back"
      title="Back to previous page"
    >
      <ArrowLeft size={16} strokeWidth={2.2} className="transition-transform group-hover:-translate-x-0.5 text-forest dark:text-sage" />
    </button>
  )
}
