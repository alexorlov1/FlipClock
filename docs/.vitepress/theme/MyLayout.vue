<script setup lang="ts">
import 'flipclock/style.css';

import DefaultTheme from 'vitepress/theme';

const { Layout} = DefaultTheme;
</script>

<template>
    <Layout />
</template>

<style>
.example button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: .33rem;
    padding: .75rem;
    background-color: black;
    line-height: 1em;
}

.mt-8 {
    padding-top: 2rem;
}

.mb-8 {
    padding-bottom: 2rem;
}

.mt-16 {
    margin-top: 4rem;
}

.mb-16 {
    margin-bottom: 4rem;
}

.w-full {
    width: 100%;
}

.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.gap-2 {
    gap: .5rem;
}

.my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>