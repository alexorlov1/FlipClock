# DOM

FlipClock.js provides an easy way to update the DOM when values change. It does so without a virtual dom in an effort to keep memory usage as low as possible. The DOM utilities also provide partial or full-hydration. Which means if you use SSR to pre-render your app, FlipClock has to do no rendering once JS re-hydates the page.

## Signatures

<<< @/types/el.function.ts{TS}
<<< @/types/ElementOptions.type.ts{TS}

## How it works

FlipClock.js creates regular `Elements` using `document.createElement`, or reuses a qualified element in the DOM. So in the following example, `.some-element-here` would be used to hydrate the element. If the element doesn't exist, or cannot be updated, a new element will replace the `Element` passed to the `el` attribute.

```ts
import { el } from 'flipclock';

const div: HTMLDivElement = el({
    el: document.querySelector('.some-element-here')
    tagName: 'div',
    class: 'some-class'
    children: [
        'test'
    ]
}); // '<div class="some-class">test</div>'
```

Continuing from the last example, let's update the `div` variable with some new children. Since we are replacing a `HTMLDivElement` element with another `HTMLDivElement`, the element will not be removed from the DOM. Rather, it will update the existing element recursively until it matches. The same pattern applies to children.

```ts
el({
    el: div
    tagName: 'div',
    children: parent => [
        el({
            el: parent.children.items(0),
            tagName: 'b',
            children: 'I am bold text.'
        })
    ]
}); // '<div><b>I am bold text</b></div>'
```

Lets update the bold text. This will DOM update will not change anything other than the child node's text content.

```ts
el({
    el: div
    tagName: 'div',
    children: parent => [
        el({
            el: parent.children.items(0),
            tagName: 'b',
            children: 'I am bold text (updated).'
        })
    ]
}); // '<div><b>I am bold text (updated)</b></div>'

// Notice this is the same DIV in memory we created
// in the first step of this example.
console.log(div);
```

::: tip
Your implementation must be correct to not constantly create new DOM elements. So if you find your DOM constantly adding new nodes, check your implementation against the examples in the repo directory `src/themes/flipclock/index.ts`
:::

## Real Example

The main place to use this would be when creating your own themes. Consider the following example, this is how the signature theme renders groups of digits.

``` ts
export function group(options: FlipClockGroupOptions): Element {
    return el({
        el: options.el,
        tagName: 'div',
        class: 'flip-clock-group',
        children: parent => [
            !!options.label && el({
                el: parent.querySelector('.flip-clock-label'),
                tagName: 'div',
                class: 'flip-clock-label',
                children: [ options.label ]
            }),
            el({
                el: parent.querySelector('.flip-clock-group-items'),
                tagName: 'div',
                class: 'flip-clock-group-items',
                children: options.children
            })
        ]
    })
}
```