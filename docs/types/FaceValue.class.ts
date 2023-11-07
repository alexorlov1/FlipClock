class FaceValue<T> {
    /**
     * Parameters that are passed to the digiter.
     *
     * @public
     */
    readonly digitizer: UseDigitizer;
    /**
     * The value ref.
     *
     * @protected
     */
    protected $value: Ref<T>;
    /**
     * The digits ref.
     *
     * @protected
     */
    protected $digits: Ref<DigitizedValues>;
    /**
     * Instantiate the face value.
     *
     * @public
     */
    constructor(value: T, props?: FaceValueProps);
    /**
     * The digitized value.
     *
     * @public
     */
    get digits(): DigitizedValues;
    /**
     * Set the digits from a `DigitizedValue`. It's possible the digits differ
     * than the value, if a sequencer or something else is iterating on the
     * digits.
     *
     * @public
     */
    set digits(value: DigitizedValues);
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