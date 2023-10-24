import { DigitizedValue, EMPTY_CHAR } from './digitizer';

/**
 * Get a range of numbers using the given size and starting point.
 */
export function range(startAt: number = 0, size: number): number[] {
    return Array.from(Array(size).keys()).map(i => i + startAt);
}

/**
 * Generates a random array of characters using the given range.
 */
export function characterRange(startChar: string, endChar: string): string[] {
    const nums = range(
        startChar.charCodeAt(0), endChar.charCodeAt(0) + 1 - startChar.charCodeAt(0)
    );

    return nums.map(i => String.fromCharCode(i));
}

/**
 * Shuffles array in place.
 */
export function fisherYatesShuffle(chars: string[]): string[] {
    const newArr: string[] = [];

    while (chars.length) {
        const randomIndex = Math.floor(
            Math.random() * chars.length
        );

        newArr.push(...chars.splice(randomIndex, 1));
    }

    return newArr;
}

/**
 * Get the default character set.
 */
export function defaultCharset(): string[] {
    return [
        ...characterRange('a', 'z'),
        ...characterRange('A', 'Z'),
        ...characterRange('0', '9'),
        ':', '-', '.', ',', '!', '?'
    ];
}

export type CreateCharset = (shuffle?: boolean) => string[]

export type ShuffleFunction = (chars: string[]) => string[]

export type CharsetOptions = {
    whitelist?: string[]
    blacklist?: string[],
    charset?: CreateCharset,
    emptyChar?: string,
    shuffle?: boolean|ShuffleFunction
}

export type CharsetCache = Map<string, string[]>;


export type ChunkFunction = (value: DigitizedValue | undefined, size: number) => string[];
export type IsBlacklistFunction = (value: DigitizedValue) => boolean;
export type IsWhitelistFunction = (value: DigitizedValue) => boolean;
export type NextFunction = (value?: DigitizedValue, target?: DigitizedValue, count?: number) => DigitizedValue | undefined;
export type PrevFunction = (value?: DigitizedValue, target?: DigitizedValue, count?: number) => DigitizedValue | undefined;

export type CharsetContext = {
    charset: string[],
    emptyChar: string,
    chunk: ChunkFunction,
    isBlacklisted: IsBlacklistFunction,
    isWhitelisted: IsWhitelistFunction,
    next: NextFunction,
    prev: PrevFunction
}

/**
 * Use a character set to define what characters show up in the sequence.
 */
export function useCharset(options: CharsetOptions = {}): CharsetContext {
    const blacklist = options.blacklist || [];
    const whitelist = options.whitelist || [];
    const emptyChar = options.emptyChar || EMPTY_CHAR;

    const shuffle = typeof options.shuffle === 'function'
        ? options.shuffle
        : options.shuffle ? fisherYatesShuffle : undefined

    /**
     * Creates a charset and shuffles it if required.
     */
    function createCharset(): string[] {
        const fn: CreateCharset = options?.charset || defaultCharset;

        return shuffle ? shuffle(fn()) : fn();
    };

    /**
     * Create a charset.
     */
    const charset = createCharset();

    /**
     * Find the nearest character in the charset to the given value.
     */
    function nearest(value: DigitizedValue) {
        const currentCode = value.charCodeAt(0);
        const charCodes = charset.map(char => char.charCodeAt(0));

        return String.fromCharCode(
            charCodes.reduce((prev, curr) => {
                return Math.abs(curr - currentCode) < Math.abs(prev - currentCode) ? curr : prev
            })
        );
    }

    /**
     * Get the next chunks of characters relative to another character.
     */
    function chunk(value?: DigitizedValue, size: number = 1): string[] {
        let chunked = [emptyChar, ...charset, emptyChar, ...charset];

        if(size < 0) {
            chunked = chunked.reverse();
        }

        let offset = 1;

        if(value === undefined) {
            value = emptyChar;
        }
        else if (!chunked.includes(value)) {
            value = emptyChar;
            offset = 0;
        }

        const index = chunked.indexOf(value);

        const sequence = chunked.slice(
            index + offset, chunked.indexOf(value, index + 1) + offset
        );

        return sequence.splice(0, Math.abs(size));
    }   

    /**
     * Get the next character in the charset relative to the given value.
     */
    function next(current?: DigitizedValue, target?: DigitizedValue, count: number = 1) {
        if (target === undefined && current === emptyChar) {
            return undefined
        }
        else if (target && !charset.includes(target)) {
            return target;
        }

        if (current && (isWhitelisted(current) || target === current)) {
            return current;
        }

        if (current && isBlacklisted(current)) {
            return nearest(current);
        }

        const matches = chunk(current, count);

        if (target && matches.includes(target)) {
            return target;
        }

        if (target === undefined 
            && current 
            && charset.indexOf(matches[count - 1]) < charset.indexOf(current)) {
            return undefined;
        }
        
        return matches[count - 1];
    }

    /**
     * Get the prev character in the charset relative to the given value.
     */
    function prev(current?: DigitizedValue, target?: DigitizedValue, count: number = 1) {
        if (target === undefined && current === emptyChar) {
            return undefined
        }
        else if (target && !charset.includes(target)) {
            return target;
        }

        if (current && (isWhitelisted(current) || target === current)) {
            return current;
        }

        if (current && isBlacklisted(current)) {
            return nearest(current);
        }

        const matches = chunk(current, -count);

        if (target && matches.includes(target)) {
            return target;
        }

        if (target === undefined
            && current
            && charset.indexOf(matches[count - 1]) > charset.indexOf(current)) {
            return undefined;
        }

        return matches[count - 1];
    }

    /**
     * Clean the array of undesired values.
     */
    function isBlacklisted(value: DigitizedValue): boolean {
        return blacklist.includes(value);
    }

    /**
     * Clean the array of undesired values.
     */
    function isWhitelisted(value: DigitizedValue): boolean {
        return whitelist.includes(value);
    }

    return {
        charset,
        chunk,
        emptyChar,
        isBlacklisted,
        isWhitelisted,
        next,
        prev
    }
}