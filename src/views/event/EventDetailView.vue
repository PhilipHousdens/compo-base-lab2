<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { type Event } from '@/type'

const props = defineProps<{
  event: Event
}>()

const { event } = toRefs(props)
</script>
<template>
  <div v-if="event" class="flex justify-center items-center text-center">
    <div class="description">
      <p>{{ event.title }} on {{ event.date }} @ {{ event.location }}</p>
      <p>{{ event.description }}</p>
      <div class="flex flex-row flex-wrap justify-center">
        <img v-for="image in event.images" :key="image" :src="image" alt="events image" class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg">
      </div>
    </div>
  </div>
</template>

<style>

</style>
