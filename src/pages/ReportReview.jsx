import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pencil, Check, Download, X, Printer, Sparkles } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import ReportViewer from '../components/ReportViewer.jsx'
import ReportEditor from '../components/ReportEditor.jsx'
import Button from '../components/Button.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { getReport, updateReport, approveReport } from '../services/api.js'
import { exportReportToPdf } from '../services/pdfService.js'
import { useToast } from '../context/ToastContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function ReportReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const { doctor } = useAuth()
  const reportId = id || 'R-1024-A'

  const [report, setReport] = useState(null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [approving, setApproving] = useState(false)

  useEffect(() => {
    getReport(reportId).then((r) => {
      setReport(r)
      setDraft(r)
    })
  }, [reportId])

  // Hotkeys for Report Review: 'A' to Approve, 'E' to Edit, 'P' to Print/PDF
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      if (e.key === 'a' || e.key === 'A') {
        if (report && report.status !== 'approved' && !editing) {
          setConfirmOpen(true)
        }
      } else if (e.key === 'e' || e.key === 'E') {
        if (!editing) setEditing(true)
      } else if (e.key === 'p' || e.key === 'P') {
        if (report) exportReportToPdf(report, doctor)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [report, editing, doctor])

  if (!report) {
    return (
      <Layout title="Generated Medical Report" description="Loading report">
        <LoadingState label="Loading report" />
      </Layout>
    )
  }

  const isApproved = report.status === 'approved'

  const saveEdits = async () => {
    const updated = await updateReport(reportId, draft)
    setReport(updated)
    setEditing(false)
    notify('Report changes saved successfully.', 'success')
  }

  const confirmApprove = async () => {
    setApproving(true)
    const reviewerName = doctor?.name || 'Dr. Mukesh'
    const updated = await approveReport(reportId, reviewerName)
    setReport(updated)
    setApproving(false)
    setConfirmOpen(false)
    notify('Report officially verified and finalized.', 'success')
  }

  const handleDownload = () => {
    exportReportToPdf(report, doctor)
    notify('Clinical PDF generated. Ready for download/printing.', 'success')
  }

  return (
    <Layout title="Generated Medical Report" description={`Case ${report.analysisId} — ${report.examination}`}>
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold tracking-wide ${
              isApproved
                ? 'bg-success/15 text-success dark:bg-success/25 dark:text-emerald-400 border border-success/30'
                : 'bg-warning/15 text-warning dark:bg-warning/25 dark:text-amber-400 border border-warning/30'
            }`}
          >
            {isApproved ? '✓ REVIEWED & APPROVED BY CLINICIAN' : '● AI DRAFT — PENDING CLINICIAN REVIEW'}
          </span>

          <div className="flex items-center gap-2.5 flex-wrap">
            {!isApproved && !editing && (
              <Button variant="secondary" size="sm" icon={Pencil} onClick={() => setEditing(true)}>
                Edit Report <span className="hidden md:inline text-[11px] opacity-70">(E)</span>
              </Button>
            )}
            {editing && (
              <>
                <Button variant="ghost" size="sm" icon={X} onClick={() => { setDraft(report); setEditing(false) }}>
                  Cancel
                </Button>
                <Button size="sm" icon={Check} onClick={saveEdits}>
                  Save Changes
                </Button>
              </>
            )}
            {!isApproved && !editing && (
              <Button size="sm" icon={Check} onClick={() => setConfirmOpen(true)}>
                Approve Report <span className="hidden md:inline text-[11px] opacity-70">(A)</span>
              </Button>
            )}
            <Button variant="secondary" size="sm" icon={Printer} onClick={handleDownload}>
              Export PDF <span className="hidden md:inline text-[11px] opacity-70">(P)</span>
            </Button>
          </div>
        </div>

        {isApproved && (
          <div className="border border-success/30 bg-success/[0.06] dark:bg-success/[0.12] rounded-sm px-4 py-3 mb-6 flex items-center justify-between text-[13.5px]">
            <span className="text-charcoal dark:text-darktext">
              Reviewed & Signed by <strong className="font-semibold">{report.reviewedBy || doctor?.name}</strong>
            </span>
            <span className="text-muted dark:text-darkmuted font-mono text-[12.5px]">{report.reviewedDate}</span>
          </div>
        )}

        {editing ? <ReportEditor draft={draft} onChange={setDraft} /> : <ReportViewer report={report} />}

        {isApproved && (
          <div className="mt-6 flex justify-end">
            <Button icon={Download} onClick={handleDownload}>
              Download Official PDF
            </Button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmApprove}
        loading={approving}
        title="Approve and Finalize Report?"
        description="By approving, you verify that this AI-generated clinical report has been thoroughly reviewed and is ready for inclusion in official patient records."
        confirmLabel="Approve & Sign Off"
      />
    </Layout>
  )
}
