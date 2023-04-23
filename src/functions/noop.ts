/**
 * Returns `true` if `undefined` or `null`.
 *
 * @public
 * @param value - The value to check.
 * @returns `true` if the value is not `undefined` or `null`.
 */
export default function noop(value: any): boolean {
    return value !== undefined && value !== null;
}