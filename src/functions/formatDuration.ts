import { durationFlagPattern, durationFlagFormats } from "../constants";
import Dictionary from "../Dictionary";
import Duration from "../types/Duration";

/**
 * Format the duration format flags and return an array of flag properties 
 * in the correct order.
 * 
 * @public
 * @param duration - The duration to format.
 * @param format - The format string.
 * @param dictionary - The language dictionary for translations.
 * @returns The formatted duration.
 */
export default function formatDuration(duration: Duration, format: string, dictionary: Dictionary): string {
    format = format.replace(durationFlagPattern, i => {
        const key = i.slice(0, 1);

        if(!durationFlagFormats[key]) {
            throw new Error(`Invalid duration format: ${i}`);
        }

        return durationFlagFormats[key](duration, i.length)
    });

    return format;
}