export type Translator = (value: string) => string;

export type Dictionary = Record<string, string | Translator>;

var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;

/**
 * Create a new date string formatter.
 */
export function useDictionary(dictionary: Dictionary = {}) {
    function translate(key: string): string {
        const term = dictionary[key];

        if (typeof term === 'function') {
            return term(key);
        }

        if (term === undefined) {
            return key;
        }

        return term;
    }

    function define(key: string | Record<string, string>)
    function define(key: string | Record<string, string>, value?: string): void {
        if(typeof key === 'string') {
            dictionary[key] = value;
        }
        else {
            Object.assign(dictionary, key)
        }
    }

    function undefine(keys: string|string[]): void {
        if (!Array.isArray(keys)) {
            keys = [keys];
        }

        for (const i of keys) {
            delete dictionary[i];
        }
    }

    return {
        translate,
        define,
        undefine,
    }
}