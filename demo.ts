import { faceValue } from './src/FaceValue';
import { flipClock } from './src/FlipClock';
import { alphanumeric } from './src/faces/Alphanumeric';
import { theme } from './src/themes/flipclock';
import { css } from './src/themes/flipclock/flipclock.css';

// StopPredicateFunction<[current?: DigitizedValue, target?: DigitizedValue | DigitizedValues ]>

const clock = flipClock({
    autoStart: true,
    el: document.querySelector('#app'),
    face: alphanumeric({
        value: faceValue('test'),
        targetValue: faceValue('hello')
    }),
    theme: theme({
        labels: ['Hours', 'Minutes', 'Seconds'],
        // dividers: [':'],
        css: css.extend({
            '&.flip-clock': {
                '--border-radius': '3px',
                fontSize: '24px'
            },
            '.flip-clock-label': {
                fontSize: '12px'
            }
        })
    })
});
// clock.face.increment();