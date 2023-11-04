import { astish, props } from './src/helpers/css';

const test = astish(`
div {
    before {
        content: " ";
        background-color: red
    }
}
`);

console.log(props(test));
