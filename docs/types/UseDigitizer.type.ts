type UseDigitizer = {
    digitize: (value: any) => DigitizedValues;
    undigitize: (value: DigitizedValues) => string | DigitizedValues;
    isDigitized: (value: any) => boolean;
};