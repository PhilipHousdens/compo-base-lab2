<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/type'
const props = defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink
    class="event-link"
    :to="{ name: 'event-detail-view', params: { id: props.event?.id } }"
  >
    <div class="event-class">
      <div
        class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-6 hover:scale-101 hover:shadow-sp"
      >
        <span>@{{ event?.time }} on {{ event?.date }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
