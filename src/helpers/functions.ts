/**
 * Check if the function exists and execute the function.
 *
 * @public
 */
export default function call(fn?: Function, ...args: any): any {
    return typeof fn === 'function' && fn(...args);
}
