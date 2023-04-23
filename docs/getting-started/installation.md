# Getting Started

The recommended way to use FlipClock is to install it with your preferred package manager and let your bundler handle it.

::: tip
FlipClock.js supports tree shaking out of the box. Vite, Webpack, or Rollup will automatically remove any code from the library you do not use.
:::

### NPM

```bash
npm i flipclock
```

### PNPM

```bash
PNPM i flipclock
```

### Yarn

```bash
yarn add flipclock
```

## CDN

You may use any CDN with access to Github or NPM. The following is using JSDeliver.

::: warning
Using a CDN will load the entire FlipClock.js library. Without a bundler, tree shaking is not supported. Unless you have a specific reason to use a CDN, we recommend you use a package manager.
:::
