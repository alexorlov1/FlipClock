<script setup lang="ts">
// #region import
import { clock, flipClock, theme } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // @todo: The labels dont work on this example. Fix.
    // #region example
    flipClock({
        el,
        face: clock({
            format: '[MM]:[ss]'
        }),
        theme: theme({
            labels: ['Minutes', 'Seconds']
        })
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