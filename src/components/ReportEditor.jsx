import Textarea from './Textarea.jsx'
import Input from './Input.jsx'

export default function ReportEditor({ draft, onChange }) {
  const update = (field, value) => onChange({ ...draft, [field]: value })

  return (
    <div className="border border-border rounded-sm bg-surface p-6 md:p-8 flex flex-col gap-6">
      <Textarea
        label="Clinical History"
        value={draft.clinicalHistory}
        onChange={(e) => update('clinicalHistory', e.target.value)}
        rows={3}
      />
      <Textarea
        label="Findings"
        hint="Separate each finding with a new line."
        value={draft.findings.join('\n')}
        onChange={(e) => update('findings', e.target.value.split('\n'))}
        rows={5}
      />
      <Input
        label="Impression"
        value={draft.impression}
        onChange={(e) => update('impression', e.target.value)}
      />
    </div>
  )
}
