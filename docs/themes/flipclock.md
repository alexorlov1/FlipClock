<script setup lang="ts">
import ClockWithDividers from '../components/ClockWithDividers.vue';
import TwelveHourClockLabels from '../components/TwelveHourClockLabels.vue';
</script>

# FlipClock Theme

FlipClock.js includes a signature theme that looks like a flipboard.

<<< @/types/FlipClockThemeOptions.type.ts{TS}

## Labels

Labels are added to groups of digits. If a clock doesn't have a group, it cannot have a theme. Each face may determine its own structure. Take the `Clock` face as an example. You can create groups using the array structure syntax. The format `[MM]:[ss]` will produce the following array structure, `[[0, 0], ':', [0, 0]]`. The `:` is not inside a group, while the minute and seconds are nested inside their own group. Labels are consumed from the array in the orders as they are consumed by the groups.

<TwelveHourClockLabels />

<<< @/components/TwelveHourClockLabels.vue#import{TS}
<<< @/components/TwelveHourClockLabels.vue#example{TS}

## Dividers

Dividers are any characters that you dont want to appear as a flipping digit. The divider will take on the value it consumes. Dividers can be a `string`, `string[]`, or `RegExp`.

<ClockWithDividers />

<<< @/components/ClockWithDividers.vue#import{TS}
<<< @/components/ClockWithDividers.vue#example{TS}