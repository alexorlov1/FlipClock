import isNegative from "./isNegative";
import isNegativeZero from "./isNegativeZero";

/**
 * Round the value to the correct value. Takes into account negative numbers.
 *
 * @public
 * @param value - The value to round.
 * @returns The rounded value.
 */
export default function round(value: number): any {
    return isNegativeZero(
        value = isNegative(value) ? Math.ceil(value) : Math.floor(value)
    ) ? ('-' + value).toString() : value;
}