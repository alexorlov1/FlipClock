# Build Your Own Face

A core concept to `FlipClock` is that the internal implementations are done so with the publicly consumable API's. All the faces provided by library can be used an examples for how to build your own.

<<< @/types/Face.interface.ts{TS}

## Example

Below is the actual source code to the `Counter` face. Here are couple of key notes:

1. The `Counter` forces you use to a `FaceValue<number>` because it requires a number to work properly.
2. `increment` and `decrement` are public instance methods specific to this face.
3. `value` and `interval` satisfy the requirements by the `Face` interface.

<<< @/../src/faces/Counter.ts{TS}
