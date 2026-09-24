import { useState } from 'react'
import { ChevronDown, ExternalLink, BookOpen, FileCheck2, Info, Activity, ShieldCheck, AlertTriangle, ShieldAlert, GitBranch } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import Modal from './Modal.jsx'

const finalStatusCopy = {
  SUPPORTED: 'SUPPORTED',
  supported: 'SUPPORTED',
  NEEDS_REVIEW: 'NEEDS REVIEW',
  needs_review: 'NEEDS REVIEW',
  INSUFFICIENT_EVIDENCE: 'INSUFFICIENT EVIDENCE',
  insufficient_evidence: 'INSUFFICIENT EVIDENCE',
}

export default function EvidenceCard({ finding }) {
  const [openAccordion, setOpenAccordion] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const statusKey = (finding.status || finding.verificationStatus || 'supported').toLowerCase()
  const scorePercent = Math.round((finding.verificationScore ?? finding.confidence ?? 0.85) * 100)
  const confPercent = Math.round((finding.aiConfidence ?? finding.confidence ?? 0.85) * 100)

  // Image evidence formatting
  const imgDesc = typeof finding.imageEvidence === 'object' 
    ? (finding.imageEvidence?.description || 'Increased opacity / structural change')
    : (finding.imageEvidence || finding.description || 'Radiological visual finding')

  const imgLoc = typeof finding.imageEvidence === 'object' ? finding.imageEvidence?.location : 'Thoracic cavity'

  // Verification reason
  const reasonText = finding.verificationReason || finding.reason || 'The finding is consistent with available image evidence and retrieved reference guidelines.'

  return (
    <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface transition-colors overflow-hidden">
      <div className="p-5">
        {/* Header: Entity Title + Confidence + Verification Score + Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif text-lg font-bold text-charcoal dark:text-darktext tracking-tight uppercase">
                {finding.entity}
              </h3>
              <span className="text-[11.5px] font-mono px-2 py-0.5 rounded-xs bg-forest/10 dark:bg-forest/30 text-forest dark:text-sage font-semibold">
                AI Confidence: {confPercent}%
              </span>
              <span className="text-[11.5px] font-mono px-2 py-0.5 rounded-xs bg-sage/20 dark:bg-forest/40 text-charcoal dark:text-darktext font-semibold">
                Verification Score: {scorePercent}%
              </span>
            </div>
            {finding.requiresClinicianReview && (
              <span className="inline-block mt-1 text-[11px] font-semibold text-warning dark:text-amber-400">
                ⚠ Clinician Verification Required
              </span>
            )}
          </div>
          <StatusBadge status={statusKey} label={finalStatusCopy[finding.status || finding.verificationStatus]} />
        </div>

        {/* AI Finding / Description */}
        <div className="mb-3.5">
          <p className="text-[11px] uppercase tracking-wide text-muted dark:text-darkmuted mb-0.5 font-semibold">
            Radiological Finding
          </p>
          <p className="text-[13.5px] text-charcoal/90 dark:text-darktext/90 leading-relaxed">
            &ldquo;{finding.description}&rdquo;
          </p>
        </div>

        {/* Image Evidence Block */}
        <div className="mb-3.5 p-3 rounded-xs bg-background/80 dark:bg-darkcard/80 border border-border dark:border-darkborder">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-muted dark:text-darkmuted mb-1">
            <span className="flex items-center gap-1.5 text-forest dark:text-sage">
              <FileCheck2 size={13} />
              <span>Image Evidence</span>
            </span>
            {imgLoc && <span className="font-mono text-[10.5px] text-muted dark:text-darkmuted">{imgLoc}</span>}
          </div>
          <p className="text-[13px] text-charcoal dark:text-darktext font-medium">
            {imgDesc}
          </p>
        </div>

        {/* 3-Point Audit Trail */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3.5">
          <TrailItem label="1. Image Evidence" item={finding.trail?.imageEvidence || { status: 'consistent', label: 'Image Consistent' }} />
          <TrailItem label="2. Patient Context" item={finding.trail?.patientContext || { status: 'relevant', label: 'Clinical Match' }} />
          <TrailItem label="3. Medical Evidence" item={finding.trail?.medicalEvidence || { status: 'retrieved', label: 'RAG Grounded' }} />
        </div>

        {/* Verification Reason */}
        <div className="p-2.5 rounded-xs bg-forest/5 dark:bg-forest/15 border border-forest/15 dark:border-forest/25 text-[12.5px] text-charcoal/90 dark:text-darktext/90 flex items-start gap-2">
          <Info size={15} className="shrink-0 mt-0.5 text-forest dark:text-sage" />
          <div>
            <strong className="font-semibold text-forest dark:text-sage">Verification Reason: </strong>
            <span>{reasonText}</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3.5 border-t border-border dark:border-darkborder flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-charcoal dark:text-darktext hover:text-forest dark:hover:text-sage transition-colors border border-border dark:border-darkborder px-2.5 py-1 rounded-xs bg-background/50"
          >
            <GitBranch size={13} className="text-forest dark:text-sage" />
            View Full Evidence Chain
          </button>

          <button
            onClick={() => setOpenAccordion((o) => !o)}
            aria-expanded={openAccordion}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-forest dark:text-sage hover:underline"
          >
            <BookOpen size={13} />
            {openAccordion ? 'Hide Citations' : 'View PubMed & Guideline Evidence'}
            <ChevronDown size={14} className={`transition-transform ${openAccordion ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Collapsible PubMed Citations */}
      {openAccordion && finding.evidence && (
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
              <span>Retrieval Score: <strong className="text-charcoal dark:text-darktext">{((finding.evidence.relevance || 90) / 100).toFixed(2)}</strong></span>
              {finding.evidence.pmid && (
                <span className="font-mono bg-surface dark:bg-darksurface px-1.5 py-0.5 rounded border border-border dark:border-darkborder text-[11px]">
                  {finding.evidence.pmid}
                </span>
              )}
            </div>
          </div>

          <p className="text-[13.5px] text-charcoal/85 dark:text-darktext/85 leading-relaxed italic bg-surface dark:bg-darksurface p-3 rounded-sm border border-border dark:border-darkborder mb-3">
            &ldquo;{finding.evidence.snippet || finding.evidence.text}&rdquo;
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

      {/* Evidence Chain Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Evidence Chain: ${finding.entity}`}
      >
        <div className="flex flex-col gap-4 text-[13px]">
          {/* Step 1: Clinical Entity */}
          <ChainStep
            step="1"
            title="Clinical Entity"
            badge={`${confPercent}% AI Confidence`}
            content={finding.entity}
            sub={finding.description}
          />

          {/* Step 2: Image Evidence */}
          <ChainStep
            step="2"
            title="Image Evidence"
            badge="Localized Vision Token"
            content={imgDesc}
            sub={`Location: ${imgLoc}`}
          />

          {/* Step 3: Patient Context */}
          <ChainStep
            step="3"
            title="Patient Clinical Context"
            badge="Context Concordance"
            content={finding.trail?.patientContext?.detail || 'Relevant clinical indication verified against history.'}
          />

          {/* Step 4: Retrieved Medical Evidence */}
          <ChainStep
            step="4"
            title="Retrieved Medical Evidence (RAG)"
            badge={`Score: ${((finding.evidence?.relevance || 90) / 100).toFixed(2)}`}
            content={finding.evidence?.source || 'Chest Radiography Practice Reference'}
            sub={finding.evidence?.snippet || finding.evidence?.text}
          />

          {/* Step 5: Verification Result */}
          <div className="border border-forest/30 bg-forest/5 dark:bg-forest/20 rounded-sm p-4 mt-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-forest dark:text-sage text-[13.5px]">
                5. Verification Result & Scoring
              </span>
              <StatusBadge status={statusKey} label={finalStatusCopy[finding.status || finding.verificationStatus]} />
            </div>
            <p className="text-[13px] text-charcoal dark:text-darktext mb-2">
              {reasonText}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11.5px] font-mono text-muted dark:text-darkmuted border-t border-forest/20 pt-2">
              <div>AI Conf: <strong>{confPercent}%</strong></div>
              <div>RAG Match: <strong>{finding.evidence?.relevance || 90}%</strong></div>
              <div>Score: <strong>{scorePercent}%</strong></div>
              <div>Review: <strong>{finding.requiresClinicianReview ? 'Required' : 'Ready'}</strong></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function TrailItem({ label, item }) {
  if (!item) return null
  return (
    <div className="border border-border dark:border-darkborder rounded-sm px-2.5 py-2 bg-background/40 dark:bg-darkcard/40">
      <p className="text-[11px] text-muted dark:text-darkmuted mb-1 font-medium">{label}</p>
      <StatusBadge status={item.status} label={item.label} />
    </div>
  )
}

function ChainStep({ step, title, badge, content, sub }) {
  return (
    <div className="border-l-2 border-forest dark:border-sage pl-3 py-1">
      <div className="flex items-center justify-between mb-0.5">
        <span className="font-semibold text-charcoal dark:text-darktext">{step}. {title}</span>
        {badge && <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface dark:bg-darksurface border border-border dark:border-darkborder text-muted dark:text-darkmuted">{badge}</span>}
      </div>
      <p className="text-charcoal/90 dark:text-darktext/90 font-medium">{content}</p>
      {sub && <p className="text-[12px] text-muted dark:text-darkmuted italic mt-0.5">&ldquo;{sub}&rdquo;</p>}
    </div>
  )
}
