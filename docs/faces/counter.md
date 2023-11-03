<script setup lang="ts">
import Counter from '../components/Counter.vue';
import Countdown from '../components/Countdown.vue';
import CountdownStopAt from '../components/CountdownStopAt.vue';
import CountdownManually from '../components/CountdownManually.vue';
import CounterWithFormatter from '../components/CounterWithFormatter.vue';
</script>

# Counter

The `Counter` increments or decrements a numerical face value up and down.

<<< @/types/CounterProps.type.ts{TS}

## Basic Example

Create a counter that increments from 0 every second.

<Counter />

<<< @/components/Counter.vue#import{TS}
<<< @/components/Counter.vue#example{TS}

## Countdown

The countdown behaves the same way as the counter, except it ticks down. The counter will even go into negative digits.

<Countdown />

<<< @/components/Countdown.vue#import{TS}
<<< @/components/Countdown.vue#example{TS}

## Countdown with a stopping value

Start a decrementing counter at 10 and stop when it hits 0.

<CountdownStopAt />

<<< @/components/CountdownStopAt.vue#import{TS}
<<< @/components/CountdownStopAt.vue#example{TS}

## Increment/decrement with buttons

Increment and decrement a counter by clicking buttons.

<CountdownManually />

<<< @/components/CountdownManually.vue#import{TS}
<<< @/components/CountdownManually.vue#example{TS}
<<< @/components/CountdownManually.vue#template{TS}

## Formatting Numbers

Format the number using a `Intl.NumberFormat` instance.

<CounterWithFormatter />

<<< @/components/CounterWithFormatter.vue#import{TS}
<<< @/components/CounterWithFormatter.vue#example{TS}

## Format Callback.

Or use a callback function. Note, `format` is ignored if `formatter` is passed.
You cannot use a `formatter` and a `format` at the same time.

<CounterWithFormatCallback />

<<< @/components/CounterWithFormatter.vue#import{TS}
<<< @/components/CounterWithFormatter.vue#example{TS}
