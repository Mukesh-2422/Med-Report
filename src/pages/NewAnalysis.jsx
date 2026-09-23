import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, FileUp } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import Textarea from '../components/Textarea.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import Button from '../components/Button.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function NewAnalysis() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [form, setForm] = useState({
    patientId: '',
    age: '',
    gender: 'Female',
    symptoms: '',
    history: '',
  })
  const [image, setImage] = useState(null)
  const [previousReport, setPreviousReport] = useState(null)
  const [errors, setErrors] = useState({})

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleImageSelect = (file) => {
    setImage({ file, name: file.name, size: file.size, previewUrl: URL.createObjectURL(file) })
    setErrors((e) => ({ ...e, image: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.patientId.trim()) next.patientId = 'Patient ID is required.'
    if (!form.age || Number(form.age) <= 0 || Number(form.age) > 130) next.age = 'Enter a valid age.'
    if (!image) next.image = 'A medical image is required to begin analysis.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      notify('Please resolve the highlighted fields before continuing.', 'warning')
      return
    }
    navigate('/analysis/processing', { state: { patientId: form.patientId, age: form.age } })
  }

  return (
    <Layout title="New Analysis" description="Create a new evidence-grounded clinical analysis.">
      <form onSubmit={handleSubmit} noValidate className="max-w-3xl flex flex-col gap-10">
        <section>
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Patient Information</h3>
          <div className="border border-border rounded-sm bg-surface p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Patient ID"
              placeholder="e.g. P1029"
              value={form.patientId}
              onChange={(e) => update('patientId', e.target.value)}
              error={errors.patientId}
              required
            />
            <Input
              label="Age"
              type="number"
              placeholder="e.g. 56"
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
              error={errors.age}
              required
            />
            <Select label="Gender" value={form.gender} onChange={(e) => update('gender', e.target.value)}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </Select>
            <Input
              label="Symptoms"
              placeholder="e.g. Chest pain, shortness of breath"
              value={form.symptoms}
              onChange={(e) => update('symptoms', e.target.value)}
            />
            <Textarea
              label="Clinical History"
              placeholder="Relevant medical history, prior conditions, medications…"
              value={form.history}
              onChange={(e) => update('history', e.target.value)}
              className="sm:col-span-2"
              rows={3}
            />
          </div>
        </section>

        <section>
          <h3 className="text-[13px] uppercase tracking-wide text-muted mb-4">Medical Imaging</h3>
          <ImageUploader
            file={image}
            onSelect={handleImageSelect}
            onRemove={() => setImage(null)}
            error={errors.image}
          />

          <div className="mt-4">
            <label className="inline-flex items-center gap-2 text-[13.5px] text-muted cursor-pointer hover:text-charcoal">
              <FileUp size={15} />
              {previousReport ? previousReport.name : 'Attach previous report (optional)'}
              <input
                type="file"
                className="hidden"
                onChange={(e) => e.target.files[0] && setPreviousReport(e.target.files[0])}
              />
            </label>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button type="submit" icon={ArrowRight} iconPosition="right">
            Begin Analysis
          </Button>
        </div>
      </form>
    </Layout>
  )
}
