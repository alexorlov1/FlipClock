import { daysInWeek, millisecondsInDay, millisecondsInHour, millisecondsInMinute } from '../constants';
import Duration from '../types/Duration';
import round from './round';

/**
 * Add x days to the given date.
 */
function addDays(date: Date, amount: number): Date {
    // If amount is NaN, then just return the date.
    if(isNaN(amount)) {
        return date
    }

    // If 0 days, no-op to avoid changing times in the hour before end of DST
    if(!amount) {
        return date
    }

    date.setDate(date.getDate() + amount)

    return date
}

/**
 * Add x months to the given date.
 */
function addMonths(date: Date, amount: number): Date {
    // If amount is NaN, then just reutrn the date.
    if(isNaN(amount)) {
        return date
    }

    // If 0 months, no-op to avoid changing times in the hour before end of DST
    if (!amount) {
      return date
    }

    const dayOfMonth = date.getDate()
  
    // The JS Date object supports date math by accepting out-of-bounds values for
    // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
    // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
    // want except that dates will wrap around the end of a month, meaning that
    // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
    // we'll default to the end of the desired month by adding 1 to the desired
    // month and using a date of 0 to back up one day to the end of the desired
    // month.
    const endOfDesiredMonth = new Date(date.getTime())
    endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0)
    
    const daysInMonth = endOfDesiredMonth.getDate()

    if (dayOfMonth >= daysInMonth) {
      // If we're already at the end of the month, then this is the correct date
      // and we're done.
      return endOfDesiredMonth
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
    )
    
    return date
}

/**
 * Add the duration to the given date.
 * 
 * @public
 * @param dirtyDate - The starting date value.
 * @param duration - The duration used to modify the starting date.
 * @returns A new date instance.
 */
export function add(dirtyDate: Date, duration: Duration): Date {
    const date: Date = new Date(dirtyDate);

    const {
        years = 0,
        months = 0,
        weeks = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
    } = duration || {}
    
    // Add years and months
    const dateWithMonths: Date = months || years ? addMonths(date, months + years * 12) : new Date(date.getTime())
    
    // Add weeks and days
    const dateWithDays: Date = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths
    
    // Add days, hours, minutes and seconds
    const minutesToAdd: number = minutes + hours * 60
    const secondsToAdd: number = seconds + minutesToAdd * 60
    const msToAdd: number = secondsToAdd * 1000
    
    return new Date(dateWithDays.getTime() + msToAdd);
}

/**
 * Compare two dates and return a number. This method is used with sort().
 * 
 * @public
 * @param dirtyLeft - The left side comparator 
 * @param dirtyRight - The right side comparator.
 * @returns The values for an asc sort.
 */
export function compareAsc(dirtyLeft: Date, dirtyRight: Date): number {
    const left: Date = new Date(dirtyLeft);
    const right: Date = new Date(dirtyRight);
    const diff = left.getTime() - right.getTime()
  
    if (diff < 0) {
        return -1
    } else if (diff > 0) {
        return 1
    } else {
        return diff
    }
}

/**
 * Set the date to the end of the relative day.
 * 
 * @param date - The date subject.
 * @returns The modified date.
 */
function endOfDay(date: Date): Date {
    date.setHours(23, 59, 59, 999)
    return date
}

/**
 * Set the date to the end of the relative month.
 * 
 * @param date - The date subject.
 * @returns The modified date.
 */
function endOfMonth(date: Date): Date {
    const month = date.getMonth()
    date.setFullYear(date.getFullYear(), month + 1, 0)
    date.setHours(23, 59, 59, 999)
    return date
}

/**
 * Determines if the given date is the last day of the month.
 * 
 * @public
 * @param date - The date subject.
 * @returns `true` if the date is the last day of the month.
 */
export function isLastDayOfMonth(date: Date): boolean {
    return endOfDay(date).getTime() === endOfMonth(date).getTime()
}

/**
 * Calculates the difference between two given dates in calendar years.
 * 
 * @param dirtyLeft - The left side comparator 
 * @param dirtyRight - The right side comparator.
 * @returns {number}
 */
function differenceInCalendarYears(dirtyLeft: Date, dirtyRight: Date): number {
    const left: Date = new Date(dirtyLeft);
    const right: Date = new Date(dirtyRight);
    return left.getFullYear() - right.getFullYear()
}

/**
 * Calculates the difference between two given dates in calendar years.
 * 
 * @param dirtyLeft - The left side comparator 
 * @param dirtyRight - The right side comparator.
 * @returns {number}
 */
