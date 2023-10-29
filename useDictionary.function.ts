function useDictionary(definitions?: DefinitionTerms): {
    map: Map<string, string | Translator>;
    define: (key: string | Record<string, string | Translator>, value?: string | Translator | undefined) => void;
    translate: (key: string) => string;
    unset: (keys: string | string[]) => void;
};