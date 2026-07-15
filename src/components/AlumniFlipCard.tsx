import { useState } from 'react'
import '../pages/Alumni.css'

export interface AlumniFlipCardData {
  name: string
  yearsPlayed: string
  classYear: string
  position: string
  bio: string
  favoriteColor: string
  photoUrl?: string | null
}

function AlumniFlipCard({ alum }: { alum: AlumniFlipCardData }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <button
      type="button"
      className="alumni-card"
      style={{ '--hover-color': alum.favoriteColor } as React.CSSProperties}
      aria-pressed={isFlipped}
      onClick={() => setIsFlipped((flipped) => !flipped)}
    >
      <div className={isFlipped ? 'alumni-card__inner alumni-card__inner--flipped' : 'alumni-card__inner'}>
        <div className="alumni-card__face alumni-card__face--front">
          {alum.photoUrl ? (
            <img src={alum.photoUrl} alt="" className="alumni-card__photo" />
          ) : (
            <div className="alumni-card__photo" aria-hidden="true" />
          )}
          <h3 className="alumni-card__name">{alum.name || 'Name'}</h3>
          <p className="alumni-card__years">{alum.yearsPlayed || 'Years played'}</p>
          <p className="alumni-card__class">{alum.classYear || 'Class year'}</p>
          <p className="alumni-card__position">{alum.position || 'Position'}</p>
        </div>
        <div className="alumni-card__face alumni-card__face--back">
          <h3 className="alumni-card__name">{alum.name || 'Name'}</h3>
          <p className="alumni-card__bio">{alum.bio || 'Bio'}</p>
        </div>
      </div>
    </button>
  )
}

export default AlumniFlipCard
