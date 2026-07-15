export interface Practice {
  id: string
  day: string
  time: string
  location: string
  sort_order: number
}

export const defaultPractices: Practice[] = [
  { id: 'default-practice-1', day: 'Tuesday', time: '6:00 PM - 8:00 PM', location: 'Rocky Branch Fields, Atlanta, GA', sort_order: 0 },
  { id: 'default-practice-2', day: 'Thursday', time: '6:00 PM - 8:00 PM', location: 'Rocky Branch Fields, Atlanta, GA', sort_order: 1 },
  { id: 'default-practice-3', day: 'Sunday', time: '2:00 PM - 4:00 PM', location: 'Rocky Branch Fields, Atlanta, GA', sort_order: 2 },
]
