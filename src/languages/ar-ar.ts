/**
 * @classdesc Arabic Language Pack
 * @desc This class will be used to translate tokens into the Arabic language.
 * @namespace Languages.Arabic
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Arabic
 */
export const dictionary: Attributes = {
    'years'   : 'سنوات',
    'months'  : 'شهور',
    'days'    : 'أيام',
    'hours'   : 'ساعات',
    'minutes' : 'دقائق',
    'seconds' : 'ثواني'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Arabic
 */
export const aliases: string[] = ['ar', 'ar-ar', 'arabic'];
