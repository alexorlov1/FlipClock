type UseDateFormats = {
    map: DateMapDefinition;
    define: DefineFunction<DateFlagFormatFunction>;
    format: DateFormatFunction;
    parse: DateParseFunction;
    unset: UnsetFunction;
};