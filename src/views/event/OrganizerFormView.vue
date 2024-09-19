<script setup lang="ts">
import type { Organizer } from '@/type'
import { ref } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
const organizer = ref<Organizer>({
    id: 0, 
    name: '',
    address: '',
})
const router = useRouter();
const store = useMessageStore();
function saveEvent() {
    EventService.saveOrganizer(organizer.value)
    .then((response) => {
        router.push({name: 'event-list-view', params: {id: response.data.id }})
        store.updateMessage('You are successfully add a new event for ' + response.data.name)
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
        <h1>Create an Organizer</h1>
        <form @submit.prevent="saveEvent" >
            <label >Name: </label>
            <input type="text" v-model="organizer.name" placeholder="Organizer Name" class="field">
            <h3>Address</h3>
            <label >Address: </label>
            <input type="text" v-model="organizer.address" placeholder="Organizer Address" class="field">
            <button class="button" type="submit">Submit</button>
        </form>
    <pre>{{ organizer }}</pre>
    </div>
</template>