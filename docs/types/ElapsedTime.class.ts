class ElapsedTime implements Face {
    /**
     * The date used to calculate the current.
     *
     * @protected
     */
    protected current: Ref<Date>;
    /**
     * The ending date used to calculate the elsapsed time.
     *
     * @public
     */
    end: Ref<Date>;
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
    formatter: UseDurationFormats;
    /**
     * The starting date used to calculate the elsapsed time.
     *
     * @public
     */
    start: Ref<Date>;
    /**
     * The current face value.
     *
     * @public
     */
    value: FaceValue<string>;
    /**
     * Instantiate a Clock face with a given value and attributes.
     *
     * @public
     */
    constructor(props: ElapsedTimeProps);
    /**
     * The face's current value.
     *
     * @public
     */
    faceValue(): FaceValue<string>;
    /**
     * Format the value with the new elapsed time.
     *
     * @public
     */
    interval(instance: FlipClock<ElapsedTime>): void;
}