import { RawFaceValue } from "../FaceValue";

export type DigitizerOptions = {
    emptyChar?: string,
    minimumDigits?: number
}

export type CountFunction = (value: DigitizedValues) => number
export type DigitizedValue = string
export type DigitizedValues = (DigitizedValue | DigitizedValues)[]
export type DigitizeFunction = (value: RawFaceValue, override?: DigitizerOptions) => DigitizedValues
export type UndigitizeFunction = (value: DigitizedValues) => string
export type IsDigitizedFunction = (value: RawFaceValue|DigitizedValues) => boolean
export type PadFunction = (value: DigitizedValues, minimumDigits: number) => DigitizedValues;

/**
 * The default empty character for digitization.
 */
export const EMPTY_CHAR = ' ';

/**
* Recursively count the number of digits in a value.
* 
* @public
*/
export function count(values: DigitizedValues) {
    return [].concat(values).flat(Infinity).length;
}

export type DigitizerContext = {
    count: CountFunction
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
     * Recursively digitize a value into groups of characters.
     * 
     * @public
     */
    function digitize(value: RawFaceValue | RawFaceValue[], overrideoptions?: DigitizerOptions): DigitizedValues {
        const { minimumDigits } = Object.assign({}, options, overrideoptions);

        function split(value: RawFaceValue, char: string = ''): RawFaceValue[] {
            return value.toString().split(char);
        }

        function recurse(value: RawFaceValue|RawFaceValue[], depth: number = 0) {
            if(Array.isArray(value)) {
                return value.map(recurse, depth + 1);
            }

            return split(value, ' ').map(group => {
                return split(group);
            });
        }

        // If the value is already digitized, pad if necessary and return.
        if(isDigitized(value)) {
            return pad(value as DigitizedValues, minimumDigits);
        }

        let response = recurse(value);

        if(Array.isArray(value)) {
            response = response.flat(1);
        }

        return pad(response, minimumDigits);
    }

    /**
     * The recursive undigitize function.
     * 
     * @public
     */
    function undigitize(value: DigitizedValues): string {
        function recurse(value: DigitizedValues): string {
            return (value as DigitizedValues[]).reduce((carry, value) => {
                if(typeof value === 'string') {
                    return carry + value;
                }

                return carry + ' ' + recurse(value);
            }, String());
        }

        return recurse(value).trim();
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
        count,
        digitize,
        isDigitized,
        pad,
        undigitize
    }, options)
}
