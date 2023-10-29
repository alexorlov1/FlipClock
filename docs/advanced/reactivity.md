# Reactivity

The reactivity in FlipClock.js is largely based on patterns from Vue and Solid. The concept is simple, re-render the DOM automatically when the `Face` value changes. This library is totally hidden, but its documented here if you need to use it.

## Refs

A ref is basically a reactive variable that uses signals under the hook to hide the verbosity. This syntax is heavily inspired by Vue, uses signals under the hood.

<<< @/types/ref.function.ts{TS}

### Example

```ts
import { ref } from 'flipclock';

const count = ref(0);

count.value++; // 1
count.value++; // 2
```

## Watch Effects

Watch effects makes refs more useful. You can bind a callback to be triggered any time a ref or signal changes.

<<< @/types/watchEffect.function.ts{TS}

### Example

```ts

import { ref, watchEffect } from 'flipclock';

const count = ref(0);

watchEffect(() => {
    console.log(count.value);
});

count.value++; // console.log(1);
count.value++;  // console.log(2);
```

## Signals

Signals are how the underyling reactivity work. A signal is essentially a tuple with 3 functions, `get`, `set` and `reset`. This syntax by itself is rather verbose and not useful, which is why `ref` is available.

<<< @/types/createSignal.function.ts{TS}
<<< @/types/Signal.type.ts{TS}
<<< @/types/SignalReadFunction.type.ts{TS}
<<< @/types/SignalWriteFunction.type.ts{TS}
<<< @/types/SignalResetFunction.type.ts{TS}

### Example

```ts
import { createSignal } from 'flipclock';

const [ getValue, setValue, resetValue ] = createSignal(0);

console.log(getValue()); // 0

setValue(1);

console.log(getValue()); // 1

resetValue();

console.log(getValue()); // 0
```