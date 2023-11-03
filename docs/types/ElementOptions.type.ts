type ElementOptions<T> = {
    tagName: T;
    el?: ChildNode | Element | null;
    class?: HTMLClassAttribute;
    style?: HTMLStyleAttribute;
    attrs?: HTMLAttributes;
    children?: (ElementChildElement)[] | ((el: Element) => ElementChildElement[]);
    events?: {
        [K in keyof GlobalEventHandlers]?: GlobalEventHandlers[K];
    };
};