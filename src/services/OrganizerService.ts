import type { Organizer } from '@/type'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
    getOrganizers() {
        return apiClient.get(`/organizers`)
    },
  saveOrganizer(organizer: Organizer) {
    return apiClient.post('/add-organizer', organizer)
  }
}
