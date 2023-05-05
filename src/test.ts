/**
- change type to "module", get more strict TS config. dont allow `any` types.
- improve eslint config.
- Remove Formattable inheritances. Remove as much inheritance as possible.
- refactor ref, watchers, state, and reactivity
- ensure animations work every single time the reactivty fires
- refactor duration formatting
- refactor clock and elapsed time
- implements helpers for date, string, array
- remove constants.ts
- remove the types directory and put the types where they belong.
- pad() interface should be consistent on array or string.
- move the Card, CardItem, Group and anything specific to the DOM to the theme.
  Should be able to pass a theme interface and it just render it down. This is
  probably just left a single render function. All theme specifics files should
  live in the theme.
- Refactor animationrate. should inherit from parent so we have better control
  over all this from a single place, and not have to pass it down to children.
- Refactor scss into theme. should build CSS as a theme file name `flipclock.css` or `another-theme.css`.
- BONUS: Create second digital clock theme.
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


