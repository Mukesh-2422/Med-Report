import { CheckCircle2 } from 'lucide-react'

export default function ProgressPipeline({ steps }) {
  return (
    <ol className="flex flex-col gap-0.5">
      {steps.map((step, i) => {
        const isDone = step.status === 'done'
        const isActive = step.status === 'active'
        return (
          <li key={step.label} className="flex items-start gap-4 py-3">
            <div className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full border flex items-center justify-center text-[12.5px] font-medium shrink-0 ${
                  isDone
                    ? 'bg-forest border-forest text-surface'
                    : isActive
                    ? 'border-forest text-forest'
                    : 'border-border text-muted'
                }`}
              >
                {isDone ? <CheckCircle2 size={16} /> : String(i + 1).padStart(2, '0')}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 min-h-[16px] bg-border mt-1" />}
            </div>
            <div className="pt-1">
              <p className={`text-[14.5px] font-medium ${isDone || isActive ? 'text-charcoal' : 'text-muted'}`}>
                {step.label}
              </p>
              <p className="text-[12.5px] text-muted mt-0.5">
                {isDone ? 'Complete' : isActive ? 'Processing…' : 'Waiting'}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
