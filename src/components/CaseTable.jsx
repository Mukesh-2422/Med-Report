import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'

export default function CaseTable({ rows }) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface transition-colors">
      <table className="w-full text-left min-w-[600px]">
        <thead>
          <tr className="border-b border-border dark:border-darkborder text-[12.5px] text-muted dark:text-darkmuted uppercase tracking-wide">
            <th className="px-5 py-3 font-medium">Patient</th>
            <th className="px-5 py-3 font-medium">Examination</th>
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b last:border-0 border-border dark:border-darkborder hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
            >
              <td className="px-5 py-3.5 text-[14px] font-medium text-charcoal dark:text-darktext">{row.patientId}</td>
              <td className="px-5 py-3.5 text-[14px] text-charcoal/85 dark:text-darktext/85">{row.examination}</td>
              <td className="px-5 py-3.5 text-[14px] text-muted dark:text-darkmuted">{row.date}</td>
              <td className="px-5 py-3.5">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <button
                  onClick={() => navigate(`/reports/${row.id}`)}
                  className="inline-flex items-center gap-1 text-[13.5px] font-medium text-forest dark:text-sage hover:underline"
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
