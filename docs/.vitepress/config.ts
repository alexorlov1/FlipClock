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
          { text: 'Introduction', link: '/introduction' },
          { text: 'Why FlipClock.js?', link: '/why-flipclock' },
          { text: 'Installation', link: '/installation' },
          { text: 'Core Concepts', link: '/core-concepts' },
          { text: 'CSS-in-JS', link: '/css-in-js' },
          // { text: 'Quick Start', link: '/quick-start' },
          // { text: 'Why FlipClock?', link: '/about' },
        ]
      },
      {
        text: 'Faces', items: [
          { text: 'Clock', link: '/faces/clock' },
          { text: 'Counter', link: '/faces/counter' },
          { text: 'Elapsed Time', link: '/faces/elapsed-time' },
          { text: 'Alphanumeric', link: '/faces/alphanumeric' },
          { text: 'Build your own face', link: '/faces/build-your-own-face' }
        ]
      },
      {
        text: 'Core', items: [
          { text: 'FlipClock', link: '/core/flipclock' },
          { text: 'FaceValue', link: '/core/face-value' },
          { text: 'Hooks', link: '/core/hooks' },
          { text: 'Timer', link: '/core/timer' },
        ]
      },
      {
        text: 'Themes', items: [
          { text: 'FlipClock', link: '/themes/flipclock' },
          { text: 'Build your own theme', link: '/themes/build-your-own-theme' }
        ]
      },
      {
        text: 'Helpers', items: [
          { text: 'Charsets', link: '/advanced/charsets'},
          { text: 'Dates', link: '/advanced/dates' },
          { text: 'Dictionaries', link: '/advanced/dictionaries'},
          { text: 'Digitizer', link: '/advanced/digitizer'},
          { text: 'DOM', link: '/advanced/dom'},
          { text: 'Durations', link: '/advanced/Durations'},
          { text: 'Reactivity', link: '/advanced/reactivity'},
          { text: 'Sequencer', link: '/advanced/sequencer'},
        ]
      },
      {
        text: 'Adanced', items: [
          {
            text: 'API Reference',
            link: '/api/flipclock.md',
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
