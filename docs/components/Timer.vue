<script setup lang="ts">
// #region import
import { Timer } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const timer = new Timer(100);

    timer.start((interval) => {
        console.log('This is called with each tick.');

        if(interval === 10) {
            timer.reset();
        }
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