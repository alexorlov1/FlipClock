import { flipClock } from './src/FlipClock';
import { elapsedTime } from './src/faces/ElapsedTime';
import { theme } from './src/themes/flipclock';
import { css } from './src/themes/flipclock/flipclock.css';

const end = new Date();

end.setTime(Date.now() + 4000);

const clock = flipClock({
    autoStart: true,
    el: document.querySelector('#app'),
    face: elapsedTime({
        start: new Date(),
        end: end,
        format: '[hh]:[mm]:[ss]'
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