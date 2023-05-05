// import { durationFlagPattern } from "../constants";
// import Duration from "../types/Duration";
// import DurationFlags from "../types/DurationFlags";
// import { add, compareAsc, differenceInDays, differenceInHours, differenceInMilliseconds, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears } from "./date";

// const diffs = {
//     years: (start: Date, end: Date) => differenceInYears(start, end),
//     months: (start: Date, end: Date) => differenceInMonths(start, end),
//     weeks: (start: Date, end: Date) => differenceInWeeks(start, end),
//     days: (start: Date, end: Date) => differenceInDays(start, end),
//     hours: (start: Date, end: Date) => differenceInHours(start, end),
//     minutes: (start: Date, end: Date) => differenceInMinutes(start, end),
//     seconds: (start: Date, end: Date) => differenceInSeconds(start, end),
//     milliseconds: (start: Date, end: Date) => differenceInMilliseconds(start, end),
// };

// function sort(a: string, b: string) {
//     const keys: string[] = Object.keys(DurationFlags)
//     const x: number = keys.indexOf(a);
//     const y: number = keys.indexOf(b);

//     if(x < y) {
//         return -1;
//     }

//     if(y > x) {
//         return 1;
//     }

//     return 0;
// }

// /**
//  * Create a Duration instance using a start and end date with the given format.
//  * 
//  * @public
//  * @param dirtyStart - The start of the date range.
//  * @param dirtyEnd - The end of the date range.
//  * @param format - The format string.
//  * @returns The duration instance.
//  */
// export default function duration(dirtyStart: Date, dirtyEnd: Date, format: string): Duration {
//     // Get the start and end date by comparing them by chronology.
//     let [ start, end ]: Date[] = [ dirtyStart, dirtyEnd ].sort(compareAsc);
    
//     // Get the sorted flags from the format string.
//     const flags: string[] = [
//         ...new Set(
//             (format.match(durationFlagPattern) || [])
//                 .map(key => key.slice(0, 1))
//                 .sort(sort)
//                 .map(key => DurationFlags[key])
//         )
//     ];

//     // The diff function modifies the start date using the given duration.
//     function diff(key: string, duration: Duration): Duration {
//         const diff: number = diffs[key](end, start);
//         const modifier: Duration = {[key]: diff};
        
//         start = add(start, modifier);

//         return Object.assign(duration, modifier);
//     }
    
//     // Reduce the keys into a Duration instance.
//     return Object.freeze(flags.reduce((carry, key) => diff(key, carry), {}));
// }