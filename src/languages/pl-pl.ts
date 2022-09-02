/**
 * @classdesc Polish Language Pack
 * @desc This class will used to translate tokens into the Polish language.
 * @namespace Languages.Polish
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {object}
 * @memberof Languages.Polish
 */
export const dictionary: Attributes = {
	'years'   : 'Lat',
	'months'  : 'Miesięcy',
	'days'    : 'Dni',
	'hours'   : 'Godziny',
	'minutes' : 'Minuty',
	'seconds' : 'Sekundy'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Polish
 */
export const aliases: string[] = ['pl', 'pl-pl', 'polish'];
