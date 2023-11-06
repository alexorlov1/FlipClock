# CLI

FlipClock.js provides a CLI to convert .css files into .ts files that use the CSS-in-JS syntax. This makes it very quick to convert a .css file into JS without having to retype it manually.

```bash
flipclock css [options] <input> <output>

Convert a .css file into a .css.ts file.

Arguments:
  input       The input path for the CSS file.
  output      The output path of the .css.ts file.
```

## Basic Usage

Simply run the command and replace the file paths to correlate with your own.

```
npm flipclock css ~/my-file.css ~/my-file.css.ts
```

### Input

This is the example .css we are converting.

```css
/* my-file.css */
.my-css {
    color: black;

    &.red {
        color: red;
    }
}
```

### Output

Once you run the command, the `.css.ts` file will be generated.

```ts
/* my-file.css.ts */
import { useCss } from 'flipclock';

export const css = useCss({
    '.my-css': {
        color: 'black',
        '.my-css.red': {
            color: 'red'
        }
    }
})
```

### Usage in FlipClock.

Once you get the `.css.ts` file, you can import this directly and just pass it
to your theme.

```ts
import { theme } from 'flipclock';
import { css } from 'my-file.css';

// Pass the css export into the theme directly.
const myTheme = theme({
    css
});
```