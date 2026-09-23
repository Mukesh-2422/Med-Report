import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import EvidenceCard from '../components/EvidenceCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import Button from '../components/Button.jsx'
import { getVerification } from '../services/api.js'

export default function Verification() {
  const navigate = useNavigate()
  const [findings, setFindings] = useState(null)

  useEffect(() => {
    getVerification('AN-2024-0917').then(setFindings)
  }, [])

  return (
    <Layout
      title="Entity-Grounded Clinical Verification"
      description="Each AI-generated finding is checked against available evidence before report generation."
    >
      {!findings ? (
        <LoadingState label="Loading verification trail" />
      ) : (
        <div className="max-w-3xl flex flex-col gap-4">
          {findings.map((f) => (
            <EvidenceCard key={f.id} finding={f} />
          ))}

          <div className="flex justify-end pt-4">
            <Button icon={ArrowRight} iconPosition="right" onClick={() => navigate('/reports/R-1024-A')}>
              Continue to Report
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
}
