export interface Game {
  id: string
  date: string
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
    date: 'Sat, Aug. 30',
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
    date: 'Sat, Sep. 13',
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
    date: 'Sat, Sep. 27',
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
    date: 'Sat, Oct. 24',
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
    date: 'Sat, Nov. 8',
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
    date: 'Sat, Nov. 22',
    opponent: 'Clemson University',
    is_home: true,
    time: '1:00 PM',
    location: defaultHomeLocation,
    status: 'Upcoming',
    score: null,
    sort_order: 5,
  },
]
