import { DigitizedValues } from './digitizer';

/**
 * The Error generated from parse().
 * 
 * @public
 */
export interface SyntaxError extends Error {
    expected: string;
    found: string;
    location: {
        source: string;
        start: number;
        end: number;
    };
}

/**
 * The options for parse().
 * 
 * @public
 */
export type ParseOptions = {
    grammarSource?: string;
    startRule?: string;
};

/**
 * Parse a string into an array structure.
 * 
 * @public
 */
export function parse(str: string): DigitizedValues | never;
export function parse(str: string, options: ParseOptions): DigitizedValues | never;
export function parse(str: string, options?: ParseOptions): DigitizedValues | never;
