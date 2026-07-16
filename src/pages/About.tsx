import './About.css'
import { usePeople } from '../hooks/usePeople'
import { useSiteContent } from '../hooks/useSiteContent'
import type { Person } from '../data/people'

function PersonGrid({ people }: { people: Person[] }) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <div className="people-card" key={person.id}>
          {person.photo_url ? (
            <img src={person.photo_url} alt="" className="people-card__photo" />
          ) : (
            <div className="people-card__photo" aria-hidden="true" />
          )}
          <h3 className="people-card__name">{person.name}</h3>
          <p className="people-card__role">{person.role}</p>
        </div>
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
        <p className="about-statement__line about-statement__line--outline">This Is</p>
        <p className="about-statement__line">Georgia Tech</p>
        <p className="about-statement__line about-statement__line--gold">Women's Rugby</p>
      </section>
      <section className="page">
        <h1>About Us</h1>
        <p>{content['about.history_p1']}</p>
        <p>{content['about.history_p2']}</p>

        <h2>Coaches</h2>
        <PersonGrid people={coaches} />

        <h2>Executive Board</h2>
        <PersonGrid people={executiveBoard} />
      </section>
    </>
  )
}

export default About
