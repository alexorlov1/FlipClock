<script setup lang="ts">
import Clock from './components/Clock.vue';
</script>

# Getting Started

The recommended way to use FlipClock is to install it with your preferred package manager and let your bundler handle it.

::: code-group

```bash [npm]
npm i flipclock
```

```bash [pnpm]
pnpm i flipclock
```

```bash [yarn]
yarn add flipclock
```

```bash [bun]
bun i flipclock
```

### CDN

@todo: insert CDN link here

::: info
FlipClock.js has no depedencies and can be easily implemented into any front-end framework like React, Vue, and Svelte. Unless otherwise noted, all examples are framework agnostic.
:::

## Basic Example

The most basic implementation is a `Clock` that shows the current time.

<Clock />

<<< @/components/Clock.vue#import{TS}
<<< @/components/Clock.vue#example{TS}

