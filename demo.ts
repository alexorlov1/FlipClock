import { faceValue } from './src/FaceValue';
import { flipClock } from './src/FlipClock';
import { counter } from './src/faces/Counter';
import { theme } from './src/themes/flipclock';
import { css } from './src/themes/flipclock/flipclock.css';

const clock = flipClock({
    autoStart: false,
    el: document.querySelector('#app'),
    face: counter({
        value: faceValue(0)
    }),
    theme: theme({
        css: css.extend({
            '&.flip-clock': {
                '--border-radius': '6px',
                fontSize: '24px'
            }
        })
    })
});

// clock.face.increment();