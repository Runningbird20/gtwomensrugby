import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import './Marquee.css'

// Constant scroll rate so marquees with different text lengths (and
// therefore different track widths) all appear to move at the same speed.
const PIXELS_PER_SECOND = 18
const MIN_ITEMS = 8

function Marquee({ text, variant }: { text: string; variant?: 'navy' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLSpanElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const [itemCount, setItemCount] = useState(MIN_ITEMS)
  const [duration, setDuration] = useState(170)

  // A single group must be at least as wide as the visible marquee, or the
  // translateX(-50%) loop shows blank space before it resets. Repeat the
  // text enough times to guarantee that, however wide the container is.
  useLayoutEffect(() => {
    const container = containerRef.current
    const item = itemRef.current
    if (!container || !item) return

    const measure = () => {
      const itemWidth = item.getBoundingClientRect().width
      if (itemWidth <= 0) return
      const containerWidth = container.getBoundingClientRect().width
      const needed = Math.ceil(containerWidth / itemWidth) + 2
      setItemCount(Math.max(MIN_ITEMS, needed))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => ro.disconnect()
  }, [text])

  useEffect(() => {
    const el = groupRef.current
    if (!el) return
    const measure = () => setDuration(el.scrollWidth / PIXELS_PER_SECOND)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [text, itemCount])

  const group = Array.from({ length: itemCount }, (_, i) => (
    <span className="marquee__item" key={i} ref={i === 0 ? itemRef : undefined}>
      {text} <span className="marquee__dot">•</span>
    </span>
  ))

  const className = variant ? `marquee marquee--${variant}` : 'marquee'

  return (
    <div className={className} aria-hidden="true" ref={containerRef}>
      <div className="marquee__track" style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}>
        <div className="marquee__group" ref={groupRef}>
          {group}
        </div>
        <div className="marquee__group">{group}</div>
      </div>
    </div>
  )
}

export default Marquee
