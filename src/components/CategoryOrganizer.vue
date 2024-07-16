<template>
  <div class="category-organizer">
    <div class="text">{{ category }}</div>
    <div class="text">{{ organizer }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  category: string
  organizer: string
}>()
</script>

<style scoped>
.category-organizer {
  text-align: right;
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.text {
  font-size: 16px;
}
</style>
