import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'
import { defaultSiteContent, siteContentLabels } from '../../data/siteContent'
import './Admin.css'

function AdminContent() {
  const [values, setValues] = useState<Record<string, string>>(defaultSiteContent)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('site_content')
      .select('key, value')
      .then(({ data, error }) => {
        if (!error && data) {
          setValues((current) => {
            const merged = { ...current }
            for (const row of data) merged[row.key] = row.value
            return merged
          })
        }
        setLoading(false)
      })
  }, [])

  const handleSave = async (key: string) => {
    const { error } = await supabase
      .from('site_content')
      .upsert({ key, value: values[key] }, { onConflict: 'key' })
    setStatus(error ? `Error saving: ${error.message}` : `Saved "${siteContentLabels[key]}".`)
  }

  return (
    <section className="admin-section">
      <h1>Site Text</h1>
      <p className="admin-section__hint">Edit the main copy blocks used across the site.</p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="admin-content-list">
          {Object.keys(defaultSiteContent).map((key) => (
            <div className="admin-content-item" key={key}>
              <label htmlFor={key}>{siteContentLabels[key]}</label>
              <textarea
                id={key}
                value={values[key]}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              />
              <button type="button" className="admin-btn" onClick={() => handleSave(key)} style={{ marginTop: '0.5rem' }}>
                Save
              </button>
            </div>
          ))}
        </div>
      )}

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}

export default AdminContent
