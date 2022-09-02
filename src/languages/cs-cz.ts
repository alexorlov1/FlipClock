/**
 * @classdesc Czech Language Pack
 * @desc This class will used to translate tokens into the Czech language.
 * @namespace Languages.Czech
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Czech
 */
export const dictionary: Attributes = {
    'years'   : 'Roky',
    'months'  : 'Měsíce',
    'days'    : 'Dny',
    'hours'   : 'Hodiny',
    'minutes' : 'Minuty',
    'seconds' : 'Sekundy'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Czech
 */
export const aliases: string[] = ['cs', 'cs-cz', 'cz', 'cz-cs', 'czech'];
