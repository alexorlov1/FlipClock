/**
 * @classdesc Portuguese Language Pack
 * @desc This class will used to translate tokens into the Portuguese language.
 * @namespace Languages.Portuguese
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Portuguese
 */
export const dictionary: Attributes = {
	'years'   : 'Anos',
	'months'  : 'Meses',
	'days'    : 'Dias',
	'hours'   : 'Horas',
	'minutes' : 'Minutos',
	'seconds' : 'Segundos'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Portuguese
 */
export const aliases: string[] = ['pt', 'pt-br', 'portuguese'];
