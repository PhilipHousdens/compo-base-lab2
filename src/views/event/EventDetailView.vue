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
      <p>{{ event.title }} @ {{ event.location }}</p>
      <p>{{ event.description }}</p>
    </div>
  </div>
</template>

<style>

</style>
