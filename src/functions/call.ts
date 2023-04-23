/**
 * Check if the function exists and execute the function.
 *
 * @public
 * @param fn - The function to call.
 * @param args - The arguments to pass to the function.
 * @returns The returned value of the callback function. 
 */
export default function call(fn?: Function, ...args: any): any {
    return fn && fn(...args);
}
