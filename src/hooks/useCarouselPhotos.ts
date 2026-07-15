import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

const localPhotoModules = import.meta.glob('../assets/carousel/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const localPhotos = Object.keys(localPhotoModules)
  .sort()
  .map((path) => localPhotoModules[path])

export function useCarouselPhotos() {
  const [photos, setPhotos] = useState<string[]>(localPhotos)

  useEffect(() => {
    let cancelled = false

    supabase.storage
      .from('carousel-photos')
      .list('', { sortBy: { column: 'name', order: 'asc' } })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return
        const urls = data
          .filter((file) => file.name !== '.emptyFolderPlaceholder')
          .map((file) => supabase.storage.from('carousel-photos').getPublicUrl(file.name).data.publicUrl)
        if (urls.length > 0) setPhotos(urls)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return photos
}
