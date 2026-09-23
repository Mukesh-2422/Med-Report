import { CheckCircle2, AlertTriangle, Clock, HelpCircle, XCircle } from 'lucide-react'

const config = {
  approved: { label: 'Reviewed & Approved', icon: CheckCircle2, cls: 'text-success bg-success/10' },
  reviewed: { label: 'Reviewed', icon: CheckCircle2, cls: 'text-success bg-success/10' },
  pending_review: { label: 'Pending Review', icon: Clock, cls: 'text-warning bg-warning/10' },
  needs_review: { label: 'Needs Review', icon: AlertTriangle, cls: 'text-warning bg-warning/10' },
  supported: { label: 'Supported', icon: CheckCircle2, cls: 'text-success bg-success/10' },
  uncertain: { label: 'Uncertain', icon: HelpCircle, cls: 'text-muted bg-muted/10' },
  consistent: { label: 'Consistent', icon: CheckCircle2, cls: 'text-success bg-success/10' },
  relevant: { label: 'Relevant', icon: CheckCircle2, cls: 'text-success bg-success/10' },
  retrieved: { label: 'Retrieved', icon: CheckCircle2, cls: 'text-success bg-success/10' },
  rejected: { label: 'Not Supported', icon: XCircle, cls: 'text-warning bg-warning/10' },
}

export default function StatusBadge({ status, label }) {
  const c = config[status] || config.uncertain
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium ${c.cls}`}>
      <Icon size={13} strokeWidth={2.2} />
      {label || c.label}
    </span>
  )
}
