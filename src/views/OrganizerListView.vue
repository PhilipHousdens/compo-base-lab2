<script setup lang="ts">
import type { Organizer } from '@/type'
import { computed, onMounted, ref, watchEffect, type Ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRoute } from 'vue-router'
import OrganizerCard from '@/components/OrganizerCard.vue'
import BaseInput from '@/components/BaseInput.vue'

const props = defineProps<{
  page: number
  pageSize: number
}>()

const route = useRoute()

const organizers: Ref<Organizer[]> = ref([])

const page = computed(() => props.page)
onMounted(() => {
  watchEffect(() => {
    OrganizerService.getOrganizers(props.pageSize, page.value)
      .then((response) => {
        organizers.value = response.data
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})

const hasNextPage = computed(() => {
  return organizers.value.length === props.pageSize
})
</script>

<template>
    <h1 class="text-green-500 text-2xl text-center">Events For Good</h1>
    <!-- New Element -->
    <div class="flex flex-col items-center">

        <div v-for="organizer in organizers" :key="organizer.id">
            <OrganizerCard :organizer="organizer" />
        </div>
        <div class="flex w-[290px] justify-between">
          <RouterLink
              class="text-left"
              :to="{ name: 'organizer-list-view', query: { ...route.query, page: props.page - 1 } }"
              rel="prev"
              v-if="props.page != 1"
          >
              Prev Page
          </RouterLink>
          <RouterLink
              class="text-right"
              :to="{ name: 'organizer-list-view', query: { ...route.query, page: props.page + 1 } }"
              rel="next"
              v-if="hasNextPage"
          >
              Next Page
          </RouterLink>
        </div>
    </div>
</template>
  

<style></style>
