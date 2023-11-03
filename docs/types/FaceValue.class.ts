class FaceValue<T> {
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