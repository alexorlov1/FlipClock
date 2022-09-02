/**
 * Pad a given value with the given number of zeros and return it as a string.
 * 
 * @param {string|number} val 
 * @param {number} length 
 * @returns {string}
 */
export default function pad(val?: string | number, length: number = 2): string {
    val = String(val === undefined ? 0 : val);

    while (val.length < length) {
        val = "0" + val;
    }

    return val;
};