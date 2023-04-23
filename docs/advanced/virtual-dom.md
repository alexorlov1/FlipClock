# Virtual DOM

The Virtual DOM is used to make updates to the DOM when something changes. FlipClock handles the resursive DOM diff'ing under the hood. This documentation is for developers who wish to build own clock faces and advanced implementations.

## Basic Example

Use `h` to create a `VNode`. Mount it to the dom. Then create another `VNode` with change in the DOM, and mount it. The will only cause the last item to be redrawn,because the other items are unchanged. FlipClock.js's `h` and `diff` automatically handle the recursion.

```ts
import { h } from 'flipclock';

const el = document.createElement('div');

const a = h('ul', [
    h('li', 'Item 1'),
    h('li', 'Item 2'),
    h('li', 'Item 2'),
]);

a.mount(el);

const b = h('ul', [
    h('li', 'Item 1'),
    h('li', 'Item 2'),
    h('li', 'Item 3'),
]);

b.mount(el);
```

::: info
This should go without saying, but this syntax and concept was heavily inspired by Vue. It however does not use any dependencies and is extremely lightweight. The purpose is to efficiently re-render the DOM without any excess overhead and re-rendering unecessary nodes.
:::