export type Translator = (value: string) => string;

export type DictionaryRecord = Record<string, string | Translator>
export type DictionaryMap = Map<string, string | Translator>
export type DefinitionTerms = Record<string, string | Translator>;

export type DefineFunction<V> = (key: string | Record<string,V>, value?: V) => void;

export type UnsetFunction = (key: string | string[]) => void;

export type UseDefinitionMap<V> = {
    map: Map<string,V>
    define: (key: string | Record<string, V>, value?: V) => void
    unset: (keys: string | string[]) => void
}

/**
 * A definition map is a reusable interface to create key/value pairs.
 */
export function useDefinitionMap<V>(items: [string, V][]): UseDefinitionMap<V> {
    const map = new Map(items);

    // function define(key: Record<string,V>): void
    // function define(key: string, value: V): void
    function define(key: string | Record<string, V>, value?: V): void {
        if(typeof key === 'string' && value) {
            map.set(key, value);
        }
        else if(typeof key === 'object') {
            for (const entry of Object.entries(key)) {
                map.set(entry[0], entry[1]);
            }
        }        
    }

    // function unset(keys: string): void
    // function unset(keys: string[]): void
    function unset(keys: string|string[]): void {
        if (Array.isArray(keys)) {
            for(const key of keys) {
                map.delete(key);
            }
        }
        else {
            map.delete(keys);
        }
    }

    return {
        map, define, unset
    }
}

/**
 * Create a new date string formatter.
 */
export function useDictionary(definitions: DefinitionTerms = {}) {
    const { map, define, unset } = useDefinitionMap(Object.entries(definitions));
    
    function translate(key: string): string {
        const term = map.get(key);

        if (typeof term === 'function') {
            return term(key);
        }

        if (term === undefined) {
            return key;
        }

        return term;
    }

    return {
        map,
        define,
        translate,
        unset,
    }
}