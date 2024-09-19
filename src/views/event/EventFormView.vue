<script setup lang="ts">
import type { Event } from '@/type'
import { ref } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
const event = ref<Event>({
    id: 0, 
    category: '',
    title: '',
    description: '',
    location: '', 
    date: '',
    time: '', 
    petAllowed: false,
    organizer: ''
})
const router = useRouter();
const store = useMessageStore();
function saveEvent() {
    EventService.saveEvent(event.value)
    .then((response) => {
        router.push({name: 'event-list-view', params: {id: response.data.id }})
        store.updateMessage('You are successfully add a new event for ' + response.data.title)
        setTimeout(() => {
            store.resetMessage()
        }, 3000)
    })
    .catch(() => {
        router.push({name: 'network-error-view'})
    })
}
</script>
<template>
    <div>
        <h1>Create an event</h1>
        <form @submit.prevent="saveEvent" >
            <label >Category</label>
            <input type="text" v-model="event.category" placeholder="Category" class="field">
            <h3>Name & describe your event</h3>
            <label >Title</label>
            <input type="text" v-model="event.tile" placeholder="Title" class="field">
            <label>Description</label>
            <input type="text" v-model="event.description" placeholder="Description" class="field">
            <h3>Where is your event?</h3>
            <label>Location</label>
            <input type="text" v-model="event.location" placeholder="Location" class="field">
            <button class="button" type="submit">Submit</button>
        </form>
    <pre>{{ event }}</pre>
    </div>
</template>