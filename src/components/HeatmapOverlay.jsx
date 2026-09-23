import React from 'react'

export default function HeatmapOverlay({
  visible = false,
  opacity = 0.65,
  findings = [
    {
      id: 'f1',
      label: 'Consolidation / Opacity (Right Lower Lobe)',
      confidence: '92%',
      x: '56%',
      y: '58%',
      width: '26%',
      height: '24%',
      color: '#EF4444', // Red
    },
    {
      id: 'f2',
      label: 'Cardiomegaly / Border Check',
      confidence: '78%',
      x: '42%',
      y: '48%',
      width: '24%',
      height: '22%',
      color: '#F59E0B', // Amber
    },
  ],
}) {
  if (!visible) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-200"
      style={{ opacity: opacity }}
    >
      {/* Simulated Grad-CAM multi-point gradient map */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="gradcam-rll" cx="68%" cy="70%" r="22%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="gradcam-cardiac" cx="52%" cy="60%" r="20%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Heatmap intensity blobs */}
        <circle cx="68" cy="70" r="22" fill="url(#gradcam-rll)" style={{ mixBlendMode: 'screen' }} />
        <circle cx="52" cy="60" r="20" fill="url(#gradcam-cardiac)" style={{ mixBlendMode: 'screen' }} />
      </svg>

      {/* Pathology bounding boxes */}
      {findings.map((finding) => (
        <div
          key={finding.id}
          className="absolute border-2 rounded-xs flex flex-col justify-start animate-fade-in"
          style={{
            left: finding.x,
            top: finding.y,
            width: finding.width,
            height: finding.height,
            borderColor: finding.color,
            backgroundColor: `${finding.color}15`,
          }}
        >
          <div
            className="self-start px-1.5 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider rounded-br-xs flex items-center gap-1 shadow-xs"
            style={{ backgroundColor: finding.color }}
          >
            <span>{finding.label}</span>
            <span className="opacity-90 font-mono">[{finding.confidence}]</span>
          </div>
        </div>
      ))}
    </div>
  )
}
