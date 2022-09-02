import Attributes from '../types/Attributes';
import deepFlatten from './deepFlatten';
import flatten from './flatten';

export type DigitizeAttributes = {
    format?: (value: string) => string,
    minimumDigits?: number,
    prependLeadingZero?: boolean,
}

/**
 * Digitize a number, string, or an array into a digitized array. This function
 * use by the `Face`, which convert the digitized array into an array of `List`
 * instances.
 *
 * @function digitize
 * @param  {*} value
 * @param  {DigitizeAttributes} options
 * @memberof functions
 */
export default function digitize(value: any, attributes: DigitizeAttributes = {}): string[] {
    function prepend(digit) {
        const shouldPrependZero = !!attributes?.prependLeadingZero
            && digit.toString().split('').length === 1;

        return (shouldPrependZero ? '0' : '').concat(digit);
    }

    function digits(arr: any[], min: number = 0): string[] {
        const length = deepFlatten(arr).length;

        if(length < min) {
            for(let i = 0; i < min - length; i++) {
                arr[0].unshift('0');
            }
        }

        return flatten(arr);
    }

    if(attributes.format) {
        value = attributes.format(value);
    }

    return digits(flatten([value]).map(digit => {
        return flatten(deepFlatten([digit]).map(digit => {
            return prepend(digit).split('');
        }));
    }), attributes.minimumDigits);
}
