import { DigitizedValues, DigitizerContext, useDigitizer } from "./helpers/digitizer";

export type RawFaceLiterals =  undefined | string | number | DigitizedValues;
export type RawFaceValue<T extends RawFaceLiterals = RawFaceLiterals> = T | (RawFaceValue<T>)[];

export type FaceValueProps = Pick<FaceValue, 'carryLength' | 'digitizer'>

/**
 * The FaceValue class digitizes the raw value and so it can be used by the
 * clock face.
 * 
 * @public
 */
export class FaceValue<T extends RawFaceLiterals = RawFaceLiterals> {

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
    public readonly value: T

    /**
     * Instantiate the face value.
     */
    constructor(value: RawFaceValue<T> | DigitizedValues, props: FaceValueProps = {}) {
        this.carryLength = props.carryLength;

        this.digitizer = props.digitizer || useDigitizer({
            minimumDigits: props.carryLength,
        });

        const { digitize, undigitize, isDigitized } = this.digitizer;

        if(isDigitized(value)) {
            this.value = undigitize(value as DigitizedValues);
            this.digits = value as DigitizedValues;
        }
        else {
            this.value = value as T;
            this.digits = digitize(this.value);
        }
    }

    get minimumLength() {
        return Math.max(
            this.carryLength || 0,
            this.digits?.flat().length || 0,
            this.digitizer.minimumDigits || 0
        )
    }

    length() {
        // @ts-ignore @todo Improve this type. "digits" is not Infinite.
        return this.digits.flat(Infinity).length;
    }

    /**
     * Compare the face value with the given subject.
     */
    compare(subject: FaceValue) {
        return JSON.stringify(this.value) === JSON.stringify(subject.value);
    }

    /**
     * Create a new instance with the given value.
     */
    copy(value?: T, props: FaceValueProps = {}): FaceValue<T> {
        return new FaceValue(value === undefined ? this.value : value, Object.assign({
            carryLength: this.minimumLength,
            digitizer: this.digitizer
        }, props));
    }
}