<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>
<template>
  <div v-if="event">
    <h1 class="text-center">{{ event.title }}</h1>
    <div class="flex items-center justify-center">
      <router-link :to="{ name: 'event-detail-view' }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register-view' }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit-view' }">Edit</router-link>
    </div>
    <router-view :event="event"></router-view>
  </div>
</template>

<style></style>
