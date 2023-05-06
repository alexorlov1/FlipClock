import { RawFaceValue } from "../FaceValue";

export type DigitizerProps = {
    minimumDigits?: number
}

export type CountFunction = (value: DigitizedValues) => number
export type DigitizedValue = string
export type DigitizedValues = (DigitizedValue | DigitizedValues)[]
export type DigitizeFunction = (value: RawFaceValue, override?: DigitizerProps) => DigitizedValues
export type UndigitizeFunction = (value: DigitizedValues) => string
export type IsDigitizedFunction = (value: RawFaceValue|DigitizedValues) => boolean
export type PadFunction = (value: DigitizedValues, minimumDigits: number) => DigitizedValues;

export type DigitizerContext = {
    count: CountFunction
    digitize: DigitizeFunction
    undigitize: UndigitizeFunction
    isDigitized: IsDigitizedFunction
    pad: PadFunction
} & DigitizerProps

/**
* Recursively count the number of digits in a value.
* 
* @public
*/
export function count(values: DigitizedValues) {
    return [].concat(values).flat(Infinity).length;
}

/**
 * Create a digiter that can be used to convert a string into arrays of
 * individual characters.
 *
 * @public
 */
export function useDigitizer(props: DigitizerProps = {}): DigitizerContext {
    
    /**
     * Pad a value with spaces until it has the minimum number of digits.
     * 
     * @public
     */
    function pad(value: DigitizedValues, minimumDigits: number|undefined = props.minimumDigits): DigitizedValues {
        const digits = [].concat(value).flat(Infinity);

        if (digits.length < minimumDigits) {
            const pad = Array(minimumDigits - digits.length).fill(String.fromCharCode(0));

            value.unshift(...pad);
        } 
        
        return value;
    }

    /**
     * Recursively digitize a value into groups of characters.
     * 
     * @public
     */
    function digitize(value: RawFaceValue | RawFaceValue[], overrideprops?: DigitizerProps): DigitizedValues {
        const { minimumDigits } = Object.assign({}, props, overrideprops);

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
        function recurse(current: DigitizedValue|DigitizedValues, parent?: DigitizedValues): string {
            if (Array.isArray(current)) {
                let carry = Array.isArray(parent) ? ' ' : '';

                if (Array.isArray(parent)) {
                    const index = parent.findIndex(child => current === child);
                    const isLastChild = parent.length === index + 1;

                    if (isLastChild) {
                        carry = '';
                    }
                }

                return (current as DigitizedValue[]).reduce((carry: string, child: DigitizedValue) => {
                    return carry + recurse(child, current);
                }, '') as string + carry;
            }

            return current.toString();
        }

        return recurse(value);
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
    }, props)
}
