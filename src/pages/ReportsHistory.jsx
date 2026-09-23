import { useEffect, useMemo, useState } from 'react'
import { Search, FileX2 } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import CaseTable from '../components/CaseTable.jsx'
import LoadingState from '../components/LoadingState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { getReports } from '../services/api.js'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'pending_review', label: 'Pending Review' },
  { key: 'approved', label: 'Approved' },
]

const PAGE_SIZE = 5

export default function ReportsHistory() {
  const [reports, setReports] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    getReports().then(setReports)
  }, [])

  const filtered = useMemo(() => {
    if (!reports) return []
    return reports.filter((r) => {
      const matchesFilter = filter === 'all' || r.status === filter
      const matchesQuery =
        !query.trim() ||
        r.patientId.toLowerCase().includes(query.toLowerCase()) ||
        r.id.toLowerCase().includes(query.toLowerCase())
      return matchesFilter && matchesQuery
    })
  }, [reports, filter, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Layout title="Case History" description="Browse and review previously generated reports.">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search patient ID or report…"
            className="w-full bg-surface border border-border rounded-sm pl-9 pr-3.5 py-2.5 text-[14px] focus:outline-none focus:border-forest"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key)
                setPage(1)
              }}
              className={`text-[13px] font-medium px-3 py-1.5 rounded-sm border transition-colors ${
                filter === f.key ? 'bg-forest text-surface border-forest' : 'border-border text-charcoal/75 hover:border-sage'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {!reports ? (
        <LoadingState label="Loading case history" />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FileX2}
          title="No matching cases"
          description="Try a different patient ID, or clear the current filter."
        />
      ) : (
        <>
          <CaseTable rows={paged} />
          <div className="flex items-center justify-between mt-5">
            <p className="text-[13px] text-muted">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="text-[13px] font-medium px-3 py-1.5 rounded-sm border border-border disabled:opacity-40 hover:border-sage"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="text-[13px] font-medium px-3 py-1.5 rounded-sm border border-border disabled:opacity-40 hover:border-sage"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}
