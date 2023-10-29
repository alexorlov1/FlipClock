class FaceValue<T> {
    /**
     * The carry length is carry over when the instance it copied. The minimum
     * number of digits could be 5. But say the string had 7 digits, the minimum
     * required would still be maintained, but the carry can take priority to
     * ensure no face value ever shrinks in the total number of digits.
     *
     * @public
     */
    protected $carryLength: number;
    /**
     * Parameters that are passed to the digiter.
     *
     * @public
     */
    readonly digitizer: UseDigitizer;
    /**
     * The reactive value.
     *
     * @protected
     */
    protected $value: Ref<T>;
    /**
     * Instantiate the face value.
     *
     * @public
     */
    constructor(value: T, props?: FaceValueProps);
    /**
     * The carry length.
     *
     * @public
     */
    get carryLength(): number;
    /**
     * The digitized value.
     *
     * @public
     */
    get digits(): DigitizedValues;
    /**
     * Set the value from a digitized value.
     *
     * @public
     */
    set digits(value: DigitizedValues);
    /**
     * Get the minimum length.
     *
     * @public
     */
    get minimumLength(): number;
    /**
     * Get the length of the flattened digitized array.
     *
     * @public
     */
    get length(): number;
    /**
     * Get the value.
     *
     * @public
     */
    get value(): T;
    /**
     * Set the value.
     *
     * @public
     */
    set value(value: T);
    /**
     * Compare the face value with the given subject.
     *
     * @public
     */
    compare(subject?: FaceValue<any>): boolean;
    /**
     * Create a new instance with the given value.
     *
     * @public
     */
    copy(value?: T, props?: FaceValueProps): FaceValue<T>;
}