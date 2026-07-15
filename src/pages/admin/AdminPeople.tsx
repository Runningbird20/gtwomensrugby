import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'
import { coachRoles, execBoardRoles, type Person } from '../../data/people'
import './Admin.css'

async function uploadPhoto(file: File): Promise<string | null> {
  const path = `${crypto.randomUUID()}-${file.name}`
  const { error } = await supabase.storage.from('site-photos').upload(path, file)
  if (error) return null
  return supabase.storage.from('site-photos').getPublicUrl(path).data.publicUrl
}

function AdminPeople({ section, title }: { section: 'coach' | 'exec_board'; title: string }) {
  const roleOptions = section === 'coach' ? coachRoles : execBoardRoles
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState(roleOptions[0])
  const [newPhoto, setNewPhoto] = useState<File | null>(null)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('section', section)
      .order('sort_order', { ascending: true })

    if (!error && data) setPeople(data as Person[])
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  const handleAdd = async () => {
    if (!newName.trim() || !newRole.trim()) return

    let photo_url: string | null = null
    if (newPhoto) {
      photo_url = await uploadPhoto(newPhoto)
      if (!photo_url) {
        setStatus('Photo upload failed.')
        return
      }
    }

    const { error } = await supabase.from('people').insert({
      section,
      name: newName,
      role: newRole,
      photo_url,
      sort_order: people.length,
    })
    if (error) {
      setStatus(`Error adding: ${error.message}`)
      return
    }
    setNewName('')
    setNewRole(roleOptions[0])
    setNewPhoto(null)
    setStatus('Added.')
    load()
  }

  const handleUpdate = async (person: Person, patch: Partial<Person>) => {
    const { error } = await supabase.from('people').update(patch).eq('id', person.id)
    if (error) setStatus(`Error saving: ${error.message}`)
    else setStatus('Saved.')
  }

  const handleDelete = async (person: Person) => {
    const { error } = await supabase.from('people').delete().eq('id', person.id)
    if (error) {
      setStatus(`Error deleting: ${error.message}`)
      return
    }
    setStatus('Deleted.')
    load()
  }

  const handlePhotoChange = async (person: Person, file: File) => {
    const url = await uploadPhoto(file)
    if (!url) {
      setStatus('Photo upload failed.')
      return
    }
    await handleUpdate(person, { photo_url: url })
    load()
  }

  return (
    <section className="admin-section">
      <h1>{title}</h1>
      <p className="admin-section__hint">
        Changes save immediately when you click "Save" on a card, or when you upload a photo.
      </p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="admin-list">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              roleOptions={roleOptions}
              onSave={(patch) => handleUpdate(person, patch)}
              onDelete={() => handleDelete(person)}
              onPhotoChange={(file) => handlePhotoChange(person, file)}
            />
          ))}
        </div>
      )}

      <div className="admin-add-form">
        <h3>Add Person</h3>
        <div className="admin-card__fields">
          <label>
            Name
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          </label>
          <label>
            Role
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
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

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}

function PersonCard({
  person,
  roleOptions,
  onSave,
  onDelete,
  onPhotoChange,
}: {
  person: Person
  roleOptions: string[]
  onSave: (patch: Partial<Person>) => void
  onDelete: () => void
  onPhotoChange: (file: File) => void
}) {
  const [name, setName] = useState(person.name)
  const [role, setRole] = useState(person.role)

  return (
    <div className="admin-card">
      <div>
        {person.photo_url ? (
          <img src={person.photo_url} alt="" className="admin-card__photo" />
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
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {!roleOptions.includes(role) && (
              <option value={role}>{role}</option>
            )}
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="admin-card__actions">
        <button type="button" className="admin-btn" onClick={() => onSave({ name, role })}>
          Save
        </button>
        <button type="button" className="admin-btn admin-btn--danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default AdminPeople
