import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, History, Check, Edit3, XCircle, Clock, AlertCircle } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import EvidenceCard from '../components/EvidenceCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import Button from '../components/Button.jsx'
import Modal from '../components/Modal.jsx'
import { getClaims, submitDoctorDecision, getReviewSummary, getAuditTrail } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'

export default function Verification() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { notify } = useToast()

  const [claims, setClaims] = useState(null)
  const [summary, setSummary] = useState(null)
  const [auditOpen, setAuditOpen] = useState(false)
  const [auditEvents, setAuditEvents] = useState([])

  const analysisId = state?.analysisId || 'AN-2024-0917'
  const patientId = state?.patientId || 'P1024'

  const loadData = async () => {
    const [claimsData, summaryData] = await Promise.all([
      getClaims(analysisId),
      getReviewSummary(analysisId)
    ])
    setClaims(claimsData)
    setSummary(summaryData)
  }

  useEffect(() => {
    loadData()
  }, [analysisId])

  const handleDoctorDecision = async (claimId, payload) => {
    try {
      await submitDoctorDecision(claimId, payload, analysisId)
      notify(`Claim updated: ${payload.decision}`, 'success')
      // Refresh claims and summary
      await loadData()
    } catch (err) {
      notify('Failed to save doctor decision', 'error')
    }
  }

  const handleOpenAudit = async () => {
    const trail = await getAuditTrail(analysisId)
    setAuditEvents(trail)
    setAuditOpen(true)
  }

  return (
    <Layout
      title="Claim-Level Verification & Doctor Review"
      description={`Inspect individual clinical claims, auditable evidence trails, and submit physician decisions for Patient ${patientId}.`}
    >
      {!claims || !summary ? (
        <LoadingState label="Loading claims, evidence trails & verification metrics" />
      ) : (
        <div className="max-w-3xl flex flex-col gap-6">
          {/* TOP SUMMARY BANNER — LIVE REAL-TIME METRICS */}
          <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-5 transition-colors shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border/80 dark:border-darkborder/80 mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-forest dark:text-sage" />
                <h3 className="text-[13.5px] uppercase tracking-wide font-bold text-charcoal dark:text-darktext">
                  Claim Review Summary
                </h3>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <span className="font-mono text-muted dark:text-darkmuted">Ref: {analysisId}</span>
                <button
                  onClick={handleOpenAudit}
                  className="inline-flex items-center gap-1.5 text-forest dark:text-sage hover:underline font-medium"
                >
                  <History size={13} />
                  View Audit Trail
                </button>
              </div>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12.5px]">
              <div className="p-2.5 rounded-xs bg-background/60 dark:bg-darkcard/60 border border-border dark:border-darkborder">
                <span className="text-muted dark:text-darkmuted block text-[11px] uppercase">Total Claims</span>
                <span className="text-base font-bold text-charcoal dark:text-darktext">{summary.total_claims}</span>
              </div>
              <div className="p-2.5 rounded-xs bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-700 dark:text-emerald-400 block text-[11px] uppercase font-semibold">Supported</span>
                <span className="text-base font-bold text-emerald-800 dark:text-emerald-300">{summary.supported_claims}</span>
              </div>
              <div className="p-2.5 rounded-xs bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-700 dark:text-amber-400 block text-[11px] uppercase font-semibold">Needs Review</span>
                <span className="text-base font-bold text-amber-800 dark:text-amber-300">{summary.needs_review_claims}</span>
              </div>
              <div className="p-2.5 rounded-xs bg-orange-500/10 border border-orange-500/20">
                <span className="text-orange-700 dark:text-orange-400 block text-[11px] uppercase font-semibold">Insufficient Ev.</span>
                <span className="text-base font-bold text-orange-800 dark:text-orange-300">{summary.insufficient_evidence_claims}</span>
              </div>
            </div>

            {/* Doctor Review Stats Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] mt-3 pt-3 border-t border-border/60 dark:border-darkborder/60">
              <div className="flex items-center gap-1.5 text-charcoal/90 dark:text-darktext/90">
                <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span>Confirmed: <strong className="font-semibold">{summary.doctor_confirmed_claims}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-charcoal/90 dark:text-darktext/90">
                <Edit3 size={13} className="text-blue-600 dark:text-blue-400" />
                <span>Modified: <strong className="font-semibold">{summary.doctor_modified_claims}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-charcoal/90 dark:text-darktext/90">
                <XCircle size={13} className="text-red-600 dark:text-red-400" />
                <span>Rejected: <strong className="font-semibold">{summary.doctor_rejected_claims}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-charcoal/90 dark:text-darktext/90">
                <Clock size={13} className="text-amber-600 dark:text-amber-400" />
                <span>Pending: <strong className="font-semibold">{summary.pending_review_claims}</strong></span>
              </div>
            </div>
          </div>

          {/* LIST OF CLAIMS */}
          <div className="flex flex-col gap-4">
            {claims.map((claim, idx) => (
              <EvidenceCard
                key={claim.id}
                index={idx + 1}
                finding={claim}
                onDoctorDecision={handleDoctorDecision}
              />
            ))}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-between pt-4 border-t border-border dark:border-darkborder mt-2 flex-wrap gap-3">
            <span className="text-[12px] text-muted dark:text-darkmuted">
              Only confirmed/modified claims will appear in the final report. Rejected claims are excluded.
            </span>
            <Button
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/reports/R-1024-A', { state: { patientId, analysisId } })}
            >
              Continue to Report Review
            </Button>
          </div>
        </div>
      )}

      {/* Audit Trail Modal */}
      <Modal
        open={auditOpen}
        onClose={() => setAuditOpen(false)}
        title={`Audit Trail: Case ${analysisId}`}
      >
        <div className="flex flex-col gap-3 text-[12.5px] max-h-[420px] overflow-y-auto pr-1">
          {auditEvents.length === 0 ? (
            <p className="text-muted dark:text-darkmuted italic">No audit records logged yet.</p>
          ) : (
            auditEvents.map((ev, idx) => (
              <div
                key={ev.id || idx}
                className="border-l-2 border-forest dark:border-sage pl-3 py-1.5 bg-background/50 dark:bg-darkcard/50 rounded-r-xs pr-2"
              >
                <div className="flex items-center justify-between text-[11px] text-muted dark:text-darkmuted mb-0.5">
                  <span className="font-mono font-semibold uppercase text-forest dark:text-sage">{ev.event_type}</span>
                  <span className="font-mono">{ev.timestamp}</span>
                </div>
                <p className="text-charcoal dark:text-darktext font-medium">{ev.description}</p>
                <span className="text-[10.5px] text-muted dark:text-darkmuted">Actor: {ev.actor}</span>
              </div>
            ))
          )}
        </div>
      </Modal>
    </Layout>
  )
}
