import { digitize, prop, ref } from "./functions";

export default class FaceValue {

    /**
     * An array of digits.
     * 
     * @var {ProxyConstructor}
     */
    public readonly digits: ProxyConstructor

    /**
     * The callback function used to format the value.
     * 
     * @var {Function}
     */
    public readonly format: (value: any) => any

    /**
     * The minimum number of digits.
     * 
     * @var {number|false}
     */
    public readonly minimumDigits: number|false = 0

    /**
     * Instnatiate the face value.
     * 
     * @param {any} value 
     * @param {Attributes} attributes 
     */
    constructor(readonly value: any, attributes: Partial<FaceValue> = {}) {
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

    /**
     * Create a new instance with the given value.
     * 
     * @param {any} value
     * @return {FaceValue}
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
     * @param {any} value 
     * @param {Partial<FaceValue>} attributes 
     * @returns {FaceValue}
     */
    static make(value: any, attributes: Partial<FaceValue> = {}): FaceValue {
        if(value instanceof FaceValue) {
            return value;
        }
        
        return new this(value, attributes);
    }
}