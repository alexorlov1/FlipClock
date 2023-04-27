import { DigitizedValue } from './digitizer';

/**
 * Get a range of numbers using the given size and starting point.
 */
export function range(size: number, startAt: number = 0): number[] {
    return [...Array(size).keys()].map(i => i + startAt);
}

/**
 * Generates a random array of characters using the given range.
 */
export function characterRange(startChar: string, endChar: string): string[] {
    const nums = range(
        endChar.charCodeAt(0) + 1 - startChar.charCodeAt(0), startChar.charCodeAt(0)
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
    ];
}

export type CreateCharset = (shuffle?: boolean) => string[]

export type ShuffleFunction = (chars: string[]) => string[]

export type CharsetParams = {
    whitelist?: string[]
    blacklist?: string[],
    charset?: CreateCharset,
    shuffle?: boolean|ShuffleFunction
}

export type CharsetCache = Map<string, string[]>;

/**
 * A use function to capture the state of the spin cycle so that random
 * characters may be generated for each digit without repeats. When the random
 * 
 * @public
 */
export function useCharset(params: CharsetParams = {}) {
    const blacklist = params.blacklist || [];
    const whitelist = params.whitelist || [];
    const cache: CharsetCache = new Map<string, string[]>();
    const groups: Record<number, string[]> = {};

    const shuffle: ShuffleFunction = params.shuffle && (
        typeof params.shuffle === 'function' ? params.shuffle : fisherYatesShuffle
    );

    /**
     * Creates a charset and shuffles it if required.
     */
    function charset(): string[] {
        const fn: CreateCharset = params?.charset || defaultCharset;

        return shuffle ? shuffle(fn()) : fn();
    };

    /**
     * Gets the charset for the given key. If no key is given, just generate a
     * new charset each time.
     */
    function get(key?: string): string[] {
        if(key === undefined) {
            return charset();
        }        

        if(!cache.has(key)) {
            cache.set(key, charset());
        }

        return cache.get(key);
    }

    /**
     * Generates a random array of character from the given key.
     */
    function chars(key?: string, count: number = 1, after?: DigitizedValue): string[] {
        const cache = get(key).filter(value => !isBlacklisted(value));
        const index = cache.indexOf(after);
        
        let start = Math.max(0, after && index + 1);
        
        if(index >= cache.length - 1) {
            start = 0;
        }

        const trailing = cache.slice(start, start + count);

        if(trailing.length < count) {
            trailing.push(...cache.slice(0, count - trailing.length));
        }

        return trailing.slice(0, count);
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
        chars,
        get,
        isBlacklisted,
        isWhitelisted
    }
}