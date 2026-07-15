import './Alumni.css'
import { useAlumniProfiles } from '../hooks/useAlumniProfiles'
import AlumniFlipCard from '../components/AlumniFlipCard'

function Alumni() {
  const alumniProfiles = useAlumniProfiles()

  return (
    <section className="page">
      <h1>Alumni</h1>
      <p>Celebrating former players and staying connected with the GT Women's Rugby alumni network.</p>
      <p className="alumni-hint">Click a card to flip it and read where they are now.</p>

      <div className="alumni-grid">
        {alumniProfiles.map((alum) => (
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
    </section>
  )
}

export default Alumni
