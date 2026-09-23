import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, AlertTriangle } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import StatItem from '../components/StatItem.jsx'
import CaseTable from '../components/CaseTable.jsx'
import LoadingState from '../components/LoadingState.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getReports } from '../services/api.js'

export default function Dashboard() {
  const { doctor } = useAuth()
  const navigate = useNavigate()
  const [reports, setReports] = useState(null)

  useEffect(() => {
    getReports().then(setReports)
  }, [])

  const attention = reports?.filter((r) => r.status === 'pending_review').slice(0, 3) || []

  return (
    <Layout title="Overview" description="Your clinical workspace at a glance">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[13px] text-muted dark:text-darkmuted uppercase tracking-wide mb-2">Good morning, {doctor?.name?.split(' ')[1] || 'Doctor'}</p>
          <h2 className="font-serif text-3xl text-charcoal dark:text-darktext max-w-lg leading-snug">
            Clinical intelligence for evidence-grounded reporting.
          </h2>
        </div>
        <Button icon={Plus} onClick={() => navigate('/analysis/new')} className="shrink-0">
          New Analysis
        </Button>
      </div>

      <div className="flex flex-wrap gap-8 mb-10 pb-10 border-b border-border dark:border-darkborder">
        <StatItem label="Cases Analyzed" value="124" />
        <StatItem label="Reports Generated" value="98" />
        <StatItem label="Pending Review" value="7" accent />
      </div>

      {attention.length > 0 && (
        <div className="mb-10">
          <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-3">Cases requiring attention</h3>
          <div className="flex flex-col gap-2">
            {attention.map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`/reports/${r.id}`)}
                className="w-full flex items-center gap-3 border border-warning/30 bg-warning/[0.06] dark:bg-warning/[0.12] rounded-sm px-4 py-3 text-left hover:bg-warning/10 dark:hover:bg-warning/20 transition-colors"
              >
                <AlertTriangle size={16} className="text-warning shrink-0" />
                <span className="text-[14px] text-charcoal dark:text-darktext flex-1">
                  <span className="font-medium">{r.patientId}</span> — {r.examination} needs clinician review
                </span>
                <span className="text-[12.5px] text-muted dark:text-darkmuted shrink-0">{r.date}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-3">Recent cases</h3>
        {reports ? <CaseTable rows={reports} /> : <LoadingState label="Loading recent cases" />}
      </div>
    </Layout>
  )
}
