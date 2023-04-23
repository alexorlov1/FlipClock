<script setup lang="ts">
import ElapsedTime from '../components/ElapsedTime.vue';
import ElapsedTimeCountUp from '../components/ElapsedTimeCountUp.vue';
</script>

# Elapsed Time

The `ElapsedTime` displays the time between two dates.

[[toc]]

## 24-hour countdown

Create a clock using `ElapsedTime` to show a 24-hour countdown.

<ElapsedTime />

<<< @/components/ElapsedTime.vue#import{TS}
<<< @/components/ElapsedTime.vue#example{TS}

## Time since page loaded.

The `ElapsedTime` shows the amount of time since the page loaded.

<ElapsedTimeCountUp />

<<< @/components/ElapsedTimeCountUp.vue#import{TS}
<<< @/components/ElapsedTimeCountUp.vue#example{TS}