import { Translator } from "./dictionary";

export type DateFormatter = (date: Date, format: string) => string;

export type DateFlagFormatter = (date: Date) => string;

export type DateFormatOptions = {
    translate?: Translator,
    formats?: Record<string, DateFlagFormatter>,
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
 * The proper names of the days in English.
 */
export const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

/**
 * The abbreviated names of the days in English.
 */
export const dayAbbreviations = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];

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
 * The abbreviated names of the months in English.
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

export function pad(value: string|number, length: number): string {
    return Array(length - value.toString().length + 1).join('0') + value;    
}

/**
 * Create a new date string formatter.
 */
export function useDateFormats(options: DateFormatOptions = {})  {
    const formats = new Map<string, DateFlagFormatter>(
        Object.entries(
            Object.assign({
                A: (date: Date): string => date.getHours() < 12 ? 'AM' : 'PM',
                a: (date: Date): string => date.getHours() < 12 ? 'am' : 'pm',
                Q: (date: Date): string => Math.ceil((date.getMonth() + 1) / 3).toString(),
                YYYY: (date: Date): string => date.getFullYear().toString(),
                YY: (date: Date): string => pad(date.getFullYear().toString().slice(2), 2),
                MMMM: (date: Date): string => months[date.getMonth()],
                MMM: (date: Date): string => monthAbbreviations[date.getMonth()],
                MM: (date: Date): string => pad(date.getMonth() + 1, 2),
                M: (date: Date): string => String(date.getMonth() + 1),
                DDDD: (date: Date): string => days[date.getDay()],
                DDD: (date: Date): string => dayAbbreviations[date.getDay()],
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
            }, options.formats)
        )
    );

    function define(key: string, value: DateFlagFormatter)
    function define(key: Record<string, DateFlagFormatter>)
    function define(key: string | Record<string, DateFlagFormatter>, value?: DateFlagFormatter): void {
        if (typeof key === 'string') {
            formats.set(key, value);
        }
        else {
            for (const entry of Object.entries(key)) {
                formats.set(entry[0], entry[1]);
            }
        }
    }

    function undefine(keys: string | string[]): void {
        if (Array.isArray(keys)) {
            for (const key of keys) {
                formats.delete(key);
            }
        }
        else {
            formats.delete(keys);
        }
    }

    function format(value: Date, format: string): string {
        const dateFlagFormats = Array.from(formats.keys()).sort((a, b) => {
                if(a.length < b.length) {
                    return 1;
                }

                if(a.length > b.length) {
                    return -1;
                }

                return 0;
        });

        const dateFlagPattern: RegExp = new RegExp(dateFlagFormats.join('|'), 'g');

        return format.replace(dateFlagPattern, key => {
            const str = formats.get(key)(value);

            return options.translate ? options.translate(str) : str;
        });
    }

    return { define, format, formats, undefine };
}