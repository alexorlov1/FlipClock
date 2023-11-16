import { faceValue } from './src/FaceValue';
import { flipClock } from './src/FlipClock';
import { alphanumeric } from './src/faces/Alphanumeric';
import { css } from './src/themes/flipclock/flipclock.css';
import { theme } from './src/themes/flipclock/index';

const clock  = flipClock({
    el: document.querySelector('#app'),
    timer: 200,
    face: alphanumeric({
        value: faceValue(''),
        targetValue: faceValue([['Hello World!'], ['I am flipclock.js'], ['It\'s nice to meet you!']]),
        skipChars: 3,
        sequencer: {
            stopAfterChanges: 3
        }
    }),
    theme: theme({
        css: css.extend({      
            '&': {
                '--font-size': '48px',
                '--animation-duration': '100ms'
            }
        })
    })
});