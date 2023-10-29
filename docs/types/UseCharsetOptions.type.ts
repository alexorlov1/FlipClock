type UseCharsetOptions = {
    blacklist?: string[];
    charset?: (shuffle?: boolean) => string[];
    emptyChar?: string;
    shuffle?: ((chars: string[]) => string[]) | boolean;
    whitelist?: string[];
};