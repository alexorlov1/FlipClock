class Clock implements Face {
    /**
     * The starting date on the clock. If no date is set, the current time
     * will be used.
     *
     * @public
     */
    date?: Date;
    /**
     * The current formatted value.
     *
     * @public
     */
    value: FaceValue<DigitizedValues>;
    /**
     * The format string.
     *
     * @public
     */
    format: string;
    /**
     * The duration formatter.
     *
     * @public
     */
    formatter: UseDateFormats;
    /**
     * Instantiate the clock face.
     *
     * @public
     */
    constructor(props?: ClockProps);
    /**
     * Format the face value to the current date/time.
     *
     * @public
     */
    interval(instance: FlipClock<any>): void;
}