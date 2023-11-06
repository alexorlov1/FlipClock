import { useDefinitionMap, type Translator, type UseDefinitionMap, type UseDictionary } from './dictionary';
import { type UseDigitizer } from './digitizer';
import { type Duration } from './duration';

/**
 * The number of days in a week.
 * 
 * @public
 */
export const daysInWeek: number = 7;

/**
 * The number of milliseconds in 1 day.
 * 
 * @public
 */
export const millisecondsInDay: number = 86400000;

/**
 * The number of milliseconds in 1 hour.
 * 
 * @public
 */
export const millisecondsInHour: number = 3600000;

/**
 * The number of milliseconds in 1 minute.
 * 
 * @public
 */
export const millisecondsInMinute: number = 60000;

/**
 * The proper names of the days in English.
 * 
 * @public
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
 * 
 * @public
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
 * 
 * @public
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
 * 
 * @public
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
 * Formats a date into a string.
 * 
 * @public
 */
export type DateFlagFormatFunction = (date: Date) => string;

/**
 * The options for `useDateFormats()`.
 * 
 * @public
 */
export type UseDateFormatOptions = {
    digitizer?: UseDigitizer,
    translate?: Translator | UseDictionary,
    formats?: Record<string, DateFlagFormatFunction>,
}

/**
 * The return type for `useDateFormats()`.
 * 
 * @public
 */
export type UseDateFormats = UseDefinitionMap<DateFlagFormatFunction> & {
    format: (date: Date, format: string) => string
}

/**
 * Create a new date string formatter.
 * 
 * @public
 */
export function useDateFormats(options?: UseDateFormatOptions): UseDateFormats {
    const { map, define, unset } = useDefinitionMap<DateFlagFormatFunction>(Object.entries(
        Object.assign({
            A: (date: Date) => date.getHours() < 12 ? 'AM' : 'PM',
            a: (date: Date) => date.getHours() < 12 ? 'am' : 'pm',
            Q: (date: Date) => Math.ceil((date.getMonth() + 1) / 3).toString(),
            YYYY: (date: Date) => date.getFullYear().toString(),
            YY: (date: Date) => pad(date.getFullYear().toString().slice(2), 2),
            MMMM: (date: Date) => months[date.getMonth()],
            MMM: (date: Date) => monthAbbreviations[date.getMonth()],
            MM: (date: Date) => pad(date.getMonth() + 1, 2),
            M: (date: Date) => String(date.getMonth() + 1),
            DDDD: (date: Date) => days[date.getDay()],
            DDD: (date: Date) => dayAbbreviations[date.getDay()],
            DD: (date: Date) => pad(date.getDate(), 2),
            D: (date: Date) => String(date.getDate()),
            HH: (date: Date) => pad(date.getHours(), 2),
            H: (date: Date) => String(date.getHours()),
            hh: (date: Date) => pad(getTwelveHourFormat(date), 2),
            h: (date: Date) => getTwelveHourFormat(date),
            mm: (date: Date) => pad(date.getMinutes(), 2),
            m: (date: Date) => String(date.getMinutes()),
            ss: (date: Date) => pad(date.getSeconds(), 2),
            s: (date: Date) => String(date.getSeconds()),
            vvvv: (date: Date) => pad(date.getMilliseconds(), 4),
            vvv: (date: Date) => pad(date.getMilliseconds(), 3),
            vv: (date: Date) => pad(date.getMilliseconds(), 2),
            v: (date: Date) => String(date.getMilliseconds()),
        }, options?.formats)
    ));

    const translate = typeof options?.translate === 'function'
        ? options.translate
        : options?.translate?.translate;

    /**
     * Formats a date using a format string.
     * 
     * @public
     */
    function format(date: Date, str: string): string {
        const flagPattern: RegExp = new RegExp([...sort(map)].join('|'), 'g');

        return str.replace(flagPattern, key => {
            const formatter = map.get(key);

            if (!formatter) {
                return key;
            }

            const str = formatter(date);

            return translate?.(str) ?? str;
        });
    }

    return { map, define, format, unset };
}


/**
 * So an array based on the index position of another.
 * 
 * @public
 */
export function sort(map: Map<string, unknown>) {
    return Array.from(map.keys()).sort((a, b) => {
        if (a.length < b.length) {
            return 1;
        }

        if (a.length > b.length) {
            return -1;
        }

        return 0;
    });
}

/**
 * Left pad another value with zero if its less then the given length.
 * 
 * @public
 */
export function pad(value: string | number | undefined, length: number): string {
    if (value === undefined) {
        return '';
    }

    if (typeof value === 'number') {
        value = value.toString();
    }

    if (length < value.length) {
        return value;
    }

    return Array(length - value.length + 1).join('0') + value;
}

/**
 * Add the duration to the given date.
 * 
 * @public
 */
export function add(date: Date, duration: Partial<Duration>): Date {
    const {
        years = 0,
        months = 0,
        weeks = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0,
    } = duration || {};

    // Add years and months
    const dateWithMonths: Date = months || years ? addMonths(date, months + years * 12) : new Date(date.getTime());

    // Add weeks and days
    const dateWithDays: Date = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;

    // Add days, hours, minutes and seconds
    const minutesToAdd: number = minutes + hours * 60;
    const secondsToAdd: number = seconds + minutesToAdd * 60;
    const msToAdd: number = (secondsToAdd * 1000) + milliseconds;

    return new Date(dateWithDays.getTime() + msToAdd);
}

/**
 * Add x days to the given date.
 * 
 * @public
 */
export function addDays(date: Date, amount: number): Date {
    // If amount is NaN, then just return the date.
    if (isNaN(amount)) {
        return date;
    }

    // If 0 days, no-op to avoid changing times in the hour before end of DST
    if (!amount) {
        return date;
    }

    date.setDate(date.getDate() + amount);

    return date;
}

