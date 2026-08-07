export interface Person {
  id: string
  section: 'coach' | 'exec_board'
  name: string
  role: string
  photo_url: string | null
  sort_order: number
  position: string | null
  school_year: string | null
  major: string | null
  bio: string | null
}

export const coachRoles = ['Head Coach', 'Assistant Coach']

export const execBoardRoles = [
  'President',
  'Vice President',
  'Treasurer',
  'Recruitment Chair',
  'Social Media Chair',
  'Match Secretary',
  'Equipment Manager',
  'Social Chair',
  'Merch & Fundraising Chair',
]

export const defaultCoaches: Person[] = coachRoles.map((role, index) => ({
  id: `default-coach-${index}`,
  section: 'coach' as const,
  name: 'TBD',
  role,
  photo_url: null,
  sort_order: index,
  position: null,
  school_year: null,
  major: null,
  bio: null,
}))

export const defaultExecBoard: Person[] = execBoardRoles.map((role, index) => ({
  id: `default-exec-${index}`,
  section: 'exec_board' as const,
  name: 'TBD',
  role,
  photo_url: null,
  sort_order: index,
  position: null,
  school_year: null,
  major: null,
  bio: null,
}))
