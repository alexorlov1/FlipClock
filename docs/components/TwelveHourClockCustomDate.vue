<script setup lang="ts">
// #region import
import { Clock, FaceValue, FlipClock } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const value = new Date();

    value.setFullYear(1970);
    value.setMonth(0);
    value.setDate(1);
    value.setHours(0);
    value.setMinutes(0);
    value.setSeconds(0);

    const face = new Clock({
        value: FaceValue.make(value)
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