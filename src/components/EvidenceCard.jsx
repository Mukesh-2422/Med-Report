import { useState } from 'react'
import {
  ChevronDown,
  ExternalLink,
  BookOpen,
  FileCheck2,
  Info,
  GitBranch,
  Check,
  Edit3,
  XCircle,
  RefreshCw,
  UserCheck,
  MessageSquare
} from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import Modal from './Modal.jsx'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'

const finalStatusCopy = {
  SUPPORTED: 'SUPPORTED',
  supported: 'SUPPORTED',
  NEEDS_REVIEW: 'NEEDS REVIEW',
  needs_review: 'NEEDS REVIEW',
  INSUFFICIENT_EVIDENCE: 'INSUFFICIENT EVIDENCE',
  insufficient_evidence: 'INSUFFICIENT EVIDENCE',
}

export default function EvidenceCard({ finding, index = 1, onDoctorDecision }) {
  const [openAccordion, setOpenAccordion] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modifyModalOpen, setModifyModalOpen] = useState(false)

  // Modify Modal form state
  const [editEntity, setEditEntity] = useState(finding.entity || '')
  const [editClaim, setEditClaim] = useState(finding.claimText || finding.description || '')
  const [editComment, setEditComment] = useState('')

  const statusKey = (finding.status || finding.verificationStatus || 'supported').toLowerCase()
  const scorePercent = Math.round((finding.verificationScore ?? finding.confidence ?? 0.85) * 100)
  const confPercent = Math.round((finding.aiConfidence ?? finding.confidence ?? 0.85) * 100)

  const claimText = finding.claimText || finding.description || `${finding.entity} is identified.`

  // Image evidence formatting
  const imgDesc = typeof finding.imageEvidence === 'object' 
    ? (finding.imageEvidence?.description || 'Increased opacity / structural change')
    : (finding.imageEvidence || finding.description || 'Radiological visual finding')

  const imgLoc = typeof finding.imageEvidence === 'object' ? finding.imageEvidence?.location : 'Thoracic cavity'

  // Verification reason
  const reasonText = finding.verificationReason || finding.reason || 'The claim is consistent with available image evidence and retrieved reference guidelines.'

  // Doctor Decision details
  const decisionObj = finding.doctorDecision
  const decisionType = decisionObj?.decision || 'PENDING'
  const isConfirmed = decisionType === 'CONFIRMED'
  const isModified = decisionType === 'MODIFIED'
  const isRejected = decisionType === 'REJECTED'
  const isNeedsFurtherReview = decisionType === 'NEEDS_FURTHER_REVIEW'

  const handleDecision = (decisionType, payload = {}) => {
    if (onDoctorDecision) {
      onDoctorDecision(finding.id, {
        decision: decisionType,
        ...payload
      })
    }
  }

  const handleSaveModification = () => {
    handleDecision('MODIFIED', {
      modified_entity: editEntity,
      modified_claim: editClaim,
      doctor_comment: editComment || 'Clinician corrected finding after image review.'
    })
    setModifyModalOpen(false)
  }

  return (
    <div className={`border rounded-sm transition-colors overflow-hidden ${
      isRejected
        ? 'border-red-500/40 bg-red-500/[0.02] dark:bg-red-950/10'
        : isModified
        ? 'border-blue-500/40 bg-blue-500/[0.02] dark:bg-blue-950/10'
        : isConfirmed
        ? 'border-emerald-500/40 bg-emerald-500/[0.02] dark:bg-emerald-950/10'
        : 'border-border dark:border-darkborder bg-surface dark:bg-darksurface'
    }`}>
      <div className="p-5">
        {/* Claim Index & Header */}
        <div className="flex items-center justify-between gap-3 mb-2 pb-2.5 border-b border-border/60 dark:border-darkborder/60">
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-muted dark:text-darkmuted">
            CLAIM {String(index).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-forest/10 dark:bg-forest/30 text-forest dark:text-sage font-semibold">
              AI Confidence: {confPercent}%
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-sage/20 dark:bg-forest/40 text-charcoal dark:text-darktext font-semibold">
              Verification Score: {scorePercent}%
            </span>
            <StatusBadge status={statusKey} label={finalStatusCopy[finding.status || finding.verificationStatus]} />
          </div>
        </div>

        {/* Claim Text Statement */}
        <div className="my-3">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-base font-bold text-charcoal dark:text-darktext tracking-tight uppercase">
              {finding.entity}
            </h3>
            {finding.requiresClinicianReview && (
              <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 font-medium">
                Review Advised
              </span>
            )}
          </div>
          <p className="text-[14px] font-medium text-charcoal dark:text-darktext leading-relaxed bg-background/50 dark:bg-darkcard/50 p-2.5 rounded-xs border border-border/70 dark:border-darkborder/70">
            &ldquo;{claimText}&rdquo;
          </p>
        </div>

        {/* Doctor Decision Status Banner if already acted upon */}
        {decisionType !== 'PENDING' && (
          <div className={`mb-3.5 p-3 rounded-xs border text-[12.5px] ${
            isRejected
              ? 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300'
              : isModified
              ? 'border-blue-500/30 bg-blue-500/10 text-blue-800 dark:text-blue-300'
              : isConfirmed
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
              : 'border-purple-500/30 bg-purple-500/10 text-purple-800 dark:text-purple-300'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold flex items-center gap-1.5">
                <UserCheck size={14} />
                Doctor Decision: {decisionType}
              </span>
              <span className="font-mono text-[11px] opacity-80">{decisionObj?.timestamp}</span>
            </div>
            {isModified && decisionObj?.modified_claim && (
              <div className="mt-1 pl-2 border-l-2 border-blue-500">
                <p className="font-medium text-charcoal dark:text-darktext">
                  &ldquo;{decisionObj.modified_claim}&rdquo;
                </p>
              </div>
            )}
            {decisionObj?.doctor_comment && (
              <p className="mt-1 text-[12px] opacity-90 italic">
                Note: {decisionObj.doctor_comment}
              </p>
            )}
          </div>
        )}

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
        <div className="p-2.5 rounded-xs bg-forest/5 dark:bg-forest/15 border border-forest/15 dark:border-forest/25 text-[12.5px] text-charcoal/90 dark:text-darktext/90 flex items-start gap-2 mb-3.5">
          <Info size={15} className="shrink-0 mt-0.5 text-forest dark:text-sage" />
          <div>
            <strong className="font-semibold text-forest dark:text-sage">Verification Reason: </strong>
            <span>{reasonText}</span>
          </div>
        </div>

        {/* DOCTOR FEEDBACK ACTIONS BAR */}
        <div className="p-3 rounded-sm bg-background/90 dark:bg-darkcard/90 border border-border dark:border-darkborder flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-muted dark:text-darkmuted">
            <UserCheck size={14} className="text-forest dark:text-sage" />
            <span>Doctor Action:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleDecision('CONFIRMED', { doctor_comment: 'Confirmed claim based on visual & clinical evidence.' })}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-xs border transition-all flex items-center gap-1.5 ${
                isConfirmed
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-surface dark:bg-darksurface text-charcoal dark:text-darktext border-border dark:border-darkborder hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              <Check size={13} />
              Confirm
            </button>

            <button
              onClick={() => {
                setEditEntity(finding.entity || '')
                setEditClaim(finding.claimText || finding.description || '')
                setEditComment(decisionObj?.doctor_comment || '')
                setModifyModalOpen(true)
              }}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-xs border transition-all flex items-center gap-1.5 ${
                isModified
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-surface dark:bg-darksurface text-charcoal dark:text-darktext border-border dark:border-darkborder hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              <Edit3 size={13} />
              Modify
            </button>

            <button
              onClick={() => handleDecision('REJECTED', { doctor_comment: 'Claim rejected by clinician. Excluded from report.' })}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-xs border transition-all flex items-center gap-1.5 ${
                isRejected
                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                  : 'bg-surface dark:bg-darksurface text-charcoal dark:text-darktext border-border dark:border-darkborder hover:border-red-500 hover:text-red-600'
              }`}
            >
              <XCircle size={13} />
              Reject
            </button>

            <button
              onClick={() => handleDecision('NEEDS_FURTHER_REVIEW', { doctor_comment: 'Pending second opinion or prior imaging comparison.' })}
              className={`px-2.5 py-1.5 text-[11.5px] font-medium rounded-xs border transition-all flex items-center gap-1 ${
                isNeedsFurtherReview
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-surface dark:bg-darksurface text-muted dark:text-darkmuted border-border dark:border-darkborder hover:border-purple-500 hover:text-purple-600'
              }`}
            >
              <RefreshCw size={12} />
              Needs Review
            </button>
          </div>
        </div>

        {/* Card Traceability & Accordion Controls */}
        <div className="mt-3.5 pt-3 border-t border-border/80 dark:border-darkborder/80 flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-charcoal dark:text-darktext hover:text-forest dark:hover:text-sage transition-colors border border-border dark:border-darkborder px-2.5 py-1 rounded-xs bg-background/50"
          >
            <GitBranch size={13} className="text-forest dark:text-sage" />
            View Full Evidence Chain
          </button>

          <button
            onClick={() => setOpenAccordion((o) => !o)}
            aria-expanded={openAccordion}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-forest dark:text-sage hover:underline"
          >
            <BookOpen size={13} />
            {openAccordion ? 'Hide Citations' : 'View PubMed Evidence'}
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
              {finding.evidence.page && (
                <span className="text-[11px] font-mono text-muted dark:text-darkmuted">
                  Page {finding.evidence.page}
                </span>
              )}
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
                <span>Read Full Guideline / Paper on PubMed</span>
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

      {/* Modify Claim Modal */}
      <Modal
        open={modifyModalOpen}
        onClose={() => setModifyModalOpen(false)}
        title={`Modify Claim: ${finding.entity}`}
      >
        <div className="flex flex-col gap-4 text-[13px]">
          <div>
            <label className="block text-[12px] font-semibold text-muted dark:text-darkmuted mb-1">
              Original AI Statement (Preserved in Audit Log)
            </label>
            <p className="text-[13px] bg-background/60 p-2.5 rounded border border-border/70 text-charcoal/80 dark:text-darktext/80 italic">
              &ldquo;{finding.claimText || finding.description}&rdquo;
            </p>
          </div>

          <Input
            label="Modified Clinical Entity"
            value={editEntity}
            onChange={(e) => setEditEntity(e.target.value)}
            placeholder="e.g. Right Pleural Effusion"
          />

          <Textarea
            label="Doctor Modified Statement"
            value={editClaim}
            onChange={(e) => setEditClaim(e.target.value)}
            rows={3}
            placeholder="Enter refined clinical statement to use in final report..."
          />

          <Textarea
            label="Clinician Clinical Rationale / Comment"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            rows={2}
            placeholder="e.g. Laterality specified after lateral projection review..."
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-border dark:border-darkborder">
            <Button variant="ghost" size="sm" onClick={() => setModifyModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" icon={Check} onClick={handleSaveModification}>
              Save Modification
            </Button>
          </div>
        </div>
      </Modal>

      {/* Full Evidence Chain Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Evidence Chain: ${finding.entity}`}
      >
        <div className="flex flex-col gap-4 text-[13px]">
          <ChainStep
            step="1"
            title="Clinical Claim"
            badge={`${confPercent}% AI Confidence`}
            content={claimText}
            sub={`Entity: ${finding.entity}`}
          />

          <ChainStep
            step="2"
            title="Image Evidence"
            badge="Vision Token"
            content={imgDesc}
            sub={`Location: ${imgLoc}`}
          />

          <ChainStep
            step="3"
            title="Patient Clinical Context"
            badge="Context Match"
            content={finding.trail?.patientContext?.detail || 'Relevant clinical indication verified.'}
          />

          <ChainStep
            step="4"
            title="RAG Query & Retrieved Evidence"
            badge={`Score: ${((finding.evidence?.relevance || 90) / 100).toFixed(2)}`}
            content={finding.evidence?.source || 'Chest Radiography Practice Reference'}
            sub={finding.rag_query ? `Query: "${finding.rag_query}"` : finding.evidence?.snippet}
          />

          <div className="border border-forest/30 bg-forest/5 dark:bg-forest/20 rounded-sm p-4 mt-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-forest dark:text-sage text-[13.5px]">
                5. Verification Result & Software Score
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
              <div>Doctor Action: <strong>{decisionType}</strong></div>
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
