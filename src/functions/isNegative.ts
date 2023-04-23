import isNegativeZero from "./isNegativeZero";

/**
 * Determines if a value is a negative.
 *
 * @public
 * @param value - The number to check.
 * @returns `true` if the value is a negative.
 */
export default function isNegative(value: number): boolean {
    return isNegativeZero(value) || value < 0;
}