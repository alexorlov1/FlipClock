/**
 * @classdesc Korean Language Pack
 * @desc This class will used to translate tokens into the Korean language.
 * @namespace Languages.Korean
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Korean
 */
export const dictionary: Attributes = {
	'years'   : '년',
	'months'  : '월',
	'days'    : '일',
	'hours'   : '시',
	'minutes' : '분',
	'seconds' : '초'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Korean
 */
export const aliases: string[] = ['ko', 'ko-kr', 'korean'];
