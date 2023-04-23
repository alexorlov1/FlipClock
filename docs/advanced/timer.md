<script setup lang="ts">
import Timer from '../components/Timer.vue';
</script>

# Timer

The `Timer` is an internal component that is exported by the library. You may use it to create any additional timers or abstractions.

<Timer />

<<< @/components/Timer.vue#import{TS}
<<< @/components/Timer.vue#example{TS}

::: info
The `Timer` class is an abstraction for window.requestAnimationFrame. It works the same as `setInterval` but much more performant. The timer will continue to work, even if the user changes a browser tab, or looses focus of the browser window.
:::
