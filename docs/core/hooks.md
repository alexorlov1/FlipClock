# Hooks

Hooks are fundemental to the lifecyle of the `FlipClock` event loop. These get called in the order they are defined. The following interface is implemented on `FlipClock`, `Face` and inside a `Theme`.

<<< @/types/FaceHooks.interface.ts

## Event Bus

Using the `FlipClock` instance, the hooks are available using the event bus.

```ts
import { flipClock } from 'flipclock';

const clock = flipClock({
    // Your options here
});

clock.on('afterCreate', (instance: FlipClock) => {
    console.log('created!')
});
```