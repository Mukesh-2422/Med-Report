import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, Plus } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Button from '../components/Button.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { getPatient } from '../services/api.js'

export default function PatientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)

  useEffect(() => {
    getPatient(id).then(setPatient)
  }, [id])

  if (!patient) {
    return (
      <Layout title="Patient" description="Loading patient record">
        <LoadingState label="Loading patient record" />
      </Layout>
    )
  }

  return (
    <Layout title={patient.id} description="Patient overview and clinical timeline">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="border border-border rounded-sm bg-surface p-5">
            <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Patient Overview</h3>
            <dl className="flex flex-col gap-3">
              <Row label="Patient ID" value={patient.id} />
              <Row label="Age" value={patient.age} />
              <Row label="Gender" value={patient.gender} />
              <Row label="Reports on file" value={patient.reportsCount} />
            </dl>
          </div>
          <div className="border border-border rounded-sm bg-surface p-5">
            <h3 className="text-[13px] uppercase tracking-wide text-muted mb-3">Clinical History</h3>
            <p className="text-[14px] text-charcoal/80 leading-relaxed">{patient.clinicalHistory}</p>
          </div>
          <Button icon={Plus} onClick={() => navigate('/analysis/new')}>
            New Analysis
          </Button>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Previous Analyses &amp; Reports</h3>
          <ol className="flex flex-col">
            {patient.timeline.map((t, i) => {
              const approved = t.status === 'approved'
              return (
                <li key={i} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                        approved ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}
                    >
                      {approved ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                    </div>
                    {i < patient.timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-medium text-charcoal">{t.exam}</p>
                    <p className="text-[13px] text-muted mt-0.5">
                      {t.date} — {approved ? 'Report Approved' : 'Pending Review'}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className="text-[14px] font-medium text-charcoal">{value}</dd>
    </div>
  )
}
