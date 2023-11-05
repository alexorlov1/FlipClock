import { flipClock } from './src/FlipClock';
import { elapsedTime } from './src/faces/ElapsedTime';
import { theme } from './src/themes/flipclock';
import { css } from './src/themes/flipclock/flipclock.css';

const clock = flipClock({
    autoStart: false,
    el: document.querySelector('#app'),
    face: elapsedTime({
        start: new Date(),
        end: new Date('2024-01-02'),
        format: '[hh]:[mm]:[ss]'
    }),
    theme: theme({
        labels: ['Hours', 'Minutes', 'Seconds'],
        dividers: [':'],
        css: css.extend({
            '&.flip-clock': {
                '--border-radius': '6px',
                fontSize: 'inherit'
            },
            '.flip-clock-label': {
                fontSize: '12px'
            }
        })
    })
});

// clock.face.increment();