import concatMap from "./concatMap";

/**
 * Flatten an array.
 *
 * @public
 * @param value - The array to flatten.
 * @returns The flattened array.
 */
export default function flatten(value: any): any[] {
    return concatMap(value => value)(value)
}