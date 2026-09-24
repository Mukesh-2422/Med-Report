import { CheckCircle2, AlertTriangle, Clock, HelpCircle, XCircle, ShieldAlert } from 'lucide-react'

const config = {
  approved: { label: 'Reviewed & Approved', icon: CheckCircle2, cls: 'text-success dark:text-emerald-400 bg-success/10 dark:bg-success/20 border border-success/20' },
  reviewed: { label: 'Reviewed', icon: CheckCircle2, cls: 'text-success dark:text-emerald-400 bg-success/10 dark:bg-success/20 border border-success/20' },
  pending_review: { label: 'Pending Review', icon: Clock, cls: 'text-warning dark:text-amber-400 bg-warning/10 dark:bg-warning/20 border border-warning/20' },
  needs_review: { label: 'Needs Review', icon: AlertTriangle, cls: 'text-warning dark:text-amber-400 bg-warning/10 dark:bg-warning/20 border border-warning/20' },
  supported: { label: 'Supported', icon: CheckCircle2, cls: 'text-success dark:text-emerald-400 bg-success/10 dark:bg-success/20 border border-success/20' },
  insufficient_evidence: { label: 'Insufficient Evidence', icon: ShieldAlert, cls: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20' },
  uncertain: { label: 'Uncertain', icon: HelpCircle, cls: 'text-muted dark:text-darkmuted bg-muted/10 dark:bg-muted/20 border border-border dark:border-darkborder' },
  consistent: { label: 'Consistent', icon: CheckCircle2, cls: 'text-success dark:text-emerald-400 bg-success/10 dark:bg-success/20 border border-success/20' },
  relevant: { label: 'Relevant', icon: CheckCircle2, cls: 'text-success dark:text-emerald-400 bg-success/10 dark:bg-success/20 border border-success/20' },
  retrieved: { label: 'Retrieved', icon: CheckCircle2, cls: 'text-success dark:text-emerald-400 bg-success/10 dark:bg-success/20 border border-success/20' },
  rejected: { label: 'Not Supported', icon: XCircle, cls: 'text-warning dark:text-amber-400 bg-warning/10 dark:bg-warning/20 border border-warning/20' },
}

export default function StatusBadge({ status, label }) {
  const c = config[status] || config.uncertain
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${c.cls}`}>
      <Icon size={13} strokeWidth={2.2} />
      {label || c.label}
    </span>
  )
}
