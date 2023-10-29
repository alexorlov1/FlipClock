# Dates

Format a `Date` into a `string` or `DigitizedValues` using a format string. You can also define your own format flags to either override the defaults formats or add more.

## Signatures

<<< @/types/useDateFormats.function.ts{TS}
<<< @/types/UseDateFormatOptions.type.ts{TS}
<<< @/types/DateFlagFormatFunction.type.ts{TS}

## Returns

<<< @/types/UseDateFormats.type.ts{TS}

## Basic Example

`format()` returns a string, while `parse()` returns a digitized array.

```ts
const { format, parse } = useDateFormats();

format(new Date('2024-01-01'), 'DD, MM YYYY')); // returns `01, 01 2024`
parse(new Date('2024-01-01'), '[DD], [MM] [YYYY]')); // returns `[['0', '1'],',',['0', '1'],' ',['2', '0', '2', '4']]`
```

::: tip
These are just a few examples and far from complete. If you want to see a feature-complete example, check `tests/helpers/date.spec.ts` in the repo.
:::

## Available Formats

| Format | Description                 | Outputs   |
| ------ | --------------------------- | --------- |
| `Q`    | The quarter year (1-4)      | `1`       |
| `YYYY` | 4 digit year                | `2024`    |
| `YY`   | 2 digit year                | `24`      |
| `M`    | 1 digit month               | `1`       |
| `MM`   | 2 digit month               | `01`      |
| `MMM`  | Abbreviated month           | `Jan`     |
| `MMMM` | The full month              | `January` |
| `D`    | 1 digit day of the month    | `1`       |
| `DD`   | 2 digit day of the month    | `01`      |
| `DDD`  | Abbreviated day of the week | `Mon`     |
| `DDDD` | Full day of the week        | `Monday`  |
| `H`    | 1 digit hour (1-24)         | `1`       |
| `Hh`   | 2 digit hour (01-24)        | `01`      |
| `h`    | 1 digit hour (1-12)         | `1`       |
| `hh`   | 1 digit hour (01-24)        | `01`      |
| `m`    | 1 digit minute              | `1`       |
| `mm`   | 2 digit minute              | `01`      |
| `s`    | 1 digit second              | `1`       |
| `ss`   | 2 digit second              | `01`      |
| `v`    | 1 digit millisecond         | `1`       |
| `vv`   | 2 digit millisecond         | `01`      |
| `vvv`  | 1 digit millisecond         | `001`     |
| `vvvv` | 2 digit millisecond         | `0001`    |
| `A`    | "AM" or "PM"                | `AM`      |
| `a`    | "am" or "pm"                | `am`      |

::: tip
For more advanced date formatting, we recommend using [date-fns](https://date-fns.org/) or [dayjs](https://day.js.org/). You can utilize and date formatting function by overriding the default formatter.
:::