function differenceInCalendarMonths(dirtyLeft: Date, dirtyRight: Date): number {
    const left: Date = new Date(dirtyLeft);
    const right: Date = new Date(dirtyRight);
    const yearDiff = left.getFullYear() - right.getFullYear()
    const monthDiff = left.getMonth() - right.getMonth()
    return yearDiff * 12 + monthDiff
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 * @param dirtyLeft - The left side comparator.
 * @param dirtyRight - The right side comparator.
 * @returns The number of years between the two dates.
 */
export function differenceInYears(dirtyLeft: Date, dirtyRight: Date): number {
    const left: Date = new Date(dirtyLeft);
    const right: Date = new Date(dirtyRight);
    const sign = compareAsc(left, right)
    const difference = Math.abs(differenceInCalendarYears(left, right))
  
    // Set both dates to a valid leap year for accurate comparison when dealing
    // with leap days
    left.setFullYear(1584)
    right.setFullYear(1584)
  
    // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
    // If so, result must be decreased by 1 in absolute value
    const isLastYearNotFull = compareAsc(left, right) === -sign
    const result = sign * (difference - Number(isLastYearNotFull))

    // Prevent negative zero
    return result === 0 ? 0 : result
}

/**
 * Calculates the difference between two given dates in months.
 * 
 * @public
 * @param dirtyLeft - The left side comparator.
 * @param dirtyRight - The right side comparator.
 * @returns The number of months between the two dates.
 */
export function differenceInMonths(dirtyLeft: Date, dirtyRight: Date): number {
    const left: Date = new Date(dirtyLeft);
    const right: Date = new Date(dirtyRight);
    const sign = compareAsc(left, right)
    const difference = Math.abs(differenceInCalendarMonths(left, right))

    // Check for the difference of less than month
    if(difference < 1) {
        return 0;
    }

    if(left.getMonth() === 1 && left.getDate() > 27) {
        // This will check if the date is end of Feb and assign a higher end of month date
        // to compare it with Jan
        left.setDate(30)
    }

    left.setMonth(left.getMonth() - sign * difference)

    // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value
    let isLastMonthNotFull = compareAsc(left, right) === -sign

    // Check for cases of one full calendar month
    if(isLastDayOfMonth(left) && difference === 1 && compareAsc(left, right) === 1) {
        isLastMonthNotFull = false
    }

    const result = sign * (difference - Number(isLastMonthNotFull))
    
    // Prevent negative zero
    return result === 0 ? 0 : result
}

/**
 * Calculates the difference between two given dates in weeks.
 * 
 * @public
 * @param dirtyLeft - The left side comparator.
 * @param dirtyRight - The right side comparator.
 * @returns The number of weeks between the two dates.
 */
export function differenceInWeeks(dirtyLeft: Date, dirtyRight: Date): number {
    return round(differenceInDays(dirtyLeft, dirtyRight) / daysInWeek)
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 * @param dirtyLeft - The left side comparator.
 * @param dirtyRight - The right side comparator.
 * @returns The number of days between the two dates.
 */
export function differenceInDays(left: Date, right: Date): number {
    return round(differenceInMilliseconds(left, right) / millisecondsInDay);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 * @param dirtyLeft - The left side comparator 
 * @param dirtyRight - The right side comparator.
 * @returns The number of hours between the two dates.
 */
export function differenceInHours(left: Date, right: Date): number {
    return round(differenceInMilliseconds(left, right) / millisecondsInHour);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 * @param dirtyLeft - The left side comparator 
 * @param dirtyRight - The right side comparator.
 * @returns The number of minutes between the two dates.
 */
export function differenceInMinutes(left: Date, right: Date): number {
    return round(differenceInMilliseconds(left, right) / millisecondsInMinute);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 * @param dirtyLeft - The left side comparator 
 * @param dirtyRight - The right side comparator.
 * @returns The number of seconds between the two dates.
 */
 export function differenceInSeconds(left: Date, right: Date): number {
    return round(differenceInMilliseconds(left, right) / 1000);
}

/**
 * Calculates the difference between two given dates in years.
 * 
 * @public
 * @param dirtyLeft - The left side comparator 
 * @param dirtyRight - The right side comparator.
 * @returns The number of milliseconds between the two dates.
 */
export function differenceInMilliseconds(dirtyLeft: Date, dirtyRight: Date): number {
    return new Date(dirtyLeft).getTime() - new Date(dirtyRight).getTime();
}