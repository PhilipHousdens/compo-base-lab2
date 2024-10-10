<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import type { Event } from '@/type'
import { computed, onMounted, ref, watchEffect, type Ref } from 'vue'
import EventService from '@/services/EventService'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

const props = defineProps<{
  page: number
  pageSize: number
}>()

const route = useRoute()
const router = useRouter()

const events: Ref<Event[]> = ref([])
const totalEvents: Ref<number | null> = ref(null)

const page = computed(() => props.page)
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(props.pageSize, page.value)
      .then((response) => {
        events.value = response.data
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})

const hasNextPage = computed(() => {
  return events.value.length === props.pageSize
})
const keyword = ref('')
function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data 
    console.log('events', events.value)
    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvent', totalEvents.value)
  }).catch(() => {
    router.push({name: 'NetworkError'})
  })
}
</script>

<template>
  <h1 class="text-green-500 text-2xl text-center">Events For Good</h1>
  <!-- New Element -->
  <div class="flex flex-col items-center">
    <div class="w-64">
        <BaseInput v-model="keyword" label="Search" type="text" @input="updateKeyword" class="w-full"/>
      </div>
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
    </div>
    <div v-for="event in events" :key="event.id">
      <CategoryOrganizer :category="event.category" :organizer="event.organizer" />
    </div>
    <div class="flex w-[290px] justify-between">
      <RouterLink
        class="text-left"
        :to="{ name: 'event-list-view', query: { ...route.query, page: props.page - 1 } }"
        rel="prev"
        v-if="props.page != 1"
      >  
        Prev Page
      </RouterLink>
      <RouterLink
        class="text-right"
        :to="{ name: 'event-list-view', query: { ...route.query, page: props.page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>
<style></style>
