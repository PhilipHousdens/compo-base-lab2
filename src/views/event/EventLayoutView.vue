<script setup lang="ts">
import { useEventStore } from '@/stores/event';
import { storeToRefs } from 'pinia';

const store = useEventStore()
const { event } = storeToRefs(store)

</script>
<template >
    <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{name: 'event-detail-view'}">Details</router-link>
      |
      <router-link :to="{name: 'event-register-view'}">Register</router-link>
      |
      <router-link :to="{name: 'event-edit-view'}">Edit</router-link>
    </div>
   <router-view :event="event"></router-view>
  </div>
</template>

<style>
#nav {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>