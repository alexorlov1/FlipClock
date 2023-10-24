export type Event<T, K extends keyof T> = {
    key: keyof T,
    fn: EventEmitterCallback<T, K>,
    unwatch: Function
}

export type EventEmitterCallback<T, K extends keyof Required<T>> = (...args: Required<T>[K][]) => void

/**
 * An event emitter to facilitate emitter and listening for events.
 */
export default class EventEmitter<T> {
    protected events: Event<T,any>[] = [];

    /**
     * Emit an event.
     */
    public emit<K extends keyof Required<T>>(key: K, ...args: Required<T>[K] extends (...args: infer P) => void ? P : any[]) {
        for(const event of this.events) {
            if(event.key !== key) {
                continue;
            }

            event.fn(...args);
        }
    }

    /**
     * Listen for an event.
     */
    public on<K extends keyof Required<T>>(key: K, fn: EventEmitterCallback<T, K>): () => void {
        const unwatch = () => {
            const index = this.events.findIndex(event => {
                return event.key === key && event.fn === fn;
            });

            this.events.splice(index, 1);
        }

        this.events.push({ key, fn, unwatch });

        return unwatch;
    }
    
    /**
     * Listen for an event once.
     */
    once<K extends keyof Required<T>>(key: K, fn: EventEmitterCallback<T, K>): void {
        const unwatch = this.on(key, (...args: T[K][]) => {
            fn(...args);
            unwatch();
        });
    }

    /**
     * Stop listening for an event by key, or with a key a specific function.
     */
    off<K extends keyof Required<T>>(key: K): void
    off<K extends keyof Required<T>>(key: K, fn?: T[K]): void {
        for (const event of this.events) {
            if (event.key === key && (!fn || fn === event.fn)) {
                event.unwatch();
            }
        }
    }
    
    /**
     * Unwatch and remove all the events.
     */
    unwatch(): void {
        for (const { unwatch } of this.events) {
            unwatch();
        }
    }
}