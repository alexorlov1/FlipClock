import { DigitizedValues, DigitizerContext, useDigitizer } from "./helpers/digitizer";

export type RawFaceValue = undefined | string | number | RawFaceValue[];

export type FaceValueProps = Pick<FaceValue, 'carryLength' | 'digitizer'>

/**
 * The FaceValue class digitizes the raw value and so it can be used by the
 * clock face.
 * 
 * @public
 */
export class FaceValue {

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
    public readonly digits?: DigitizedValues

    /**
     * Parameters that are passed to the digiter.
     */
    public readonly digitizer?: DigitizerContext

    /**
     * The raw value that was given.
     */
    public readonly value: RawFaceValue

    /**
     * Instantiate the face value.
     */
    constructor(value: RawFaceValue, props: FaceValueProps = {}) {
        if(this.carryLength) {
            this.carryLength = props.carryLength;
        }

        this.digitizer = props.digitizer || useDigitizer({
            minimumDigits: props.carryLength,
        });

        const { digitize, undigitize } = this.digitizer;

        this.value = Array.isArray(value) ? undigitize(value) : value;

        this.digits = digitize(this.value, {
            minimumDigits: this.minimumLength
        });
    }

    get minimumLength() {
        return Math.max(
            this.carryLength || 0,
            this.digits?.flat().length || 0,
            this.digitizer.minimumDigits || 0
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
    copy(value?: RawFaceValue, props: FaceValueProps = {}): FaceValue {
        return new FaceValue(value === undefined ? this.value : value, Object.assign({
            carryLength: this.minimumLength,
            digitizer: this.digitizer
        }, props));
    }
}