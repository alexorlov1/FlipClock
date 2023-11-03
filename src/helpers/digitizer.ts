import { parse } from "./parser";

/**
 * A single digitized value
 * 
 * @public
 */
export type DigitizedValue = string;

/**
 * An array of digitized values.
 * 
 * @public
 */
export type DigitizedValues = (DigitizedValue | DigitizedValues)[];

/**
 * The default empty character for digitization.
 * 
 * @public
 */
export const EMPTY_CHAR = ' ' as const;

/**
 * The return type for `useDigitizer()`.
 * 
 * @public
 */
export type UseDigitizer = {
    digitize: (value: any) => DigitizedValues;
    undigitize: (value: DigitizedValues) => DigitizedValue;
    isDigitized: (value: any) => boolean;
}

/**
 * Create a digiter that can be used to convert a string into arrays of
 * individual characters.
 * 
 * @public
 */
export function useDigitizer(): UseDigitizer {
    /**
     * Parse a string, number or an array into `DigitizedValues`.
     * 
     * @public
     */
    function digitize(value?: number | string | DigitizedValue | DigitizedValues): DigitizedValues {
        if(value === undefined) {
            return [];
        }

        if(typeof value === 'string') {
            return value.match(/\[|\]/) ? parse(value) : Array.from(value);
        }

        if(typeof value === 'number') {
            return Array.from(value.toString());
        }

        for(const item of value) {
            const index = value.indexOf(item);
            const response = digitize(item);

            if(response === undefined) {
                continue;
            }

            if(typeof item == 'string') {
                value.splice(index, 1, ...response);
            }
            else {
                value.splice(index, 1, response);
            }
        }

        return value.filter(Boolean) ?? [];
    }

    /**
     * Recursively undigitize a value into a string or array of strings.
     * 
     * @public
     */
    function undigitize(value: DigitizedValues): DigitizedValue {
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

        return recurse(value) as DigitizedValue;
    }
    
    /**
     * Check if the value is the type `DigitizedValues`.
     * 
     * @public
     */
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
