import Dictionary from "../Dictionary";
import Attributes from "../types/Attributes";

/**
 * The registered language dictionaries.
 */
const languages = new Map<string,Dictionary>();

/**
 * Setter and getter for languages. If a dictionary is defined, it registers
 * the language. If no dictionary is defined, it gets the registered language.
 * 
 * @public
 * @param aliases - The alias of the language
 * @param definitions - The key/value pair of language definitions.
 * @returns An instance of the Dictionary.
 */
export default function language(alias: string|string[], definitions?: Attributes): Dictionary {
    if(Array.isArray(alias)) {
        let dictionary;

        for(const key of alias) {
            dictionary = language(key, definitions);
        }

        return dictionary;
    }
    
    if(definitions === undefined) {
        return languages.get(alias) || new Dictionary;
    }

    const dictionary: Dictionary = new Dictionary(definitions);

    languages.set(alias, dictionary);

    return dictionary;
}