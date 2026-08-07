import './About.css'
import Marquee from '../components/Marquee'
import { usePeople } from '../hooks/usePeople'
import { useSiteContent } from '../hooks/useSiteContent'
import type { Person } from '../data/people'

function PersonFlipCard({ person }: { person: Person }) {
  return (
    <button type="button" className="people-flip">
      <div className="people-flip__inner">
        <div className="people-card people-card--front">
          {person.photo_url ? (
            <img src={person.photo_url} alt="" className="people-card__photo" />
          ) : (
            <div className="people-card__photo people-card__photo--placeholder" aria-hidden="true" />
          )}
          <div className="people-card__overlay">
            <h3 className="people-card__name">{person.name}</h3>
            <p className="people-card__role">{person.role}</p>
          </div>
        </div>
        <div className="people-card people-card--back">
          <h3 className="people-card-flipped__name">{person.name}</h3>
            {person.school_year && (
                <span className="people-card__meta">
                  <span className="people-card__fact-label">Year</span>
                  {person.school_year}
                </span>
              )}
              {person.major && (
                <span className="people-card__meta">
                    <span className="people-card__fact-label">Major</span>
                {person.major}
              </span>
          )}
          {person.position && (
            <span className="people-card__meta">
              <span className="people-card__fact-label">Position</span>
              {person.position}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function PersonGrid({ people }: { people: Person[] }) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <PersonFlipCard person={person} key={person.id} />
      ))}
    </div>
  )
}

function About() {
  const coaches = usePeople('coach')
  const executiveBoard = usePeople('exec_board')
  const content = useSiteContent()
  return (
    <>
      <section className="about-statement">
      </section>
      <Marquee text="This Is Georgia Tech Women's Rugby" />
      <section className="page about-page">
        <h1>About Us</h1>
        <p className="about-intro">{content['about.history_p1']}</p>
        <p className="about-intro">{content['about.history_p2']}</p>

        <h2>Coaches</h2>
        <PersonGrid people={coaches} />

        <h2>Executive Board</h2>
        <PersonGrid people={executiveBoard} />
      </section>
    </>
  )
}

export default About
