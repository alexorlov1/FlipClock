import { dateFlagPattern, dateFlagFormats } from "../constants";
import Dictionary from "../Dictionary";

/**
 * Format the date into a string.
 * 
 * @public
 * @param date - The date to format.
 * @param format - The format string.
 * @param dictionary - The language dictionary for translations.
 * @returns The formatted string.
 */
export default function formatDate(date: Date, format: string, dictionary: Dictionary): string {
    return format.replace(dateFlagPattern, key => {
        if(!dateFlagFormats[key]) {
            throw new Error(`Invalid date format: ${key}`);
        }

        return String(dateFlagFormats[key](date, dictionary));
    });
}