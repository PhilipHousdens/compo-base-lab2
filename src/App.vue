<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useMessageStore } from './stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)

const router = useRouter()
const route = useRoute()
const pageSize = ref(Number(route.query.pageSize) || 2)

function updatePageSize() {
  router.push({
    name: 'event-list-view',
    query: { ...route.query, pageSize: pageSize.value, page: 1 }
  })
}

watch(
  () => route.query.pageSize,
  (newPageSize) => {
    pageSize.value = Number(newPageSize) || 2
  }
)
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
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

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellofade 3s ease-in-out;
}
</style>
