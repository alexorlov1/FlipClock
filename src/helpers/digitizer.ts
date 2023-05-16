import { RawFaceLiterals, RawFaceValue } from "../FaceValue";

export type DigitizerOptions = {
    emptyChar?: string,
    minimumDigits?: number
}

export type CountFunction = (value: DigitizedValues) => number
export type DigitizedValue = string
export type DigitizedValues = (DigitizedValue | DigitizedValues)[]
export type DigitizeFunction = (value: RawFaceValue) => DigitizedValues
export type UndigitizeFunction = (value: DigitizedValues) => RawFaceValue
export type IsDigitizedFunction = (value: RawFaceValue|DigitizedValues) => boolean
export type PadFunction = (value: DigitizedValues, minimumDigits: number) => DigitizedValues;

/**
 * The default empty character for digitization.
 */
export const EMPTY_CHAR = ' ';

export type DigitizerContext = {
    digitize: DigitizeFunction
    undigitize: UndigitizeFunction
    isDigitized: IsDigitizedFunction
    pad: PadFunction
} & DigitizerOptions

/**
 * Create a digiter that can be used to convert a string into arrays of
 * individual characters.
 *
 * @public
 */
export function useDigitizer(options: DigitizerOptions = {}): DigitizerContext {
    /**
     * Pad a value with spaces until it has the minimum number of digits. The
     * digits are applied to the first array with a string value.
     * 
     * @public
     */
    function pad(value: DigitizedValues, minimumDigits: number|undefined = options.minimumDigits): DigitizedValues {
        const digits = [].concat(value).flat(Infinity);

        if (digits.length < minimumDigits) {
            const pad = Array(minimumDigits - digits.length).fill(
                options.emptyChar || EMPTY_CHAR
            );

            function unshift(value: DigitizedValues[], parent?: DigitizedValues): boolean {
                for(let i = 0; i < value.length; i++) {
                    if(value[i] === undefined) {
                        continue;
                    }

                    if(Array.isArray(value[i])) {
                        if(unshift(value[i] as DigitizedValues[], value)) {
                            return true;
                        }

                        continue;
                    }

                    value.unshift(...pad);

                    return true;
                }

                return false;
            }
                
            unshift(value as DigitizedValues[], value);
        } 
        
        return value;
    }

    /**
     * Recursively digitize a value into an array of individual characters.
     * 
     * @public
     */
    function digitize(value: RawFaceValue): DigitizedValues {
        function stringify(value: RawFaceLiterals): DigitizedValue | DigitizedValues {
            if (!(typeof value === 'string')) {
                return stringify(value.toString());
            }

            return value.length === 1 ? value : Array.from(value);
        }
        
        function recurse<T>(value: RawFaceValue): T {
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    value[i] = recurse<DigitizedValues | DigitizedValue>(value[i]);
                }

                return value as T;
            }

            return stringify(value) as T;
        }

        return Array.from(recurse<DigitizedValues>(value));
    }

    /**
     * Recursively undigitize a value into a string or array of strings.
     * 
     * @public
     */
    function undigitize(value: DigitizedValues): RawFaceValue {
        function recurse(value: DigitizedValues): DigitizedValues {
            const digits = [];
            
            let containsArray = false, newString = true;

            for(let i = 0; i < value.length; i++) {
                if(Array.isArray(value[i])) {
                    digits.push(recurse(value[i] as DigitizedValues));

                    containsArray = newString = true;

                    continue;
                }
                
                if (newString) {
                    digits.push('');

                    newString = false;
                }

                digits[digits.length - 1] += value[i];
            }
            
            return (containsArray ? digits : digits[0]);
        }

        return recurse(value) || '';
    }
    
    function isDigitized(value: RawFaceValue|DigitizedValues): boolean {
        function recurse(value: RawFaceValue): boolean {
            if (!Array.isArray(value)) {
                return false;
            }

            for (const i in value) {
                if (typeof value[i]  === 'string' && (value[i] as string).length === 1) {
                    continue
                }

                if (!Array.isArray(value[i])) {
                    return false;
                }
                else if(!(value[i] as DigitizedValues).length) {
                    continue;
                }

                if (!recurse(value[i])) {
                    return false;
                }
            }

            return true;
        }

        return recurse(value);
    }   

    return Object.assign({
        digitize,
        isDigitized,
        pad,
        undigitize
    }, options)
}
