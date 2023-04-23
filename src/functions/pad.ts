/**
 * Pad a given value with the given number of characters and return it as a
 * string.
 * 
 * @public
 * @param val - The value to pad.
 * @param length - The number of digits to pad. 
 * @param char - The char used to pad the value. 
 * @returns The padded value.
 */
export default function pad(val?: string|number, length: number = 2, char: string = '0'): string {
    val = String(val === undefined ? 0 : val);

    while (val.length < length) {
        val = char + val;
    }

    return val;
};