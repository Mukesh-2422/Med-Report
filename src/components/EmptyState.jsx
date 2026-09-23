export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20 text-forest">
          <Icon size={22} strokeWidth={1.6} />
        </div>
      )}
      <h3 className="font-serif text-xl text-charcoal mb-1.5">{title}</h3>
      {description && <p className="text-[14px] text-muted max-w-sm mb-5">{description}</p>}
      {action}
    </div>
  )
}
