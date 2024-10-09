<script setup lang="ts">
import type { Event, Organizer } from '@/type'
import { onMounted, ref } from 'vue';
import EventService from '@/services/EventService';
import OrganizerService from '@/services/OrganizerService';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import ImageUpload from '@/components/ImageUpload.vue';
const event = ref<Event>({
    id: 0, 
    category: '',
    title: '',
    description: '',
    location: '', 
    date: '',
    time: '', 
    petAllowed: false,
    organizer: {
        id: 0,
        name: ''
    },
    images: []
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
const organizers = ref<Organizer[]>([])
onMounted(() => {
    OrganizerService.getOrganizers()
    .then((response) => {
        organizers.value = response.data
        console.log(organizers.value)
    })
    .catch (() => {
        router.push({name: 'network-error-view'})
    })
})
</script>
<template>
    <div class="flex justify-center flex-col items-center">
        <h1>Create an event</h1>
        <form @submit.prevent="saveEvent" class=" bg-green-400 p-5 w-[35%] rounded-t-lg space-y-4 space-x-2 text-lg " >
            <BaseInput type="text" v-model="event.category" label="Category"/>
            <h3>Name & describe your event</h3>
            <BaseInput type="text" v-model="event.title" label="Title"/>
            <BaseInput type="text" v-model="event.description" label="Description"/>
            <h3>Where is your event?</h3> 
            <BaseInput type="text" v-model="event.location" label="Location"/>
            <h3>Who is your organizer?</h3>
            <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer"/>
            <h3>The image of the Event</h3>
            <ImageUpload v-model="event.images"/>
            <button class="button" type="submit">Submit</button>
        </form>
        <div class=" bg-black p-10 w-[35%] bg-opacity-50 rounded-b-lg text-white">
            <pre>{{ event }}</pre>
        </div>
    </div>
</template>