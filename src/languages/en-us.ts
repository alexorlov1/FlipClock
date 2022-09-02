/**
 * @classdesc English Language Pack
 * @desc This class will used to translate tokens into the English language.
 * @namespace Languages.English
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.English
 */
export const dictionary: Attributes = {
	'years'   : 'Years',
	'months'  : 'Months',
	'days'    : 'Days',
	'hours'   : 'Hours',
	'minutes' : 'Minutes',
	'seconds' : 'Seconds'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.English
 */
export const aliases: string[] = ['en', 'en-us', 'english'];
