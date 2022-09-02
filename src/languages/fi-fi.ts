/**
 * @classdesc Finnish Language Pack
 * @desc This class will used to translate tokens into the Finnish language.
 * @namespace Languages.Finnish
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Finnish
 */
export const dictionary: Attributes = {
	'years'   : 'Vuotta',
	'months'  : 'Kuukautta',
	'days'    : 'Päivää',
	'hours'   : 'Tuntia',
	'minutes' : 'Minuuttia',
	'seconds' : 'Sekuntia'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Finnish
 */
export const aliases: string[] = ['fi', 'fi-fi', 'finnish'];
