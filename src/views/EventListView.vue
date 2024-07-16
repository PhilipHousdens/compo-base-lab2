<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import EventItem from '@/types/Event'
import { computed, ref, watchEffect, type Ref } from 'vue'
import EventService from '@/services/EventService'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const events: Ref<EventItem[]> = ref([])
const page = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.pageSize) || 10)
const totalEvent = ref<number>(0)

watchEffect(() => {
  EventService.getEvents(pageSize.value, page.value)
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

const hasNextPage = computed(() => {
  //first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / 2)
  return page.value < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- New Element -->
  <div class="events">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
    </div>
    <div v-for="event in events" :key="event.id">
      <CategoryOrganizer :category="event.category" :organizer="event.organizer" />
    </div>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list-view', query: { ...route.query,page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'event-list-view', query: { ...route.query,page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
