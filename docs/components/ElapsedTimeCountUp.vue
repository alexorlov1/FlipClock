<script setup lang="ts">
// #region import
import { ElapsedTime, FlipClock } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const face = new ElapsedTime({
        format: 'hh:mm:ss',
        labels: {
            hh: 'Hours',
            mm: 'Minutes',
            ss: 'Seconds'
        }
    });

    const clock = new FlipClock({ el, face });
    // #endregion example
}

onMounted(() => el.value && run(el.value));
</script>

<template>
    <div class="my-4">
        <div ref="el" style="margin: 1rem"></div>
    </div>
</template>