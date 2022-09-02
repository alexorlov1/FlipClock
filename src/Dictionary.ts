import Attributes from "./types/Attributes";

export default class Dictionary {
    protected readonly definitions: Attributes;

    constructor(
        definitions: Attributes = {}
    ) {
        this.definitions = new Map(
            Object.entries(definitions).map(([key, value]) => [
                key.toLowerCase(), value
            ])
        );
    }

    /**
     * Get the definition
     * 
     * @param {string} value 
     * @returns {string|undefined}
     */
    get(value?: string): string|undefined {
        return this.definitions.get(value?.toLowerCase()) || value;
    }
}