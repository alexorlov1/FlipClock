<script setup lang="ts">
// #region import
import { counter, faceValue, flipClock, theme } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    flipClock({
        el,
        face: counter({
            countdown: true,
            value: faceValue(10)
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