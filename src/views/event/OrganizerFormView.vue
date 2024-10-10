<script setup lang="ts">
import type { Organizer } from '@/type'
import { ref } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import ImageUpload from '@/components/ImageUpload.vue';
const organizer = ref<Organizer>({
    id: 0, 
    name: '',
    images: [],
})
const router = useRouter();
const store = useMessageStore();
function saveEvent() {
    OrganizerService.saveOrganizer(organizer.value)
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
    <div class="flex justify-center flex-col items-center">
        <h1>Create an Organizer</h1>
        <form @submit.prevent="saveEvent" class=" bg-green-400 p-5 w-[35%] rounded-t-lg space-y-4 space-x-2 text-lg " >
            <h3>Organizer Name</h3>
            <BaseInput v-model="organizer.name" label="Organizer"/>
            <ImageUpload v-model="organizer.images"/>
            <button class="button" type="submit">Submit</button>
        </form>
        <div  class=" bg-black p-10 w-[35%] bg-opacity-50 rounded-b-lg text-white">
            <pre>{{ organizer }}</pre>
        </div>
    
    </div>
</template>