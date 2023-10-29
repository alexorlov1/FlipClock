type HTMLStyleAttribute = {
    [K in keyof CSSStyleDeclaration]?: string;
} | string;