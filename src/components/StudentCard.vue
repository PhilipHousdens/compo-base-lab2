<script setup lang="ts">
import { ref } from 'vue'
import type {Students} from '@/type'
defineProps<{
  student: Students
}>()
</script>

<template>
  <div class="event-class">
    <div class="event-card">
      <h2>{{ student.name }} {{ student.surname }}</h2>
      <span>gpa: {{ student.gpa }}</span>
    </div>
  </div>
</template>
<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
