<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { type Event } from '@/type'

const props = defineProps<{
  event: Event
}>()

const { event } = toRefs(props) 

</script>
<template>
  <div v-if="event" class="description-container">
    <div class="description">
      <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
      <p>{{ event.description }}</p>
    </div>
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
