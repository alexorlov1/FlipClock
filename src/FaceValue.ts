import { digitize, prop, ref } from "./functions";

/**
 * The FaceValue class digitizes the raw value and so it can be used by the
 * clock face.
 * 
 * @public
 */
export default class FaceValue {

    /**
     * An array of digits.
     * 
     * @readonly
     */
    public readonly digits: string[]

    /**
     * The callback function used to format the value.
     * 
     * @readonly
     */
    public readonly format: (value: any) => any

    /**
     * The minimum number of digits.
     * 
     * @readonly
     */
    public readonly minimumDigits: number|false = 0

    /**
     * The raw value passed to the instance.
     * 
     * @readonly
     */
    public readonly value: any

    /**
     * Instantiate the face value.
     * 
     * @param value - The value to digitize.
     * @param attributes - The options passed to the instance.
     */
    constructor(value: any, attributes: Partial<FaceValue> = {}) {
        this.value = value;
        
        const minimumDigits: number = prop(
            attributes.minimumDigits, this.minimumDigits
        );

        this.minimumDigits = prop(attributes.minimumDigits, this.minimumDigits);

        const format = this.format = prop(attributes.format);

        this.digits = ref(digitize(prop(value, ''), {
            minimumDigits,
            format
        }));

        if(this.minimumDigits !== false) {
            this.minimumDigits = Math.max(
                this.digits.length, attributes.minimumDigits || 0
            );
        }  
    }

    compare(subject: any) {
        return this.value === FaceValue.make(subject).value;
    }

    /**
     * Create a new instance with the given value.
     * 
     * @param value - The new value.
     * @returns A new FaceValue instance.
     */
    copy(value: any): FaceValue {
        return new FaceValue(value, {
            format: this.format,
            minimumDigits: this.minimumDigits,
        });
    }

    /**
     * Instantiate a new FaceValue with the given value. If the give value
     * is already an instance of FaceValue, then return the instance.
     * 
     * @param value - The clock's face value.
     * @param attributes - The options passed to the instance.
     * @returns A new FaceValue instance.
     */
    static make(value: any, attributes: Partial<FaceValue> = {}): FaceValue {
        if(value instanceof FaceValue) {
            return value;
        }

        return new this(value, attributes);
    }
}