/**
 * @classdesc Hungarian Language Pack
 * @desc This class will used to translate tokens into the Hungarian language.
 * @namespace Languages.Hungarian
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Hungarian
 */
export const dictionary: Attributes = {
	'years'   : 'Év',
    'months'  : 'Hónap',
    'days'    : 'Nap',
    'hours'   : 'Óra',
    'minutes' : 'Perc',
    'seconds' : 'Másodperc'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Hungarian
 */
export const aliases: string[] = ['hu', 'hu-hu', 'hungarian'];
