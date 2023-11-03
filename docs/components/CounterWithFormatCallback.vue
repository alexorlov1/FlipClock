<script setup lang="ts">
// #region import
import { counter, faceValue, flipClock, theme } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example

    const formatter = Intl.NumberFormat('en-US', {
        minimumFractionDigits: 3,
        minimumIntegerDigits: 3,
        minimumSignificantDigits: 3
    });

    flipClock({
        el,
        autoStart: true,
        face: counter({
            value: faceValue(0),
            format(number) {
                return `$${formatter.format(number)}`;
            }
        }),
        theme: theme()
    })
    // #endregion example
}

onMounted(() => el.value && run(el.value));
</script>

<template>
    <div class="my-4">
        <div ref="el" style="margin: 1rem"></div>
    </div>
</template>