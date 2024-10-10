<script setup lang="ts">
interface ErrorMessageProps {
    id: string
}
defineProps<ErrorMessageProps>()
</script>
<template>
    <p aria-live="assertlive" class="errorMessage" :id="id"><slot/></p>
</template>