import EmitterEvent from './types/EmitterEvent';

/**
 * The EventEmitter class gives event emitter method to classes that inherit it.
 * 
 * @public
 */
export default abstract class EventEmitter {
    
    /**
     * The instance events.
     */
    protected events: EmitterEvent[] = [];

    /**
     * Emit an event.
     * 
     * @param key - The name of the name of the event to emit.
     * @param args - The arguments passed to the event.
     * @returns The `EventEmitter` instance.
     */
    emit(key: string, ...args): this {
        const events: EmitterEvent[] = this.events.filter(
            (e: EmitterEvent) => e.key === key
        );

        for(const event of events) {
            event.fn.apply(this, ...args);
        }

        return this;
    }

    /**
     * Stop listening to for event to fire.
     *
     * @param key - The name of the name of the event to emit.
     * @param fn - The listener callback function.
     * @returns The EventEmitter instance.
     */
    off(key: string, fn?: (event: EventEmitter) => void) {
        this.events = this.events.filter((e: EmitterEvent) => {
            if(e.key === key && (!fn || fn === e.fn)) {
                
            }
        });
        
        if(this.events[key] && fn) {
            this.events[key] = this.events[key].filter(event => {
                return event !== fn;
            });
        }
        else {
            this.events[key] = [];
        }

        return this;
    }

    /**
     * Start listening for an event to fire.
     *
     * @param key - The name of the name of the event to emit.
     * @param fn - The listener callback function.
     * @returns The EventEmitter instance.
     */
    on(key: string, fn: (event: EmitterEvent) => void) {
        this.events.push({ key, fn });

        return this;
    }

    /**
     * Listen form an event to fire once.
     *
     * @param key - The name of the name of the event to emit.
     * @param fn - The listener callback function.
     * @returns The EventEmitter instance.
     */
    once(key: string, fn: (...args) => void) {
        return this.on(key, (...args) => {
            fn(...args);

            this.off(key, fn);
        });
    }

}