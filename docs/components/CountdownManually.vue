<script setup lang="ts">
// #region import
import { Counter, FlipClock, counter, faceValue, flipClock, theme } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

let clock: FlipClock<Counter>;

const el = ref<Element>();

function run(el: Element) {
    // #region example
    clock = flipClock({
        el,
        autoStart: false,
        face: counter({
            value: faceValue(10)
        }),
        theme: theme()
    });
    // #endregion example
}

onMounted(() => el.value && run(el.value));
</script>

<template>
    <div class="example my-4">
        <div ref="el" style="margin: 1rem"></div>

        <div class="flex gap-2 my-4">
            <!-- #region template -->
            <button @click="clock.face.increment()">+1</button>
            <button @click="clock.face.decrement()">-1</button>
            <!-- #endregion template -->
        </div>
    </div>
</template>