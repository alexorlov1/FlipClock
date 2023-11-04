import { DigitizedValues } from './digitizer';

export interface SyntaxError extends Error {
    expected: string,
    found: string,
    location: {
        source: string,
        start: number,
        end: number
    }
}

export function parse(str: string): DigitizedValues | never;
