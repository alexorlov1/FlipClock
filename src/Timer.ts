import { call } from './functions';

/**
 * The Timer class uses a requestAnimationFrame loop to build a timer that can
 * start and stop.
 * 
 * @public
 */
export default class Timer {

    /**
     * The count increments with each interval.
     */
    protected count: number = 0;

    /**
     * The requestAnimationFrame handle number.
     */
    protected handle: number;

    /**
     * The number of milliseconds that define an interval.
     * 
     * @readonly
     */
    protected readonly interval: number|(() => number) = 1000;

    /**
     * The timestamp of the last loop.
     */
    protected lastLooped: number;

    /**
     * The date the timer starts.
     */
    protected startDate: Date;

    /**
     * The requestAnimationFrame handle number.
     */
    protected running: boolean = false;

    /**
     * Create a new `Timer` instance.
     *
     * @param interval - The number of milliseconds between intervals.
     */
    constructor(interval: number|(() => number) = 1000) {
        this.interval = interval;
    }

    /**
     * The `elapsed` attribute.
     */
    get elapsed(): number {
        if(!this.startDate) {
            return 0;
        }

        return Math.max(0, Date.now() - this.startDate.getTime());
    }

    /**
     * The `elapsedSinceLastLoop` attribute.
     */
    get elapsedSinceLastLoop(): number {
        if(!this.lastLoop) {
            return this.lastLoop;
        }

        return Date.now() - this.lastLoop;
    }

    /**
     * Determines if the Timer is currently running.
     */
    get isRunning(): boolean {
        return this.running === true;
    }

    /**
     * Determines if the Timer is currently stopped.
     */
    get isStopped(): boolean {
        return this.running === false;
    }

    /**
     * Get the last timestamp the timer looped.
     */
    get lastLoop(): number {
        return this.lastLooped || 0;
    }

    /**
     * Get the date object when the timer started.
     */
    get started(): Date|undefined {
        return this.startDate;
    }

    /**
     * Resets the timer. If a callback is provided, re-start the clock.
     */
    reset(fn?: (timer: Timer) => void): Timer {
        this.stop(() => {
            this.count = 0;

            if(fn) {
                this.start(() => call(fn));
            }
        });

        return this;
    }

    /**
     * Starts the timer.
     */
    start(fn: (timer: Timer) => void): Timer {
        this.startDate = new Date;
        this.running = true;

        const loop = () => {
            const interval: number = typeof this.interval === 'function'
                ? this.interval()
                : this.interval;

            if(Date.now() - this.lastLoop >= interval) {
                call(fn, interval);
                
                this.lastLooped = Date.now();
                this.count++;
            }

            this.handle = window.requestAnimationFrame(loop);

            return this;
        };

        return loop();
    }

    /**
     * Stops the timer.
     */
    stop(fn?: Function): Timer {
        if(this.isRunning) {
            setTimeout(() => {
                window.cancelAnimationFrame(this.handle);

                this.running = false;

                call(fn);
            });
        }

        return this;
    }

    /**
     * Create a new Timer instance.
     */
    static make(interval: number|Timer) {
        return interval instanceof Timer ? interval : new Timer(interval);
    }
}
