import axios, { type AxiosResponse } from 'axios'
import type {Event} from '@/type'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/event?_limit=' + perPage + '&_page=' + page)
  },
  getEventById(id: number) {
    return apiClient.get(`/event/${id}`)
  },
  saveEvent(event: Event) {
    return apiClient.post('/events', event)
  },
  getEventsByKeyword(
    keyword: string,
    perPage: number,
    page: number
  ): Promise<AxiosResponse<Event[]>> {
    return apiClient.get(
      '/event?title=' + keyword + '&_limit=' + perPage + '&_page=' + page
    );
  },
}
