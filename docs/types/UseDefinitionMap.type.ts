type UseDefinitionMap<V> = {
    map: Map<string, V>;
    define: (key: string | Record<string, V>, value?: V) => void;
    unset: (keys: string | string[]) => void;
};