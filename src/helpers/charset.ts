import { DigitizedValue } from './digitizer';

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
    ];
}

export type CreateCharset = (shuffle?: boolean) => string[]

export type ShuffleFunction = (chars: string[]) => string[]

export type CharsetOptions = {
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
export function useCharset(options: CharsetOptions = {}) {
    const blacklist = options.blacklist || [];
    const whitelist = options.whitelist || [];
    const cache: CharsetCache = new Map<string, string[]>();

    const shuffle: ShuffleFunction = options.shuffle && (
        typeof options.shuffle === 'function' ? options.shuffle : fisherYatesShuffle
    );

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
     * Gets the charset for the given key. If no key is given, just generate a
     * new charset each time.
     */
    function get(key: string): string[] {
        if(!cache.has(key)) {
            cache.set(key, shuffle(charset.slice(0)));
        }

        return cache.get(key);
    }

    // /**
    //  * Generates a random array of character from the given key.
    //  */
    // function chars(key?: string, count: number = 1, after?: DigitizedValue): string[] {
    //     const cache = get(key).filter(value => !isBlacklisted(value));
    //     const index = cache.indexOf(after);
        
    //     let start = Math.max(0, after && index + 1);
        
    //     if(index >= cache.length - 1) {
    //         start = 0;
    //     }

    //     const trailing = cache.slice(start, start + count);

    //     if(trailing.length < count) {
    //         trailing.push(...cache.slice(0, count - trailing.length));
    //     }

    //     return trailing.slice(0, count);
    // }

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
    function chunk(value: DigitizedValue, size: number): string[] {
        const index = charset.indexOf(value);
        
        const start = size > 0 ? index + 1 : size;

        const matches = size > 0
            ? charset.slice(start, start + size)
            : charset.slice(Math.max(0, index + size), index);

        if (matches.length === Math.abs(size)) {
            return matches;
        }

        if(size > 0) {
            matches.push(...charset.slice(0, size - matches.length));
        }
        else {
            matches.unshift(...charset.slice(size + matches.length));
        }

        return matches.slice(0, charset.length);
    }   

    /**
     * Get the next character in the charset relative to the given value.
     */
    function next(value: DigitizedValue, targetValue: DigitizedValue, count: number = 1) {
        if(isWhitelisted(value) || targetValue === value) {
            return value;
        }

        if (isBlacklisted(value)) {
            return nearest(value);
        }

        const matches = chunk(value, count + 1);

        if (matches.includes(targetValue)) {
            return targetValue;
        }

        return matches[count - 1];
    }

    /**
     * Get the prev character in the charset relative to the given value.
     */
    function prev(value: DigitizedValue, targetValue: DigitizedValue, count: number = 1) {
        if (isWhitelisted(value) || targetValue === value) {
            return value;
        }

        if (isBlacklisted(value)) {
            return nearest(value);
        }

        const matches = chunk(value, Math.abs(count) * -1);

        if (matches.includes(targetValue)) {
            return targetValue;
        }

        return matches[0];
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
        // chars,
        charset,
        chunk,
        isBlacklisted,
        isWhitelisted,
        next,
        prev
    }
}