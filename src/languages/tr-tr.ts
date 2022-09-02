/**
 * @classdesc Turkish Language Pack
 * @desc This class will used to translate tokens into the Turkish language.
 * @namespace Languages.Turkish
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Turkish
 */
export const dictionary: Attributes = {
	'years'   : 'Yıl',
	'months'  : 'Ay',
	'days'    : 'Gün',
	'hours'   : 'Saat',
	'minutes' : 'Dakika',
	'seconds' : 'Saniye'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Turkish
 */
export const aliases: string[] = ['tr', 'tr-tr', 'turkish'];
