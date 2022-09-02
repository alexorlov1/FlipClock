/**
 * @classdesc Norwegian-Bokmål Language Pack
 * @desc This class will used to translate tokens into the Norwegian-Bokmål language.
 * @namespace Languages.Norwegian
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Norwegian
 */
export const dictionary: Attributes = {
	'years'   : 'År',
	'months'  : 'Måneder',
	'days'    : 'Dager',
	'hours'   : 'Timer',
	'minutes' : 'Minutter',
	'seconds' : 'Sekunder'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Norwegian
 */
export const aliases: string[] = ['no', 'nb', 'no-nb', 'norwegian'];
