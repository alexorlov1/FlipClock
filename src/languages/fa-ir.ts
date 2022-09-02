/**
 * @classdesc Persian Language Pack
 * @desc This class will used to translate tokens into the Persian language.
 * @namespace Languages.Persian
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Persian
 */
export const dictionary: Attributes = {
	'years'   : 'سال',
	'months'  : 'ماه',
	'days'    : 'روز',
	'hours'   : 'ساعت',
	'minutes' : 'دقیقه',
	'seconds' : 'ثانیه'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Persian
 */
export const aliases: string[] = ['fa', 'fa-ir', 'persian'];
