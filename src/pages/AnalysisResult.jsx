import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Database } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import ImageViewer from '../components/ImageViewer.jsx'
import FindingCard from '../components/FindingCard.jsx'
import VerificationCard from '../components/VerificationCard.jsx'
import Button from '../components/Button.jsx'
import LoadingState from '../components/LoadingState.jsx'
import StatItem from '../components/StatItem.jsx'
import { getVerification } from '../services/api.js'
import { placeholderXray } from '../assets/placeholderXray.js'

export default function AnalysisResult() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [findings, setFindings] = useState(null)

  const patientId = state?.patientId || 'P1024'
  const analysisId = state?.analysisId || 'AN-2024-0917'

  useEffect(() => {
    getVerification(analysisId).then(setFindings)
  }, [analysisId])

  if (!findings) {
    return (
      <Layout title="Analysis Result" description={`Case ${analysisId}`}>
        <LoadingState label="Loading multimodal analysis and verification results" />
      </Layout>
    )
  }

  const verified = findings.filter((f) => f.verificationStatus === 'supported').length
  const needsReview = findings.filter((f) => f.verificationStatus === 'needs_review' || f.verificationStatus === 'insufficient_evidence').length

  return (
    <Layout title="Analysis & Evidence Verification" description={`Case ${analysisId} — Chest X-Ray, Patient ${patientId}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-3 font-semibold">Medical Image</h3>
          <ImageViewer src={placeholderXray} fileName={`chest_xray_${patientId.toLowerCase()}.png`} />
        </div>

        <div>
          <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-3 font-semibold">AI Findings</h3>
          <div className="flex flex-col gap-3">
            {findings.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-3 font-semibold">Clinical Verification</h3>
          <div className="flex flex-col gap-3">
            {findings.map((f) => (
              <VerificationCard
                key={f.id}
                finding={f}
                onViewEvidence={() => navigate('/analysis/verification', { state: { patientId, analysisId } })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-6 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-forest/10 dark:bg-forest/40 text-forest dark:text-sage flex items-center justify-center shrink-0">
              <ShieldCheck size={17} />
            </div>
            <div>
              <p className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-2 font-semibold">
                RAG Verification Summary
              </p>
              <div className="flex gap-8">
                <StatItem label="Detected entities" value={findings.length} />
                <StatItem label="Evidence Verified" value={verified} />
                <StatItem label="Needs clinician review" value={needsReview} accent={needsReview > 0} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              onClick={() => navigate('/analysis/verification', { state: { patientId, analysisId } })}
            >
              Review Evidence
            </Button>
            <Button
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/reports/R-1024-A', { state: { patientId, analysisId } })}
            >
              Continue to Report
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
