<script setup lang="ts">
// #region import
import { elapsedTime, flipClock, theme } from 'flipclock';
// #endregion import

import { onMounted, ref } from 'vue';

const el = ref<Element>();

function run(el: Element) {
    // #region example
    const start = new Date();

    const end = new Date();
    
    end.setFullYear(end.getFullYear() + 1);
    end.setMonth(1);
    end.setDate(1);
    end.setHours(0);
    end.setMinutes(0);

    flipClock({
        el,
        face: elapsedTime({
            start,
            end,
            format: '[dd] [hh]:[mm]:[ss]'
        }),
        theme: theme({
            dividers: [':', ' '],
            labels: ['Days', 'Hours', 'Minutes', 'Seconds']
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