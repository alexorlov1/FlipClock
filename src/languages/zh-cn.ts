/**
 * @classdesc Chinese Language Pack
 * @desc This class will used to translate tokens into the Chinese language.
 * @namespace Languages.Chinese
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Chinese
 */
export const dictionary: Attributes = {
	'years'   : '年',
	'months'  : '月',
	'days'    : '日',
	'hours'   : '时',
	'minutes' : '分',
	'seconds' : '秒'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Chinese
 */
export const aliases: string[] = ['zh', 'zh-cn', 'chinese'];
