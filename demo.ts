import { faceValue } from './src/FaceValue';
import { flipClock } from './src/FlipClock';
import { counter } from './src/faces/Counter';
import { theme } from './src/themes/flipclock';
import { css } from './src/themes/flipclock/flipclock.css';

const clock = flipClock({
    autoStart: true,
    el: document.querySelector('#app'),
    face: counter({
        value: faceValue(2)
    }),
    theme: theme({
        css
    })
});

console.log(clock);