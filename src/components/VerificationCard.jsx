import StatusBadge from './StatusBadge.jsx'
import { Eye } from 'lucide-react'

export default function VerificationCard({ finding, onViewEvidence }) {
  return (
    <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-4 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-[14.5px] font-semibold text-charcoal dark:text-darktext">{finding.entity}</h4>
        <StatusBadge status={finding.verificationStatus} />
      </div>
      <button
        onClick={() => onViewEvidence(finding)}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-forest dark:text-sage hover:underline"
      >
        <Eye size={14} />
        View Evidence
      </button>
    </div>
  )
}
