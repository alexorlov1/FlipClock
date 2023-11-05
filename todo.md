Requires API fixes:

- fix divider css. height is fluid. http://localhost:5175/examples/clock.html
- elapsedtime needs a stop at. the loop with never stop.
- elapsedtime, start and end should be reactive.
- somehow remove undigitize functionality. its too complex and not consistent.
- make more clock face props reactive like Clock's value property.
- probaly should have proper function passing and typing when using stopWhen. need to accept real functions in addition to the params.
- need to improve sizing of the clock, should be entirely relative to the font size. changing `font-size` on the css-in-js or .flipclock 
- need a better export for index.ts > flipclock.css.ts
- flip-clock-card can shrink.

Docs:
- create an amazing homepage layout. d3.js is cool.
- includes how to use .css or css-in-js in getting started.
- re-write getting started need to flow in to the library complexity better.
- write examples for how to use CSS-in-JS.
- have chat gpt edit/proof docs.
- create another theme as an example that multiple themes can work.
- document cli tool. make sure cli tool works with node and not just bun.

Tests
- Need better coverage of new code. Goal is > 95% test coverage.
- Clean up any unsed code
- write test for EventEmitter
- write test for CSS.