
export type DigitizedValue = string
export type DigitizedValues = (DigitizedValue | DigitizedValues)[]
export type DigitizeFunction = (value: any) => DigitizedValues
export type UndigitizeFunction = (value: DigitizedValues) => string | DigitizedValues
export type IsDigitizedFunction = (value: any) => boolean
export type PadFunction = (value: DigitizedValues, minimumDigits: number) => DigitizedValues;

/**
 * The default empty character for digitization.
 */
export const EMPTY_CHAR = ' ';

export type UseDigitizer = {
    digitize: DigitizeFunction
    undigitize: UndigitizeFunction
    isDigitized: IsDigitizedFunction
}

/**
 * Create a digiter that can be used to convert a string into arrays of
 * individual characters.
 */
export function useDigitizer(): UseDigitizer {
    /**
     * Recursively digitize a value into an array of individual characters.
     */
    function digitize(value: number | string | DigitizedValue | DigitizedValues): DigitizedValues {
        function stringify(value: undefined | number | string | DigitizedValue | DigitizedValues): DigitizedValue | DigitizedValues {
            if(value === undefined) {
                return '';
            }

            if (!(typeof value === 'string')) {
                return stringify(value.toString());
            }

            return value.length === 1 ? value : Array.from(value);
        }
        
        function recurse(value: undefined | number | string | DigitizedValue | DigitizedValues) {
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    value[i] = recurse(value[i]);
                }

                return value;
            }

            return stringify(value);
        }

        return Array.from(recurse(value));
    }

    /**
     * Recursively undigitize a value into a string or array of strings.
     */
    function undigitize(value: DigitizedValues) {
        function recurse(value: DigitizedValues): DigitizedValues | DigitizedValue {
            const digits: DigitizedValues = [];
            
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

                (digits as string[])[digits.length - 1] += value[i];
            }
            
            return (containsArray ? digits : digits[0]);
        }

        return recurse(value);
    }
    
    function isDigitized(value: any): boolean {
        function recurse(value: any): boolean {
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

    return {
        digitize,
        isDigitized,
        undigitize
    }
}
