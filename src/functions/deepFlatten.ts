import concatMap from "./concatMap";

/**
 * Deep flatten an array.
 *
 * @public
 * @param value - The array to flatten.
 * @returns The flattened array.
 */
export default function deepFlatten(x): string[] {
    return concatMap(x => Array.isArray(x) ? deepFlatten(x) : x)(x);
}