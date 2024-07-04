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
  }
  .text {
    font-size: 16px;
  }
  </style>
  