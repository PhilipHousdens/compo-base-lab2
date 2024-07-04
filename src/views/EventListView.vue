<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import Event from '@/types/Event'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref<Event[]>(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/PhilipHousdens/compo-base-demo-server/events')
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- New Element -->
  <div class="events">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <CategoryOrganizer :category="event.category" :organizer="event.organizer" />
    </div>
    
  </div>
</template>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
