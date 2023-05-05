// type Ref<T> = { value: T }

import EventEmitter from "../EventEmitter";

type StateFunctions<T> = {
    update: (state: Partial<T>) => void
    unwatch: Function
    watch: Function
};

export type Reactive<T> = { [K in keyof T]: T[K] } & StateFunctions<T>;

export type StateProp<T> = keyof T

export type StateOptions<T> = {
    watch?: StateProp<T>[]
}

export function useState<T extends object>(state: T, options: StateOptions<T> = {}) {
    const emitter = new EventEmitter();

    const mergedState: Reactive<T> = Object.assign(state, {
        update(newState: Partial<T>) {
            const prevState = Object.assign({}, state);

            Object.assign(state, newState);

            emitter.emit('update', state, prevState);
        },
        unwatch: () => {
            emitter.off('set');
        },
        watch: (fn: Function) => {
            return emitter.on('update', (...args) => fn(...args));
        }
    });

    return new Proxy<Reactive<Readonly<T>>>(mergedState, {
        get(target: T, key?: string) {
            return target?.[key] || target;
        }
        // set(target: T, key: string, value) {
        //     const lastValue = target[key];

        //     target[key] = value;

        //     if(!options.watch || options.watch.includes(key as StateProp<T>)) {
        //         if(value !== lastValue) {
        //             emitter.emit(`set:${key}`, value, lastValue);
        //         }
        //     }
            
        //     return true;
        // }
    });
}