# Digitizer

`digitizer` is a composable utility that converts an abitrary value into individual digits that can be displayed on a clock face. The `digitizer` is a key component to everything that is displayed on a face.

## Signatures

<<< @/types/useDigitizer.function.ts{TS}
<<< @/types/DigitizedValue.type.ts{TS}
<<< @/types/DigitizedValues.type.ts{TS}

::: info
A digitized value is more than just an array of strings, but can be a nested array of strings. The digitizer provides an interface should you need to provide your own.
:::

## Returns

<<< @/types/UseDigitizer.type.ts{TS}

- `digitize` A function to digitizes a value.
- `undigitize`  A function to converted a digitized value back to a string.
- `isDigitized` Determines if a value has been properly digitized.


## Basic Usage

```ts
const { digitize, isDigitized, undigitize }: UseDigitizer = useDigitizer();

console.log(digitize('hello')); // returns ['h', 'e', 'l', 'l', 'o']
console.log(undigitize(['h', 'e', 'l', 'l', 'o'])); // returns 'hello'

console.log(digitize(['hello', 'world'])); // returns [['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']]
console.log(undigitize([['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd']])); // returns 'hello world'

console.log(isDigitized(['hello'])); // returns false
console.log(isDigitized(['h', 'e', 'l', 'l', 'o'])); // returns true
```

::: tip
These are just a few examples and far from complete. If you want to see a feature-complete example, check `tests/helpers/digitizer.spec.ts` in the repo.
:::
