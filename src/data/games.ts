export interface Game {
  id: string
  game_date: string | null
  opponent: string
  is_home: boolean
  time: string
  location: string
  status: 'Win' | 'Loss' | 'Upcoming'
  score: string | null
  sort_order: number
}

export const defaultHomeLocation = 'Stamps Field'

export const defaultGames: Game[] = [
  {
    id: 'default-game-1',
    game_date: '2026-08-30',
    opponent: 'University of Georgia',
    is_home: true,
    time: '1:00 PM',
    location: defaultHomeLocation,
    status: 'Win',
    score: '27-12',
    sort_order: 0,
  },
  {
    id: 'default-game-2',
    game_date: '2026-09-13',
    opponent: 'Auburn University',
    is_home: false,
    time: '12:00 PM',
    location: 'Auburn, AL',
    status: 'Loss',
    score: '15-20',
    sort_order: 1,
  },
  {
    id: 'default-game-3',
    game_date: '2026-09-27',
    opponent: 'University of Alabama',
    is_home: true,
    time: '1:00 PM',
    location: defaultHomeLocation,
    status: 'Win',
    score: '34-10',
    sort_order: 2,
  },
  {
    id: 'default-game-4',
    game_date: '2026-10-24',
    opponent: 'Boston College',
    is_home: true,
    time: 'TBD',
    location: 'Tailgate location TBD',
    status: 'Upcoming',
    score: null,
    sort_order: 3,
  },
  {
    id: 'default-game-5',
    game_date: '2026-11-08',
    opponent: 'University of Tennessee',
    is_home: false,
    time: '11:00 AM',
    location: 'Knoxville, TN',
    status: 'Upcoming',
    score: null,
    sort_order: 4,
  },
  {
    id: 'default-game-6',
    game_date: '2026-11-22',
    opponent: 'Clemson University',
    is_home: true,
    time: '1:00 PM',
    location: defaultHomeLocation,
    status: 'Upcoming',
    score: null,
    sort_order: 5,
  },
]

// Soonest to latest; games with no game_date set yet sort to the end
// instead of before everything else.
export function sortByGameDate(games: Game[]): Game[] {
  return [...games].sort((a, b) => {
    if (!a.game_date && !b.game_date) return 0
    if (!a.game_date) return 1
    if (!b.game_date) return -1
    return a.game_date.localeCompare(b.game_date)
  })
}

// Public-facing display, e.g. "Sat, Aug. 30" — deliberately omits the year.
// The year is only ever shown in the admin date picker.
export function formatGameDate(gameDate: string | null): string {
  if (!gameDate) return 'Date TBD'
  const date = new Date(`${gameDate}T00:00:00`)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  return `${weekday}, ${month}. ${date.getDate()}`
}
