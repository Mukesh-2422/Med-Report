import { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCw, RotateCcw as ResetIcon } from 'lucide-react'

export default function ImageViewer({ src, fileName }) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const reset = () => {
    setZoom(1)
    setRotation(0)
  }

  return (
    <div className="border border-border rounded-sm bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <p className="text-[12.5px] text-muted truncate">{fileName}</p>
        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className="p-1.5 text-charcoal/70 hover:text-forest"
          >
            <ZoomOut size={16} />
          </button>
          <button
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(2.4, z + 0.2))}
            className="p-1.5 text-charcoal/70 hover:text-forest"
          >
            <ZoomIn size={16} />
          </button>
          <button
            aria-label="Rotate image"
            onClick={() => setRotation((r) => r + 90)}
            className="p-1.5 text-charcoal/70 hover:text-forest"
          >
            <RotateCw size={16} />
          </button>
          <button aria-label="Reset view" onClick={reset} className="p-1.5 text-charcoal/70 hover:text-forest">
            <ResetIcon size={16} />
          </button>
        </div>
      </div>
      <div className="h-80 flex items-center justify-center bg-charcoal/[0.02] overflow-hidden">
        <img
          src={src}
          alt="Medical imaging under clinical review"
          style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
          className="max-h-full max-w-full object-contain transition-transform duration-200"
        />
      </div>
    </div>
  )
}
