import { DigitizedValues, UseDigitizer, useDigitizer } from "./helpers/digitizer";
import { Ref, ref } from "./helpers/ref";
import { count } from "./helpers/structure";

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
     * Get the length of the flattened digitized array.
     * 
     * @public
     */
    get length() {
        return count(this.digits);
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