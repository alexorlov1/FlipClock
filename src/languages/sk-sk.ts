/**
 * @classdesc Slovak Language Pack
 * @desc This class will used to translate tokens into the Slovak language.
 * @namespace Languages.Slovak
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Slovak
 */
export const dictionary: Attributes = {
	'years'   : 'Roky',
	'months'  : 'Mesiace',
	'days'    : 'Dni',
	'hours'   : 'Hodiny',
	'minutes' : 'Minúty',
	'seconds' : 'Sekundy'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Slovak
 */
export const aliases: string[] = ['sk', 'sk-sk', 'slovak'];
