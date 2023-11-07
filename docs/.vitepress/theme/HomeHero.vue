
<script setup lang="ts">
import { alphanumeric, faceValue, flipClock, flipClockCss, theme } from 'flipclock';
import { onMounted, ref } from 'vue';

const clock = flipClock({
    timer: 200,
    face: alphanumeric({
        value: faceValue(''),
        targetValue: faceValue([
            ['Hello World!'],
            ['I am FlipClock.js'],
            ['It\'s nice to meet you!']
        ]),
        skipChars: 5,
        sequencer: {
            stopAfterChanges: 4
        }
    }),
    theme: theme({
        css: flipClockCss.extend({
            '&.flip-clock': {
                '--border-radius': 'calc(1em * .15)',
                fontSize: '36px',
                flexDirection: 'column',
                alignItems: 'flex-start'
            },
            '.flip-clock-card': {
                '&.animate': {
                    animationDuration: '75ms',
                    animationDelay: '75ms',
                }
            },
            '.flip-clock-group + .flip-clock-group': {
                marginLeft: 0
            }
        })
    })
});

clock.on('interval', () => {
    console.log(JSON.stringify(clock.face.value.digits), JSON.stringify(clock.face.targetValue.digits))
});

clock.on('afterInterval', () => {
    console.log(JSON.stringify(clock.face.value.digits))
    console.log(JSON.stringify(clock.face.targetValue.digits))
})

const el = ref<HTMLDivElement>();

onMounted(() => {
    if(el.value) {
        clock.mount(el.value);
    }
})
</script>

<template>
    <div ref="el"></div>
</template>

<style scoped>
.text-effect {
    overflow: hidden;
    position: relative;
    filter: contrast(110%) brightness(190%);
}

.line {
    width: 100%;
    height: 3px;
    position: absolute;
    z-index: 100;
}


.neon::after {
    mix-blend-mode: difference;
}

.gradient,
.spotlight {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    z-index: 10;
}

.gradient {
    background: linear-gradient(45deg, red, blue, yellow);
    mix-blend-mode: multiply;
}

.spotlight {
    /* filter: blur(3px); */
    animation: light 5s infinite linear;
    /* background: radial-gradient(circle, white, transparent 25%) 0 0/25% 25%; */
    /* transform: translate3d(0%, 0%, 0); */
    background: radial-gradient(circle, rgba(255, 255, 255, .4), transparent 25%) 0 0/100% 100%;
    /* top: -100%;
    left: -100%; */
    /* mix-blend-mode: color-dodge; */
}

@keyframes light {
    0% {
        transform: translate3d(-50%, 0, 0);
    }
    100% {
        transform: translate3d(150%, 0, 0);
    }
}

.neon {
    font: 700 220px "Lato", sans-serif;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
}

&>div {
    background: black;
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-content: center;
    align-items: center;
}</style>