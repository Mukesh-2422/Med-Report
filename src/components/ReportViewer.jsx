import StatusBadge from './StatusBadge.jsx'

export default function ReportViewer({ report }) {
  return (
    <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-6 md:p-8 transition-colors">
      <Section title="Patient Information">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Patient ID" value={report.patientId} />
          <Field label="Age" value={report.age} />
          <Field label="Gender" value={report.gender} />
        </div>
      </Section>

      <Section title="Clinical History">
        <p className="text-[14.5px] text-charcoal/85 dark:text-darktext/85 leading-relaxed">{report.clinicalHistory}</p>
      </Section>

      <Section title="Examination">
        <p className="text-[14.5px] text-charcoal/85 dark:text-darktext/85">{report.examination}</p>
      </Section>

      <Section title="Findings">
        <ul className="flex flex-col gap-2">
          {report.findings.map((f, i) => (
            <li key={i} className="text-[14.5px] text-charcoal/85 dark:text-darktext/85 leading-relaxed flex gap-2">
              <span className="text-sage dark:text-sage/70 font-bold">—</span>
              {f}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Impression">
        <p className="text-[14.5px] text-charcoal dark:text-darktext font-medium leading-relaxed bg-forest/5 dark:bg-forest/20 border-l-2 border-forest dark:border-sage p-3 rounded-r-sm">
          {report.impression}
        </p>
      </Section>

      <Section title="Evidence Status" last>
        <div className="flex flex-col gap-2">
          {report.evidenceStatus.map((e) => (
            <div
              key={e.label}
              className="flex items-center justify-between border border-border dark:border-darkborder rounded-sm px-3.5 py-2.5 bg-background/50 dark:bg-darkcard/50"
            >
              <span className="text-[13.5px] text-charcoal dark:text-darktext">{e.label}</span>
              <StatusBadge status={e.status} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children, last }) {
  return (
    <div className={`${last ? '' : 'mb-7 pb-7 border-b border-border dark:border-darkborder'}`}>
      <h3 className="text-[11.5px] uppercase tracking-wide text-muted dark:text-darkmuted mb-3 font-semibold">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-[12px] text-muted dark:text-darkmuted mb-0.5">{label}</p>
      <p className="text-[14.5px] text-charcoal dark:text-darktext font-medium">{value}</p>
    </div>
  )
}
