import { DigitizedValue, DigitizedValues, EMPTY_CHAR } from './digitizer';

/**
 * Get a range of numbers using the given size and starting point.
 * 
 * @public
 */
export function range(startAt: number = 0, size: number): number[] {
    return Array.from(Array(size).keys()).map(i => i + startAt);
}

/**
 * Generates a random array of characters using the given range.
 * 
 * @public
 */
export function characterRange(startChar: string, endChar: string): string[] {
    const nums = range(
        startChar.charCodeAt(0), endChar.charCodeAt(0) + 1 - startChar.charCodeAt(0)
    );

    return nums.map(i => String.fromCharCode(i));
}

/**
 * Shuffles array in place.
 * 
 * @public
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
 * 
 * @public
 */
export function defaultCharset(): string[] {
    return [
        ...characterRange('a', 'z'),
        ...characterRange('A', 'Z'),
        ...characterRange('0', '9'),
        ':', '-', '.', ',', '!', '?'
    ];
}

/**
 * The options for `useCharset()`.
 * 
 * @public
 */
export type UseCharsetOptions = {
    blacklist?: string[];
    charset?: (shuffle?: boolean) => string[];
    emptyChar?: string;
    shuffle?: ((chars: string[]) => string[]) | boolean;
    whitelist?: string[];
}

/**
 * The return type for `useCharset()`.
 * 
 * @public
 */
export type UseCharset = {
    charset: string[],
    emptyChar: string,
    chunk: (value: DigitizedValue | undefined, size: number) => string[],
    isBlacklisted: (value: DigitizedValue) => boolean,
    isWhitelisted: (value: DigitizedValue) => boolean,
    next: (value?: DigitizedValue, target?: DigitizedValue | DigitizedValues, count?: number) => DigitizedValue | undefined,
    prev: (value?: DigitizedValue, target?: DigitizedValue | DigitizedValues, count?: number) => DigitizedValue | undefined
}

/**
 * A composable that uses a set of characters to create a charset.
 * 
 * @public
 */
export function useCharset(options: UseCharsetOptions = {}): UseCharset {
    const blacklist = options.blacklist || [];
    const whitelist = options.whitelist || [];
    const emptyChar = options.emptyChar || EMPTY_CHAR;

    const shuffle = typeof options.shuffle === 'function'
        ? options.shuffle
        : options.shuffle ? fisherYatesShuffle : undefined;

    /**
     * Creates a charset and shuffles it if required.
     */
    function createCharset(): string[] {
        const fn = options?.charset || defaultCharset;

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
                return Math.abs(curr - currentCode) < Math.abs(prev - currentCode) ? curr : prev;
            })
        );
    }

    /**
     * Get the next chunks of characters relative to another character.
     */
    function chunk(value?: DigitizedValue, size: number = 1): string[] {
        let chunked = [emptyChar, ...charset, emptyChar, ...charset];

        if (size < 0) {
            chunked = chunked.reverse();
        }

        let offset = 1;

        if (value === undefined) {
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
    function next(current?: DigitizedValue, target?: DigitizedValue | DigitizedValues, count: number = 1) {
        if (target === undefined && current === emptyChar) {
            return undefined;
        }
        else if (typeof target === 'string' && !charset.includes(target)) {
            return target;
        }

        if (current && (isWhitelisted(current) || target === current)) {
            return current;
        }

        if (current && isBlacklisted(current)) {
            return nearest(current);
        }

        const matches = chunk(current, count);

        if (typeof target === 'string' && matches.includes(target)) {
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
    function prev(current?: DigitizedValue, target?: DigitizedValue | DigitizedValues, count: number = 1) {

        if (target === undefined && current === emptyChar) {
            return undefined;
        }
        else if (typeof target === 'string' && !charset.includes(target)) {
            return target;
        }

        if (current && (isWhitelisted(current) || target === current)) {
            return current;
        }

        if (current && isBlacklisted(current)) {
            return nearest(current);
        }

        const matches = chunk(current, -count);

        if (typeof target === 'string' && matches.includes(target)) {
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
    };
}