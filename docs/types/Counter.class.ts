class Counter implements Face {
    /**
     * Should the face count down instead of up.
     *
     * @public
     */
    countdown: boolean;
    /**
     * The number to increment/decrement in the interval.
     *
     * @public
     */
    step: number;
    /**
     * The target value determines when the counter should stop.
     *
     * @public
     */
    targetValue?: FaceValue<number>;
    /**
     * The current face value.
     *
     * @public
     */
    value: FaceValue<number>;
    /**
     * Instantiate the clock face.
     *
     * @public
     */
    constructor(props: CounterProps);
    /**
     * Substract the face value by the given value.
     *
     * @public
     */
    decrement(value?: number): void;
    /**
     * Add to the face value by the given value.
     *
     * @public
     */
    increment(value?: number): void;
    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     *
     * @public
     */
    interval(instance: FlipClock<Counter>): void;
}