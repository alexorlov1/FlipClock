export type Translator = (value: string) => string;

export type DictionaryRecord = Record<string, string | Translator>
export type DictionaryMap = Map<string, string | Translator>
export type DefinitionTerms = Record<string, string | Translator>;

var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;

/**
 * Create a new date string formatter.
 */
export function useDictionary(definitions: DefinitionTerms = {}) {
    const dictionary: DictionaryMap = new Map(Object.entries(definitions));

    function translate(key: string): string {
        const term = dictionary.get(key);

        if (typeof term === 'function') {
            return term(key);
        }

        if (term === undefined) {
            return key;
        }

        return term;
    }

    function define(key: string, value: string)
    function define(key: DictionaryRecord)
    function define(key: string | DictionaryRecord, value?: string): void {
        if(typeof key === 'string') {
            dictionary.set(key, value);
        }
        else {
            for (const entry of Object.entries(key)) {
                dictionary.set(entry[0], entry[1]);
            }
        }        
    }

    function undefine(keys: string|string[]): void {
        if (Array.isArray(keys)) {
            for(const key of keys) {
                dictionary.delete(key);
            }
        }
        else {
            dictionary.delete(keys);
        }
    }

    return {
        dictionary,
        translate,
        define,
        undefine,
    }
}