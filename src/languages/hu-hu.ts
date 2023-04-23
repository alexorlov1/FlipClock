/**
 * @classdesc Hungarian Language Pack
 * @desc This class will used to translate tokens into the Hungarian language.
 * @namespace Languages.Hungarian
 */

import Attributes from "../types/Attributes";

/**
 * @public
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
 * @public
 */
export const aliases: string[] = ['hu', 'hu-hu', 'hungarian'];
