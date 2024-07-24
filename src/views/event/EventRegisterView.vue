<script setup lang="ts">
import { type Event } from '@/type'
import { toRefs } from 'vue'

const props = defineProps<{
    event: Event
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)

const register = () => {
    // if the registration API call successful
    // Push back to the event details view
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