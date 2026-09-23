import { useRef, useState } from 'react'
import { UploadCloud, FileImage, X } from 'lucide-react'

export default function ImageUploader({ file, onSelect, onRemove, error }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (files) => {
    const f = files?.[0]
    if (f) onSelect(f)
  }

  if (file) {
    return (
      <div className="border border-border rounded-sm bg-surface p-4 flex items-center gap-4">
        <img
          src={file.previewUrl}
          alt={`Preview of uploaded medical image: ${file.name}`}
          className="h-20 w-20 object-cover rounded-sm border border-border shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-medium text-charcoal truncate">{file.name}</p>
          <p className="text-[12.5px] text-muted">{(file.size / 1024).toFixed(0)} KB</p>
        </div>
        <button
          onClick={onRemove}
          aria-label="Remove uploaded image"
          className="text-muted hover:text-warning shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={`flex flex-col items-center justify-center text-center border border-dashed rounded-sm py-12 px-6 cursor-pointer transition-colors ${
          dragOver ? 'border-forest bg-sage/10' : error ? 'border-warning' : 'border-border bg-surface hover:border-sage'
        }`}
      >
        <div className="h-11 w-11 rounded-full bg-sage/20 text-forest flex items-center justify-center mb-4">
          <UploadCloud size={20} strokeWidth={1.6} />
        </div>
        <p className="text-[15px] font-medium text-charcoal mb-1">Upload medical image</p>
        <p className="text-[13px] text-muted mb-4">Drag and drop an image here, or select from your device.</p>
        <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-forest border border-forest rounded-sm px-4 py-2">
          <FileImage size={15} />
          Select Image
        </span>
        <p className="text-[12px] text-muted mt-4">Supports PNG, JPG, JPEG</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error && <p className="mt-1.5 text-[12.5px] text-warning">{error}</p>}
    </div>
  )
}
