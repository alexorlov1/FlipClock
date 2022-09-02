/**
 * @classdesc Danish Language Pack
 * @desc This class will used to translate tokens into the Danish language.
 * @namespace Languages.Danish
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Danish
 */
export const dictionary: Attributes = {
	'years'   : 'År',
	'months'  : 'Måneder',
	'days'    : 'Dage',
	'hours'   : 'Timer',
	'minutes' : 'Minutter',
	'seconds' : 'Sekunder'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Danish
 */
export const aliases: string[] = ['da', 'da-dk', 'danish'];
