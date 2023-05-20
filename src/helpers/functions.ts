/**
 * Check if the function exists and execute the function.
 *
 * @public
 */
export default function call(fn?: Function, ...args: any): any {
    return typeof fn === 'function' && fn(...args);
}

export function debounce(fn: Function, ms = 25) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
}