let current: Function | undefined;

export type SignalGetter<T = unknown> = () => T;
export type SignalSetter<T = unknown> = (newValue: T | ((value: T) => T)) => void;
export type Signal<T = unknown> = [SignalGetter<T>, SignalSetter<T>]

export type StateDefinition = Record<string, unknown>;

export type State<T> = {
    [P in keyof T]: T[P]
}

/**
 * Define a proxy state with getters/setters for each property that execute
 * the signals. This is a way to define a structure of signals to represent a
 * state.
 */
export function defineState<T>(definition: T): State<T> {
    const state = {};

    for(const i in definition) {
        const [ get, set ] = createSignal(definition[i]);

        Object.defineProperty(state, i, { get, set });
    }
    
    return state as State<T>;
}

/**
 * Create a signal using the given value.
 */
export function createSignal<T>(value?: T): Signal<T> {
    const observers: Function[] = [];

    function get(): T {
        if(current && !observers.includes(current)) {
            observers.push(current)
        }

        return value;
    }
    
    function set(newValue: T | ((value: T) => T)) {
        if(typeof newValue === 'function') {
            newValue = (newValue as (value: T) => T)(value)
        }

        value = newValue;

        for(const fn of observers) {
            fn();
        }
    }

    return [ get, set ];
}

/**
 * Create a signal effect.
 */
export function createEffect(fn: Function) {
    current = fn;
    fn();
    current = undefined;
}