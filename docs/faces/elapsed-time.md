<script setup lang="ts">
import ElapsedTime from '../components/ElapsedTime.vue';
</script>

# Elapsed Time

The `ElapsedTime` face display the duration between two dates. Read more about [duration formatting](/advanced/durations).

<<< @/types/ElapsedTimeProps.type.ts{TS}

## Basic Example

Create a clock that shows the time remaining until the next calendar year.

<ElapsedTime />

<<< @/components/ElapsedTime.vue#import{TS}
<<< @/components/ElapsedTime.vue#example{TS}