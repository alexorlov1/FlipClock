/**
 * Determines if a value is a negative zero.
 *
 * @public
 * @param value - The number to check.
 * @returns `true` if the value is a negative zero.
 */
export default function isNegativeZero(value: number) {
    return 1 / Math.round(value) === -Infinity;
}