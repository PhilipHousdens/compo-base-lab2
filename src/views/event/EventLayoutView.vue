<script setup lang="ts">
import { ref } from "vue";
import { type Event } from '@/type'
import EventService from '@/services/EventService'
import { useRouter } from "vue-router";
const event = ref<Event | null>(null)

const props = defineProps({
    id: String
})

const router = useRouter()

EventService.getEventById(Number(props.id))
    .then((response)=> {
        event.value = response.data
    })
    .catch((error)=> {
        if (error.response && error.response.status === 404) {
            router.push({
                name: '404-resource-view',
                params: { resource: 'event' }
            })
        } else {
            router.push({ name: 'network-error-view' })
        }
    })
</script>
<template >
    <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{name: 'event-detail-view'}">Details</router-link>
      |
      <router-link :to="{name: 'event-register-view'}">Register</router-link>
      |
      <router-link :to="{name: 'event-edit-view'}">Edit</router-link>
    </div>
   <router-view :event="event"></router-view>
  </div>
</template>

<style>
#nav {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>