/**
 * Add x months to the given date.
 * 
 * @public
 */
export function addMonths(date: Date, amount: number): Date {
    // If amount is NaN, then just reutrn the date.
    if (isNaN(amount)) {
        return date;
    }

    // If 0 months, no-op to avoid changing times in the hour before end of DST
    if (!amount) {
        return date;
    }

    const dayOfMonth = date.getDate();

    // The JS Date object supports date math by accepting out-of-bounds values for
    // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
    // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
    // want except that dates will wrap around the end of a month, meaning that
    // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
    // we'll default to the end of the desired month by adding 1 to the desired
    // month and using a date of 0 to back up one day to the end of the desired
    // month.
    const endOfDesiredMonth = new Date(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);

    const daysInMonth = endOfDesiredMonth.getDate();

    if (dayOfMonth >= daysInMonth) {
        // If we're already at the end of the month, then this is the correct date
        // and we're done.
        return endOfDesiredMonth;
    }

    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(
        endOfDesiredMonth.getFullYear(),
        endOfDesiredMonth.getMonth(),
        dayOfMonth
    );

    return date;
}

/**
 * Compare two dates and return a number. This method is used with sort().
 * 
 * @public
 */
export function compareAsc(left: Date, right: Date): number {
    const diff = left.getTime() - right.getTime();

    if (diff < 0) {
        return -1;
    } else if (diff > 0) {
        return 1;
    } else {
        return diff;
    }
}

/**
 * Set the date to the end of the relative day.
 * 
 * @public
 */
export function endOfDay(date: Date): Date {
    date.setHours(23, 59, 59, 999);
    return date;
}

/**
 * Set the date to the end of the relative month.
 * 
 * @public
 */
export function endOfMonth(date: Date): Date {
    const month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(23, 59, 59, 999);
    return date;
}

/**
 * Determines if the given date is the last day of the month.
 * 
 * @public
 */
export function isLastDayOfMonth(dirtyDate: Date): boolean {
    const date = new Date(dirtyDate);

    return endOfDay(date).getTime() === endOfMonth(date).getTime();
}

/**
 * Calculates the difference between two given dates in calendar years.
 * 
 * @public
 */
export function diffInCalYears(left: Date, right: Date): number {
    return left.getFullYear() - right.getFullYear();
}

/**
 * Calculates the difference between two given dates in calendar years.
 * 
 * @public
 */
export function diffInCalMonths(left: Date, right: Date): number {
    const yearDiff = left.getFullYear() - right.getFullYear();
    const monthDiff = left.getMonth() - right.getMonth();
    return yearDiff * 12 + monthDiff;
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 */
export function diffInYears(dirtyLeft: Date, dirtyRight: Date): number {
    const left: Date = new Date(dirtyLeft);
    const right: Date = new Date(dirtyRight);
    const sign = compareAsc(left, right);
    const difference = Math.abs(diffInCalYears(left, right));

    // Set both dates to a valid leap year for accurate comparison when dealing
    // with leap days
    left.setFullYear(1584);
    right.setFullYear(1584);

    // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
    // If so, result must be decreased by 1 in absolute value
    const isLastYearNotFull = compareAsc(left, right) === -sign;
    const result = sign * (difference - Number(isLastYearNotFull));

    // Prevent negative zero
    return result === 0 ? 0 : result;
}

/**
 * Calculates the difference between two given dates in months.
 * 
 * @public
 */
export function diffInMonths(dirtyLeft: Date, dirtyRight: Date): number {
    const left: Date = new Date(dirtyLeft);
    const right: Date = new Date(dirtyRight);
    const sign = compareAsc(left, right);
    const difference = Math.abs(diffInCalMonths(left, right));

    // Check for the difference of less than month
    if (difference < 1) {
        return 0;
    }

    if (left.getMonth() === 1 && left.getDate() > 27) {
        // This will check if the date is end of Feb and assign a higher end of month date
        // to compare it with Jan
        left.setDate(30);
    }

    left.setMonth(left.getMonth() - sign * difference);

    // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value
    let isLastMonthNotFull = compareAsc(left, right) === -sign;

    // Check for cases of one full calendar month
    if (isLastDayOfMonth(left) && difference === 1 && compareAsc(left, right) === 1) {
        isLastMonthNotFull = false;
    }

    const result = sign * (difference - Number(isLastMonthNotFull));

    // Prevent negative zero
    return result === 0 ? 0 : result;
}

/**
 * Calculates the difference between two given dates in weeks.
 * 
 * @public
 */
export function diffInWeeks(dirtyLeft: Date, dirtyRight: Date): number {
    return Math.floor(diffInDays(dirtyLeft, dirtyRight) / daysInWeek);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 */
export function diffInDays(left: Date, right: Date): number {
    return Math.floor(diffInMilliseconds(left, right) / millisecondsInDay);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 */
export function diffInHours(left: Date, right: Date): number {
    return Math.floor(diffInMilliseconds(left, right) / millisecondsInHour);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 */
export function diffInMinutes(left: Date, right: Date): number {
    return Math.floor(diffInMilliseconds(left, right) / millisecondsInMinute);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 */
export function diffInSeconds(left: Date, right: Date): number {
    return Math.floor(diffInMilliseconds(left, right) / 1000);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 */
export function diffInMilliseconds(dirtyLeft: Date, dirtyRight: Date): number {
    return new Date(dirtyLeft).getTime() - new Date(dirtyRight).getTime();
}

/**
 * Get the twelve hour format of the current date.
 * 
 * @public
 */
export function getTwelveHourFormat(date: Date): string {
    const mod: number = date.getHours() % 12;

    return String(mod === 0 ? 12 : mod);
}
