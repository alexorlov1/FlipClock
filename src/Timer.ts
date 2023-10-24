import call from "./helpers/functions";

/**
 * The Timer class uses a requestAnimationFrame loop to build a timer that can
 * start and stop.
 */
export default class Timer {

    /**
     * The count increments with each interval.
     */
    protected $count: number = 0;

    /**
     * The requestAnimationFrame handle number.
     */
    protected $handle?: number;

    /**
     * The number of milliseconds that define an interval.
     * 
     * @readonly
     */
    public readonly interval: number;

    /**
     * The timestamp of the last loop.
     */
    protected $lastLoop?: number;

    /**
     * The date the timer starts.
     */
    protected $startDate?: Date;

    /**
     * Create a new `Timer` instance.
     */
    constructor(interval: number = 1000) {
        this.interval = interval;
    }

    /**
     * Get the number of times the timer has ticked.
     */
    get count(): number {
        return this.$count;
    }

    /**
     * The `elapsed` attribute.
     */
    get elapsed(): number {
        if(!this.$startDate) {
            return 0;
        }

        return Math.max(0, Date.now() - this.$startDate.getTime());
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
        return this.$handle !== undefined;
    }

    /**
     * Determines if the Timer is currently stopped.
     */
    get isStopped(): boolean {
        return this.$handle === undefined;
    }

    /**
     * Get the last timestamp the timer looped.
     */
    get lastLoop(): number {
        return this.$lastLoop || 0;
    }

    /**
     * Get the date object when the timer started.
     */
    get started(): Date|undefined {
        return this.$startDate;
    }

    /**
     * Resets the timer. If a callback is provided, re-start the clock.
     */
    reset(fn?: (timer: Timer) => void): Timer {
        this.stop(() => {
            this.$count = 0;
            this.$lastLoop = 0
            this.start(fn);
        });

        return this;
    }

    /**
     * Starts the timer.
     */
    start(fn?: (timer: Timer) => void): Timer {
        this.$startDate = new Date;

        const loop = () => {
            if (Date.now() - this.lastLoop >= this.interval) {
                call(fn, this.interval);
                
                this.$lastLoop = Date.now();
                this.$count++;
            }

            this.$handle = window.requestAnimationFrame(loop);

            return this;
        };

        return loop();
    }

    /**
     * Stops the timer.
     */
    stop(fn?: Function): Timer {
        if(this.isRunning && this.$handle) {
            window.cancelAnimationFrame(this.$handle);

            this.$handle = undefined;

            call(fn);
        }

        return this;
    }
}
