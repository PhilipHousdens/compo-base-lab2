<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useMessageStore } from './stores/message'
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia'
import { injectSpeedInsights } from '@vercel/speed-insights';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiAccountPlus, mdiLogin } from '@mdi/js';
import path from 'path';


injectSpeedInsights();

const store = useMessageStore()
const authStore = useAuthStore()
const { message } = storeToRefs(store)

const router = useRouter()
const route = useRoute()
const pageSize = ref(Number(route.query.pageSize) || 2)

function updatePageSize() {
  router.push({
    name: route.name,
    query: { ...route.query, pageSize: pageSize.value, page: 1 }
  })
}

// Logout function
function logout() {
  authStore.logout()
  router.push({name: 'login'})
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
}else {
  authStore.logout()
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
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6">
          <nav class="flex">
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus"/>
                    <span class="ml-3">Sign Up</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <router-link to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin"/>
                    <span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount"/>
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin"/>
                    <span class="ml-3">LogOut</span>
                  </div>
                </a>
              </li>
            </ul>

          </nav>
         <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'event-list-view'}">Event</RouterLink>
         |
         <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'organizer-list-view'}">Organizer</RouterLink>
         |
         <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'about'}">About</RouterLink>
         <span v-if="authStore.isAdmin()">|
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'add-event'}">New Event</RouterLink>
        </span>
         |
         <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'add-organizer'}">New Organizer</RouterLink>
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

<style></style>
