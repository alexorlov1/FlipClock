/**
Todo:
- change type to "module", get more strict TS config. dont allow `any` types.
- ensure all use helpers have context types, and option types. not props or params.
- use the word params only for constructors or parameters, but not options on use functions.
- improve eslint config.
- Re-build clock faces. Alpha, Counter, Clock, ElapsedTime. Use new theme.
  - refactor duration formatting. Make this a helper. Do this with elapsed time.
  - Refactor animationrate. should be implemented on the theme as an option.
    over all this from a single place, and not have to pass it down to children.
- Finished docs
  - Homepage with perfect animation flipping left to right, "Hello World!". "Welcome Back!"
  - Dictionary
  - Sequencer
  - Digitizer
  - Charset

- Remove Formattable inheritances. Remove as much inheritance as possible.
- ensure animations work every single time the reactivty fires
- remove the types directory and put the types where they belong.
- Refactor scss into theme. should build CSS as a theme file name `flipclock.css` or `another-theme.css`.
- BONUS: Create second digital clock theme.
- check and remove all unused files


To-do after 100% testing:

- remove constants.ts 
*/

import { diff, h, render } from "./helpers/dom";

// A function intersect the VNode attributes with a DOM element.



const vnode = h('div', [
  h('a', {
    class: 'test',
    'data-test': 123,
    onClick() {
      console.log('click');
    }
  }, 123)
]);

const el = document.querySelector('#app')?.appendChild(
  render(vnode) as HTMLElement
);

const vnode2 = h('div', [
    h('a', {
      class: 'test2',
      'data-test2': 123
    }, 'updated')
]);

diff(el, vnode2, vnode)

// import { FaceValue } from "flipclock";
// import FlipClock from "./FlipClock";
// import Alphanumeric from "./faces/Alphanumeric";


// const el = document.querySelector('#app')?.appendChild(
//     document.createElement('div')
// );

// const clock = new FlipClock({
//     el,
//     face: new Alphanumeric({
//       value: new FaceValue('test')
//     })
// });


