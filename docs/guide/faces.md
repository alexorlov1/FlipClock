# Faces

FlipClock provides 3 faces to cover a wide range of use cases and scenarios.

- [Clock](faces/clock.md)
- [Counter](faces/counter.md.md)
- [ElapsedTime](faces/elapsed-time.md.md)

### Role of the Clock

Just like a real clock, the clock face's main role is displaying the current time. Faces handle all the rendering, state and localization. Each face has complete control over the UI and functionality of the clock.

### Role of the Face

The main role of the clock is to mount (and unmount) the clock to and from the DOM, start and stop the timer, and render the face. While the clock itself has no UI or nothing to display, it performs a lifecycle request on the face with each interval of the timer. The clock handles the lifecycle and updating the UI, while the face determines how it will look and behave.

::: tip
FlipClock provides a robust API to make your own faces. Creating your own faces grants you full control over the clock to build whatever face or interactivity you may need. [Read More](/api)
:::
