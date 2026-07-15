import { useEffect, useRef, useState } from 'react'
import { useCarouselPhotos } from '../hooks/useCarouselPhotos'
import './PhotoCarousel.css'

const ROTATE_INTERVAL_MS = 4000

function slideClass(index: number, activeIndex: number, prevIndex: number | null) {
  if (index === activeIndex) return 'photo-carousel__slide photo-carousel__slide--active'
  if (index === prevIndex) return 'photo-carousel__slide photo-carousel__slide--prev'
  return 'photo-carousel__slide photo-carousel__slide--idle'
}

function PhotoCarousel() {
  const photos = useCarouselPhotos()
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const prevIndexTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const goTo = (nextIndex: number) => {
    setPrevIndex(activeIndex)
    setActiveIndex(nextIndex)

    // Once the exit transition finishes, drop the slide back to the idle
    // (off-screen right, no-transition) position so it's ready to re-enter
    // later without sliding all the way across the visible area.
    clearTimeout(prevIndexTimer.current)
    prevIndexTimer.current = setTimeout(() => setPrevIndex(null), 700)
  }

  useEffect(() => {
    if (photos.length < 2) return

    const timer = setInterval(() => {
      goTo((activeIndex + 1) % photos.length)
    }, ROTATE_INTERVAL_MS)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  useEffect(() => () => clearTimeout(prevIndexTimer.current), [])

  useEffect(() => {
    setActiveIndex(0)
    setPrevIndex(null)
  }, [photos])

  if (photos.length === 0) {
    return null
  }

  return (
    <div className="photo-carousel">
      {photos.map((photo, index) => (
        <img
          key={photo}
          src={photo}
          alt=""
          className={slideClass(index, activeIndex, prevIndex)}
        />
      ))}

      {photos.length > 1 && (
        <div className="photo-carousel__dots">
          {photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              className={index === activeIndex ? 'photo-carousel__dot photo-carousel__dot--active' : 'photo-carousel__dot'}
              aria-label={`Show photo ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotoCarousel
