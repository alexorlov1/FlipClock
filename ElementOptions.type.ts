type ElementOptions<T> = {
    tagName: T;
    el?: ChildNode | Element | null;
    class?: HTMLClassAttribute;
    style?: HTMLStyleAttribute;
    attrs?: HTMLAttributes;
    children?: ElementChildren;
    events?: {
        [K in keyof GlobalEventHandlers]?: GlobalEventHandlers[K];
    };
};