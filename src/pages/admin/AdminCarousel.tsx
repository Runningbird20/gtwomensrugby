import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'
import './Admin.css'

interface CarouselFile {
  name: string
  url: string
}

function AdminCarousel() {
  const [files, setFiles] = useState<CarouselFile[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.storage
      .from('carousel-photos')
      .list('', { sortBy: { column: 'name', order: 'asc' } })

    if (!error && data) {
      const withUrls = data
        .filter((file) => file.name !== '.emptyFolderPlaceholder')
        .map((file) => ({
          name: file.name,
          url: supabase.storage.from('carousel-photos').getPublicUrl(file.name).data.publicUrl,
        }))
      setFiles(withUrls)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleUpload = async (fileList: FileList) => {
    for (const file of Array.from(fileList)) {
      const path = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('carousel-photos').upload(path, file)
      if (error) setStatus(`Error uploading ${file.name}: ${error.message}`)
    }
    setStatus('Upload complete.')
    load()
  }

  const handleDelete = async (name: string) => {
    const { error } = await supabase.storage.from('carousel-photos').remove([name])
    if (error) {
      setStatus(`Error deleting: ${error.message}`)
      return
    }
    setStatus('Deleted.')
    load()
  }

  return (
    <section className="admin-section">
      <h1>Carousel Photos</h1>
      <p className="admin-section__hint">
        Photos uploaded here replace the home page carousel. They rotate in filename order.
      </p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="admin-carousel-grid">
          {files.map((file) => (
            <div className="admin-carousel-item" key={file.name}>
              <img src={file.url} alt="" />
              <button type="button" onClick={() => handleDelete(file.name)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
      />

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}

export default AdminCarousel
