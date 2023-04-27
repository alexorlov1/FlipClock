import { prop } from "./functions";
import { DigitizedValues, DigitizerContext, DigitizerParameters, useDigitizer } from "./functions/digitizer";
import ref from "./functions/ref";

export type RawFaceValue = undefined | string | number | RawFaceValue[];

/**
 * Create a new `FaceValue` instance.
 * 
 * @public
 */
export function createFaceValue(value: RawFaceValue, params: Partial<FaceValue> = {}) {
    return new this(value, params);
}

/**
 * The FaceValue class digitizes the raw value and so it can be used by the
 * clock face.
 * 
 * @public
 */
export default class FaceValue {

    /**
     * The carry length is carry over when the instance it copied. The minimum
     * number of digits could be 5. But say the string had 7 digits, the minimum
     * required would still be maintained, but the carry can take priority to
     * ensure no face value ever shrinks in the total number of digits.
     */
    public readonly carryLength?: number

    /**
     * An array of digits.
     */
    public readonly digits: DigitizedValues

    /**
     * Parameters that are passed to the digiter.
     */
    public readonly digitizer?: DigitizerContext

    /**
     * Parameters that are passed to the digiter.
     */
    public readonly digitizerParameters?: DigitizerParameters

    /**
     * The raw value that was given.
     */
    public readonly value: RawFaceValue

    /**
     * Instantiate the face value.
     */
    constructor(params: Partial<FaceValue> = {}) {
        this.value = params.value;
        
        this.carryLength = prop(params.carryLength, this.carryLength);
        
        this.digitizer = prop(params.digitizer, useDigitizer(
            this.digitizerParameters
        ));
        
        const { digitize, undigitize } = this.digitizer;

        const digits = params.digits || digitize(this.value || [], {
            minimumDigits: this.minimumLength
        });

        this.digits = ref(digits);
    }

    get minimumLength() {
        return Math.max(
            this.carryLength || 0,
            this.digits?.flat().length || 0,
            this.digitizerParameters?.minimumDigits || 0
        )
    }

    /**
     * Compare the face value with the given subject.
     */
    compare(subject: FaceValue) {
        return JSON.stringify(this.digits) === JSON.stringify(subject.digits);
    }

    /**
     * Create a new instance with the given value.
     */
    copy(value?: RawFaceValue): FaceValue {
        // If the value is undefined, then use the current value.
        if(value === undefined) {
            value = this.value;
        }

        return new FaceValue({
            value,
            carryLength: this.minimumLength,
            digitizer: this.digitizer,
            digitizerParameters: this.digitizerParameters,
        });
    }

    /**
     * Instantiate a new FaceValue with the given value. If the give value
     * is already an instance of FaceValue, then return the instance.
     */
    static make(value?: RawFaceValue, params: Partial<FaceValue> = {}): FaceValue {
        if (value instanceof FaceValue) {
            return value;
        }

        return new this(Object.assign({ value }, params));;
    }
}