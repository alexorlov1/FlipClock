/**
 * Pad a given value with the given number of characters and return it as a
 * string.
 * 
 * @public
 */
export default function pad(val?: string|number, length: number = 2, char: string = '0'): string {
    val = String(val === undefined ? 0 : val);

    while (val.length < length) {
        val = char + val;
    }

    return val;
};