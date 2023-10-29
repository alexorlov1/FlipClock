# FaceValue

A `FaceValue` is an object that digitizes a value to be used by a `Face` and then rendered by a `Theme`. A `FaceValue` is reactive, so the clock will automatically re-render when the value is updated.

<<< @/types/FaceValueProps.type.ts
<<< @/types/faceValue.function.ts

## Basic Usage

Generally speaking, you just need to create a `FaceValue` and pass it to your desired face.

```ts
const number = faceValue(1); // FaceValue<number>
const string = faceValue('hello'); // FaceValue<string>
const array = faceValue(['hello', 'world']); // FaceValue<string[]>
```

## Updating a `FaceValue`.

Updating a `FaceValue` is much like updating a `Ref` in `Vue`. In fact, the reactivity API in FlipClock.js was inspired by Vue and Solid.

```ts
const number = faceValue(1);

number.value++; // number.value is now 2.
```

## API Reference

<<< @/types/FaceValue.class.ts