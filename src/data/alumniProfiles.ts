export interface AlumniProfile {
  id: string
  section: 'founder' | 'other'
  name: string
  years_played: string
  class_year: string
  position: string
  bio: string
  favorite_color: string
  photo_url: string | null
  sort_order: number
}

export const defaultFounders: AlumniProfile[] = [
  {
    id: 'default-founder-1',
    section: 'founder',
    name: 'Jane Doe',
    years_played: '2005-2009',
    class_year: 'Class of 2009',
    position: 'Flanker',
    bio: 'One of the founding members who helped start GT Women\'s Rugby in 2006. Now coaching youth rugby in Atlanta and still makes it to every home game.',
    favorite_color: '#B39051',
    photo_url: null,
    sort_order: 0,
  },
]

export const defaultOtherAlumni: AlumniProfile[] = [
  {
    id: 'default-alum-1',
    section: 'other',
    name: 'Jane Doe',
    years_played: '2015-2019',
    class_year: 'Class of 2019',
    position: 'Scrum-half',
    bio: 'Works in software engineering and plays in a local social rugby league.',
    favorite_color: '#B39051',
    photo_url: null,
    sort_order: 0,
  },
  {
    id: 'default-alum-2',
    section: 'other',
    name: 'Jane Doe',
    years_played: '2025-2029',
    class_year: 'Class of 2029',
    position: 'Prop',
    bio: 'Current student; details about life after graduation coming soon.',
    favorite_color: '#B39051',
    photo_url: null,
    sort_order: 1,
  },
]
