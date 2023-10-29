# Charset

`charset`, short for "character set", is a composable utility designed to interact with ranges of characters. Essentially, the `charset` determines what appear on the clock face. The charset deterines that the "next" and "previous" character in a range in. A `charset` can also be sequential, or random.

## Signatures

<<< @/types/useCharset.function.ts{TS}
<<< @/types/UseCharsetOptions.type.ts{TS}

- `blacklist` is an array of characters to you want to omit from the `charset`.
- `charset` is a function that returns an array of characters. If no function is provided, the default english based charaset will be used.
- `emptyChar` is a character that denotes what an empty character. The default is a `\s` character.
- `shuffle` is a `boolean` or `function` to randomize the `charset` array. If `true`, the default randomizer will be used. The default shuffle function is the [Fisher-Yates Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). 
- `whitelist` is an array of characters to you want to include that are outside the scope of defined `charset`. This is useful for displaying special characters, or additional language characters that may appear in your digitized values.

## Returns

<<< @/types/UseCharset.type.ts{TS}

- `charset` An array of charactes returned by the `charset` prop.
- `emptyChar` A string that represents empty character, usually a space.
- `chunk` A function to get the next `n` characters. Note, `-n` is used to get the previous characters.
- `isBlacklisted` A function that determines if a character is blacklisted.
- `isWhitelisted` A function that determines if a character is whitelisted.
- `next` A function to get the next `n` characters. If a target is specific, the charset will stop at the target.
- `prev` A function to get the previous `n` characters. If a target is specific, the charset will stop at the target.


## Usage

```ts
const { next, prev }: UseCharset = useCharset({
    // your options here...
});

// `prev` works the same way as `next` except it moves the other direction.
console.log(next('a')); // returns 'b'
console.log(next('a', 'b')); // returns 'b'
console.log(next('b', 'b')); // returns 'b'
console.log(next('a', 'b', 3)); // returns ['b']
console.log(next('a', 'd', 3)); // returns ['b', 'c', 'd']
```

::: tip
These are just a few examples and far from complete. If you want to see a feature-complete example, check `tests/helpers/charset.spec.ts` in the repo.
:::
