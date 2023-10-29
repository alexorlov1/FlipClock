type UseCharset = {
    charset: string[];
    emptyChar: string;
    chunk: (value: DigitizedValue | undefined, size: number) => string[];
    isBlacklisted: (value: DigitizedValue) => boolean;
    isWhitelisted: (value: DigitizedValue) => boolean;
    next: (value?: DigitizedValue, target?: DigitizedValue | DigitizedValues, count?: number) => DigitizedValue | undefined;
    prev: (value?: DigitizedValue, target?: DigitizedValue | DigitizedValues, count?: number) => DigitizedValue | undefined;
};