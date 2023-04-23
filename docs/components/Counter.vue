<script setup lang="ts">
// #region import
import { Counter, FaceValue, FlipClock } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const face = new Counter({
        autoStart: false,
        value: FaceValue.make(1, {
            minimumDigits: 4
        })
    });

    const clock = new FlipClock({ el, face });
    
    setTimeout(() => clock.start(), 1000);
    // #endregion example
}

onMounted(() => el.value && run(el.value));
</script>

<template>
    <div class="my-4">
        <div ref="el" style="margin: 1rem"></div>
    </div>
</template>