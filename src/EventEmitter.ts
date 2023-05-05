/** 
 * The EmitterEvent defines the event for the EventEmitter.
 * 
 * @public 
 */
export interface EmitterEvent {
    /**
     * The event's key.
     */
    key: string

    /**
     * The event's callback.
     */
    fn: Function,

    /**
     * Unwatch the event.
     */
    unwatch: Function
}

/**
 * The EventEmitter class gives event emitter method to classes that inherit it.
 * 
 * @public
 */
export default class EventEmitter {
    
    /**
     * The instance events.
     */
    protected events: EmitterEvent[] = [];

    /**
     * Emit an event.
     */
    emit(key: string, ...args) {
        const events: EmitterEvent[] = this.events.filter(
            (e: EmitterEvent) => e.key === key
        );

        for (const event of events) {
            event.fn.apply(this, args);
        }
    }

    /**
     * Stop listening for an event to fire.
     */
    off(key?: string, fn?: Function) {
        if(this.events[key]) {
            for(const event of this.events[key]) {
                if(!fn || fn === event.fn) {
                    event.unwatch();
                }
            }
        }
        else {
            this.resetEvents();
        }
    }

    /**
     * Start listening for an event to fire.
     */
    on(key: string, fn: Function) {
        const unwatch = () => {
            this.events.splice(this.events.findIndex(event => {
                return event.key === key && event.fn === fn;
            }), 1);   
        }

        this.events.push({ key, fn, unwatch });

        return unwatch;
    }

    /**
     * Listen form an event to fire once.
     */
    once(key: string, fn: (...args) => void) {
        return this.on(key, (event: EmitterEvent, ...args) => {
            fn(event, ...args);

            event.unwatch();
        });
    }

    /**
     * Unwatch and remove all the events.
     */
    resetEvents() {
        for (const event of this.events) {
            event.unwatch();
        }
    }
}