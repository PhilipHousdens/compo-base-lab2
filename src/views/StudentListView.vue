<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import type { Students } from '@/types/Event'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref<Students[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
      console.log(students.value)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Students</h1>
  <div class="students">
    <div v-for="student in students" :key="student.id">
      <StudentCard :student="student" />
    </div>
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
