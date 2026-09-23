import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pencil, Check, Download, X } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import ReportViewer from '../components/ReportViewer.jsx'
import ReportEditor from '../components/ReportEditor.jsx'
import Button from '../components/Button.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { getReport, updateReport, approveReport, downloadReport } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'

export default function ReportReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
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
    notify('Report changes saved.', 'success')
  }

  const confirmApprove = async () => {
    setApproving(true)
    const updated = await approveReport(reportId)
    setReport(updated)
    setApproving(false)
    setConfirmOpen(false)
    notify('Report approved and finalized.', 'success')
  }

  const handleDownload = async () => {
    await downloadReport(reportId)
    notify('PDF export ready (demo — no file is generated yet).', 'info')
  }

  return (
    <Layout title="Generated Medical Report" description={`Case ${report.analysisId} — ${report.examination}`}>
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-medium ${
              isApproved ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
            }`}
          >
            {isApproved ? 'REVIEWED & APPROVED BY CLINICIAN' : 'AI DRAFT — PENDING CLINICIAN REVIEW'}
          </span>

          <div className="flex items-center gap-2.5">
            {!isApproved && !editing && (
              <Button variant="secondary" size="sm" icon={Pencil} onClick={() => setEditing(true)}>
                Edit Report
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
                Approve Report
              </Button>
            )}
            <Button variant="secondary" size="sm" icon={Download} onClick={handleDownload}>
              Export PDF
            </Button>
          </div>
        </div>

        {isApproved && (
          <div className="border border-success/30 bg-success/[0.06] rounded-sm px-4 py-3 mb-6 flex items-center gap-6 text-[13.5px]">
            <span className="text-charcoal">
              Reviewed by <span className="font-medium">{report.reviewedBy}</span>
            </span>
            <span className="text-muted">{report.reviewedDate}</span>
          </div>
        )}

        {editing ? <ReportEditor draft={draft} onChange={setDraft} /> : <ReportViewer report={report} />}

        {isApproved && (
          <div className="mt-6 flex justify-end">
            <Button icon={Download} onClick={handleDownload}>
              Download PDF
            </Button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmApprove}
        loading={approving}
        title="Approve this report?"
        description="By approving, you confirm that the report has been reviewed by the clinician and is ready to be finalized."
        confirmLabel="Approve Report"
      />
    </Layout>
  )
}
