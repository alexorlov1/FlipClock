/**
 * @classdesc Swedish Language Pack
 * @desc This class will used to translate tokens into the Swedish language.
 * @namespace Languages.Swedish
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Swedish
 */
export const dictionary: Attributes = {
	'years'   : 'År',
	'months'  : 'Månader',
	'days'    : 'Dagar',
	'hours'   : 'Timmar',
	'minutes' : 'Minuter',
	'seconds' : 'Sekunder'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Swedish
 */
export const aliases: string[] = ['sv', 'sv-se', 'swedish'];
