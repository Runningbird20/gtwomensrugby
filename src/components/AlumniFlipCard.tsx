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
  return (
    <button
      type="button"
      className="alumni-card"
      style={{ '--hover-color': alum.favoriteColor } as React.CSSProperties}
    >
      <div className="alumni-card__inner">
        <div className="alumni-card__face alumni-card__face--front">
          {alum.photoUrl ? (
            <img src={alum.photoUrl} alt="" className="alumni-card__photo" />
          ) : (
            <div className="alumni-card__photo alumni-card__photo--placeholder" aria-hidden="true" />
          )}
          <div className="alumni-card__overlay">
            <h3 className="alumni-card__name">{alum.name || 'Name'}</h3>
            <p className="alumni-card__years">{alum.yearsPlayed || 'Years played'}</p>
          </div>
        </div>
        <div className="alumni-card__face alumni-card__face--back">
          <h3 className="alumni-card__name">{alum.name || 'Name'}</h3>
          {alum.classYear && (
            <span className="alumni-card__meta">
              <span className="alumni-card__fact-label">Class</span>
              {alum.classYear}
            </span>
          )}
          {alum.position && (
            <span className="alumni-card__meta">
              <span className="alumni-card__fact-label">Position</span>
              {alum.position}
            </span>
          )}
          <p className="alumni-card__bio">{alum.bio || 'Bio'}</p>
        </div>
      </div>
    </button>
  )
}

export default AlumniFlipCard
