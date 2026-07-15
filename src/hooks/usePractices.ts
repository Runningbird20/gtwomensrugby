import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { defaultPractices, type Practice } from '../data/practices'

export function usePractices() {
  const [practices, setPractices] = useState<Practice[]>(defaultPractices)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('practices')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (!error && data && data.length > 0) setPractices(data as Practice[])
      })

    return () => {
      cancelled = true
    }
  }, [])

  return practices
}
