import { useState } from 'react'
import Textarea from './Textarea.jsx'
import Input from './Input.jsx'
import { Mic, MicOff, Sparkles, BookTemplate } from 'lucide-react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js'

export default function ReportEditor({ draft, onChange }) {
  const [activeField, setActiveField] = useState(null)
  const update = (field, value) => onChange({ ...draft, [field]: value })

  const { isListening, toggleListening, isSupported, error } = useSpeechRecognition({
    onResult: (text) => {
      if (activeField === 'clinicalHistory') {
        const next = draft.clinicalHistory ? `${draft.clinicalHistory} ${text}` : text
        update('clinicalHistory', next)
      } else if (activeField === 'findings') {
        const next = [...draft.findings, text]
        update('findings', next)
      } else if (activeField === 'impression') {
        const next = draft.impression ? `${draft.impression} ${text}` : text
        update('impression', next)
      }
    },
  })

  const applyTemplate = (type) => {
    if (type === 'normal') {
      onChange({
        ...draft,
        findings: [
          'Lungs are clear without focal consolidation, pneumothorax, or pleural effusion.',
          'Cardiomediastinal silhouette and hilar contours are within normal limits.',
          'Bony structures and soft tissues unremarkable.',
        ],
        impression: 'Normal chest radiography. No acute cardiopulmonary abnormality.',
      })
    } else if (type === 'pneumonia') {
      onChange({
        ...draft,
        findings: [
          'Focal dense consolidation in the right lower lung lobe with air bronchograms.',
          'No significant pleural effusion or pneumothorax.',
          'Cardiac silhouette normal in size and contour.',
        ],
        impression: 'Right lower lobe consolidation consistent with acute bacterial pneumonia.',
      })
    } else if (type === 'cardiomegaly') {
      onChange({
        ...draft,
        findings: [
          'Enlarged cardiothoracic ratio (CTR > 0.55).',
          'Mild vascular redistribution with blunting of the left costophrenic angle.',
          'No discrete focal lobar consolidation.',
        ],
        impression: 'Cardiomegaly with mild congestive changes and trace left pleural effusion.',
      })
    }
  }

  return (
    <div className="border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface p-6 md:p-8 flex flex-col gap-6 transition-colors">
      {/* Quick clinical templates bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-sm bg-background dark:bg-darkcard border border-border dark:border-darkborder">
        <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-charcoal dark:text-darktext">
          <BookTemplate size={15} className="text-forest dark:text-sage" />
          <span>Quick Radiology Templates:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => applyTemplate('normal')}
            className="px-2 py-1 text-[11.5px] font-medium rounded-xs bg-surface dark:bg-darksurface border border-border dark:border-darkborder text-charcoal dark:text-darktext hover:bg-forest/10 dark:hover:bg-forest/30"
          >
            Normal Scan
          </button>
          <button
            type="button"
            onClick={() => applyTemplate('pneumonia')}
            className="px-2 py-1 text-[11.5px] font-medium rounded-xs bg-surface dark:bg-darksurface border border-border dark:border-darkborder text-charcoal dark:text-darktext hover:bg-forest/10 dark:hover:bg-forest/30"
          >
            Lobar Pneumonia
          </button>
          <button
            type="button"
            onClick={() => applyTemplate('cardiomegaly')}
            className="px-2 py-1 text-[11.5px] font-medium rounded-xs bg-surface dark:bg-darksurface border border-border dark:border-darkborder text-charcoal dark:text-darktext hover:bg-forest/10 dark:hover:bg-forest/30"
          >
            Cardiomegaly / Congestion
          </button>
        </div>
      </div>

      {/* Dictation Status alert */}
      {isListening && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-sm px-3.5 py-2 flex items-center justify-between text-[12.5px] text-red-600 dark:text-red-400 animate-pulse">
          <span className="flex items-center gap-2">
            <Mic size={15} />
            Voice Dictation active for: <strong className="uppercase">{activeField}</strong> — speak into your microphone...
          </span>
          <button
            type="button"
            onClick={toggleListening}
            className="underline font-semibold text-[12px] hover:text-red-700"
          >
            Stop Listening
          </button>
        </div>
      )}

      {error && (
        <p className="text-[12px] text-warning bg-warning/10 p-2 rounded-sm border border-warning/20">
          {error}
        </p>
      )}

      {/* Clinical History Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[13px] font-medium text-charcoal dark:text-darktext">
            Clinical History & Indications
          </label>
          {isSupported && (
            <button
              type="button"
              onClick={() => {
                setActiveField('clinicalHistory')
                toggleListening()
              }}
              className={`flex items-center gap-1 text-[11.5px] font-medium px-2 py-0.5 rounded-xs transition-colors ${
                isListening && activeField === 'clinicalHistory'
                  ? 'bg-red-500 text-white'
                  : 'text-forest dark:text-sage hover:bg-forest/10'
              }`}
            >
              {isListening && activeField === 'clinicalHistory' ? <MicOff size={13} /> : <Mic size={13} />}
              <span>{isListening && activeField === 'clinicalHistory' ? 'Listening...' : 'Dictate History'}</span>
            </button>
          )}
        </div>
        <Textarea
          value={draft.clinicalHistory}
          onChange={(e) => update('clinicalHistory', e.target.value)}
          rows={3}
        />
      </div>

      {/* Findings Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <label className="block text-[13px] font-medium text-charcoal dark:text-darktext">
              Radiological Findings
            </label>
            <p className="text-[12px] text-muted dark:text-darkmuted">Separate each finding with a new line.</p>
          </div>
          {isSupported && (
            <button
              type="button"
              onClick={() => {
                setActiveField('findings')
                toggleListening()
              }}
              className={`flex items-center gap-1 text-[11.5px] font-medium px-2 py-0.5 rounded-xs transition-colors ${
                isListening && activeField === 'findings'
                  ? 'bg-red-500 text-white'
                  : 'text-forest dark:text-sage hover:bg-forest/10'
              }`}
            >
              {isListening && activeField === 'findings' ? <MicOff size={13} /> : <Mic size={13} />}
              <span>{isListening && activeField === 'findings' ? 'Listening...' : 'Dictate Finding'}</span>
            </button>
          )}
        </div>
        <Textarea
          value={draft.findings.join('\n')}
          onChange={(e) => update('findings', e.target.value.split('\n'))}
          rows={5}
        />
      </div>

      {/* Impression Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[13px] font-medium text-charcoal dark:text-darktext">
            Impression & Recommendation
          </label>
          {isSupported && (
            <button
              type="button"
              onClick={() => {
                setActiveField('impression')
                toggleListening()
              }}
              className={`flex items-center gap-1 text-[11.5px] font-medium px-2 py-0.5 rounded-xs transition-colors ${
                isListening && activeField === 'impression'
                  ? 'bg-red-500 text-white'
                  : 'text-forest dark:text-sage hover:bg-forest/10'
              }`}
            >
              {isListening && activeField === 'impression' ? <MicOff size={13} /> : <Mic size={13} />}
              <span>{isListening && activeField === 'impression' ? 'Listening...' : 'Dictate Impression'}</span>
            </button>
          )}
        </div>
        <Input
          value={draft.impression}
          onChange={(e) => update('impression', e.target.value)}
        />
      </div>
    </div>
  )
}
