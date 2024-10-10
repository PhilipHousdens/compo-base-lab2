import type { AxiosResponse } from "axios"
import apiClient from "./AxiosClient"

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
