type UseDigitizer = {
    digitize: (value: any) => DigitizedValues;
    undigitize: (value: DigitizedValues) => DigitizedValue;
    isDigitized: (value: any) => boolean;
};