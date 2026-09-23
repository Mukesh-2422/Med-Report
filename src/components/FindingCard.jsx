export default function FindingCard({ finding }) {
  return (
    <div className="border border-border rounded-sm bg-surface p-4">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h4 className="text-[14.5px] font-semibold text-charcoal">{finding.entity}</h4>
        {typeof finding.confidence === 'number' && (
          <span className="text-[12px] text-muted shrink-0 pt-0.5">
            {Math.round(finding.confidence * 100)}% confidence
          </span>
        )}
      </div>
      <p className="text-[13.5px] text-charcoal/80 leading-relaxed">{finding.description}</p>
      <p className="text-[11.5px] text-muted mt-2 uppercase tracking-wide">AI-generated finding</p>
    </div>
  )
}
