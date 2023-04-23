<script setup lang="ts">
// #region import
import { ElapsedTime, FlipClock } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const end = new Date();
    
    const start = new Date(
        end.getTime() + (24 * 3600 * 1000)
    );

    const face = new ElapsedTime({
        start,
        end,
        format: 'DD hh:mm:ss',
        labels: {
            YY: 'Years',
            DD: 'Days',
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