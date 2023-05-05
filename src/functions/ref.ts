export type Watcher = {
    watch: (fn: Function) => void
    toRaw: () => any
}

export type Ref<T> = { [K in keyof T]: T[K] } & Watcher;

/**
 * Converts the given value to a reactive subject.
 */
export function subject<T>(value: T, events: Function[]): Ref<T> {
    /**
     * Returns the raw value.
     */
    function toRaw(): T {
        return value;
    }
    
    /**
     * Watches the given function.
     */
    
    function watch(fn: Function): Function {
        events.push(fn);
    
        return (): void => {
            events.splice(events.indexOf(fn), 1)
        };
    }
    
    if(Array.isArray(value)) {
        class ProxyArray extends Array {
            toRaw(): T {
                return toRaw();
            }
            watch(fn: Function): Function {
                return watch(fn);
            }
        }
        
        return Array.of.call(ProxyArray, ...value);
    }

    return Object.assign(
        Object.create({
            watch,
            toRaw
        }), value instanceof Object ? value : { value }
    );
}

/**
 * Create a reactive variable reference.
 */
export default function ref<T>(value: T): Ref<T> {
    const events: Function[] = [];

    return new Proxy<Ref<T>>(subject(value, events), {
        set(target: any, prop: string|symbol, newValue: any) {
            const oldValueString = JSON.stringify(target);
            const oldValue = JSON.parse(oldValueString);

            target[prop] = newValue;

            // console.log(JSON.stringify(target), oldValueString)

            // if(JSON.stringify(target) !== oldValueString) {
                for(const event of events) {
                    if(Array.isArray(value) || value instanceof Object) {
                        event(target, oldValue)
                    }
                    else {
                        event(target.value, oldValue.value)
                    }
                }
            // }
            
            return true;
        }
    });
}