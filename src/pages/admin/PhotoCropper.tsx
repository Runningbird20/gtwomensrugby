import { useCallback, useEffect, useRef, useState } from 'react'
import './Admin.css'

interface PhotoCropperProps {
  file: File
  /** Width / height of the visible frame, e.g. 16 / 9 for the carousel. */
  aspect: number
  /** Frame corner radius as a fraction of frame width (matches the public display). */
  cornerRadius: number
  /** Optional label shown next to the title, e.g. "2 of 5". */
  queueLabel?: string
  onSave: (blob: Blob) => void | Promise<void>
  onCancel: () => void
}

function PhotoCropper({ file, aspect, cornerRadius, queueLabel, onSave, onCancel }: PhotoCropperProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [frameSize, setFrameSize] = useState({ w: 0, h: 0 })
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [saving, setSaving] = useState(false)

  const imgElRef = useRef<HTMLImageElement | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setImgUrl(url)
    setZoom(1)
    const img = new Image()
    img.onload = () => {
      imgElRef.current = img
      setNatural({ w: img.naturalWidth, h: img.naturalHeight })
    }
    img.src = url
    return () => URL.revokeObjectURL(url)
  }, [file])

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const measure = () => setFrameSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [natural])

  // Scale at which the image exactly covers the frame; user zoom multiplies this.
  const coverScale = useCallback(() => {
    if (!natural || !frameSize.w || !frameSize.h) return 0
    return Math.max(frameSize.w / natural.w, frameSize.h / natural.h)
  }, [natural, frameSize])

  const clampOffset = useCallback(
    (ox: number, oy: number, z: number) => {
      if (!natural) return { x: 0, y: 0 }
      const s = coverScale() * z
      const minX = frameSize.w - natural.w * s
      const minY = frameSize.h - natural.h * s
      return { x: Math.min(0, Math.max(minX, ox)), y: Math.min(0, Math.max(minY, oy)) }
    },
    [natural, frameSize, coverScale],
  )

  // Center the photo whenever a new image loads or the frame is (re)measured.
  useEffect(() => {
    if (!natural || !frameSize.w) return
    const s = coverScale()
    setOffset(clampOffset((frameSize.w - natural.w * s) / 2, (frameSize.h - natural.h * s) / 2, 1))
  }, [natural, frameSize, coverScale, clampOffset])

  const handleZoom = (nextZoom: number) => {
    // Keep the point at the frame's center fixed while zooming.
    const s1 = coverScale() * zoom
    const s2 = coverScale() * nextZoom
    const cx = (frameSize.w / 2 - offset.x) / s1
    const cy = (frameSize.h / 2 - offset.y) / s1
    setZoom(nextZoom)
    setOffset(clampOffset(frameSize.w / 2 - cx * s2, frameSize.h / 2 - cy * s2, nextZoom))
  }

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y }
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag) return
    setOffset(clampOffset(drag.ox + (e.clientX - drag.startX), drag.oy + (e.clientY - drag.startY), zoom))
  }

  const endDrag = () => {
    dragRef.current = null
    setDragging(false)
  }

  const handleSave = async () => {
    const img = imgElRef.current
    if (!img || !natural || !frameSize.w || saving) return
    setSaving(true)
    try {
      const s = coverScale() * zoom
      const sx = -offset.x / s
      const sy = -offset.y / s
      const sw = frameSize.w / s
      const sh = frameSize.h / s
      // Export the framed region at source resolution, capped to keep files sane.
      const ow = Math.round(Math.min(sw, 2560))
      const oh = Math.round(ow * (sh / sw))
      const canvas = document.createElement('canvas')
      canvas.width = ow
      canvas.height = oh
      canvas.getContext('2d')!.drawImage(img, sx, sy, sw, sh, 0, 0, ow, oh)
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92))
      if (blob) await onSave(blob)
    } finally {
      setSaving(false)
    }
  }

  const scale = coverScale() * zoom

  return (
    <div className="photo-cropper__backdrop" role="dialog" aria-modal="true" aria-label="Position photo">
      <div className="photo-cropper">
        <h2>
          Position photo
          {queueLabel && <span className="photo-cropper__queue"> {queueLabel}</span>}
        </h2>
        <p className="photo-cropper__hint">
          The bright area is what visitors will see. Drag the photo to reposition it; use the slider to zoom.
        </p>

        <div
          className={dragging ? 'photo-cropper__viewport photo-cropper__viewport--dragging' : 'photo-cropper__viewport'}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="photo-cropper__frame" ref={frameRef} style={{ aspectRatio: aspect }}>
            {imgUrl && natural && (
              <img
                src={imgUrl}
                alt=""
                className="photo-cropper__img"
                draggable={false}
                style={{
                  left: offset.x,
                  top: offset.y,
                  width: natural.w * scale,
                  height: natural.h * scale,
                }}
              />
            )}
            <div className="photo-cropper__mask" style={{ borderRadius: frameSize.w * cornerRadius }} />
          </div>
        </div>

        <div className="photo-cropper__controls">
          <label className="photo-cropper__zoom">
            Zoom
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => handleZoom(Number(e.target.value))}
            />
          </label>
          <button type="button" className="admin-btn" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
          <button type="button" className="admin-btn" onClick={handleSave} disabled={saving || !natural}>
            {saving ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoCropper
