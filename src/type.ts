export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petAllowed: boolean
  organizer: Organizer
  images: string[]
}

export interface Organizer {
  id: number 
  name: string
  roles: string[]
}

export interface Students {
  id: string
  studentId: string
  name: string
  surname: string
  gpa: string
  image: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}
