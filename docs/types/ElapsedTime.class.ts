class ElapsedTime implements Face {
    /**
     * The ending date used to calculate the elsapsed time.
     *
     * @public
     */
    end?: Date;
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
    start?: Date;
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
     * Get the start and end date.
     *
     * @public
     */
    get span(): {
        start: Date;
        end: Date;
    };
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
    interval(): void;
}