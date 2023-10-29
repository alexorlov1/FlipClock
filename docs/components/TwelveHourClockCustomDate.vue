<script setup lang="ts">
// #region import
import { clock, flipClock, theme } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const date = new Date();

    date.setFullYear(1970);
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    flipClock({
        el,
        face: clock({
            date,
            format: 'MMM YYYY hh:mm:ss A'
        }),
        theme: theme()
    });
    // #endregion example
}

onMounted(() => el.value && run(el.value));
</script>

<template>
    <div class="my-4">
        <div ref="el" style="margin: 1rem"></div>
    </div>
</template>

<style scoped>
*:deep(.flip-clock .flip-clock-card) {
    font-size: 8px;
    border-radius: 2px;
}
/*
// #region css
.flip-clock .flip-clock-card {
    font-size: 8px;
    border-radius: 2px;
}
// #endregion css
*/
</style>