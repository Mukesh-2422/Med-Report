import { useEffect, useMemo, useState } from 'react'
import { Search, UserX } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import PatientTable from '../components/PatientTable.jsx'
import LoadingState from '../components/LoadingState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { getPatients } from '../services/api.js'

export default function Patients() {
  const [patients, setPatients] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    getPatients().then(setPatients)
  }, [])

  const filtered = useMemo(() => {
    if (!patients) return []
    if (!query.trim()) return patients
    return patients.filter((p) => p.id.toLowerCase().includes(query.toLowerCase()))
  }, [patients, query])

  return (
    <Layout title="Patients" description="All patients with recorded clinical analyses.">
      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients…"
          className="w-full bg-surface border border-border rounded-sm pl-9 pr-3.5 py-2.5 text-[14px] focus:outline-none focus:border-forest"
        />
      </div>

      {!patients ? (
        <LoadingState label="Loading patients" />
      ) : filtered.length === 0 ? (
        <EmptyState icon={UserX} title="No patients found" description="Try a different patient ID." />
      ) : (
        <PatientTable rows={filtered} />
      )}
    </Layout>
  )
}
