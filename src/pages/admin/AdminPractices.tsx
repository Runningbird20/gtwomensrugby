import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'
import type { Practice } from '../../data/practices'
import { defaultSiteContent } from '../../data/siteContent'
import EditableField from '../../components/EditableField'
import '../Schedule.css'
import './Admin.css'

const emptyDraft = { day: '', time: '', location: '' }

function AdminPractices() {
  const [practices, setPractices] = useState<Practice[]>([])
  const [heading, setHeading] = useState(defaultSiteContent['schedule.practice_heading'])
  const [semester, setSemester] = useState(defaultSiteContent['schedule.practice_semester'])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [newRow, setNewRow] = useState(emptyDraft)

  const load = async () => {
    setLoading(true)
    const [practicesResult, contentResult] = await Promise.all([
      supabase.from('practices').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_content').select('key, value').in('key', ['schedule.practice_heading', 'schedule.practice_semester']),
    ])

    if (!practicesResult.error && practicesResult.data) setPractices(practicesResult.data as Practice[])
    if (!contentResult.error && contentResult.data) {
      for (const row of contentResult.data) {
        if (row.key === 'schedule.practice_heading') setHeading(row.value)
        if (row.key === 'schedule.practice_semester') setSemester(row.value)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const saveContent = async (key: string, value: string) => {
    const { error } = await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' })
    setStatus(error ? `Error saving: ${error.message}` : 'Saved.')
  }

  const handleAdd = async () => {
    if (!newRow.day.trim() || !newRow.time.trim() || !newRow.location.trim()) return
    const { error } = await supabase.from('practices').insert({ ...newRow, sort_order: practices.length })
    if (error) {
      setStatus(`Error adding: ${error.message}`)
      return
    }
    setNewRow(emptyDraft)
    setStatus('Added.')
    load()
  }

  const handleFieldSave = async (practice: Practice, field: keyof Practice, value: string) => {
    const { error } = await supabase.from('practices').update({ [field]: value }).eq('id', practice.id)
    if (error) {
      setStatus(`Error saving: ${error.message}`)
      return
    }
    setPractices((current) => current.map((p) => (p.id === practice.id ? { ...p, [field]: value } : p)))
    setStatus('Saved.')
  }

  const handleDelete = async (practice: Practice) => {
    if (!confirm(`Delete the ${practice.day} practice?`)) return
    const { error } = await supabase.from('practices').delete().eq('id', practice.id)
    if (error) {
      setStatus(`Error deleting: ${error.message}`)
      return
    }
    setStatus('Deleted.')
    load()
  }

  return (
    <section className="admin-section">
      <p className="admin-section__hint">
        This looks exactly like the live table on the Home and Schedule pages. Click any text to edit it — changes
        save as soon as you click away or press Enter.
      </p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <div className="schedule-section-heading">
            <EditableField
              as="h2"
              value={heading}
              onSave={(value) => {
                setHeading(value)
                saveContent('schedule.practice_heading', value)
              }}
            />
            <EditableField
              as="span"
              className="schedule-semester"
              value={semester}
              onSave={(value) => {
                setSemester(value)
                saveContent('schedule.practice_semester', value)
              }}
            />
          </div>

          <div className="schedule-table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {practices.map((practice) => (
                  <tr key={practice.id}>
                    <td>
                      <EditableField value={practice.day} onSave={(v) => handleFieldSave(practice, 'day', v)} />
                    </td>
                    <td>
                      <EditableField value={practice.time} onSave={(v) => handleFieldSave(practice, 'time', v)} />
                    </td>
                    <td>
                      <EditableField value={practice.location} onSave={(v) => handleFieldSave(practice, 'location', v)} />
                    </td>
                    <td className="admin-table__actions">
                      <button type="button" className="admin-btn admin-btn--danger" onClick={() => handleDelete(practice)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="admin-table__new-row">
                  <td>
                    <input value={newRow.day} placeholder="Day" onChange={(e) => setNewRow({ ...newRow, day: e.target.value })} />
                  </td>
                  <td>
                    <input
                      value={newRow.time}
                      placeholder="6:00 PM - 8:00 PM"
                      onChange={(e) => setNewRow({ ...newRow, time: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={newRow.location}
                      placeholder="Location"
                      onChange={(e) => setNewRow({ ...newRow, location: e.target.value })}
                    />
                  </td>
                  <td>
                    <button type="button" className="admin-btn" onClick={handleAdd}>
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}

export default AdminPractices
