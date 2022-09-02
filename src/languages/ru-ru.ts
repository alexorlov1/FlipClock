/**
 * @classdesc Russian Language Pack
 * @desc This class will used to translate tokens into the Russian language.
 * @namespace Languages.Russian
 */

import Attributes from "../types/Attributes";

/**
 * @constant dictionary
 * @type {Attributes}
 * @memberof Languages.Russian
 */
export const dictionary: Attributes = {
    'years'   : 'лет',
    'months'  : 'месяцев',
    'days'    : 'дней',
    'hours'   : 'часов',
    'minutes' : 'минут',
    'seconds' : 'секунд'
};

/**
 * @constant aliases
 * @type {string[]}
 * @memberof Languages.Russian
 */
export const aliases: string[] = ['ru', 'ru-ru', 'russian'];
