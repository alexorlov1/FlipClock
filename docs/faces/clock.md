<script setup lang="ts">
import Clock from '../components/Clock.vue';
import ClockWithDividers from '../components/ClockWithDividers.vue';
import TwelveHourClockFormat from '../components/TwelveHourClockFormat.vue';
import TwelveHourClockLabels from '../components/TwelveHourClockLabels.vue';
import TwentyFourHourClockLabelsAlt from '../components/TwentyFourHourClockLabelsAlt.vue';
import TwelveHourClockCustomDate from '../components/TwelveHourClockCustomDate.vue';
</script>

# Clock

The `Clock` displays a Date object in a given format. Clocks will automatically start once the are mounted to the DOM. The default format is `[hh]:[mm]:[ss] [A]`.

### Props

<<< @/types/ClockProps.type.ts{TS}

## Basic Example

A simple clock that shows 12-hour time.

<Clock />

<<< @/components/Clock.vue#import{TS}
<<< @/components/Clock.vue#example{TS}

## Date & Time Formats

Format the 12-hour time into a clock that only displays hours and seconds. Read more about [date & time formatting](/advanced/dates).

<TwelveHourClockFormat />

<<< @/components/TwelveHourClockFormat.vue#import{TS}
<<< @/components/TwelveHourClockFormat.vue#example{TS}

## Labels

Labels can be added to the top of group elements. Labels are consumed in the order they are defined. Your face doesn't have any groups, the labels will not appear. Notice, the format is `[MM]:[ss]`. This is the array notation for how to specify groups of digits. Read more about [structure formatting](/advanced/structure).

<TwelveHourClockLabels />

<<< @/components/TwelveHourClockLabels.vue#import{TS}
<<< @/components/TwelveHourClockLabels.vue#example{TS}

::: info
This is a theme-specific feature. If you are implementing your own theme, you'll have to implement the labels within your theme.
:::

## Dividers

If you are displaying a clock, it's likely that you want to use characters to divide the digits visually to represent time. If you do not want these characters to appear as a flipcards, specify the dividers. Regex is also supported.

<ClockWithDividers />

<<< @/components/Clock.vue#import{TS}
<<< @/components/Clock.vue#example{TS}

## Using a custom date object

The clock doesn't have to represent the current time. Pass a Date instance and the clock will start with the given date. This example starts the time at epoch (of course).

<TwelveHourClockCustomDate />

<<< @/components/TwelveHourClockCustomDate.vue#import{TS}
<<< @/components/TwelveHourClockCustomDate.vue#example{TS}
<<< @/components/TwelveHourClockCustomDate.vue#css{CSS}
