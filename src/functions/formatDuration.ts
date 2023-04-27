import { durationFlagFormats, durationFlagPattern } from "../constants";
import Duration from "../types/Duration";

/**
 * Format the duration format flags and return an array of flag properties 
 * in the correct order.
 * 
 * @public
 */
export default function formatDuration(duration: Duration, format: string): string {
    format = format.replace(durationFlagPattern, i => {
        const key = i.slice(0, 1);

        if(!durationFlagFormats[key]) {
            throw new Error(`Invalid duration format: ${i}`);
        }

        return durationFlagFormats[key](duration, i.length)
    });

    return format;
}