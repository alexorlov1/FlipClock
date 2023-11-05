# CSS-in-JS

Flipclock.js provides a robust CSS-in-JS solution for customizing the styles without using an third-party frameworks. Using CSS-in-JS is entirely optional, and we provide .css files for traditional use. Like everything in FlipClock.js, tree-shaking will prevent anything you don't use from ending up in your bundle.


## What is CSS-in-JS?

It's exactly as it sounds. You write the CSS in JS and all the CSS is added to the browser at runtime.

### Why would I use CSS-in-JS?

CSS-in-JS makes reusable CSS provides a better developer experience for things such as import, exports, passing CSS as a variable, modifying the CSS and scoping and more. The only real downside is CSS-in-JS increases the JS bundle, which is why you can still import the library CSS how you traditionally would.

### Using FlipClock CSS

This is how to uses the default CSS that will compile in your JS bundle.

```ts
import { flipClockCss, theme, useCss } from 'flipclock';

// Create a new `Theme` instance using the default CSS.
const myTheme = theme({
    css: flipClockCss
});
```

### Extending CSS

Most of the time you want to modify the CSS. Personally, I find it dreadful to modify CSS files and would rather the CSS live close to the code where it is used. It's really easy to modify the default CSS. When you extend CSS, it recursively merges your CSS object and creates a new instance.

```ts
import { flipClockCss, theme, useCss } from 'flipclock';

// Create a new `Theme` instance using the default CSS.
const myTheme = theme({
    css: flipClockCss.extend({
        // Change whatever CSS you want here.
    })
});
```

## Traditional CSS

If you'd rather import a .css file, all the CSS-in-JS files are available in the library bundle.

### Import in CSS

```css
@import 'flipclock/flipclock.css';
```

### Import in JS

```js
import 'flipclock/flipclock.css';
```