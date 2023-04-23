/**
 * @classdesc Hebrew Language Pack
 * @desc This class will used to translate tokens into the Hebrew language.
 * @namespace Languages.Hebrew
 */

import Attributes from "../types/Attributes";

/**
 * @public
 */
export const dictionary: Attributes = {
	'years'   : 'שנים',
	'months'  : 'חודש',
	'days'    : 'ימים',
	'hours'   : 'שעות',
	'minutes' : 'דקות',
	'seconds' : 'שניות'
};

/**
 * @public
 */
export const aliases: string[] = ['il', 'he-il', 'hebrew'];
