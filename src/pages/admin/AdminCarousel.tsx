import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'
import PhotoCropper from './PhotoCropper'
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

  const [pending, setPending] = useState<File[]>([])
  const [pendingTotal, setPendingTotal] = useState(0)

  const handlePick = (fileList: FileList) => {
    const picked = Array.from(fileList)
    setPending(picked)
    setPendingTotal(picked.length)
  }

  const advanceQueue = () => {
    setPending((queue) => {
      const rest = queue.slice(1)
      if (rest.length === 0) load()
      return rest
    })
  }

  const handleCroppedUpload = async (blob: Blob) => {
    const base = pending[0]?.name.replace(/\.[^.]+$/, '') || 'photo'
    const path = `${Date.now()}-${base}.jpg`
    const { error } = await supabase.storage
      .from('carousel-photos')
      .upload(path, blob, { contentType: 'image/jpeg' })
    setStatus(error ? `Error uploading ${base}: ${error.message}` : 'Upload complete.')
    advanceQueue()
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
        onChange={(e) => {
          if (e.target.files?.length) handlePick(e.target.files)
          e.target.value = ''
        }}
      />

      {pending.length > 0 && (
        <PhotoCropper
          key={`${pending[0].name}-${pending.length}`}
          file={pending[0]}
          aspect={16 / 9}
          cornerRadius={28 / 1080}
          queueLabel={pendingTotal > 1 ? `(${pendingTotal - pending.length + 1} of ${pendingTotal})` : undefined}
          onSave={handleCroppedUpload}
          onCancel={advanceQueue}
        />
      )}

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}

export default AdminCarousel
