# Timer

The `Timer` is baked into every `FlipClock`. In most cases you won't need to use this directly. `Timer` is based on `window.requestAnimationFrame` instead of `setInterval`. The `Timer` has the expected functionality, and is reliable and well tested.

<<< @/types/timer.function.ts

## Basic Usage

Generally speaking, you just need to create a `FaceValue` and pass it to your desired face.

```ts
import { timer } from 'flipclock';

const instance = timer(100); // ticks every 100ms.

instance.start(() => {
    console.log('started')
});

instance.stop(() => {
    console.log('stopped')
});

instance.reset(() => {
    console.log('reset')
});
```