import { durationFlagPattern } from "../constants";
import Duration from "../types/Duration";
import Flags from "../types/Flags";
import pad from "./pad";

/**
 * The available formatting flags.
 * 
 * @var {Flags}
 */
 const flags: Flags = {
    Y: (duration: Duration, length: number): string => pad(duration?.years, length),
    M: (duration: Duration, length: number): string => pad(duration?.months, length),
    W: (duration: Duration, length: number): string => pad(duration?.weeks, length),
    D: (duration: Duration, length: number): string => pad(duration.days, length),
    h: (duration: Duration, length: number): string => pad(duration.hours, length),
    m: (duration: Duration, length: number): string => pad(duration.minutes, length),
    s: (duration: Duration, length: number): string => pad(duration.seconds, length),
    v: (duration: Duration, length: number): string => pad(duration.milliseconds, length)
}

/**
 * Format the duration format flags and return an array of flag properties 
 * in the correct order.
 * 
 * @param {string} format 
 * @returns {DurationFlags}
 */
export default function formatDuration(duration: Duration, pattern: string) {
    pattern = pattern.replace(durationFlagPattern, i => {
        const key = i.slice(0, 1);

        if(!flags[key]) {
            throw new Error(`Invalid duration format: ${i}`);
        }

        return flags[key](duration, i.length)
    });

    return pattern;
}