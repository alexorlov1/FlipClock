let currentListener: (() => void)|undefined = undefined;

export type Signal<T> = [ReadFunction<T>, WriteFunction<T>, ResetFunction<T>];
export type ReadFunction<T> = () => T;
export type WriteFunction<T> = (value: T) => void;
export type ResetFunction<T> = () => T;

export function createSignal<T>(initialValue: T): Signal<T> 
export function createSignal<T>(initialValue?: T): Signal<T|undefined> 
export function createSignal<T>(initialValue?: T): Signal<T|undefined> {
    let value: T|undefined = initialValue;

    const subscribers: Function[] = [];

    function read() {
        if(currentListener) {
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

export function watchEffect(callback: () => void) {
    currentListener = callback;
    callback();
    currentListener = undefined;
}