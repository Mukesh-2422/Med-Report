import { useState } from 'react'
import { ChevronDown, ExternalLink, BookOpen, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'

const finalStatusCopy = {
  supported: 'Supported by Vision & Evidence',
  needs_review: 'Needs Clinician Review',
}

export default function EvidenceCard({ finding }) {
  const [open, setOpen] = useState(false)
  const isSupported = finding.verificationStatus === 'supported'

  return (
    <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface transition-colors overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg text-charcoal dark:text-darktext">{finding.entity}</h3>
            {finding.confidence && (
              <span className="text-[11.5px] font-mono px-2 py-0.5 rounded-xs bg-forest/10 dark:bg-forest/30 text-forest dark:text-sage font-semibold">
                {Math.round(finding.confidence * 100)}% AI Match
              </span>
            )}
          </div>
          <StatusBadge status={finding.verificationStatus} label={finalStatusCopy[finding.verificationStatus]} />
        </div>

        <div className="mb-4">
          <p className="text-[11.5px] uppercase tracking-wide text-muted dark:text-darkmuted mb-1 font-semibold">
            AI Finding & Observation
          </p>
          <p className="text-[14px] text-charcoal/90 dark:text-darktext/90 leading-relaxed font-medium">
            &ldquo;{finding.description}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TrailItem label="Visual Imaging Trail" item={finding.trail.imageEvidence} />
          <TrailItem label="Patient Clinical Context" item={finding.trail.patientContext} />
          <TrailItem label="Literature & PubMed Grounding" item={finding.trail.medicalEvidence} />
        </div>

        <div className="mt-4 pt-4 border-t border-border dark:border-darkborder flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11.5px] uppercase tracking-wide text-muted dark:text-darkmuted font-semibold">Verification:</span>
            <StatusBadge status={finding.verificationStatus} label={finalStatusCopy[finding.verificationStatus]} />
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-forest dark:text-sage hover:underline"
          >
            <BookOpen size={14} />
            {open ? 'Hide Literature Evidence' : 'View PubMed & Guideline Citations'}
            <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border dark:border-darkborder bg-background/60 dark:bg-darkcard/60 px-5 py-4 animate-fade-in text-[13px]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-charcoal dark:text-darktext">{finding.evidence.source}</span>
              {finding.evidence.level && (
                <span className="text-[11px] px-2 py-0.5 rounded-xs bg-sage/20 dark:bg-forest/40 text-forest dark:text-sage font-medium">
                  {finding.evidence.level}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-muted dark:text-darkmuted text-[12px]">
              <span>Relevance Score: <strong className="text-charcoal dark:text-darktext">{finding.evidence.relevance}%</strong></span>
              {finding.evidence.pmid && (
                <span className="font-mono bg-surface dark:bg-darksurface px-1.5 py-0.5 rounded border border-border dark:border-darkborder text-[11px]">
                  {finding.evidence.pmid}
                </span>
              )}
            </div>
          </div>

          <p className="text-[13.5px] text-charcoal/85 dark:text-darktext/85 leading-relaxed italic bg-surface dark:bg-darksurface p-3 rounded-sm border border-border dark:border-darkborder mb-3">
            &ldquo;{finding.evidence.snippet}&rdquo;
          </p>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            {finding.evidence.url ? (
              <a
                href={finding.evidence.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-forest dark:text-sage hover:underline"
              >
                <span>Read Full Paper on PubMed / NCBI</span>
                <ExternalLink size={12} />
              </a>
            ) : <span />}

            {finding.evidence.doi && (
              <span className="text-[11.5px] text-muted dark:text-darkmuted font-mono">
                DOI: {finding.evidence.doi}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function TrailItem({ label, item }) {
  return (
    <div className="border border-border dark:border-darkborder rounded-sm px-3 py-2.5 bg-background/40 dark:bg-darkcard/40">
      <p className="text-[11.5px] text-muted dark:text-darkmuted mb-1.5 font-medium">{label}</p>
      <StatusBadge status={item.status} label={item.label} />
    </div>
  )
}
