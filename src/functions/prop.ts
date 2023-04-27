/**
 * Treat the value as a prop. If undefined, then used the default value.
 *
 * @public
 * @param value - The property value
 * @param defaultValue - The default value
 * @returns The prop value, or the default value if the prop value is undefined.
 */
export default function prop<T>(value: any, defaultValue?: any): T {
    if(value === undefined) {
        return defaultValue;
    }

    return value;
}