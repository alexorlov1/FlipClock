type UseDateFormats = UseDefinitionMap<DateFlagFormatFunction> & {
    format: (date: Date, format: string) => string;
    parse: (date: Date, format: string) => DigitizedValues;
};