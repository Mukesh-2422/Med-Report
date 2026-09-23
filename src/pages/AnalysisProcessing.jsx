import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import ProgressPipeline from '../components/ProgressPipeline.jsx'

const stepLabels = [
  'Image understanding',
  'Clinical entities',
  'Evidence retrieval',
  'Entity verification',
  'Report synthesis',
]

export default function AnalysisProcessing() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const patientId = state?.patientId || 'P1024'
  const age = state?.age || '56'

  useEffect(() => {
    if (activeIndex >= stepLabels.length) {
      const t = setTimeout(() => navigate('/analysis/result'), 500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setActiveIndex((i) => i + 1), 850)
    return () => clearTimeout(t)
  }, [activeIndex, navigate])

  const steps = stepLabels.map((label, i) => ({
    label,
    status: i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'waiting',
  }))

  return (
    <Layout title="Analysis in Progress" description={`Processing case ${patientId}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 max-w-4xl">
        <div className="border border-border rounded-sm bg-surface p-6">
          <ProgressPipeline steps={steps} />
        </div>

        <div className="border border-border rounded-sm bg-surface p-6 h-fit">
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Case Summary</h3>
          <dl className="flex flex-col gap-4">
            <Row label="Patient" value={patientId} />
            <Row label="Age" value={age} />
            <Row label="Examination" value="Chest X-Ray" />
            <Row label="Evidence sources" value="3 retrieved" />
            <Row label="Entities detected" value="5" />
          </dl>
        </div>
      </div>
    </Layout>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border last:border-0 pb-3 last:pb-0">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className="text-[14px] font-medium text-charcoal">{value}</dd>
    </div>
  )
}
