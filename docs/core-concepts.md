# Core Concepts

Think of a clock in the real world. The "clock" is the housing for the buttons, has an internal timer, batteries with one or many functions. Each clock has a unique interface and appearance. Using this metaphor, the `FlipClock` instance is the "clock". 

The clock `Face` determines the behavior and functionality. Some clocks display time in 12 hours, and others use a 24 hour format. A stop watch displays elapsed time. A train station flipboard has alphanumberic characters that show arrivals and destinations All of these are different "faces" for how a "clock" can display different information. The value that displays on the clock is a `FaceValue`.

Like a real clock, a `Face` may be rendered into whatever appearance you desite. The `Theme` determines how the `Face` is rendered. The `Theme` is more than just CSS. The `Theme` also renders the clock in the DOM. So each `Theme` can have its own HTML, CSS and JS.

## `Face` vs `Theme`

The `Face` determines the behavior, public methods and is responsible for formatting and changing the `FaceValue` with each tick of the event loop. The `Theme` determines how a `Face` will be rendered. You can use the themes we provide or create your own.

## What is a `FaceValue`?

`FaceValue`'s allow you to pass arbitrary data so it can be displayed in the clock. The `FaceValue` is responsible for digitizing and undigitizing the data which is used by the `Face`. Each face can implement the `FaceValue` however it wants. Some faces for example have multiple values.