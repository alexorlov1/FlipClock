// import Duration from "./types/Duration";

// export type Flags = {
//     [flag: string]: (duration: Duration, length: number) => string
// };

// /**
//  * The regex expression that matches the formatting flags for dates.
//  *
//  * @public
//  */
// export const dateFlagPattern: RegExp = /Y{2,4}|M{1,2}|D{1,2}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|v{1,4}|A|a/g

// /**
//  * The number of days in a week.
//  *
//  * @public
//  */
// export const daysInWeek: number = 7

// /**
//  * This defines the possible keys for a duration.
//  * 
//  * @public
//  */
// export const duration: Duration = {
//     years: undefined,
//     months: undefined,
//     weeks: undefined,
//     days: undefined,
//     hours: undefined,
//     minutes: undefined,
//     seconds: undefined,
//     milliseconds: undefined,
// }

// // /**
// //  * The regex expression that matches the formatting flags for durations.
// //  *
// //  * @public
// //  */
// // export const durationFlagPattern: RegExp = /(Y|M|W|D|h|m|s|v)+/g

// // /**
// //  * The duration formatting flags.
// //  *
// //  * @public
// //  */
// // export const durationFlagFormats: Flags = {
// //     Y: (duration: Duration, length: number): string => pad(duration?.years, length),
// //     M: (duration: Duration, length: number): string => pad(duration?.months, length),
// //     W: (duration: Duration, length: number): string => pad(duration?.weeks, length),
// //     D: (duration: Duration, length: number): string => pad(duration.days, length),
// //     h: (duration: Duration, length: number): string => pad(duration.hours, length),
// //     m: (duration: Duration, length: number): string => pad(duration.minutes, length),
// //     s: (duration: Duration, length: number): string => pad(duration.seconds, length),
// //     v: (duration: Duration, length: number): string => pad(duration.milliseconds, length)
// // }

// // /**
// //  * The number of milliseconds in 1 day.
// //  *
// //  * @public
// //  */
// // export const millisecondsInDay: number = 86400000

// // /**
// //  * The number of milliseconds in 1 hour
// //  *
// //  * @public
// //  */
// // export const millisecondsInHour: number = 3600000

// // /**
// //  * The number of milliseconds in 1 minute
// //  *
// //  * @public
// //  */
// // export const millisecondsInMinute: number = 60000