type UseDateFormatOptions = {
    digitizer?: UseDigitizer;
    translate?: Translator | UseDictionary;
    formats?: Record<string, DateFlagFormatFunction>;
};