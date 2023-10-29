# FlipClock

`FlipClock` acts as the "controller". The purpose of the clock is to `mount`, `unmount`, `start`, `stop`, or `toggle`. The clock also offers an event bus so you can bind callbacks to the event hooks. The event bus is the same event loop that is used by the `Theme`, so it's pretty powerful what you can do with it.

<<< @/types/FlipClockProps.type.ts{TS}

## `flipClock()`

Instantiate a new instance of `FlipClock`.

<<< @/types/flipClock.function.ts{TS}

## Starting and stopping the clock

The clock starts automatically by default. However you can start/stop programatically at any time.

```ts
import { flipClock } from 'flipclock';

const clock = flipClock({
    // your options here...
});

// Start the clock
clock.start(() => {
    console.log('The clock started!')
});

// Stop the clock
clock.stop(() => {
    console.log('The clock stopped!')
});

// Toggle starts the clock if stopped, and stops it if its started.
clock.toggle(() => {
    console.log(`Status:`, clock.timer.isStopped)
});
```

## Mounting the clock

Pretty straight forward. Mounting binds the clock to the DOM, and unmounting removes it. Passing `el` to the `FlipClockProps` will automatically bind it on creation. By not passing an element, you are required to mount it manually.

```ts
import { flipClock } from 'flipclock';

const clock = flipClock({
    // your options here...
});

// Mount the clock
clock.mount(document.querySelector('#some-element'));

// Unmount the clock
clock.unmount();
```

## Event Hooks

Event hooks are called at specific times in the event loop. These are useful for manipulating the clock, or getting data from the clock at runtime. 

[Full Hooks Reference](hooks.md)

```ts
import { flipClock } from 'flipclock';

const clock = flipClock({
    // your options here...
});

clock.on('afterCreate', (instance: FlipClock) => {
    console.log('The clock was created!')
});

clock.once('interval', (instance: FlipClock) => {
    console.log('This event is only triggered one time.')
});

clock.off('afterCreate');
```