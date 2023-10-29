type UseDurationFormats = {
    map: Map<string, DurationMapDefinition>;
    define: DefineFunction<DurationMapDefinition>;
    duration: (left: Date, right: Date, keys?: (keyof Duration)[]) => Duration;
    format: (left: Date, right: Date, format: string) => string;
    unset: UnsetFunction;
};