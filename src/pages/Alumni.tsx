import './Alumni.css'
import { useAlumniProfiles } from '../hooks/useAlumniProfiles'
import AlumniFlipCard from '../components/AlumniFlipCard'
import Marquee from '../components/Marquee'
import type { AlumniProfile } from '../data/alumniProfiles'

function AlumniGrid({ alumni }: { alumni: AlumniProfile[] }) {
  return (
    <div className="alumni-grid">
      {alumni.map((alum) => (
        <AlumniFlipCard
          key={alum.id}
          alum={{
            name: alum.name,
            yearsPlayed: alum.years_played,
            classYear: alum.class_year,
            position: alum.position,
            bio: alum.bio,
            favoriteColor: alum.favorite_color,
            photoUrl: alum.photo_url,
          }}
        />
      ))}
    </div>
  )
}

function Alumni() {
  const alumni = useAlumniProfiles()

  return (
    <>
      <section className="alumni-hero" />
      <Marquee text="Est. 2006" variant="navy" />
      <section className="page alumni-page">
        <h1>Alumni</h1>
        <p className="alumni-intro">Celebrating former players and staying connected with the GT Women's Rugby alumni network.</p>

        <AlumniGrid alumni={alumni} />
      </section>
    </>
  )
}

export default Alumni
