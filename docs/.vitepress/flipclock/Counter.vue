<template></template>

<script setup lang="ts">
const { value } = defineProps<{
  value?: string|number
}>()

console.log(value);

function test() {

}

defineExpose({
    test
})
</script>