import EventEmitter from "../EventEmitter";

export type StateProp<T> = keyof T

export type StateFunctions<T> = {
    update: (state: Partial<T>) => void
    off: (fn?: Function) => void
    once: (fn: Function) => () => void
    watch: (fn: Function) => () => void
    unwatch: () => void
};

export type Reactive<T> = { [K in keyof T]: T[K] } & StateFunctions<T>;

export function useState<T extends Record<string, any>>(state: T) {
    const emitter = new EventEmitter();

    const mergedState: Reactive<T> = Object.assign(state, {
        update(newState: Partial<T>) {
            const prevState = Object.assign({}, state);

            Object.assign(state, newState);

            emitter.emit('update', state, prevState);
        },
        off: (fn?: Function) => {
            emitter.off('update', fn);
        },
        unwatch() {
            emitter.unwatch();
        },
        watch: (fn: Function) => {
            return emitter.on('update', fn);
        },
        once: (fn: Function) => {
            return emitter.once('update', fn);
        }
    });

    return new Proxy<Reactive<Readonly<T>>>(mergedState, {
        get(target: T, key: string) {
            return target?.[key];
        }
    });
}