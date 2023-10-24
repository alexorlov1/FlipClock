import { DigitizedValues, DigitizerContext, useDigitizer } from "./helpers/digitizer";
import { Ref, ref } from "./helpers/ref";
import { watchEffect } from "./helpers/signal";

export type FaceValueProps = {
    digitizer?: DigitizerContext
}

/**
 * The FaceValue class digitizes the raw value and so it can be used by the
 * clock face.
 */
export class FaceValue<T> {

    /**
     * The carry length is carry over when the instance it copied. The minimum
     * number of digits could be 5. But say the string had 7 digits, the minimum
     * required would still be maintained, but the carry can take priority to
     * ensure no face value ever shrinks in the total number of digits.
     */
    protected $carryLength: number

    /**
     * Parameters that are passed to the digiter.
     */
    public readonly digitizer: DigitizerContext

    /**
     * The reactive value
     */
    protected $value: Ref<T>;

    /**
     * Instantiate the face value.
     */
    constructor(value: T, props?: FaceValueProps) {
        this.digitizer = props?.digitizer || useDigitizer();
        
        this.$value = ref(value);
        this.$carryLength = this.digits.length;

        watchEffect(() => {
            this.$carryLength = this.digits.length;
        });
    }

    get carryLength() {
        return this.$carryLength;
    }

    get digits() {
        return this.digitizer.digitize(this.value);
    }

    set digits(value: DigitizedValues) {
        this.value = this.digitizer.undigitize(value);
    }

    get minimumLength() {
        return Math.max(
            this.carryLength || 0,
            this.digits?.flat().length || 0,
            this.digitizer.minimumDigits || 0
        )
    }

    get length() {
        // @ts-ignore
        // @todo Improve this type. "digits" is not Infinite.
        return this.digits.flat(Infinity).length;
    }

    get value() {
        return this.$value.value
    }

    set value(value) {
        this.$value.value = value;
    }

    /**
     * Compare the face value with the given subject.
     */
    compare(subject: FaceValue<any>) {
        return JSON.stringify(this.value) === JSON.stringify(subject.value);
    }

    /**
     * Create a new instance with the given value.
     */
    copy(value?: T, props: FaceValueProps = {}): FaceValue<T> {
        return new FaceValue(value === undefined ? this.value : value, Object.assign({
            digitizer: this.digitizer
        }, props));
    }
}

/**
 * Helper function to create a new FaceValue instance.
 */
export function faceValue<T>(value: T): FaceValue<T>
export function faceValue<T>(value: T, props?: FaceValueProps): FaceValue<T> {
    return new FaceValue(value, props);
}