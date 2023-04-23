# Core Concepts

Think of a clock in the real world. The "clock" external housing for the internal timer, the mechanism that keeps time. Using the clock as an interface, you can start it, stop it, and you can set a new value when the time changes during summer and winter months. You can mount the clock to the wall, etc.

The clock's face determines how the current time is displayed. Some clocks are digital, and other are analog. Some clocks display time in 12 hours, and others use a 24 hour format. A stop watch shows elapsed time. All of these are different "faces" for how a clock displays its time.

::: tip
This is not a complete list of components. Please refer to the [/api.html])(API Documentation) for more information.
:::

### FlipClock

A `FlipClock` instance would be the equivelant to the "clock". It the service container for all internal components. All of FlipClock's internal components are exported and can be used in any number of ways to build a clock, stopwatch, countdown, or a ticker.

### Timer

`Timer` is the internal mechanism to keep time. This implemenation of `Timer` is an abstraction of `window.requestAnimationFrame`, which will continue to loop properly even when your browser window is not focussed without any performance or accuracy issues. The entire event loop is handled with the `Timer`.

### Face

The `Face` is responsible for rendering the clock in the DOM. Every tick of the `Timer` the face will attempt to re-render any node that has changed. FlipClock.js uses a virtual DOM approach, which automatically handles the DOM diffing and efficient rendering.

### FaceValue

A `FaceValue` is how the clock's current time is tracked. The `FaceValue`'s job is to digitize any value and ready it to be used by the `Face`. The data type of a `Face` may vary, so the `FaceValue` provides a consistent interface for interacting with different data types.