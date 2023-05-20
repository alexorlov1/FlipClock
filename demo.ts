import { FaceValue } from "./src/FaceValue";
import FlipClock from "./src/FlipClock";
import Alphanumeric from "./src/faces/Alphanumeric";
import { useFlipClockTheme } from "./src/themes/flipclock";

const el = document.querySelector('#app');


const theme = useFlipClockTheme({
    animationRate: 500,
});


const possibleValues = [
    new FaceValue('Hello World'),
    new FaceValue('Nice to See You!'),
    new FaceValue('This is FlipClock.js')
]

let i = 0;

const face = new Alphanumeric({
    skipChars: 12,
    stopAfterChanges: 4,
    value: possibleValues[0]
});

const clock = new FlipClock({
    el,
    face,
    theme,
    timer: 160
})

clock.emitter.on('afterStop', () => {
    if(possibleValues.length) {
        setTimeout(() => {
            face.state.targetValue = possibleValues[i];
            
            clock.start();

            if(i < possibleValues.length - 1) {
                i++;
            }
            else {
                i = 0
            }
        }, 1500);
    }
})