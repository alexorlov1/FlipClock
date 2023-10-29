# Dictionaries

A dictionary provides you with the ability to translate english strings into whatever you want. FlipClock.js use to maintain more than 20 language translations, however it was cumbersome, and at times the translations provided were wrong. Translations also increase the bundle size, so dictionaries provide a way to translate into any language, without increases the bundle or just being outright incorrect.

## Signatures

<<< @/types/Translator.type.ts{TS}
<<< @/types/DefinitionTerms.type.ts{TS}
<<< @/types/useDictionary.function.ts{TS}

## Returns

<<< @/types/UseDefinitionMap.type.ts{TS}
<<< @/types/UseDictionary.type.ts{TS}

## Basic Usage

```ts
import { useDictionary } from 'flipclock';

const { define, translate } = useDictionary({
    foo: 'bar'
});

console.log(translate('foo')); // returns 'bar'
console.log(translate('hello')); // returns 'hello'

define('hello', 'hola'); // define a new translation

console.log(translate('hello')); // returns 'hola'
```

::: tip
These are just a few examples and far from complete. If you want to see a feature-complete example, check `tests/helpers/dictionary.spec.ts` in the repo.
:::
