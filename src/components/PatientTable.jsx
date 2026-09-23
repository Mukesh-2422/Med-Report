import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PatientTable({ rows }) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface transition-colors">
      <table className="w-full text-left min-w-[640px]">
        <thead>
          <tr className="border-b border-border dark:border-darkborder text-[12.5px] text-muted dark:text-darkmuted uppercase tracking-wide">
            <th className="px-5 py-3 font-medium">Patient ID</th>
            <th className="px-5 py-3 font-medium">Age</th>
            <th className="px-5 py-3 font-medium">Gender</th>
            <th className="px-5 py-3 font-medium">Last Analysis</th>
            <th className="px-5 py-3 font-medium">Reports</th>
            <th className="px-5 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr
              key={p.id}
              className="border-b last:border-0 border-border dark:border-darkborder hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
            >
              <td className="px-5 py-3.5 text-[14px] font-medium text-charcoal dark:text-darktext">{p.id}</td>
              <td className="px-5 py-3.5 text-[14px] text-charcoal/85 dark:text-darktext/85">{p.age}</td>
              <td className="px-5 py-3.5 text-[14px] text-charcoal/85 dark:text-darktext/85">{p.gender}</td>
              <td className="px-5 py-3.5 text-[14px] text-muted dark:text-darkmuted">{p.lastAnalysis}</td>
              <td className="px-5 py-3.5 text-[14px] text-charcoal/85 dark:text-darktext/85">{p.reportsCount} reports</td>
              <td className="px-5 py-3.5 text-right">
                <button
                  onClick={() => navigate(`/patients/${p.id}`)}
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
