<script setup lang="ts">
import { type Event } from '@/type'
import { toRefs, defineProps } from 'vue';

const props = defineProps<{
    event: Event
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
</script>
<template>
    <div class="description-container">
        <p>Edit the event here</p>
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