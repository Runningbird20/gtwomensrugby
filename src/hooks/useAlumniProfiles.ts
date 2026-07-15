import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { defaultAlumniProfiles, type AlumniProfile } from '../data/alumniProfiles'

export function useAlumniProfiles() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>(defaultAlumniProfiles)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('alumni')
      .select('*')
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
  }, [])

  return alumni
}
