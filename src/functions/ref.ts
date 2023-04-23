/**
 * Converts the given value to a reactive subject.
 * 
 * @public
 * @param value - The subject that should be reactive.
 * @param events - An array of event callback functions.
 * @returns The reactive subject.
 */
function subject(value: any, events: Function[]): any[]|Object {
    function watch(fn: Function): Function {
        events.push(fn);
    
        return (): void => {
            events.splice(events.indexOf(fn), 1)
        };
    }
    
    if(Array.isArray(value)) {
        class ProxyArray extends Array {
            watch(fn: Function): Function {
                return watch(fn);
            }
        }
        
        return Array.of.call(ProxyArray, ...value);
    }

    return Object.assign(
        Object.create({ watch }), value instanceof Object ? value : { value }
    );
}

/**
 * Create a reactive variable reference.
 * 
 * @public
 * @param value - The value to make reactive.
 * @returns The reactive value.
 */
export default function ref(value: any): ProxyConstructor {
    const events: Function[] = [];

    return new Proxy(subject(value, events), {
        set(target: any, prop: string|symbol, newValue: any) {
            const oldValue = JSON.stringify(target);

            target[prop] = newValue;

            if(JSON.stringify(target) !== oldValue) {
                for(const event of events) {
                    if(Array.isArray(value) || value instanceof Object) {
                        event(target, JSON.parse(oldValue))
                    }
                    else {
                        event(target.value, JSON.parse(oldValue).value)
                    }
                }
            }
            
            return true;
        }
    });
}