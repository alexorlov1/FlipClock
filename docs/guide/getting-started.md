# Getting Started

FlipClock is easy to get up and going fast. Simply instantiate a new instance
by passing a DOM node, a clock face, and in this case a starting value.

```ts
import { FlipClock, Counter } from 'flipclock';

const clock = new FlipClock({
    el: document.querySelector('#clock'),
    face: new Counter({
        value: 100
    })
});
```

## What does the Clock instance do?

## Localization

FlipClock ships with dozens of languages, and easily provides the ability to
localize any string of text into the languages your choose. When importing
FlipClock as a module, the languages are automatically tree shaken to keek your
bundle as small as possible.

```ts
import { FlipClock, Counter } from 'flipclock';
import { aliases, dictionary } from 'flipclock/languages/en-us'

const clock = new FlipClock({
    el: document.querySelector('#clock'),
    face: new ElapsedTime({
        language: 'en-us'
    })
});
```

<!-- <div class="clock mt-3"></div>

<script>
const el = document.querySelector('.clock');

const clock = new FlipClock(el, {
    face: 'TwentyFourHourClock'
});
</script> -->