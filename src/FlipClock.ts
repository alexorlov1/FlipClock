import EventEmitter from "./EventEmitter";
import { Face, FaceHooks } from './Face';
import Timer from "./Timer";

export type Theme = {
    render: (instance: FlipClock) => void
} & FaceHooks

export type FlipClockProps = {
    autoStart?: boolean,
    emitter?: EventEmitter<FaceHooks>,
    face: Face
    theme: Theme
    timer?: Timer | number,
    el?: Element | null,
}

/**
 * The FlipClock class starts, stops, resets, mounts, and unmounts the clock.
 * The clock also tracks the time and renders the clock with each interval.

 */
export class FlipClock {
    
    /**
     * Determines if the clock should automatically start when it is mounted.
     */
    public readonly autoStart: boolean = true

    /**
     * The element the count is mounted.
     */
    public el?: Element | null

    /**
     * The event emitter.
     */
    public readonly emitter: EventEmitter<FaceHooks>

    /**
     * The face used to display the clock.
     */
    public readonly face: Face

    /**
     * The face used to display the clock.
     */
    public readonly theme: Theme
    
    /**
     * The face value displayed on the clock.
     */
    public readonly timer: Timer

    /**
     * Construct the FlipClock.
     */
    constructor(props: FlipClockProps) {
        this.face = props.face;
        this.theme = props.theme;
        this.emitter = props.emitter || new EventEmitter();
        
        this.autoStart = props.autoStart === undefined
            ? this.autoStart
            : props.autoStart;
            
        this.timer = props.timer instanceof Timer
            ? props.timer
            : new Timer(props.timer);
        
        this.hook('afterCreate', this);

        if(props.el) {
            this.mount(props.el);
        }
    }

    get animationRate() {
        if(!this.el) {
            return 0;
        }

        return parseInt(getComputedStyle(this.el)?.animationDuration.replace(/s$/, '')) * 1000;
    }

    /**
     * Mount the clock instance to the DOM.
     */
    mount(el: Element) {
        this.hook('beforeMount', this);

        this.el = el;

        this.theme.render(this);
        
        this.hook('afterMount', this);

        if(this.autoStart && this.timer.isStopped) {
            window.requestAnimationFrame(() => this.start());
        }

        return this;
    }

    /**
     * Start the clock instance.
     */
    start(fn?: (instance: FlipClock) => void): this {
        this.hook('beforeStart', this);

        this.timer.start(() => {
            requestAnimationFrame(() => {
                this.hook('beforeInterval', this);
        
                this.face.interval(this);

                this.hook('afterInterval', this);
        
                if(typeof fn === 'function') {
                    fn(this);
                }     
            });      
        });

        this.hook('afterStart', this);

        return this;
    }

    /**
     * Stop the clock instance.
     */
    stop(fn?: (instance: FlipClock) => void): this {
        this.hook('beforeStop', this);
        
        this.timer.stop(() => {
            if(typeof fn === 'function') {
                fn(this);
            }     

            this.hook('afterStop', this)
        });

        return this;
    }

    /**
     * Toggle starting/stopping the clock instance.
     */
    toggle(fn?: (instance: FlipClock) => void): this {
        if(this.timer.isStopped) {
            this.start(fn);
        }
        else {
            this.stop(fn);
        }
        
        return this;
    }

    /**
     * Unmount the clock instance from the DOM.
     */
    unmount(): this {
        this.hook('beforeUnmount', this);
        
        this.el?.parentElement?.removeChild(this.el);

        this.hook('afterUnmount', this);

        return this;
    }

    /**
     * Dispatch the event and call the method that corresponds to given hook.
     */
    protected hook<K extends keyof Required<FaceHooks>>(key: K, ...args: Required<FaceHooks>[K] extends (...args: infer P) => void ? P : any[]): void {
        if(key in this.face && typeof this.face[key] === 'function') {
            const fn = this.face[key] as Function;

            fn?.apply(this.face, args);
        }
        
        if(key in this.theme && typeof this.theme[key] === 'function') {
            const fn = this.theme[key] as Function;

            fn?.(...args);
        }

        this.emitter.emit(key, ...args);
    }
}

/**
 * Instantiate a new FlipClock instance.
 */
export function flipClock(props: FlipClockProps): FlipClock {
    return new FlipClock(props);
}