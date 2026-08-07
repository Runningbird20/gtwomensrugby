import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { defaultFounders, defaultOtherAlumni, type AlumniProfile } from '../data/alumniProfiles'

export function useAlumniProfiles(section: 'founder' | 'other') {
  const fallback = section === 'founder' ? defaultFounders : defaultOtherAlumni
  const [alumni, setAlumni] = useState<AlumniProfile[]>(fallback)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('alumni')
      .select('*')
      .eq('section', section)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (!error && data && data.length > 0) {
          setAlumni(data as AlumniProfile[])
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  return alumni
}
