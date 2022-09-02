<script setup>
import FlipClock from '../../.vitepress/flipclock/FlipClock.vue'
import Counter from '../../.vitepress/flipclock/Counter.vue'
</script>

# Counter

The counter face is responsible for displaying alpha-numeric digits. While the counter doesn't actually have to count anything, and can display alphabetical characters, the counter most commonly displays things like page views. It could also behave like a train station that shows departures and arrivals.

<FlipClock>
    <Counter :value="100"/>
</FlipClock>

```js
import { Counter } from 'flipclock';

const clock = new FlipClock({
    el: el.appendChild(document.createElement('div')),
    face: new Counter({
        value: 100
    })
});
```