export default function StatItem({ label, value, accent = false }) {
  return (
    <div className="flex flex-col gap-1 border-l border-border pl-5 first:border-l-0 first:pl-0">
      <span className={`font-serif text-3xl ${accent ? 'text-forest' : 'text-charcoal'}`}>{value}</span>
      <span className="text-[13px] text-muted">{label}</span>
    </div>
  )
}
