import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { defaultCoaches, defaultExecBoard, type Person } from '../data/people'

export function usePeople(section: 'coach' | 'exec_board') {
  const fallback = section === 'coach' ? defaultCoaches : defaultExecBoard
  const [people, setPeople] = useState<Person[]>(fallback)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('people')
      .select('*')
      .eq('section', section)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (!error && data && data.length > 0) {
          setPeople(data as Person[])
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  return people
}
