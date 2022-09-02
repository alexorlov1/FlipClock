import Duration from "./types/Duration";

/**
 * The regex expression that matches the formatting flags for dates.
 *
 * @name dateFlagPattern
 * @constant
 * @type {RegExp}
 * @default
 */
 export const dateFlagPattern = /Y{2,4}|M{1,2}|D{1,2}|h{1,2}|m{1,2}|s{1,2}|v{1,4}|A|a/g;

/**
 * Days in a week
 *
 * @name daysInWeek
 * @constant
 * @type {number}
 * @default
 */
export const daysInWeek = 7

/**
 * This defines the possible keys for a duration.
 * 
 * @name duration
 * @constant
 * @type {Duration}
 * @default
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
};

/**
 * The regex expression that matches the formatting flags for durations.
 *
 * @name durationFlagPattern
 * @constant
 * @type {RegExp}
 * @default
 */
export const durationFlagPattern = /(Y|M|W|D|h|m|s|v)+/g;

/**
 * Milliseconds in 1 day.
 *
 * @name millisecondsInDay
 * @constant
 * @type {number}
 * @default
 */
export const millisecondsInDay = 86400000

/**
 * Milliseconds in 1 hour
 *
 * @name millisecondsInHour
 * @constant
 * @type {number}
 */
export const millisecondsInHour = 3600000

/**
 * Milliseconds in 1 minute
 *
 * @name millisecondsInMinute
 * @constant
 * @type {number}
 * @default
 */
 export const millisecondsInMinute = 60000