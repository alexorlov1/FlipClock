import { pad } from "../functions";
import { Translator } from "./dictionary";

export type DateFormatter = (date: Date, format: string) => string;

export type DateFlagFormatter = (date: Date) => string;

export type DateFlagFormats = Record<string, DateFlagFormatter>;

export type DateFormatParams = {
    translate?: Translator,
    formats?: DateFlagFormats,
}

/**
 * The number of milliseconds in 1 day.
 *
 * @public
 */
export const millisecondsInDay: number = 86400000;

/**
 * The number of milliseconds in 1 hour
 *
 * @public
 */
export const millisecondsInHour: number = 3600000;

/**
 * The number of milliseconds in 1 minute
 *
 * @public
 */
export const millisecondsInMinute: number = 60000;

/**
 * The proper names of the months in English.
 */
export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

/**
 * The proper names of the months in English.
 */
export const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

/**
 * Get the twelve hour format of the current date.
 * 
 * @public
 */
export function getTwelveHourFormat(date: Date): string {
    const mod: number = date.getHours() % 12;

    return String(mod === 0 ? 12 : mod);
}

/**
 * Create a new date string formatter.
 */
export function useDateFormats({ translate, formats }: DateFormatParams = {}): DateFormatter  {
    const dateFlagFormats: DateFlagFormats = Object.assign({
        A: (date: Date): string => date.getHours() < 12 ? 'AM' : 'PM',
        a: (date: Date): string => date.getHours() < 12 ? 'am' : 'pm',
        Q: (date: Date): string => Math.ceil((date.getMonth() + 1) / 3).toString(),
        YYYY: (date: Date): string => date.getFullYear().toString(),
        YY: (date: Date): string => pad(date.getFullYear().toString().slice(2), 2),
        MMMM: (date: Date): string => months[date.getMonth()],
        MMM: (date: Date): string => monthAbbreviations[date.getMonth()],
        MM: (date: Date): string => pad(date.getMonth() + 1, 2),
        M: (date: Date): string => String(date.getMonth()),
        DD: (date: Date): string => pad(date.getDate(), 2),
        D: (date: Date): string => String(date.getDate()),
        HH: (date: Date): string => pad(date.getHours(), 2),
        H: (date: Date): string => String(date.getHours()),
        hh: (date: Date): string => pad(getTwelveHourFormat(date), 2),
        h: (date: Date): string => getTwelveHourFormat(date),
        mm: (date: Date): string => pad(date.getMinutes(), 2),
        m: (date: Date): string => String(date.getMinutes()),
        ss: (date: Date): string => pad(date.getSeconds(), 2),
        s: (date: Date): string => String(date.getSeconds()),
        vvvv: (date: Date): string => pad(date.getMilliseconds(), 4),
        vvv: (date: Date): string => pad(date.getMilliseconds(), 3),
        vv: (date: Date): string => pad(date.getMilliseconds(), 2),
        v: (date: Date): string => String(date.getMilliseconds()),
    }, formats);

    const dateFlagPattern: RegExp = new RegExp(
        Object.entries(dateFlagFormats).map(([key]) => {
            return key;
        }).join('|'), 'g'
    );

    return function formatDate(value: Date, format: string): string {
        return format.replace(dateFlagPattern, key => {
            const str = dateFlagFormats[key](value);

            return translate ? translate(str) : str;
        });
    }
}