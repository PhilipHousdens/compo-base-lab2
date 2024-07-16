import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/PhilipHousdens/compo-base-demo-server',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents() {
        return apiClient.get('/events')
    },
    getEventById(id: number) {
        return apiClient.get('events/' + id.toString)
    }
}