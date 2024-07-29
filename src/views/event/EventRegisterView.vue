<script setup lang="ts">
import { type Event } from '@/type'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
    event: Event
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
    store.updateMessage('You are successfully resgistered for ' + props.event.title)
    setTimeout(() => {
        store.resetMessage()
    }, 3000)
    router.push({name: 'event-detail-view', params: {id: props.event.id}})
}

</script>
<template>
    <div class="description-container">
        <p> Register from here</p>
        <button @click="register">Register</button>
    </div>
    
</template>
<style>
.description-container {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  text-align: center; /* Center text within the container */
}   
</style>