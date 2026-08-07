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
  const founders = useAlumniProfiles('founder')
  const otherAlumni = useAlumniProfiles('other')

  return (
    <>
      <section className="alumni-hero" />
      <Marquee text="Est. 2006" variant="navy" />
      <section className="page alumni-page">
        <h1>Alumni</h1>
        <p>Celebrating former players and staying connected with the GT Women's Rugby alumni network.</p>
        <p className="alumni-hint">Click a card to flip it and read where they are now.</p>

        <h2>Founders</h2>
        <AlumniGrid alumni={founders} />

        <h2>Other Alumni</h2>
        <AlumniGrid alumni={otherAlumni} />
      </section>
    </>
  )
}

export default Alumni
