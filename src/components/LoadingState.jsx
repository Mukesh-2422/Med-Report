export default function LoadingState({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status" aria-live="polite">
      <span className="h-6 w-6 rounded-full border-2 border-forest border-t-transparent animate-spin" />
      <span className="text-[13px] text-muted">{label}</span>
    </div>
  )
}
