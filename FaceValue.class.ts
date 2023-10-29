class FaceValue<T> {
    /**
     * The carry length is carry over when the instance it copied. The minimum
     * number of digits could be 5. But say the string had 7 digits, the minimum
     * required would still be maintained, but the carry can take priority to
     * ensure no face value ever shrinks in the total number of digits.
     */
    protected $carryLength: number;
    /**
     * Parameters that are passed to the digiter.
     */
    readonly digitizer: UseDigitizer;
    /**
     * The reactive value
     */
    protected $value: Ref<T>;
    /**
     * Instantiate the face value.
     */
    constructor(value: T, props?: FaceValueProps);
    get carryLength(): number;
    get digits(): DigitizedValues;
    set digits(value: DigitizedValues);
    get minimumLength(): number;
    get length(): number;
    get value(): T;
    set value(value: T);
    /**
     * Compare the face value with the given subject.
     */
    compare(subject?: FaceValue<any>): boolean;
    /**
     * Create a new instance with the given value.
     */
    copy(value?: T, props?: FaceValueProps): FaceValue<T>;
}