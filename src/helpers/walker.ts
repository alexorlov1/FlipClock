import { DigitizedValue, DigitizedValues } from "./digitizer";

export type StopFunction = (current?: DigitizedValue) => void;
export type StopWalkerCallbackFunction = (current: DigitizedValue, target: DigitizedValues | DigitizedValue | undefined, to: WalkerResponse, context: { count: number, changes: WalkerChanges }) => boolean;

export type WalkerResponse = DigitizedValues | DigitizedValue | undefined;
export type WalkerFunction = (current: DigitizedValue, target?: DigitizedValues | DigitizedValue) => DigitizedValues | DigitizedValue | undefined;
export type WalkerCallbackFunction = (current: DigitizedValue, target: DigitizedValue | undefined, context: { count: number, changes: WalkerChanges }, stop: StopFunction) => WalkerResponse;
export type WalkerDirection = 'backwards' | 'forwards'

export type WalkerOptions = {
    direction?: WalkerDirection
}

export type WalkerChange = { current: DigitizedValue, target: DigitizedValues | DigitizedValue | undefined, to: WalkerResponse }
export type WalkerChanges = WalkerChange[];

/**
 * Create a walker function that can be used with `walk()`. This utility
 * function adds some abstract logic to stop the walker at arbitrary times.
 * This can be used in conjunction with `matchArrayStructure()` to increment or
 * decrement the values towards a target value. The walker can be stopped in
 * two ways: using `stop()` in the `WalkerCallbackFunction` or return `true`
 * in the `StopWalkerCallbackFunction`.
 */
export function useWalker(fn: WalkerCallbackFunction, stopFn?: StopWalkerCallbackFunction): WalkerFunction {
    let count = 0, changes: WalkerChanges = [], isStopped: boolean = false;

    function stop() {
        isStopped = true;
    }

    function handleResponse(current: DigitizedValue, target: DigitizedValues | DigitizedValue | undefined, to: WalkerResponse) {
        if (current !== to) {
            changes.push({ current, target, to })
        }

        if (stopFn && stopFn(current, target, to, { count, changes })) {
            isStopped = true;
        }

        return to;
    }

    return (current: DigitizedValue, target?: DigitizedValue) => {
        if (isStopped) {
            return current;
        }

        return handleResponse(current, target, fn(current, target, { count, changes }, stop));
    }
}

// /**
//  * Recursively walk the current array and call the function for each string.
//  * The returned value of the function will replace the current value in the
//  * array. If `true` is returned, the current value is used (similar to 
//  * `continue` in a for loop). If `false` or `undefined` is returned, the current
//  * value will be used and resursion is stopped (similar to `break` in a for
//  * loop).
//  */
// export function walk(current: DigitizedValues, fn: WalkerCallbackFunction, options?: WalkerOptions)
// export function walk(current: DigitizedValues, target: DigitizedValues, fn: WalkerCallbackFunction, options?: WalkerOptions)
// export function walk(current: DigitizedValues, target: DigitizedValues | WalkerCallbackFunction, fn?: WalkerCallbackFunction | WalkerOptions, options: WalkerOptions = {}) {
//     let stopped = false, count = 0;

//     const $current: DigitizedValues = current;
//     const $target: DigitizedValues | undefined = typeof target === 'function'
//         ? undefined
//         : target;

//     const $fn = typeof target === 'function'
//         ? target
//         : (typeof fn === 'function' ? fn : (current) => current);

//     const $options: WalkerOptions = Object.assign({
//         direction: 'forwards',
//         matchArrayLength: true
//     }, typeof fn === 'object' ? fn : options);

//     const direction: WalkerDirection = $options.direction;

//     function stop(current?: DigitizedValue) {
//         stopped = true;

//         return current;
//     }

//     function handle(current, target, count, stop) {
//         if (stopped) {
//             return current;
//         }

//         return $fn(current, target, count, stop);
//     };

//     function recurse(current: DigitizedValues | DigitizedValue, target?: DigitizedValues | DigitizedValue) {
//         // If the current value is not an array, then call the function.
//         if (!Array.isArray(current)) {
//             return handle(current, target, ++count, stop);
//         }

//         const end = direction === 'forwards' ? current.length : 0;
//         const increment = direction === 'forwards' ? 1 : -1;

//         let i = direction === 'forwards' ? 0 : current.length - 1;

//         for (; direction === 'forwards' ? i < end : i >= end; i += increment) {
//             const response = recurse(current[i], target?.[i]);

//             if (response === undefined) {
//                 current.splice(i, 1);
//             }
//             else {
//                 current[i] = response;
//             }
//         }

//         return current;
//     }

//     return recurse($current, $target);
// }

export function stopAfterChanges(totalChanges?: number | undefined): StopWalkerCallbackFunction {
    return (current, target, to, { changes }) => {
        if (totalChanges === undefined) {
            return false;
        }

        return changes.length === totalChanges
    }
}