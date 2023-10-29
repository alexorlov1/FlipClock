# Duration

Format two difference between two `Date`'s' into a `string` or `DigitizedValues` using a format string. Just like `useDateFormats()`, you can define your own format flags to either override the defaults formats or add more.

## Signatures

<<< @/types/useDurationFormats.function.ts{TS}
<<< @/types/UseDurationFormatOptions.type.ts{TS}
<<< @/types/DurationFlagFormatter.type.ts{TS}

## Returns

<<< @/types/UseDurationFormats.type.ts{TS}

## Basic Example

`format()` returns a string, while `parse()` returns a digitized array. There is a key difference between date and duration formatting. Date formats are finite, whereas a duration can be any length. `Y` would output 1 minimum digit, while `YYYY` would output a minimum of 4, left padding 0's if necessary.

```ts
const { format } = useDurationFormats();

format(
    new Date('2024-01-01'),
    new Date('2025-01-01'),
    'Y D'
); // returns '1 0'

format(
    new Date('2024-01-01'),
    new Date('2025-01-01'),
    'YYYY DD'
); // returns '0001 00'
```

## Intervals

Should you need to calculate the duration between two points you can do so using `duration()`.

```ts
const { duration } = useDurationFormats();

duration(
    new Date('2024-01-01'),
    new Date('2025-01-01'),
    ['weeks', 'days']
); // returns {weeks: 52, days: 0}

duration(
    new Date('2024-01-01'),
    new Date('2024-01-02'),
    ['hours']
); // returns {hours: 24}
```

::: tip
These are just a few examples and far from complete. If you want to see a feature-complete example, check `tests/helpers/duration.spec.ts` in the repo.
:::

## Available Formats

| Format | Description                       |
| ------ | --------------------------------- |
| `Y`    | Outputs duration in years.        |
| `M`    | Outputs duration in months.       |
| `D`    | Outputs duration in days.         |
| `h`    | Outputs duration in hours.        |
| `m`    | Outputs duration in minutes.      |
| `s`    | Outputs duration in seconds.      |
| `v`    | Outputs duration in milliseconds. |