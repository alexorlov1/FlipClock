let currentListener: (() => void)|undefined = undefined;

/**
 * The tuple that is returned when creating a signal.
 * 
 * @public
 */
export type Signal<T> = [SignalReadFunction<T>, SignalWriteFunction<T>, SignalResetFunction<T>];

/**
 * The signal's read function.
 * 
 * @public
 */
export type SignalReadFunction<T> = () => T;

/**
 * The signal's write function.
 * 
 * @public
 */
export type SignalWriteFunction<T> = (value: T) => void;

/**
 * The signal's reset function.
 * 
 * @public
 */
export type SignalResetFunction<T> = () => T;

/**
 * Create a signal.
 * 
 * @public
 */
export function createSignal<T>(initialValue: T): Signal<T> 
export function createSignal<T>(initialValue?: T): Signal<T|undefined> 
export function createSignal<T>(initialValue?: T): Signal<T|undefined> {
    let value: T|undefined = initialValue;

    const subscribers: Function[] = [];

    function read() {
        if (currentListener) {
            subscribers.push(currentListener);
        }

        return value;
    };

    function write(newValue?: T) {
        value = newValue;

        subscribers.forEach(fn => fn());
    };

    function reset() {
        value = initialValue;

        subscribers.splice(0, subscribers.length);

        return value;
    };

    return [read, write, reset];
}

/**
 * Create a signal "watch" effect.
 * 
 * @public
 */
export function watchEffect(callback: () => void) {
    currentListener = callback;
    callback();
    currentListener = undefined;
}


type Can<T extends any[]> = {
    create: boolean
} & {
    [K in T[number]]: boolean
}

const a: Can<['update']> = {
    create: true,
    update: true
};