import { useState, useRef, useEffect } from 'react'
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw as ResetIcon,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Flame,
  Ruler,
  Layers,
  Sparkles,
  Sun,
  Eye,
} from 'lucide-react'
import HeatmapOverlay from './HeatmapOverlay.jsx'

export default function ImageViewer({ src, fileName, showHeatmapDefault = true }) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [preset, setPreset] = useState('standard') // 'standard' | 'lung' | 'bone' | 'invert'
  const [showHeatmap, setShowHeatmap] = useState(showHeatmapDefault)
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.65)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [measurementMode, setMeasurementMode] = useState(false)
  const [measurements, setMeasurements] = useState([])
  const [currentLine, setCurrentLine] = useState(null)

  const containerRef = useRef(null)
  const imageContainerRef = useRef(null)

  // Keyboard shortcut listener for H (heatmap) and M (measurement)
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      if (e.key === 'h' || e.key === 'H') {
        setShowHeatmap((h) => !h)
      } else if (e.key === 'm' || e.key === 'M') {
        setMeasurementMode((m) => !m)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const reset = () => {
    setZoom(1)
    setRotation(0)
    setPreset('standard')
    setMeasurements([])
    setCurrentLine(null)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  // Filter styles based on windowing presets
  const getFilterStyle = () => {
    switch (preset) {
      case 'lung':
        return 'contrast(165%) brightness(115%) saturate(0%)'
      case 'bone':
        return 'contrast(210%) brightness(85%) saturate(0%)'
      case 'invert':
        return 'invert(100%) contrast(120%)'
      default:
        return 'none'
    }
  }

  // Measurement tool mouse handlers
  const handleMouseDown = (e) => {
    if (!measurementMode) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCurrentLine({ x1: x, y1: y, x2: x, y2: y })
  }

  const handleMouseMove = (e) => {
    if (!measurementMode || !currentLine) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCurrentLine((prev) => ({ ...prev, x2: x, y2: y }))
  }

  const handleMouseUp = () => {
    if (!measurementMode || !currentLine) return
    const dx = currentLine.x2 - currentLine.x1
    const dy = currentLine.y2 - currentLine.y1
    const distancePx = Math.sqrt(dx * dx + dy * dy)

    if (distancePx > 10) {
      // Approximate 1 px ~= 0.35 mm scale for standard chest radiography
      const distanceMm = (distancePx * 0.35).toFixed(1)
      setMeasurements((prev) => [...prev, { ...currentLine, distanceMm }])
    }
    setCurrentLine(null)
  }

  return (
    <div
      ref={containerRef}
      className={`border border-border dark:border-darkborder rounded-sm bg-surface dark:bg-darksurface overflow-hidden flex flex-col transition-colors ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-black' : ''
      }`}
    >
      {/* Workstation Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-border dark:border-darkborder bg-surface dark:bg-darkcard gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-[12.5px] font-medium text-charcoal dark:text-darktext truncate max-w-[180px]">
            {fileName || 'Chest_XRay_PA.dcm'}
          </p>
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-xs bg-forest/10 dark:bg-forest/40 text-forest dark:text-sage font-medium">
            DICOM Ready
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Preset Window Selector */}
          <div className="flex items-center gap-0.5 border-r border-border dark:border-darkborder pr-1 mr-1">
            <button
              onClick={() => setPreset('standard')}
              title="Standard Window"
              className={`px-2 py-1 text-[11.5px] font-medium rounded-xs transition-colors ${
                preset === 'standard'
                  ? 'bg-forest text-surface dark:bg-forest/80'
                  : 'text-charcoal/70 dark:text-darktext/70 hover:bg-forest/10'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setPreset('lung')}
              title="Lung Window (High Contrast)"
              className={`px-2 py-1 text-[11.5px] font-medium rounded-xs transition-colors ${
                preset === 'lung'
                  ? 'bg-forest text-surface dark:bg-forest/80'
                  : 'text-charcoal/70 dark:text-darktext/70 hover:bg-forest/10'
              }`}
            >
              Lung
            </button>
            <button
              onClick={() => setPreset('bone')}
              title="Bone Window"
              className={`px-2 py-1 text-[11.5px] font-medium rounded-xs transition-colors ${
                preset === 'bone'
                  ? 'bg-forest text-surface dark:bg-forest/80'
                  : 'text-charcoal/70 dark:text-darktext/70 hover:bg-forest/10'
              }`}
            >
              Bone
            </button>
            <button
              onClick={() => setPreset('invert')}
              title="Invert / Negative"
              className={`px-2 py-1 text-[11.5px] font-medium rounded-xs transition-colors ${
                preset === 'invert'
                  ? 'bg-forest text-surface dark:bg-forest/80'
                  : 'text-charcoal/70 dark:text-darktext/70 hover:bg-forest/10'
              }`}
            >
              Invert
            </button>
          </div>

          {/* AI Heatmap Toggle & Opacity */}
          <div className="flex items-center gap-1 border-r border-border dark:border-darkborder pr-1 mr-1">
            <button
              onClick={() => setShowHeatmap((h) => !h)}
              title={`Toggle AI Heatmap (H) — currently ${showHeatmap ? 'ON' : 'OFF'}`}
              className={`flex items-center gap-1 px-2 py-1 text-[11.5px] font-medium rounded-xs transition-colors ${
                showHeatmap
                  ? 'bg-warning/20 text-warning border border-warning/40'
                  : 'text-charcoal/70 dark:text-darktext/70 hover:bg-forest/10'
              }`}
            >
              <Flame size={14} />
              <span className="hidden md:inline">AI Heatmap</span>
            </button>

            {showHeatmap && (
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={heatmapOpacity}
                onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
                title={`Heatmap Opacity: ${Math.round(heatmapOpacity * 100)}%`}
                className="w-14 h-1.5 accent-warning cursor-pointer"
              />
            )}
          </div>

          {/* Caliper Measurement */}
          <button
            onClick={() => setMeasurementMode((m) => !m)}
            title={`Digital Caliper (M) — ${measurementMode ? 'Click and drag to measure' : 'Click to enable'}`}
            className={`p-1.5 rounded-xs transition-colors ${
              measurementMode
                ? 'bg-forest text-surface dark:bg-forest/80'
                : 'text-charcoal/70 dark:text-darktext/70 hover:text-forest dark:hover:text-sage'
            }`}
          >
            <Ruler size={16} />
          </button>

          {/* Zoom controls */}
          <button
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className="p-1.5 text-charcoal/70 dark:text-darktext/70 hover:text-forest dark:hover:text-sage"
          >
            <ZoomOut size={16} />
          </button>
          <button
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(3.0, z + 0.2))}
            className="p-1.5 text-charcoal/70 dark:text-darktext/70 hover:text-forest dark:hover:text-sage"
          >
            <ZoomIn size={16} />
          </button>
          <button
            aria-label="Rotate image"
            onClick={() => setRotation((r) => r + 90)}
            className="p-1.5 text-charcoal/70 dark:text-darktext/70 hover:text-forest dark:hover:text-sage"
          >
            <RotateCw size={16} />
          </button>
          <button
            aria-label="Reset view"
            title="Reset workstation (Esc)"
            onClick={reset}
            className="p-1.5 text-charcoal/70 dark:text-darktext/70 hover:text-forest dark:hover:text-sage"
          >
            <ResetIcon size={16} />
          </button>
          <button
            aria-label="Toggle Fullscreen"
            title="Fullscreen View"
            onClick={toggleFullscreen}
            className="p-1.5 text-charcoal/70 dark:text-darktext/70 hover:text-forest dark:hover:text-sage"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Measurement Mode Helper banner */}
      {measurementMode && (
        <div className="bg-forest/10 dark:bg-forest/30 border-b border-forest/20 px-4 py-1.5 flex items-center justify-between text-[12px] text-forest dark:text-sage">
          <span className="flex items-center gap-1.5">
            <Ruler size={13} />
            Caliper Active: Click & drag on image to measure lesion or organ dimensions.
          </span>
          {measurements.length > 0 && (
            <button
              onClick={() => setMeasurements([])}
              className="text-[11.5px] font-medium underline hover:text-charcoal dark:hover:text-white"
            >
              Clear measurements ({measurements.length})
            </button>
          )}
        </div>
      )}

      {/* Image Canvas Viewport */}
      <div
        ref={imageContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative ${
          isFullscreen ? 'flex-1' : 'h-96 md:h-[420px]'
        } flex items-center justify-center bg-black overflow-hidden select-none ${
          measurementMode ? 'cursor-crosshair' : 'cursor-default'
        }`}
      >
        <div
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: currentLine ? 'none' : 'transform 0.15s ease-out',
          }}
          className="relative max-h-full max-w-full flex items-center justify-center"
        >
          <img
            src={src}
            alt="Medical imaging under clinical review"
            style={{ filter: getFilterStyle() }}
            className="max-h-full max-w-full object-contain pointer-events-none"
          />

          {/* AI Grad-CAM Overlay */}
          <HeatmapOverlay visible={showHeatmap} opacity={heatmapOpacity} />
        </div>

        {/* Caliper Drawing SVG Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {measurements.map((m, idx) => (
            <g key={idx}>
              <line
                x1={m.x1}
                y1={m.y1}
                x2={m.x2}
                y2={m.y2}
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <circle cx={m.x1} cy={m.y1} r="4" fill="#10B981" />
              <circle cx={m.x2} cy={m.y2} r="4" fill="#10B981" />
              <rect
                x={(m.x1 + m.x2) / 2 - 25}
                y={(m.y1 + m.y2) / 2 - 12}
                width="50"
                height="18"
                rx="3"
                fill="#064E3B"
                opacity="0.9"
              />
              <text
                x={(m.x1 + m.x2) / 2}
                y={(m.y1 + m.y2) / 2 + 1}
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {m.distanceMm} mm
              </text>
            </g>
          ))}

          {currentLine && (
            <g>
              <line
                x1={currentLine.x1}
                y1={currentLine.y1}
                x2={currentLine.x2}
                y2={currentLine.y2}
                stroke="#34D399"
                strokeWidth="2"
              />
              <circle cx={currentLine.x1} cy={currentLine.y1} r="3" fill="#34D399" />
              <circle cx={currentLine.x2} cy={currentLine.y2} r="3" fill="#34D399" />
            </g>
          )}
        </svg>

        {/* Windowing info watermark tag */}
        <div className="absolute bottom-2 left-3 text-[11px] font-mono text-white/60 bg-black/50 px-2 py-0.5 rounded pointer-events-none">
          W: {preset.toUpperCase()} | Z: {Math.round(zoom * 100)}% | R: {rotation}°
        </div>
      </div>
    </div>
  )
}
