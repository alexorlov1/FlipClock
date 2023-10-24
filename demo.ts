import { faceValue } from './src/FaceValue';
import { useSequencer } from './src/helpers/sequencer';

const parent = document.querySelector('#app') as HTMLDivElement;

const subject = faceValue(' '), target = faceValue('');

const { decrement } = useSequencer({
    stopAfterChanges: 2,
    matchArray: {
        backwards: true
    }
});

console.log(decrement(subject, target).digits);
console.log(decrement(subject, target).digits);

// const instance = flipClock({
//     timer: 100,
//     theme: theme({
//         labels: ['Days', 'Hours', 'Minutes', 'Seconds']
//     }),
//     face: alphanumeric({
//         value: faceValue(''),
//         targetValue: faceValue('stop'),
//         skipChars: 5,
//         sequencer: {
//             charset: {
//                 shuffle: true
//             },
//             stopAfterChanges: 2
//         }
//     })
// });

// instance.emitter.on('afterStop', (instance) => {
//     console.log(instance);
// });

// instance.mount(parent);

// const element = clock(value, parent);

// watchEffect(() => {
//     clock(value, element);
// })

// console.log(instance);

// scope
// scope sandboxes bevahior for a specific consumer. the idea is that
// inside a clock face we can define a scope, and use the scope context
// programmatically, while the theme could define its own scope, and use it.
// the goal is the face and scope operate independently.

// import { DigitizedValue, DigitizedValues } from './src/helpers/digitizer';

// type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;

// type WalkerGroupCallback<C, P, R> = (value: DigitizedValues, context: C, parentContext: P) => R
// type WalkerItemCallback<C, P, R> = (value: DigitizedValue, context: C, parentContext: P) => R

// function createWalker<G = DigitizedValues, I = DigitizedValue, C = any>(parentContext: C) {
//     const callbacks: {
//         group?: WalkerGroupCallback<any, any, G>,
//         item?: WalkerItemCallback<any, any, I>
//     } = {
//         group: undefined,
//         item: undefined
//     };
    
//     function walk(items: DigitizedValues, context: any): G {
//         function recurse(items: DigitizedValues | DigitizedValue, parentContext: any, context: any) {
//             if(Array.isArray(items)) {
//                 const mapped: any[] = [];

//                 for(const item of items) {
//                     const index = items.indexOf(item);

//                     mapped.push(recurse(
//                         item,
//                         ['array', 'object'].includes(typeof parentContext) ? parentContext[index] : parentContext,
//                         ['array', 'object'].includes(typeof context) ? context[index] : context,
//                     ) as I);
//                 }

//                 if(callbacks.group) {
//                     return callbacks.group?.(mapped, context, parentContext);
//                 }

//                 return mapped as G;
//             }

//             if(callbacks.item) {
//                 return callbacks.item?.(items, context, parentContext);
//             }

//             return items as I;
//         }
        
//         return recurse(items, parentContext, context) as G;
//     }

//     function onGroup<T = any, P = any>(fn: (value: DigitizedValues, context: T, parentContext: P) => G) {
//         callbacks.group = fn
//     }

//     function onItem<T = any, P = any>(fn: (value: DigitizedValue, context: T, parentContext: P) => I) {
//         callbacks.item = fn
//     }

//     return {
//         walk,
//         onGroup,
//         onItem
//     }
// }

// type Test = {label: string};

// type Group<T> = T | T[] | undefined;

// class GroupEl {
//     constructor(public label: string, public values: DigitizedValues) {

//     }
// }

// class ItemEl {
//     constructor(public value: DigitizedValue) {

//     }
// }

// type ParentContext = {
//     lastValue: string,
//     currentValue: string,
//     nextValue: string
// };

// const parentContext = [
//     [
//         {
//             lastValue: '0',
//             currentValue: '1',
//             nextValue: '2'
//         },
//         {
//             lastValue: '1',
//             currentValue: '2',
//             nextValue: '3'
//         }
//     ],
//     [
//         {
//             lastValue: '2',
//             currentValue: '3',
//             nextValue: '4'
//         },
//         {
//             lastValue: '3',
//             currentValue: '4',
//             nextValue: '2'
//         }
//     ]
// ]

// const { onGroup, onItem,  walk } = createWalker<GroupEl, ItemEl>(1);


// onGroup<Test>((value, context) => {
//     return new GroupEl(context.label, value);
// });

// onItem<undefined, ParentContext>((value, _context, _parentContext) => {
//     return new ItemEl(value);
// });

// onItem<undefined>((value, context) => {
//     // console.log(context);
// })


// const transposed = walk([['1', '2'], ['3', '4']], [{label: 'label 1'}, {label: 'label 2'}]);

// console.log(transposed);


// const walker = createWalker({
//     context
// });

// walker([['1', '2']], (context) => {
//     console.log(123);
// });


// walker
// walks through the data and may return new values. like [1, 1], could
// become a card or a group dom object, whatever. the walker should execute the
// scopes, and their given contexts.

// const ctx = defineContext([
//     {label: 'a'},
//     {label: 'b'}
// ]);

// const walk = createWalker({
//     ctx,
//     direction: 'forward'
// })

// const ctx2 = defineContext([
//     {foo: 'a', bar: 1},
//     {foo: 'b', bar: 2}
// ]);

// walk([[1, 2]], ctx2, (value, ctx) => {
// 
// });

// walk([[1, 2]], () => {
// 
// });





// import { h, render } from "./src/helpers/dom";
// import { createSignal } from "./src/helpers/signal";

// const [ count, setCount ] = createSignal(0);

// const node = h<HTMLDivElement>('div', [
//     h('span', `count: ${count()}`),
//     h('button', {
//         onclick: () => setCount(value => value + 1)
//     }, '+1'),
//     h('button', {
//         onclick: () => setCount(value => value + 1)
//     }, '-1')
// ])

// console.log(node)

// const el = render(node);

// document.body.appendChild(el);

// import { FaceValue } from "./src/FaceValue";
// import FlipClock from "./src/FlipClock";
// import Alphanumeric from "./src/faces/Alphanumeric";
// import { useFlipClockTheme } from "./src/themes/flipclock";


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