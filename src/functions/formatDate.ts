import { dateFlagPattern } from "../constants";
import Dictionary from "../Dictionary";
import pad from "./pad";

/**
 * The available formatting flags.
 * 
 * @var {Flags}
 */
 const flags: {[key: string]: (date: Date, dictionary: Dictionary) => string} = {
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
    h: (date: Date): string => String(date.getHours() % 12),
    hh: (date: Date): string => pad(date.getHours() % 12, 2),
    m: (date: Date): string => String(date.getMinutes()),
    mm: (date: Date): string => pad(date.getMinutes(), 2),
    s: (date: Date): string => String(date.getSeconds()),
    ss: (date: Date): string => pad(date.getSeconds(), 2),
    v: (date: Date): string => String(date.getMilliseconds()),
    vv: (date: Date): string => pad(date.getMilliseconds(), 2),
    vvv: (date: Date): string => pad(date.getMilliseconds(), 3),
    vvvv: (date: Date): string => pad(date.getMilliseconds(), 4)
}

/**
 * Format the date into a string.
 * 
 * @param {Date} date 
 * @param {string} format 
 * @returns {format}
 */
export default function formatDate(date: Date, format: string, dictionary: Dictionary): string {
    return format.replace(dateFlagPattern, key => {
        if(!flags[key]) {
            throw new Error(`Invalid date format: ${key}`);
        }

        return String(flags[key](date, dictionary));
    });
}