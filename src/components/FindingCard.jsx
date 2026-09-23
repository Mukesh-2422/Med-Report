export default function FindingCard({ finding }) {
  return (
    <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-4 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h4 className="text-[14.5px] font-semibold text-charcoal dark:text-darktext">{finding.entity}</h4>
        {typeof finding.confidence === 'number' && (
          <span className="text-[12px] font-mono font-medium text-forest dark:text-sage shrink-0 pt-0.5">
            {Math.round(finding.confidence * 100)}% match
          </span>
        )}
      </div>
      <p className="text-[13.5px] text-charcoal/85 dark:text-darktext/85 leading-relaxed">{finding.description}</p>
      <p className="text-[11px] text-muted dark:text-darkmuted mt-2 uppercase tracking-wide font-medium">Vision Model Annotation</p>
    </div>
  )
}
