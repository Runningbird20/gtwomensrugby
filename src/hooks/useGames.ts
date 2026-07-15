import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { defaultGames, type Game } from '../data/games'

export function useGames() {
  const [games, setGames] = useState<Game[]>(defaultGames)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('games')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (!error && data && data.length > 0) setGames(data as Game[])
      })

    return () => {
      cancelled = true
    }
  }, [])

  return games
}
