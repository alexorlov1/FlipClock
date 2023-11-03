import { Properties } from 'csstype';
import { css } from './src/helpers/css';

/**
 * A CSS-in-JS style object.
 * 
 * @public
 */
interface CSSAttribute extends Properties {
    [key: string]: CSSAttribute | string | number | undefined | null;
}

/**
 * Convert a css style string into a object. This code was taken from
 * Goober.js.
 * 
 * Goober.is a fantastic library in which we took inspiration
 * (and this code). If the goal wasnt zero dependencies, we would have used it.
 * And we only need a small part of library.
 * 
 * Attribution:
 * 
 * https://goober.js.org/
 * https://github.com/cristianbote/goober/blob/master/src/core/astish.js
 * 
 * @public
 */

export function ast(val: string): object {
    let tree: any = [{}];
    let block, left;

    while ((block = newRule.exec(val.replace(ruleClean, '')))) {
        if (block[4]) {
            tree.shift();
        } else if (block[3]) {
            left = block[3].replace(ruleNewline, empty).trim();
            tree.unshift((tree[0][left] = tree[0][left] || {}));
        } else {
            tree[0][block[1]] = block[2].replace(ruleNewline, empty).trim();
        }
    }

    return tree[0];
};

/**
 * @private
 */
const newRule = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;

/**
 * @private
 */
const ruleClean = /\/\*[^]*?\*\/|  +/g;

/**
 * @private
 */
const ruleNewline = /\n+/g;

/**
 * @private
 */
const empty = ' ';

css({
    body: {
        background: 'red'
    }
})

css({
    body: {
        background: 'blue'
    }
})