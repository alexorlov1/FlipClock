class Alphanumeric implements Face {
    /**
     * The flip direction. If auto, the direction is automatically determined
     * based on the current value and target value.
     *
     * @public
     */
    readonly direction: 'auto' | 'forwards' | 'backwards';
    /**
     * Override how digits are sequenced.
     *
     * @public
     */
    readonly sequencer: UseSequencer;
    /**
     * The number of characters to skip during the incrementing/decrementing.
     *
     * @public
     */
    readonly skipChars?: number;
    /**
     * The face's current value.
     *
     * @public
     */
    value: FaceValue<string | DigitizedValues>;
    /**
     * The face's target value.
     *
     * @public
     */
    targetValue: FaceValue<string | DigitizedValues>;
    /**
     * Instantiate the clock face.
     *
     * @public
     */
    constructor(props: AlphanumericProps);
    /**
     * The sequencer method to call.
     *
     * @public
     */
    get backwards(): boolean;
    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     *
     * @public
     */
    interval(instance: FlipClock<Alphanumeric>): void;
    /**
     * Update the direction before the interval starts.
     *
     * @internal
     */
    afterCreate(instance: FlipClock<Alphanumeric>): void;
}