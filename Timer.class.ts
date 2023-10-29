class Timer {
    /**
     * The count increments with each interval.
     */
    protected $count: number;
    /**
     * The requestAnimationFrame handle number.
     */
    protected $handle?: number;
    /**
     * The number of milliseconds that define an interval.
     *
     * @readonly
     */
    readonly interval: number;
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
    constructor(interval?: number);
    /**
     * Get the number of times the timer has ticked.
     */
    get count(): number;
    /**
     * The `elapsed` attribute.
     */
    get elapsed(): number;
    /**
     * The `elapsedSinceLastLoop` attribute.
     */
    get elapsedSinceLastLoop(): number;
    /**
     * Determines if the Timer is currently running.
     */
    get isRunning(): boolean;
    /**
     * Determines if the Timer is currently stopped.
     */
    get isStopped(): boolean;
    /**
     * Get the last timestamp the timer looped.
     */
    get lastLoop(): number;
    /**
     * Get the date object when the timer started.
     */
    get started(): Date | undefined;
    /**
     * Resets the timer. If a callback is provided, re-start the clock.
     */
    reset(fn?: (timer: Timer) => void): Timer;
    /**
     * Starts the timer.
     */
    start(fn?: (timer: Timer) => void): Timer;
    /**
     * Stops the timer.
     */
    stop(fn?: (timer: Timer) => void): Timer;
}