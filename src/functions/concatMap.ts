/**
 * Returns a function that maps the values before concatenating them.
 *
 * @public
 * @param fn - The map callback function.
 * @returns A function that executes the map and concatenation.
 */
export default function concatMap(fn: Function): Function {
    return x => {
        return x.map(fn).reduce((x, y) => x.concat(y), []);
    };
}