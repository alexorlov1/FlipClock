import Attributes from "./types/Attributes";

/**
 * The Dictionary class translates strings using a definition file.
 * 
 * @public
 */
export default class Dictionary {
    /**
     * A map of definitions used to translate strings.
     * 
     * @readonly
     */
    protected readonly definitions: Map<string,string>;

    /**
     * Instnatiate a Dictionary.
     * 
     * @param definitions - An object of key/value pairs
     */
    constructor(definitions: Attributes = {}) {
        this.definitions = new Map(
            Object.entries(definitions).map(([key, value]) => [
                key.toLowerCase(), String(value)
            ])
        );
    }

    /**
     * Get the definition
     * 
     * @param value - The string to translate.
     * @returns The translated string.
     */
    get(value?: string): string|undefined {
        return this.definitions.get(value?.toLowerCase()) || value;
    }
}