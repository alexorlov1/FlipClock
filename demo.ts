import { faceValue } from './src/FaceValue';
import { flipClock } from './src/FlipClock';
import { alphanumeric } from './src/faces/Alphanumeric';
import { DigitizedValue, DigitizedValues } from './src/helpers/digitizer';
import { stopWhen } from './src/helpers/structure';
import { theme } from './src/themes/flipclock';
import { css } from './src/themes/flipclock/flipclock.css';

// StopPredicateFunction<[current?: DigitizedValue, target?: DigitizedValue | DigitizedValues ]>

const stopWhenFn = stopWhen<[current?: DigitizedValue, target?: DigitizedValue | DigitizedValues], DigitizedValue | undefined>(() => {
    return false;
}, (value, target) => {
    return value;
});

const clock = flipClock({
    autoStart: true,
    el: document.querySelector('#app'),
    face: alphanumeric({
        value: faceValue('test'),
        targetValue: faceValue('hello'),
        sequencer: {
            stopWhen: stopWhenFn
        }
    }),
    theme: theme({
        labels: ['Hours', 'Minutes', 'Seconds'],
        dividers: [':'],
        css: css.extend({
            // '&.flip-clock': {
            //     '--border-radius': '6px',
            //     fontSize: 'inherit'
            // },
            // '.flip-clock-label': {
            //     fontSize: '12px'
            // }
        })
    })
});
// clock.face.increment();