import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FlipClock.js",
  description: "FlipClock.js library to create fun animared clock, timer, tickers, and countdowns written in TypeScript.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Why FlipClock?', link: '/getting-started/about' },
          { text: 'Core Concepts', link: '/getting-started/core-concepts' },
        ]
      },
      {
        text: 'Examples', items: [
          { text: 'Clock', link: '/examples/clock' },
          { text: 'Counter', link: '/examples/counter' },
          { text: 'Elapsed Time', link: '/examples/elapsed-time' },
          { text: 'Alphanumeric', link: '/examples/alphanumeric' },
        ]
      },
      {
        text: 'Advanced', items: [
          { text: 'Virtual DOM', link: '/advanced/virtual-dom' },
          { text: 'Date & Time Formatting', link: '/advanced/date-time-formatting' },
          { text: 'Timer', link: '/advanced/Timer' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
