import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'
import type { AlumniProfile } from '../../data/alumniProfiles'
import AlumniFlipCard from '../../components/AlumniFlipCard'
import './Admin.css'

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return url
}

async function uploadPhoto(file: File): Promise<string | null> {
  const path = `${crypto.randomUUID()}-${file.name}`
  const { error } = await supabase.storage.from('site-photos').upload(path, file)
  if (error) return null
  return supabase.storage.from('site-photos').getPublicUrl(path).data.publicUrl
}

const emptyDraft = {
  name: '',
  years_played: '',
  class_year: '',
  position: '',
  bio: '',
  favorite_color: '#B39051',
}

function AdminAlumni() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [draft, setDraft] = useState(emptyDraft)
  const [newPhoto, setNewPhoto] = useState<File | null>(null)
  const newPhotoUrl = useObjectUrl(newPhoto)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('alumni').select('*').order('sort_order', { ascending: true })
    if (!error && data) setAlumni(data as AlumniProfile[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleAdd = async () => {
    if (!draft.name.trim()) return

    let photo_url: string | null = null
    if (newPhoto) {
      photo_url = await uploadPhoto(newPhoto)
      if (!photo_url) {
        setStatus('Photo upload failed.')
        return
      }
    }

    const { error } = await supabase.from('alumni').insert({ ...draft, photo_url, sort_order: alumni.length })
    if (error) {
      setStatus(`Error adding: ${error.message}`)
      return
    }
    setDraft(emptyDraft)
    setNewPhoto(null)
    setStatus('Added.')
    load()
  }

  const handleUpdate = async (alum: AlumniProfile, patch: Partial<AlumniProfile>) => {
    const { error } = await supabase.from('alumni').update(patch).eq('id', alum.id)
    if (error) setStatus(`Error saving: ${error.message}`)
    else setStatus('Saved.')
  }

  const handleDelete = async (alum: AlumniProfile) => {
    const { error } = await supabase.from('alumni').delete().eq('id', alum.id)
    if (error) {
      setStatus(`Error deleting: ${error.message}`)
      return
    }
    setStatus('Deleted.')
    load()
  }

  const handlePhotoChange = async (alum: AlumniProfile, file: File) => {
    const url = await uploadPhoto(file)
    if (!url) {
      setStatus('Photo upload failed.')
      return
    }
    await handleUpdate(alum, { photo_url: url })
    load()
  }

  return (
    <section className="admin-section">
      <h1>Alumni</h1>
      <p className="admin-section__hint">Front of card shows photo, name, years, class, and position. Bio shows on the flip side.</p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="admin-list">
          {alumni.map((alum) => (
            <AlumniCard
              key={alum.id}
              alum={alum}
              onSave={(patch) => handleUpdate(alum, patch)}
              onDelete={() => handleDelete(alum)}
              onPhotoChange={(file) => handlePhotoChange(alum, file)}
            />
          ))}
        </div>
      )}

      <div className="admin-add-form admin-add-form--with-preview">
        <div>
          <h3>Add Alumni</h3>
          <div className="admin-card__fields">
            <label>
              Name
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </label>
            <label>
              Years Played
              <input
                placeholder="2005-2009"
                value={draft.years_played}
                onChange={(e) => setDraft({ ...draft, years_played: e.target.value })}
              />
            </label>
            <label>
              Class
              <input
                placeholder="Class of 2009"
                value={draft.class_year}
                onChange={(e) => setDraft({ ...draft, class_year: e.target.value })}
              />
            </label>
            <label>
              Position
              <input value={draft.position} onChange={(e) => setDraft({ ...draft, position: e.target.value })} />
            </label>
            <label>
              Favorite Color
              <input
                type="color"
                value={draft.favorite_color}
                onChange={(e) => setDraft({ ...draft, favorite_color: e.target.value })}
              />
            </label>
            <label style={{ gridColumn: '1 / -1' }}>
              Bio (current life)
              <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
            </label>
            <label>
              Photo (optional)
              <input type="file" accept="image/*" onChange={(e) => setNewPhoto(e.target.files?.[0] ?? null)} />
            </label>
          </div>
          <button type="button" className="admin-btn" onClick={handleAdd} style={{ marginTop: '0.75rem' }}>
            Add
          </button>
        </div>
        <div className="admin-preview">
          <p className="admin-preview__label">Preview</p>
          <AlumniFlipCard
            alum={{
              name: draft.name,
              yearsPlayed: draft.years_played,
              classYear: draft.class_year,
              position: draft.position,
              bio: draft.bio,
              favoriteColor: draft.favorite_color,
              photoUrl: newPhotoUrl,
            }}
          />
        </div>
      </div>

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}

function AlumniCard({
  alum,
  onSave,
  onDelete,
  onPhotoChange,
}: {
  alum: AlumniProfile
  onSave: (patch: Partial<AlumniProfile>) => void
  onDelete: () => void
  onPhotoChange: (file: File) => void
}) {
  const [draft, setDraft] = useState({
    name: alum.name,
    years_played: alum.years_played,
    class_year: alum.class_year,
    position: alum.position,
    bio: alum.bio,
    favorite_color: alum.favorite_color,
  })

  return (
    <div className="admin-card">
      <div>
        {alum.photo_url ? (
          <img src={alum.photo_url} alt="" className="admin-card__photo" />
        ) : (
          <div className="admin-card__photo" />
        )}
        <input
          type="file"
          accept="image/*"
          style={{ marginTop: '0.5rem', fontSize: '0.7rem', width: '90px' }}
          onChange={(e) => e.target.files && onPhotoChange(e.target.files[0])}
        />
      </div>
      <div className="admin-card__fields">
        <label>
          Name
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </label>
        <label>
          Years Played
          <input value={draft.years_played} onChange={(e) => setDraft({ ...draft, years_played: e.target.value })} />
        </label>
        <label>
          Class
          <input value={draft.class_year} onChange={(e) => setDraft({ ...draft, class_year: e.target.value })} />
        </label>
        <label>
          Position
          <input value={draft.position} onChange={(e) => setDraft({ ...draft, position: e.target.value })} />
        </label>
        <label>
          Favorite Color
          <input type="color" value={draft.favorite_color} onChange={(e) => setDraft({ ...draft, favorite_color: e.target.value })} />
        </label>
        <label style={{ gridColumn: '1 / -1' }}>
          Bio (current life)
          <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
        </label>
      </div>
      <div className="admin-preview">
        <p className="admin-preview__label">Preview</p>
        <AlumniFlipCard
          alum={{
            name: draft.name,
            yearsPlayed: draft.years_played,
            classYear: draft.class_year,
            position: draft.position,
            bio: draft.bio,
            favoriteColor: draft.favorite_color,
            photoUrl: alum.photo_url,
          }}
        />
      </div>
      <div className="admin-card__actions">
        <button type="button" className="admin-btn" onClick={() => onSave(draft)}>
          Save
        </button>
        <button type="button" className="admin-btn admin-btn--danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default AdminAlumni
