<script setup lang="ts">
import { type Event } from '@/type'
import { toRefs, defineProps } from 'vue'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router'

const props = defineProps<{
  event: Event
}>()

const router = useRouter()
const store = useMessageStore()
const edit = () => {
  store.updateMessage('You are successfully update the data')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
</script>
<template>
    <div class="flex justify-center items-center text-center">
        <p>Edit the event here&nbsp;</p>
        <button @click="edit">Edit</button>
    </div>
</template>
<style>

</style>
