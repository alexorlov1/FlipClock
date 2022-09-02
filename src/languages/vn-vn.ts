/**
 * @classdesc Vietnamese Language Pack
 * @desc This class will used to translate tokens into the Vietnamese language.
 * @namespace Languages.Vietnamese
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Vietnamese
 */
export const dictionary: Attributes = {
	'years'   : 'Năm',
	'months'  : 'Tháng',
	'days'    : 'Ngày',
	'hours'   : 'Giờ',
	'minutes' : 'Phút',
	'seconds' : 'Giây'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Vietnamese
 */
export const aliases: string[] = ['vn', 'vn-vn', 'vietnamese'];
