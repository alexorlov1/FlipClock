import { DigitizedValues, UseDigitizer, useDigitizer } from './helpers/digitizer';
import { Ref, ref } from './helpers/ref';
import { count } from './helpers/structure';

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
    public readonly digitizer: UseDigitizer;

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
    constructor(value: T, props?: FaceValueProps) {
        this.digitizer = props?.digitizer || useDigitizer();
        this.$value = ref(value);
        this.$digits = ref(this.digitizer.digitize(value));
    }
    /**
     * The digitized value.
     * 
     * @public
     */
    public get digits() {
        return this.$digits.value;
    }

    /**
     * Set the digits from a `DigitizedValue`. It's possible the digits differ
     * than the value, if a sequencer or something else is iterating on the
     * digits.
     * 
     * @public
     */
    public set digits(value: DigitizedValues) {
        this.$digits.value = value;
    }

    /**
     * Get the length of the flattened digitized array.
     * 
     * @public
     */
    public get length() {
        return count(this.$digits.value);
    }

    /**
     * Get the value.
     * 
     * @public
     */
    public get value() {
        return this.$value.value;
    }

    /**
     * Set the value.
     * 
     * @public
     */
    public set value(value) {
        this.$value.value = value;
        this.$digits.value = this.digitizer.digitize(value);
    }

    /**
     * Compare the face value with the given subject.
     * 
     * @public
     */
    public compare(subject?: FaceValue<any>) {
        return JSON.stringify(this.value) === JSON.stringify(subject?.value);
    }

    /**
     * Create a new instance with the given value.
     * 
     * @public
     */
    public copy(value?: T, props: FaceValueProps = {}): FaceValue<T> {
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