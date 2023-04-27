<script setup lang="ts">
import Clock from '../components/Clock.vue';
import TwelveHourClockFormat from '../components/TwelveHourClockFormat.vue';
import TwelveHourClockLabels from '../components/TwelveHourClockLabels.vue';
import TwentyFourHourClockLabelsAlt from '../components/TwentyFourHourClockLabelsAlt.vue';
import TwelveHourClockCustomDate from '../components/TwelveHourClockCustomDate.vue';
</script>

# Clock

The `Clock` displays a Date object in a given format. Clocks will automatically start once the are mounted to the DOM.

## Basic Usage

Generate a clock with a 12-hour face, using the default formatting. This is the most basic use case for FlipClock.js.

<Clock />

<<< @/components/Clock.vue#import{TS}
<<< @/components/Clock.vue#example{TS}

## Formatting

Format the 12-hour time into a clock that only displays hours and seconds. Read more about [date & time formatting](/advanced/date-time-formatting).

<TwelveHourClockFormat />

<<< @/components/TwelveHourClockFormat.vue#import{TS}
<<< @/components/TwelveHourClockFormat.vue#example{TS}

## Format with custom labels

Show the labels for the clock, which may notate the formatting. The labels should correlate to the formatting keys.

<TwelveHourClockLabels />

<<< @/components/TwelveHourClockLabels.vue#import{TS}
<<< @/components/TwelveHourClockLabels.vue#example{TS}

## Formatting with labels and groupings

The `labels` also accepts `string[][]`. This allows you to define labels with arrays as they correlate to their indices. By adding a space in the formatting, we are dividing the DOM nodes into groups. Groups can be styled differently (there is more space between groups). This allows you to render clocks however you see fit.

<TwentyFourHourClockLabelsAlt />

<<< @/components/TwentyFourHourClockLabelsAlt.vue#import{TS}
<<< @/components/TwentyFourHourClockLabelsAlt.vue#example{TS}

## Using a custom date object

The clock doesn't have to represent the current time. Pass a Date instance and the clock will start with the given date.

<TwelveHourClockCustomDate />

<<< @/components/TwelveHourClockCustomDate.vue#import{TS}
<<< @/components/TwelveHourClockCustomDate.vue#example{TS}
