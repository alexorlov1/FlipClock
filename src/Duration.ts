import {
    add,
    compareAsc,
    differenceInDays,
    differenceInHours, 
    differenceInMilliseconds, 
    differenceInMinutes, 
    differenceInMonths,
    differenceInSeconds,
    differenceInWeeks,
    differenceInYears
} from "./functions";

import DurationInterface from './types/Duration';
import DurationFlags from "./types/DurationFlags";
import Flags from './types/Flags';

/**
 * The regex expression that matches the formatting flags.
 *
 * @name token
 * @constant
 * @type {RegExp}
 * @default
 */
const token = /(Y|M|W|D|h|m|s|v)+/g;

/**
 * The available formatting flags.
 * 
 * @var {Flags}
 */
const flags: Flags = {
    Y: (duration: DurationInterface, length: number): string => pad(duration?.years, length),
    M: (duration: DurationInterface, length: number): string => pad(duration?.months, length),
    W: (duration: DurationInterface, length: number): string => pad(duration?.weeks, length),
    D: (duration: DurationInterface, length: number): string => pad(duration.days, length),
    h: (duration: DurationInterface, length: number): string => pad(duration.hours, length),
    m: (duration: DurationInterface, length: number): string => pad(duration.minutes, length),
    s: (duration: DurationInterface, length: number): string => pad(duration.seconds, length),
    v: (duration: DurationInterface, length: number): string => pad(duration.milliseconds, length)
}

function pad(val?: string | number, len = 2): string {
    val = String(val === undefined ? 0 : val);

    while (val.length < len) {
        val = "0" + val;
    }

    return val;
};

export default class Duration implements DurationInterface {
    readonly years: number = 0
    readonly months: number = 0
    readonly weeks: number = 0
    readonly days: number = 0
    readonly hours: number = 0
    readonly minutes: number = 0
    readonly seconds: number = 0
    readonly milliseconds: number = 0

    constructor(dirtyStart: Date, dirtyEnd: Date, flags?: DurationFlags) {
        const [ start, end ]: Date[] = [ dirtyStart, dirtyEnd ].sort(compareAsc);
        
        this.years = differenceInYears(new Date(end), new Date(start));

        const remainingMonths: Date = add(start, { years: this.years });    
        this.months = differenceInMonths(end, remainingMonths);

        const remainingWeeks: Date = add(remainingMonths, { weeks: this.weeks });    
        this.weeks = differenceInWeeks(end, remainingWeeks);

        const remainingDays: Date = add(remainingWeeks, { months: this.months });        
        this.days = differenceInDays(end, remainingDays);

        const remainingHours: Date = add(remainingDays, { days: this.days }); 
        this.hours = differenceInHours(new Date(end), remainingHours);

        const remainingMinutes: Date = add(remainingHours, { hours: this.hours });        
        this.minutes = differenceInMinutes(end, remainingMinutes);

        const remainingSeconds: Date = add(remainingMinutes, { minutes: this.minutes });        
        this.seconds = differenceInSeconds(end, remainingSeconds);

        const remainingMilliseconds: Date = add(remainingSeconds, { seconds: this.seconds });        
        this.milliseconds = differenceInMilliseconds(end, remainingMilliseconds);
    }

    /**
     * Format the duration into a formatted string.
     * 
     * @returns {Date}
     */
    public format(pattern: string): string {
        pattern = pattern.replace(token, i => {
            const key = i.slice(0, 1);

            if(!flags[key]) {
                throw new Error(`Invalid date format: ${i}`);
            }
    
            return flags[key](this, i.length)
        });

        return pattern;
    }
}