<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const pageSize = ref(Number(route.query.pageSize) || 2)

function updatePageSize() {
  router.push({ name: 'event-list-view', query: { ...route.query, pageSize: pageSize.value, page: 1 } })
}

watch(() => route.query.pageSize, (newPageSize) => {
  pageSize.value = Number(newPageSize) || 2
})
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink> |
          <RouterLink :to="{ name: 'student-list-view' }">Student</RouterLink>
        </nav>
        <div>
          <label for="page-size">Events per page:</label>
          <select id="page-size" v-model="pageSize" @change="updatePageSize">
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="5">5</option>
          </select>
        </div>
      </div>
    </header>
  </div>
  <RouterView />
</template>

<style>
#layout {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}
</style>
