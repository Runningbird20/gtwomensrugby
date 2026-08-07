import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { defaultGames, sortByGameDate, type Game } from '../data/games'

export function useGames() {
  const [games, setGames] = useState<Game[]>(sortByGameDate(defaultGames))

  useEffect(() => {
    let cancelled = false

    supabase
      .from('games')
      .select('*')
      .then(({ data, error }) => {
        if (cancelled) return
        if (!error && data && data.length > 0) setGames(sortByGameDate(data as Game[]))
      })

    return () => {
      cancelled = true
    }
  }, [])

  return games
}
