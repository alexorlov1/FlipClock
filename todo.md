Requires API fixes:

- probably should have proper function passing and typing when using stopWhen. need to accept real functions in addition to the params.
- fix parse() export. there are two parse functions. need to rename the CSS one.

Docs:
- create an amazing homepage layout. d3.js is cool.
- includes how to use .css or css-in-js in getting started.
- re-write getting started need to flow in to the library complexity better.
- write examples for how to use CSS-in-JS.
- write example to showcase font-size sizing, including static and inherit and Tailwind.
- have chat gpt edit/proof docs.
- create another theme as an example that multiple themes can work.
- document cli tool. make sure cli tool works with node and not just bun.

Tests
- Need better coverage of new code. Goal is > 95% test coverage.
- Clean up any unsed code
- write test for EventEmitter
- write test for CSS.