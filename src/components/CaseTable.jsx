import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'

export default function CaseTable({ rows }) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto border border-border rounded-sm bg-surface">
      <table className="w-full text-left min-w-[600px]">
        <thead>
          <tr className="border-b border-border text-[12.5px] text-muted uppercase tracking-wide">
            <th className="px-5 py-3 font-medium">Patient</th>
            <th className="px-5 py-3 font-medium">Examination</th>
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b last:border-0 border-border hover:bg-black/[0.015] transition-colors">
              <td className="px-5 py-3.5 text-[14px] font-medium text-charcoal">{row.patientId}</td>
              <td className="px-5 py-3.5 text-[14px] text-charcoal/85">{row.examination}</td>
              <td className="px-5 py-3.5 text-[14px] text-muted">{row.date}</td>
              <td className="px-5 py-3.5">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <button
                  onClick={() => navigate(`/reports/${row.id}`)}
                  className="inline-flex items-center gap-1 text-[13.5px] font-medium text-forest hover:underline"
                >
                  View <ChevronRight size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
