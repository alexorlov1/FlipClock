export type ParsedString = string | ParsedString[];

export interface SyntaxError extends Error {
    expected: string,
    found: string,
    location: {
        source: string,
        start: number,
        end: number
    }
}

export function parse(str: string): ParsedString | never;
