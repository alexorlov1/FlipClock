<template>
    test
</template>

<script setup lang="ts">
import { useSlots, createApp } from 'vue'

const app = createApp(useSlots().default().shift()).mount(
    document.createElement('div')
)

console.log(123, app)
</script>