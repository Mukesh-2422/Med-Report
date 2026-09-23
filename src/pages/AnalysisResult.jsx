import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
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
  const navigate = useNavigate()
  const [findings, setFindings] = useState(null)

  useEffect(() => {
    getVerification('AN-2024-0917').then(setFindings)
  }, [])

  if (!findings) {
    return (
      <Layout title="Analysis Result" description="Case AN-2024-0917">
        <LoadingState label="Loading analysis result" />
      </Layout>
    )
  }

  const verified = findings.filter((f) => f.verificationStatus === 'supported').length
  const needsReview = findings.filter((f) => f.verificationStatus === 'needs_review').length

  return (
    <Layout title="Analysis Result" description="Case AN-2024-0917 — Chest X-Ray, Patient P1024">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-3">Medical Image</h3>
          <ImageViewer src={placeholderXray} fileName="chest_xray_p1024.png" />
        </div>

        <div>
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-3">AI Findings</h3>
          <div className="flex flex-col gap-3">
            {findings.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-3">Clinical Verification</h3>
          <div className="flex flex-col gap-3">
            {findings.map((f) => (
              <VerificationCard key={f.id} finding={f} onViewEvidence={() => navigate('/analysis/verification')} />
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
              <p className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-2 font-semibold">Analysis Summary</p>
              <div className="flex gap-8">
                <StatItem label="Detected entities" value={findings.length} />
                <StatItem label="Verified" value={verified} />
                <StatItem label="Needs review" value={needsReview} accent={needsReview > 0} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="secondary" onClick={() => navigate('/analysis/verification')}>
              Review Evidence
            </Button>
            <Button icon={ArrowRight} iconPosition="right" onClick={() => navigate('/reports/R-1024-A')}>
              Continue to Report
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
