/**
 * @classdesc Japanese Language Pack
 * @desc This class will used to translate tokens into the Japanese language.
 * @namespace Languages.Japanese
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Japanese
 */
export const dictionary: Attributes = {
	'years'   : '年',
	'months'  : '月',
	'days'    : '日',
	'hours'   : '時',
	'minutes' : '分',
	'seconds' : '秒'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Japanese
 */
export const aliases: string[] = ['jp', 'ja-jp', 'japanese'];
