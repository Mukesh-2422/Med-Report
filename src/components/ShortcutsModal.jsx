import React from 'react'
import Modal from './Modal.jsx'
import { Command, Moon, ZoomIn, FileText, CheckCircle2, Mic } from 'lucide-react'

export default function ShortcutsModal({ open, onClose }) {
  const shortcuts = [
    { key: '?', desc: 'Open / close this keyboard shortcuts guide', icon: Command },
    { key: 'D', desc: 'Toggle Radiology Dark Room theme', icon: Moon },
    { key: 'H', desc: 'Toggle AI Grad-CAM pathology heatmap', icon: ZoomIn },
    { key: 'M', desc: 'Toggle digital measurement caliper', icon: ZoomIn },
    { key: 'V', desc: 'Toggle voice dictation in report editor', icon: Mic },
    { key: 'P', desc: 'Export / print finalized clinical report', icon: FileText },
    { key: 'Esc', desc: 'Close dialogs / reset image zoom', icon: CheckCircle2 },
  ]

  return (
    <Modal open={open} onClose={onClose} title="Clinician Keyboard Shortcuts" maxWidth="max-w-md">
      <div className="flex flex-col gap-3 py-2">
        <p className="text-[13px] text-muted dark:text-darkmuted mb-2">
          Use these quick hotkeys to accelerate image review and clinical documentation.
        </p>
        <div className="flex flex-col gap-2">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between p-2.5 rounded-sm border border-border dark:border-darkborder bg-surface dark:bg-darkcard text-[13.5px]"
            >
              <div className="flex items-center gap-2.5 text-charcoal dark:text-darktext">
                <s.icon size={15} className="text-forest dark:text-sage" />
                <span>{s.desc}</span>
              </div>
              <kbd className="px-2 py-0.5 font-mono text-[12px] font-semibold bg-background dark:bg-darkbg text-charcoal dark:text-darktext border border-border dark:border-darkborder rounded shadow-xs">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
