import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'

const finalStatusCopy = {
  supported: 'Supported',
  needs_review: 'Needs Clinician Review',
}

export default function EvidenceCard({ finding }) {
  const [open, setOpen] = useState(false)
  const isSupported = finding.verificationStatus === 'supported'

  return (
    <div className="border border-border rounded-sm bg-surface">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-serif text-lg text-charcoal">{finding.entity}</h3>
          <StatusBadge status={finding.verificationStatus} label={finalStatusCopy[finding.verificationStatus]} />
        </div>

        <div className="mb-4">
          <p className="text-[11.5px] uppercase tracking-wide text-muted mb-1">AI Finding</p>
          <p className="text-[14px] text-charcoal/85 leading-relaxed">&ldquo;{finding.description}&rdquo;</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TrailItem label="Image Evidence" item={finding.trail.imageEvidence} />
          <TrailItem label="Patient Context" item={finding.trail.patientContext} />
          <TrailItem label="Medical Evidence" item={finding.trail.medicalEvidence} />
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-[11.5px] uppercase tracking-wide text-muted mb-1">Final Status</p>
            <StatusBadge status={finding.verificationStatus} label={finalStatusCopy[finding.verificationStatus]} />
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-forest hover:underline"
          >
            View Retrieved Evidence
            <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/60 px-5 py-4 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[13px] font-medium text-charcoal">{finding.evidence.source}</p>
            <p className="text-[12px] text-muted">Evidence relevance: {finding.evidence.relevance}%</p>
          </div>
          <p className="text-[13.5px] text-charcoal/80 leading-relaxed italic">&ldquo;{finding.evidence.snippet}&rdquo;</p>
          {!isSupported && (
            <p className="text-[12.5px] text-warning mt-3">
              This finding requires clinician judgement before inclusion in the final report.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function TrailItem({ label, item }) {
  return (
    <div className="border border-border rounded-sm px-3 py-2.5">
      <p className="text-[11.5px] text-muted mb-1.5">{label}</p>
      <StatusBadge status={item.status} label={item.label} />
    </div>
  )
}
