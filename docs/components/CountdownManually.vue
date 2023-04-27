<script setup lang="ts">
// #region import
import { Counter, FaceValue, FlipClock } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

let clock: FlipClock;

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const face = new Counter({
        autoStart: false,
        value: FaceValue.make(10)
    });

    clock = new FlipClock({ el, face });
    // #endregion example
}

function onClick(step: number) {
console.log(clock)
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