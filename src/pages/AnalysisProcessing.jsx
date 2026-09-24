import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, Search, ShieldCheck, Cpu } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import ProgressPipeline from '../components/ProgressPipeline.jsx'

const pipelineSteps = [
  { id: 'quality', label: 'Image Quality Assessment', subtext: 'Checking spatial resolution & artifact levels' },
  { id: 'multimodal', label: 'Multimodal Image Analysis', subtext: 'Extracting visual features & segmenting lung zones' },
  { id: 'entities', label: 'Clinical Entities Extracted', subtext: 'Identifying candidate radiological findings' },
  { id: 'rag_retrieve', label: 'Retrieving Medical Evidence', subtext: 'Searching relevant clinical references for detected findings' },
  { id: 'verification', label: 'Entity-Grounded Verification', subtext: 'Cross-verifying claims against PubMed & RSNA literature' },
  { id: 'synthesis', label: 'Report Synthesis', subtext: 'Structuring AI draft pending clinician review' },
]

export default function AnalysisProcessing() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const patientId = state?.patientId || 'P1024'
  const age = state?.age || '56'
  const examination = state?.modality || 'Chest X-Ray'
  const clinicalNotes = state?.clinicalIndication || 'Shortness of breath, suspect cardiomegaly or effusion.'

  useEffect(() => {
    if (activeIndex >= pipelineSteps.length) {
      const t = setTimeout(() => navigate('/analysis/result', { state: { patientId, age } }), 600)
      return () => clearTimeout(t)
    }
    // Realistic timing per stage, spending thoughtful time during RAG retrieval & verification
    const delayTime = activeIndex === 3 ? 1200 : activeIndex === 4 ? 1100 : 750
    const t = setTimeout(() => setActiveIndex((i) => i + 1), delayTime)
    return () => clearTimeout(t)
  }, [activeIndex, navigate, patientId, age])

  const steps = pipelineSteps.map((step, i) => ({
    label: step.label,
    status: i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'waiting',
  }))

  const currentStep = pipelineSteps[Math.min(activeIndex, pipelineSteps.length - 1)]

  return (
    <Layout title="Multimodal Analysis & RAG Verification" description={`Processing case for Patient ${patientId}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 max-w-4xl">
        <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-6 transition-colors">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border dark:border-darkborder">
            <span className="text-[12px] font-mono uppercase tracking-wider text-muted dark:text-darkmuted">
              Pipeline Stage {Math.min(activeIndex + 1, pipelineSteps.length)} / {pipelineSteps.length}
            </span>
            <span className="text-[12px] font-semibold text-forest dark:text-sage flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest dark:bg-sage opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-forest dark:bg-sage"></span>
              </span>
              {activeIndex < pipelineSteps.length ? 'Processing' : 'Finalizing'}
            </span>
          </div>

          <ProgressPipeline steps={steps} />

          {/* Dynamic Active Step Clinical Detail Box */}
          <div className="mt-6 p-4 rounded-sm border border-forest/20 dark:border-forest/40 bg-forest/5 dark:bg-forest/20 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-forest/10 dark:bg-forest/40 text-forest dark:text-sage mt-0.5">
                {activeIndex === 3 ? (
                  <Search size={16} className="animate-pulse" />
                ) : activeIndex === 4 ? (
                  <ShieldCheck size={16} />
                ) : (
                  <Cpu size={16} />
                )}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-charcoal dark:text-darktext">
                  {currentStep.label}
                </p>
                <p className="text-[12.5px] text-muted dark:text-darkmuted mt-0.5">
                  {currentStep.subtext}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-6 h-fit transition-colors">
          <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-4 font-semibold">
            Case Context
          </h3>
          <dl className="flex flex-col gap-4">
            <Row label="Patient ID" value={patientId} />
            <Row label="Age / Demographics" value={`${age} yrs`} />
            <Row label="Modality" value={examination} />
            <Row label="RAG Knowledge Base" value="Chest Radiography (5 Entities)" />
            <Row label="Clinical Indication" value={clinicalNotes} />
            <Row label="System Status" value="AI Draft — Human-in-the-Loop" />
          </dl>
        </div>
      </div>
    </Layout>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border dark:border-darkborder last:border-0 pb-3 last:pb-0 gap-1">
      <dt className="text-[12.5px] text-muted dark:text-darkmuted">{label}</dt>
      <dd className="text-[13px] font-medium text-charcoal dark:text-darktext text-right truncate max-w-[200px]">{value}</dd>
    </div>
  )
}
