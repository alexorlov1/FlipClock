<script setup>
import 'flipclock/dist/style.css';
import DefaultTheme from 'vitepress/theme';
const { Layout} = DefaultTheme;
</script>
<template #home-hero-image>
    <Layout>
        <template #home-hero-image>
            asd
        </template>
    </Layout>
</template>

<style>
button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: .33rem;
    padding: .75rem;
    background-color: black;
    line-height: 1em;
}

.flex {
    display: flex;
}

.gap-2 {
    gap: .5rem;
}

.my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>