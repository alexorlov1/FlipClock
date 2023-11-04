import { EventEmitter } from './EventEmitter';
import { Face, FaceHooks } from './Face';
import { Timer } from './Timer';
import { watchEffect } from './helpers/signal';

export type Theme<T extends Face<T>> = {
    render: (instance: FlipClock<T>) => void
} & FaceHooks<T>

export type FlipClockProps<T extends Face<T>> = {
    autoStart?: boolean,
    face: T
    theme: Theme<T>
    timer?: Timer | number,
    el?: Element | null,
}

/**
 * The FlipClock class starts, stops, resets, mounts, and unmounts the clock.
 * The clock also tracks the time and renders the clock with each interval.

 */
export class FlipClock<T extends Face<T>> extends EventEmitter<T> {

    /**
     * Determines if the clock should automatically start when it is mounted.
     * 
     * @public
     */
    public readonly autoStart: boolean = true;

    /**
     * The element the count is mounted.
     * 
     * @public
     */
    public el?: Element | null;

    /**
     * The face used to display the clock.
     * 
     * @public
     */
    public readonly face: T;

    /**
     * The face used to display the clock.
     * 
     * @public
     */
    public readonly theme: Theme<T>;

    /**
     * The face value displayed on the clock.
     * 
     * @public
     */
    public readonly timer: Timer;

    /**
     * Construct the FlipClock.
     */
    constructor(props: FlipClockProps<T>) {
        super();

        this.face = props.face;
        this.theme = props.theme;

        if (typeof props.autoStart === 'boolean') {
            this.autoStart = props.autoStart;
        }

        this.timer = props.timer instanceof Timer
            ? props.timer
            : new Timer(props.timer);

        this.hook('afterCreate', this);

        if (props.el) {
            this.mount(props.el);
        }
    }

    get animationRate() {
        if (!this.el) {
            return 0;
        }

        return parseInt(getComputedStyle(this.el)?.animationDuration.replace(/s$/, '')) * 1000;
    }

    /**
     * Mount the clock instance to the DOM.
     * 
     * @public
     */
    mount(el: Element) {
        this.hook('beforeMount', this);

        this.el = el;

        watchEffect(() => {
            this.theme.render(this);
        });

        this.hook('afterMount', this);

        if (this.autoStart && this.timer.isStopped) {
            window.requestAnimationFrame(() => this.start());
        }

        return this;
    }

    /**
     * Start the clock instance.
     * 
     * @public
     */
    start(fn?: (instance: FlipClock<T>) => void): this {
        this.hook('beforeStart', this);

        this.timer.start(() => {
            requestAnimationFrame(() => {
                this.hook('beforeInterval', this);

                this.face.interval(this);

                this.hook('afterInterval', this);

                if (typeof fn === 'function') {
                    fn(this);
                }
            });
        });

        this.hook('afterStart', this);

        return this;
    }

    /**
     * Stop the clock instance.
     * 
     * @public
     */
    stop(fn?: (instance: FlipClock<T>) => void): this {
        this.hook('beforeStop', this);

        this.timer.stop(() => {
            if (typeof fn === 'function') {
                fn(this);
            }

            this.hook('afterStop', this);
        });

        return this;
    }

    /**
     * Toggle starting/stopping the clock instance.
     * 
     * @public
     */
    toggle(fn?: (instance: FlipClock<T>) => void): this {
        if (this.timer.isStopped) {
            this.start(fn);
        }
        else {
            this.stop(fn);
        }

        return this;
    }

    /**
     * Unmount the clock instance from the DOM.
     * 
     * @public
     */
    unmount(): this {
        this.hook('beforeUnmount', this);

        this.el?.parentElement?.removeChild(this.el);

        this.hook('afterUnmount', this);

        return this;
    }

    /**
     * Dispatch the event and call the method that corresponds to given hook.
     * 
     * @protected
     */
    protected hook<K extends keyof Required<FaceHooks<T>>>(key: K, ...args: Required<FaceHooks<T>>[K] extends (...args: infer P) => void ? P : any[]): void {
        if (key in this.face && typeof this.face[key] === 'function') {
            const fn = this.face[key] as Function;

            fn?.apply(this.face, args);
        }

        if (key in this.theme && typeof this.theme[key] === 'function') {
            const fn = this.theme[key] as Function;

            fn?.(...args);
        }

        this.emit(key, ...args);
    }
}

/**
 * Instantiate a new `FlipClock` instance.
 */
export function flipClock<T extends Face<T>>(props: FlipClockProps<T>): FlipClock<T> {
    return new FlipClock<T>(props);
}