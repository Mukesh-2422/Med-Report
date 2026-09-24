import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import EvidenceCard from '../components/EvidenceCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import Button from '../components/Button.jsx'
import { getVerification } from '../services/api.js'

export default function Verification() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [findings, setFindings] = useState(null)

  const analysisId = state?.analysisId || 'AN-2024-0917'
  const patientId = state?.patientId || 'P1024'

  useEffect(() => {
    getVerification(analysisId).then(setFindings)
  }, [analysisId])

  return (
    <Layout
      title="Entity-Grounded Clinical Verification"
      description={`Detected findings are cross-checked against authoritative medical evidence prior to report generation for Patient ${patientId}.`}
    >
      {!findings ? (
        <LoadingState label="Loading verification trail & evidence documents" />
      ) : (
        <div className="max-w-3xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 text-[13px] text-muted dark:text-darkmuted">
            <span className="font-semibold text-charcoal dark:text-darktext">
              {findings.length} Entities Verified via Controlled RAG Pipeline
            </span>
            <span className="font-mono text-[11.5px] bg-forest/10 dark:bg-forest/30 text-forest dark:text-sage px-2 py-0.5 rounded">
              Analysis Ref: {analysisId}
            </span>
          </div>

          {findings.map((f) => (
            <EvidenceCard key={f.id} finding={f} />
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-border dark:border-darkborder mt-2">
            <span className="text-[12px] text-muted dark:text-darkmuted">
              Note: Clinical entities remain an AI Draft pending final physician sign-off.
            </span>
            <Button
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/reports/R-1024-A', { state: { patientId, analysisId } })}
            >
              Continue to Report
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
}
