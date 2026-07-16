import { useEffect, useRef } from 'react'
import PhotoCarousel from '../components/PhotoCarousel'
import { usePractices } from '../hooks/usePractices'
import { useSiteContent } from '../hooks/useSiteContent'
import './Home.css'

function Home() {
  const content = useSiteContent()
  const practices = usePractices()
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // Fully faded to navy by the time ~70% of the hero has scrolled past.
        const fadeDistance = hero.offsetHeight * 0.7
        const progress = Math.min(window.scrollY / fadeDistance, 1)
        hero.style.setProperty('--hero-scroll', progress.toFixed(3))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero__photo">
          <div className="hero__slogan">
            <span className="hero__slogan-line hero__slogan-line--solid">Leave</span>
            <span className="hero__slogan-line hero__slogan-line--outline">No Doubt</span>
          </div>
        </div>

        <div className="hero__carousel">
          <PhotoCarousel />
        </div>
      </section>

    

      <section className="home-below">
        <div className="home-practice">
          <div className="schedule-section-heading">
            <h2>{content['schedule.practice_heading']}</h2>
            <span className="schedule-semester">{content['schedule.practice_semester']}</span>
          </div>
          <table className="practice-table">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Time</th>
                <th scope="col">Place</th>
              </tr>
            </thead>
            <tbody>
              {practices.map((practice) => (
                <tr key={practice.id}>
                  <td className="practice-table__day">{practice.day}</td>
                  <td>{practice.time}</td>
                  <td>{practice.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="home-motivation">{content['home.motivation']}</p>
      </section>
    </>
  )
}

export default Home
