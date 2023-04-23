import Dictionary from "./Dictionary";
import { getTwelveHourFormat, pad } from "./functions";
import { Flags } from "./types";
import Duration from "./types/Duration"

/**
 * The regex expression that matches the formatting flags for dates.
 *
 * @public
 */
export const dateFlagPattern: RegExp = /Y{2,4}|M{1,2}|D{1,2}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|v{1,4}|A|a/g

/**
 * The date formatting flags.
 *
 * @public
 */
export const dateFlagFormats: {[key: string]: (date: Date, dictionary: Dictionary) => string} = {
    a: (date: Date, dictionary: Dictionary): string => String(dictionary.get(date.getHours() < 12 ? 'am' : 'pm')).toLowerCase(),
    A: (date: Date, dictionary: Dictionary): string => String(dictionary.get(date.getHours() < 12 ? 'am' : 'pm')).toUpperCase(),
    YY: (date: Date): string => pad(date.getFullYear().toString().slice(2), 2),
    YYYY: (date: Date): string => date.getFullYear().toString(),
    M: (date: Date): string => String(date.getMonth()),
    MM: (date: Date): string => pad(date.getMonth() + 1, 2),
    D: (date: Date): string => String(date.getDate()),
    DD: (date: Date): string => pad(date.getDate(), 2),
    H: (date: Date): string => String(date.getHours()),
    HH: (date: Date): string => pad(date.getHours(), 2),
    h: (date: Date): string => getTwelveHourFormat(date),
    hh: (date: Date): string => pad(getTwelveHourFormat(date)),
    m: (date: Date): string => String(date.getMinutes()),
    mm: (date: Date): string => pad(date.getMinutes(), 2),
    s: (date: Date): string => String(date.getSeconds()),
    ss: (date: Date): string => pad(date.getSeconds(), 2),
    v: (date: Date): string => String(date.getMilliseconds()),
    vv: (date: Date): string => pad(date.getMilliseconds(), 2),
    vvv: (date: Date): string => pad(date.getMilliseconds(), 3),
    vvvv: (date: Date): string => pad(date.getMilliseconds(), 4)
};

/**
 * The number of days in a week.
 *
 * @public
 */
export const daysInWeek: number = 7

/**
 * This defines the possible keys for a duration.
 * 
 * @public
 */
export const duration: Duration = {
    years: undefined,
    months: undefined,
    weeks: undefined,
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    milliseconds: undefined,
}

/**
 * The regex expression that matches the formatting flags for durations.
 *
 * @public
 */
export const durationFlagPattern: RegExp = /(Y|M|W|D|h|m|s|v)+/g

/**
 * The duration formatting flags.
 *
 * @public
 */
export const durationFlagFormats: Flags = {
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
 * The number of milliseconds in 1 day.
 *
 * @public
 */
export const millisecondsInDay: number = 86400000

/**
 * The number of milliseconds in 1 hour
 *
 * @public
 */
export const millisecondsInHour: number = 3600000

/**
 * The number of milliseconds in 1 minute
 *
 * @public
 */
export const millisecondsInMinute: number = 60000