/**
 * @classdesc Dutch Language Pack
 * @desc This class will used to translate tokens into the Dutch language.
 * @namespace Languages.Dutch
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Dutch
 */
export const dictionary: Attributes = {
    'years'   : 'Jaren',
    'months'  : 'Maanden',
    'days'    : 'Dagen',
    'hours'   : 'Uren',
    'minutes' : 'Minuten',
    'seconds' : 'Seconden'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Dutch
 */
export const aliases: string[] = ['nl', 'nl-be', 'dutch'];
