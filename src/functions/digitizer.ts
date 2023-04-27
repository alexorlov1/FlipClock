import { Card } from "flipclock";
import FaceValue, { RawFaceValue } from "../FaceValue";
import Group from "../Group";
import VNode, { DomElement } from "../VNode";
import h from "./h";

export type DigitizerParameters = {
    format?: (value: string) => string
    prepend?: (value: string[]) => string[]
    prependDigit?: string,
    minimumDigits?: number
}

export type CountFunction = (value: DigitizedValues) => number
export type DigitizedValue = string
export type DigitizedValues = DigitizedValue[] | DigitizedValues[]
export type DigitizeFunction = (value: RawFaceValue, override?: DigitizerParameters) => DigitizedValues
export type UndigitizeFunction = (value: DigitizedValues) => string
export type PadFunction = (value: DigitizedValues, minimumDigits: number) => DigitizedValues;
export type RenderFunction = (value: FaceValue, lastValue?: FaceValue) => VNode

export type DigitizerContext = {
    count: CountFunction
    digitize: DigitizeFunction
    undigitize: UndigitizeFunction
    pad: PadFunction
    render: RenderFunction
}

/**
 * Create a digiter that can be used to convert a string into arrays of
 * individual characters.
 *
 * @public
 */
export function useDigitizer(defaults: DigitizerParameters = {}): DigitizerContext {
    
    /**
     * Pad a value with spaces until it has the minimum number of digits.
     * 
     * @public
     */
    function pad(value: DigitizedValues, minimumDigits: number|undefined = defaults.minimumDigits): DigitizedValues {
        const digits = [].concat(value).flat(Infinity);

        if (digits.length < minimumDigits) {
            const pad = Array(minimumDigits - digits.length).fill(String.fromCharCode(0));

            value.unshift(...pad);
        } 
        
        return value;
    }

    /**
    * Recursively count the number of digits in a value.
    * 
    * @public
    */
    function count(values: DigitizedValues) {
        return [].concat(values).flat(Infinity).length;
    }
    
    /**
     * Recursively digitize a value into groups of characters.
     * 
     * @public
     */
    function digitize(value: RawFaceValue | RawFaceValue[], overrideDefaults?: DigitizerParameters): DigitizedValues {
        const { minimumDigits } = Object.assign({}, defaults, overrideDefaults);

        function split(value: RawFaceValue | RawFaceValue[], char: string = ''): RawFaceValue[] {
            return Array.isArray(value)
                ? value
                : value.toString().split(char);
        }

        function recurse(value: RawFaceValue|RawFaceValue[], depth: number = 0) {
            if(Array.isArray(value)) {
                return value.map(recurse, depth + 1);
            }

            console.log(123);

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
    
    /**
     * The recursive render function.
     * 
     * @public
     */
    function render(value: FaceValue, lastValue?: FaceValue): VNode {
        function recurse(digit: DigitizedValues, prevDigits?: DigitizedValue|DigitizedValues, index: number = 0): DomElement {
            if (Array.isArray(digit)) {
                return new Group({
                    items: digit.map((digit, i) => {
                        return recurse(digit, prevDigits?.[i], i)
                    })
                })
            }
    
            const lastDigit = Array.isArray(prevDigits)
                ? prevDigits[index] as string
                : prevDigits;

            if(Array.isArray(prevDigits)) {
                console.log(digit, prevDigits[index])
            }

            return new Card(digit)
        }

        return h('div', {
            class: 'flip-clock',
        }, [
            recurse(value.digits, lastValue?.digits)
        ]);
    }

    return {
        count,
        digitize,
        pad,
        render,
        undigitize
    }
}
