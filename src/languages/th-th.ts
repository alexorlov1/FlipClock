/**
 * @classdesc Thai Language Pack
 * @desc This class will used to translate tokens into the Thai language.
 * @namespace Languages.Thai
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Thai
 */
export const dictionary: Attributes = {
	'years'   : 'ปี',
	'months'  : 'เดือน',
	'days'    : 'วัน',
	'hours'   : 'ชั่วโมง',
	'minutes' : 'นาที',
	'seconds' : 'วินาที'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Thai
 */
export const aliases: string[] = ['th', 'th-th', 'thai'];
