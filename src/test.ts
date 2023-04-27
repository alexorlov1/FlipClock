import { Alphanumeric, FaceValue, FlipClock, Timer } from "../index";
import { useRandomizer } from "./functions/randomizer";

const linear = useRandomizer({
    chunkSize: 1
});

const el = document.querySelector('#app')?.appendChild(
    document.createElement('div')
);

let index = 0;

const possiblePhrases = [
    
];

const face = new Alphanumeric({
    value: FaceValue.make('hello!'),
    animationRate: 100,
    autoStart: false,
    chunkSize: 10,
});

const clock = new FlipClock({
    el,
    face,
    timer: Timer.make(100),
});

setTimeout(() => {
    face.targetValue = FaceValue.make('my name is justin!');

    clock.start();
}, 1000);

// clock.face.on('afterRender', () => {
//     if (face.value.compare(face.transitionValue)) {
//         clock.stop();

//         setTimeout(() => {
//             clock.face.value = possiblePhrases[index++];

//             console.log(clock.face.value);

//             clock.face.render();



//             // if(!possiblePhrases[index]) {
//             //     index = 0;
//             // }
//         }, 1000);
//     }
// });


// const obj = ref<{
//     test: string
// }>({
//     test: "test"
// });

// obj.test = '123';

// obj.watch(() => {
//   console.log('change');  
// })


// console.log(obj);
