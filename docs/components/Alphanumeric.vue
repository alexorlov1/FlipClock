<script setup lang="ts">
// #region import
import { alphanumeric, faceValue, flipClock, theme } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    flipClock({
        el,
        timer: 500,
        face: alphanumeric({
            value: faceValue(''),
            targetValue: faceValue('hello world')
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