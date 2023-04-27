import { dateFlagFormats, dateFlagPattern } from "../constants";
import Dictionary from "../Dictionary";

/**
 * Format the date into a string.
 * 
 * @public
 */
export default function formatDate(date: Date, format: string, dictionary: Dictionary): string {
    return format.replace(dateFlagPattern, key => {
        if(!dateFlagFormats[key]) {
            throw new Error(`Invalid date format: ${key}`);
        }

        return String(dateFlagFormats[key](date, dictionary));
    });
}