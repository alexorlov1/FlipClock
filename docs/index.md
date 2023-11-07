---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "FlipClock.js"
  tagline: "A TypeScript library for building fun animated clocks, timers, tickers, and countdowns with zero dependencies."
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started/installation
    - theme: alt
      text: API Documentation
      link: /api-examples

features:
  - title: Themeable
    details: Easily create new Faces with any HTML structure.
  - title: Robust Features
    details: Create clocks, counters, countdowns, tickers, and more.
  - title: Flexible API
    details: Easily extend the API. Everything is extensible and customizable.
  - title: TypeScript 🧪
    details: Written and strongly typed with TypeScript.
  - title: Unit Tested 📘
    details: Full code coverage with Storybook.
  - title: Zero Dependencies 🔗
    details: Keep your bundle as small as possible.
---
<script setup lang="ts">
import Clock from './components/Clock.vue'
</script>

<div class="flex justify-center mt-16 mb-16">
    <Clock />
</div>