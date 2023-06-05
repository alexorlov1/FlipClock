import { h, render } from "./src/helpers/dom";
import { createSignal } from "./src/helpers/signal";

const [ count, setCount ] = createSignal(0);

const node = h<HTMLDivElement>('div', [
    h('span', `count: ${count()}`),
    h('button', {
        onclick: () => setCount(value => value + 1)
    }, '+1'),
    h('button', {
        onclick: () => setCount(value => value + 1)
    }, '-1')
])

console.log(node)

const el = render(node);

document.body.appendChild(el);

// import { FaceValue } from "./src/FaceValue";
// import FlipClock from "./src/FlipClock";
// import Alphanumeric from "./src/faces/Alphanumeric";
// import { useFlipClockTheme } from "./src/themes/flipclock";

// const el = document.querySelector('#app');


// const theme = useFlipClockTheme({
//     animationRate: 500,
    
// });


// const possibleValues = [
//     new FaceValue('Hello World!'),
//     new FaceValue('Nice to See You!'),
//     new FaceValue('This is FlipClock.js'),
// ]

// let i = 0;

// const face = new Alphanumeric({
//     skipChars: () => Math.floor(Math.random() * (12 - 3 + 1)) + 3,
//     stopAfterChanges: 3,
//     targetValue: possibleValues[0],
//     direction: 'forwards'
// });

// const clock = new FlipClock({
//     el,
//     face,
//     theme,
//     timer: 160
// })

// clock.emitter.on('afterStop', () => {
//     if(possibleValues.length) {
//         setTimeout(() => {
//             face.value = possibleValues[i];
            
//             if(i < possibleValues.length - 1) {
//                 i++;
//             }
//             else {
//                 i = 0
//             }

//             clock.start()
//         }, 1000);
//     }
// })