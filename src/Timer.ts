/**
 * The Timer class uses a requestAnimationFrame loop to build a timer that can
 * start and stop.
 * 
 * @public
 */
export class Timer {

    /**
     * The count increments with each interval.
     * 
     * @protected
     */
    protected $count: number = 0;

    /**
     * The requestAnimationFrame handle number.
     * 
     * @protected
     */
    protected $handle?: number;

    /**
     * The number of milliseconds that define an interval.
     * 
     * @public
     */
    public readonly interval: number;

    /**
     * The timestamp of the last loop.
     * 
     * @protected
     */
    protected $lastLoop?: number;

    /**
     * The date the timer starts.
     * 
     * @protected
     */
    protected $startDate?: Date;

    /**
     * Create a new `Timer` instance.
     * 
     * @public
     */
    constructor(interval: number = 1000) {
        this.interval = interval;
    }

    /**
     * Get the number of times the timer has ticked.
     * 
     * @public
     */
    get count(): number {
        return this.$count;
    }

    /**
     * The `elapsed` attribute.
     * 
     * @public
     */
    get elapsed(): number {
        if(!this.$startDate) {
            return 0;
        }

        return Math.max(0, Date.now() - this.$startDate.getTime());
    }

    /**
     * The `elapsedSinceLastLoop` attribute.
     * 
     * @public
     */
    get elapsedSinceLastLoop(): number {
        if(!this.lastLoop) {
            return this.lastLoop;
        }

        return Date.now() - this.lastLoop;
    }

    /**
     * Determines if the Timer is currently running.
     * 
     * @public
     */
    get isRunning(): boolean {
        return this.$handle !== undefined;
    }

    /**
     * Determines if the Timer is currently stopped.
     * 
     * @public
     */
    get isStopped(): boolean {
        return this.$handle === undefined;
    }

    /**
     * Get the last timestamp the timer looped.
     * 
     * @public
     */
    get lastLoop(): number {
        return this.$lastLoop || 0;
    }

    /**
     * Get the date object when the timer started.
     * 
     * @public
     */
    get started(): Date|undefined {
        return this.$startDate;
    }

    /**
     * Resets the timer. If a callback is provided, re-start the clock.
     * 
     * @public
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
     * 
     * @public
     */
    start(fn?: (timer: Timer) => void): Timer {
        this.$startDate = new Date;

        const loop = () => {
            if (Date.now() - this.lastLoop >= this.interval) {
                if(typeof fn === 'function') {
                    fn(this);
                }
                
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
     * 
     * @public
     */
    stop(fn?: (timer: Timer) => void): Timer {
        if(this.isRunning && this.$handle) {
            window.cancelAnimationFrame(this.$handle);

            this.$handle = undefined;

            if(typeof fn === 'function') {
                fn(this);
            }
        }

        return this;
    }
}

/**
 * Instantiate a new `Timer` instance.
 */
export function timer(interval: number = 1000) {
    return new Timer(interval);
}
