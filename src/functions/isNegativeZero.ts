/**
 * Determines if a value is a negative zero.
 *
 * @public
 */
export default function isNegativeZero(value: number) {
    return 1 / Math.round(value) === -Infinity;
}