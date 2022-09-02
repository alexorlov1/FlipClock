/**
 * @classdesc German Language Pack
 * @desc This class will used to translate tokens into the German language.
 * @namespace Languages.German
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.German
 */
export const dictionary: Attributes = {
	'years'   : 'Jahre',
	'months'  : 'Monate',
	'days'    : 'Tage',
	'hours'   : 'Stunden',
	'minutes' : 'Minuten',
	'seconds' : 'Sekunden'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.German
 */
export const aliases: string[] = ['de', 'de-de', 'german'];
