<script setup lang="ts">
import Counter from '../components/Counter.vue';
import Countdown from '../components/Countdown.vue';
import CountdownStopAt from '../components/CountdownStopAt.vue';
import CountdownManually from '../components/CountdownManually.vue';
</script>

# Counter

The `Counter` increments up and down.

## Basic Usage

Create a counter that increments or decrements by a given number of steps. You may also specify the minimum number of digits. Notice `clock.start()`, this is required because `autoStart` is set to `false`.

<Counter />

<<< @/components/Counter.vue#import{TS}
<<< @/components/Counter.vue#example{TS}

## Countdown

The countdown behaves the same way as the counter, except it ticks down. With the `stopAt` property, the counter would continue to count

<Countdown />

<<< @/components/Countdown.vue#import{TS}
<<< @/components/Countdown.vue#example{TS}

## Countdown with a stopping value

Stop the counter when it hits to 0.

<CountdownStopAt />

<<< @/components/CountdownStopAt.vue#import{TS}
<<< @/components/CountdownStopAt.vue#example{TS}

## Increment/decrement with buttons

Increment and decrement a counter by clicking buttons.

<CountdownManually />

<<< @/components/CountdownManually.vue#import{TS}
<<< @/components/CountdownManually.vue#example{TS}
<<< @/components/CountdownManually.vue#template{TS}