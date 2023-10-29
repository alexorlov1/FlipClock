import { DigitizedValues, UseDigitizer, useDigitizer } from "./helpers/digitizer";
import { Ref, ref } from "./helpers/ref";
import { watchEffect } from "./helpers/signal";

/**
 * The `FaceValue` face options.
 * 
 * @public
 */
export type FaceValueProps = {
    digitizer?: UseDigitizer,
    minimumDigits?: number
}

/**
 * The FaceValue class digitizes the raw value and so it can be used by the
 * clock face.
 * 
 * @public
 */
export class FaceValue<T> {

    /**
     * The carry length is carry over when the instance it copied. The minimum
     * number of digits could be 5. But say the string had 7 digits, the minimum
     * required would still be maintained, but the carry can take priority to
     * ensure no face value ever shrinks in the total number of digits.
     * 
     * @public
     */
    protected $carryLength: number

    /**
     * Parameters that are passed to the digiter.
     * 
     * @public
     */
    public readonly digitizer: UseDigitizer

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
    constructor(value: T, props?: FaceValueProps) {
        this.digitizer = props?.digitizer || useDigitizer();
        
        this.$value = ref(value);
        this.$carryLength = this.digits.length;

        watchEffect(() => {
            this.$carryLength = this.digits.length;
        });
    }

    /**
     * The carry length.
     * 
     * @public
     */
    get carryLength() {
        return this.$carryLength;
    }

    /**
     * The digitized value.
     * 
     * @public
     */
    get digits() {
        return this.digitizer.digitize(this.value);
    }

    /**
     * Set the value from a digitized value.
     * 
     * @public
     */
    set digits(value: DigitizedValues) {
        this.value = this.digitizer.undigitize(value) as T;
    }

    /**
     * Get the minimum length.
     * 
     * @public
     */
    get minimumLength() {
        return Math.max(
            this.carryLength || 0,
            this.digits?.flat().length || 0
        )
    }

    /**
     * Get the length of the flattened digitized array.
     * 
     * @public
     */
    get length() {
        // @ts-ignore
        return this.digits.flat(Infinity).length;
    }

    /**
     * Get the value.
     * 
     * @public
     */
    get value() {
        return this.$value.value
    }

    /**
     * Set the value.
     * 
     * @public
     */
    set value(value) {
        this.$value.value = value;
    }

    /**
     * Compare the face value with the given subject.
     * 
     * @public
     */
    compare(subject?: FaceValue<any>) {
        return JSON.stringify(this.value) === JSON.stringify(subject?.value);
    }

    /**
     * Create a new instance with the given value.
     * 
     * @public
     */
    copy(value?: T, props: FaceValueProps = {}): FaceValue<T> {
        return new FaceValue(value === undefined ? this.value : value, Object.assign({
            digitizer: this.digitizer
        }, props));
    }
}

/**
 * Instantiate a new `FaceValue` instance.
 * 
 * @public
 */
export function faceValue<T>(value: T): FaceValue<T>
export function faceValue<T>(value: T, props: FaceValueProps): FaceValue<T>
export function faceValue<T>(value: T, props?: FaceValueProps): FaceValue<T> {
    return new FaceValue(value, props);
}