import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, FileUp, Mic, MicOff, Sparkles, FolderDown } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import Textarea from '../components/Textarea.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import Button from '../components/Button.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js'
import { placeholderXray } from '../assets/placeholderXray.js'

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
  const [activeDictationField, setActiveDictationField] = useState(null)

  const { isListening, toggleListening, isSupported } = useSpeechRecognition({
    onResult: (text) => {
      if (activeDictationField === 'symptoms') {
        const next = form.symptoms ? `${form.symptoms}, ${text}` : text
        setForm((f) => ({ ...f, symptoms: next }))
      } else if (activeDictationField === 'history') {
        const next = form.history ? `${form.history} ${text}` : text
        setForm((f) => ({ ...f, history: next }))
      }
    },
  })

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleImageSelect = (file) => {
    setImage({ file, name: file.name, size: file.size, previewUrl: URL.createObjectURL(file) })
    setErrors((e) => ({ ...e, image: undefined }))
  }

  // Quick load demo case helper
  const loadDemoCase = (type) => {
    if (type === 'pneumonia') {
      setForm({
        patientId: 'P-9482',
        age: '64',
        gender: 'Male',
        symptoms: 'Productive cough for 4 days, fever (38.8°C), right pleuritic chest pain',
        history: 'Former smoker (15 pack-years), mild hypertension managed on ACE inhibitors.',
      })
      setImage({
        name: 'chest_xray_rll_consolidation.dcm',
        size: 1420000,
        previewUrl: placeholderXray,
      })
      notify('Demo case loaded: Acute RLL Pneumonia.', 'info')
    } else {
      setForm({
        patientId: 'P-5531',
        age: '72',
        gender: 'Female',
        symptoms: 'Exertional dyspnea, orthopnea, bilateral lower extremity edema',
        history: 'Congestive heart failure (NYHA Class II), chronic atrial fibrillation.',
      })
      setImage({
        name: 'chest_xray_cardiomegaly.dcm',
        size: 1850000,
        previewUrl: placeholderXray,
      })
      notify('Demo case loaded: Cardiomegaly & Congestion.', 'info')
    }
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
      <form onSubmit={handleSubmit} noValidate className="max-w-3xl flex flex-col gap-8">
        {/* Demo Quick Load Banner */}
        <div className="flex items-center justify-between p-3 rounded-sm bg-forest/5 dark:bg-forest/20 border border-forest/20 dark:border-forest/30 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[13px] text-forest dark:text-sage font-medium">
            <Sparkles size={16} />
            <span>Load Quick Clinical Demo Case:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadDemoCase('pneumonia')}
              className="px-2.5 py-1 text-[12px] font-medium bg-surface dark:bg-darksurface border border-border dark:border-darkborder rounded-xs text-charcoal dark:text-darktext hover:bg-forest/10"
            >
              Case 1: RLL Pneumonia
            </button>
            <button
              type="button"
              onClick={() => loadDemoCase('cardio')}
              className="px-2.5 py-1 text-[12px] font-medium bg-surface dark:bg-darksurface border border-border dark:border-darkborder rounded-xs text-charcoal dark:text-darktext hover:bg-forest/10"
            >
              Case 2: Cardiomegaly
            </button>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted font-semibold">
              Patient Information
            </h3>
            {isListening && (
              <span className="text-[12px] text-red-500 flex items-center gap-1 font-medium animate-pulse">
                <Mic size={13} /> Listening to {activeDictationField}...
              </span>
            )}
          </div>
          <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 transition-colors">
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[13px] font-medium text-charcoal dark:text-darktext">
                  Symptoms
                </label>
                {isSupported && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDictationField('symptoms')
                      toggleListening()
                    }}
                    className="text-[11.5px] text-forest dark:text-sage hover:underline flex items-center gap-1"
                  >
                    {isListening && activeDictationField === 'symptoms' ? <MicOff size={12} /> : <Mic size={12} />}
                    Dictate
                  </button>
                )}
              </div>
              <Input
                placeholder="e.g. Chest pain, shortness of breath"
                value={form.symptoms}
                onChange={(e) => update('symptoms', e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[13px] font-medium text-charcoal dark:text-darktext">
                  Clinical History
                </label>
                {isSupported && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDictationField('history')
                      toggleListening()
                    }}
                    className="text-[11.5px] text-forest dark:text-sage hover:underline flex items-center gap-1"
                  >
                    {isListening && activeDictationField === 'history' ? <MicOff size={12} /> : <Mic size={12} />}
                    Dictate
                  </button>
                )}
              </div>
              <Textarea
                placeholder="Relevant medical history, prior conditions, medications…"
                value={form.history}
                onChange={(e) => update('history', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-[13px] uppercase tracking-wide text-muted dark:text-darkmuted mb-4 font-semibold">
            Medical Imaging
          </h3>
          <ImageUploader
            file={image}
            onSelect={handleImageSelect}
            onRemove={() => setImage(null)}
            error={errors.image}
          />

          <div className="mt-4">
            <label className="inline-flex items-center gap-2 text-[13.5px] text-muted dark:text-darkmuted cursor-pointer hover:text-charcoal dark:hover:text-darktext">
              <FileUp size={15} />
              {previousReport ? previousReport.name : 'Attach previous report / prior scan (optional)'}
              <input
                type="file"
                className="hidden"
                onChange={(e) => e.target.files[0] && setPreviousReport(e.target.files[0])}
              />
            </label>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border dark:border-darkborder">
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
