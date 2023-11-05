import { Properties } from 'csstype';
import { Ref, computed, ref } from './ref';
import { watchEffect } from './signal';

/**
 * A CSS-in-JS style object.
 * 
 * @public
 */
export interface CSSProperties extends Properties {
    [key: string]: CSSProperties | string | number | undefined | null;
}

/**
 * Get the FlipClock stylesheet or create and append a new one.
 * 
 * @public
 */
export function sheet(): HTMLStyleElement {
    const existing = document.querySelector('style#__flipclock__');

    if (existing && existing instanceof HTMLStyleElement) {
        return existing as HTMLStyleElement;
    }
    else if (existing) {
        existing.remove();
    }

    const el = document.createElement('style');

    el.id = '__flipclock__';

    document.head.appendChild(el);

    return el;
}

/**
 * @internal
 */
const cachedStringifiedCss: Record<string, string> = {};

/**
 * @internal
 */
const cachedHashedCss: Record<string, string> = {};

/**
 * Convert a `CSSProperties` into a class name and append the css to the style
 * element in the document head.
 * 
 * @public
 */
export function css(value: CSSProperties) {
    const stringified = stringify(value);

    let hash: string;

    if (cachedStringifiedCss[stringified]) {
        hash = cachedStringifiedCss[stringified];
    }
    else {
        hash = toHash(stringified);

        cachedStringifiedCss[stringified] = hash;
    }

    if (!cachedHashedCss[hash]) {
        cachedHashedCss[hash] = parse(value, `.${hash}`);
    }

    sheet().innerHTML = Object.values(cachedHashedCss).join('');

    return hash;
}

export function merge(source: CSSProperties, target: CSSProperties): CSSProperties {
    for (const key in source) {
        if (typeof source[key] === 'object' && typeof target[key] === 'object') {
            target[key] = merge(
                target[key] as CSSProperties,
                source[key] as CSSProperties
            );
        } else {
            target[key] = source[key];
        }
    }

    return target;
}

/**
 * The return value for `useCss()`.
 * 
 * @public
 */
export type UseCss = {
    css: Ref<CSSProperties>;
    hash: Ref<string>;
    merge: (target: CSSProperties) => UseCss;
    extend: (target: CSSProperties) => UseCss;
    toString: () => string
}

/**
 * A composable for using CSS.
 * 
 * @public
 */
export function useCss(source: CSSProperties): UseCss {
    const css = ref(source);

    const hash = computed(() => {
        const stringified = stringify(css.value);

        if (cachedStringifiedCss[stringified]) {
            return cachedStringifiedCss[stringified];
        }

        const hash = toHash(stringified);

        cachedStringifiedCss[stringified] = hash;

        return hash;
    });

    watchEffect(() => {
        if (!cachedHashedCss[hash.value]) {
            cachedHashedCss[hash.value] = parse(css.value, `.${hash.value}`);
        }
        
        if (typeof document === 'undefined') {
            return;
        }

        sheet().innerHTML = Object.values(cachedHashedCss).join('');
    });

    const context: UseCss = {
        css,
        hash,
        merge(target: CSSProperties) {
            css.value = merge(css.value, target);

            return context;
        },
        extend(target: CSSProperties) {
            return useCss(merge(css.value, target));
        },
        toString() {
            return cachedHashedCss[hash.value];
        }
    };

    return context;
}

/**
 * Convert the CSS properties into camelcase.
 * 
 * @public
 */
export function props(values: CSSProperties) {
    for (const i in values) {
        const value = values[i];

        if (value && typeof value === 'object') {
            values[i] = props(value);
        }
        else if (!i.match(/^-/)) {
            values = Object.fromEntries(
                Object.entries(values).map(([key, value]) => {
                    if (key !== i) {
                        return [key, value];
                    }
                    
                    return [key.toLowerCase().replace(
                        /[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()
                    ), value];
                })
            );
        }
    }

    return values;
}

/**
 * Goober.is a fantastic library in which we took inspiration. The code below
 * this comment was taken from Goober.js If the goal wasn't zero dependencies,
 * we would have used it. But we only need a few functions, so consider this a
 * fork a these functions.
 * 
 * MIT License
 * 
 * Copyright (c) 2019 Cristian Bote
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *  
 * https://goober.js.org/
 */

/**
 * Convert a css style string into a object. This function deviates from
 * goober.js in that \n or ; will parse the same on rules.
 * 
 * @public 
 */
export function astish(val: string): object {
    const newRule = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?)(?:;|\n)|([^;}{]*?) *{)|(}\s*)/g;
    const ruleClean = /\/\*[^]*?\*\/|  +/g;
    const ruleNewline = /\n+/g;
    const empty = ' ';

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
 * Parses the object into css, scoped, blocks.
 * 
 * @public
 */
export function parse(obj: any, selector?: string): string {
    let outer = '';
    let blocks = '';
    let current = '';

    for (let key in obj) {
        let val = obj[key];

        if (key[0] == '@') {
            // If these are the `@` rule
            if (key[1] == 'i') {
                // Handling the `@import`
                outer = key + ' ' + val + ';';
            } else if (key[1] == 'f') {
                // Handling the `@font-face` where the
                // block doesn't need the brackets wrapped
                blocks += parse(val, key);
            } else {
                // Regular at rule block
                blocks += key + '{' + parse(val, key[1] == 'k' ? '' : selector) + '}';
            }
        } else if (typeof val == 'object') {
            // Call the parse for this block
            blocks += parse(
                val,
                selector
                    ? // Go over the selector and replace the matching multiple selectors if any
                    selector.replace(/([^,])+/g, (sel) => {
                        // Return the current selector with the key matching multiple selectors if any
                        return key.replace(/(^:.*)|([^,])+/g, (k) => {
                            // If the current `k`(key) has a nested selector replace it
                            if (/&/.test(k)) return k.replace(/&/g, sel);

                            // If there's a current selector concat it
                            return sel ? sel + ' ' + k : k;
                        });
                    })
                    : key
            );
        } else if (val != undefined) {
            // Convert all but CSS variables
            key = /^--/.test(key) ? key : key.replace(/[A-Z]/g, '-$&').toLowerCase();
            // Push the line for this property
            // @ts-ignore
            current += parse.p
                ? // We have a prefixer and we need to run this through that
                // @ts-ignore
                parse.p(key, val)
                : // Nope no prefixer just append it
                key + ':' + val + ';';
        }
    }

    // If we have properties apply standard rule composition
    return outer + (selector && current ? selector + '{' + current + '}' : current) + blocks;
};

/**
 * Stringify an object.
 * 
 * @public
 */
export function stringify(data: any) {
    if (typeof data == 'object') {
        let out = '';
        for (let p in data) out += p + stringify(data[p]);
        return out;
    } else {
        return data;
    }
}

/**
 * Convert a string into a hash.
 * 
 * @public
 */
export function toHash(str: string) {
    let i = 0,
        out = 11;
    while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
    return 'fc' + out;
};