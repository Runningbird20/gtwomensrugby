import { Link } from 'react-router-dom'
import PhotoCarousel from '../components/PhotoCarousel'
import { usePractices } from '../hooks/usePractices'
import { useSiteContent } from '../hooks/useSiteContent'
import './Home.css'

function Home() {
  const content = useSiteContent()
  const practices = usePractices()

  return (
    <section className="hero">
      <h1>{content['home.hero_title']}</h1>
      <p>{content['home.hero_subtitle']}</p>
      <Link className="button button--primary" to="/contact">
        Join the Team
      </Link>

      <PhotoCarousel />

      <div className="home-practice">
        <div className="schedule-section-heading">
          <h2>{content['schedule.practice_heading']}</h2>
          <span className="schedule-semester">{content['schedule.practice_semester']}</span>
        </div>
        <ul className="home-practice__list">
          {practices.map((practice) => (
            <li key={practice.id}>
              <span className="home-practice__day">{practice.day}</span>
              <span className="home-practice__time">{practice.time}</span>
              <span className="home-practice__location">{practice.location}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="home-motivation">{content['home.motivation']}</p>
    </section>
  )
}

export default Home
