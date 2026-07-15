import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { defaultSiteContent } from '../data/siteContent'

export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>(defaultSiteContent)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('site_content')
      .select('key, value')
      .then(({ data, error }) => {
        if (cancelled || error || !data) return
        setContent((current) => {
          const merged = { ...current }
          for (const row of data) {
            merged[row.key] = row.value
          }
          return merged
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return content
}
