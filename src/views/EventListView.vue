<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryOrganizer from '@/components/CategoryOrganizer.vue'
import EventItem from '@/types/Event'
import { computed, onMounted, ref, watch, watchEffect, type Ref } from 'vue'
import EventService from '@/services/EventService'
import { useRoute } from 'vue-router'

const props = defineProps<{
  page: number
  pageSize: number
}>()

const route = useRoute()

const events: Ref<EventItem[]> = ref([])

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
</script>

<template>
  <h1 class="text-green-500 text-2xl">Events For Good</h1>
  <!-- New Element -->
  <div class="flex flex-col items-center">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
    </div>
    <div v-for="event in events" :key="event.id">
      <CategoryOrganizer :category="event.category" :organizer="event.organizer" />
    </div>
    <div class="flex w-[290px] justify-between">
      <RouterLink
        :to="{ name: 'event-list-view', query: { ...route.query, page: props.page - 1 } }"
        rel="prev"
        v-if="props.page != 1"
        class="text-left"
      >  
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'event-list-view', query: { ...route.query, page: props.page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="text-right"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
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
