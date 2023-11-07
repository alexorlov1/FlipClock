/**
 * HTML class attribute.
 * 
 * @public
 */
export type HTMLClassAttribute = string | string[] | Record<string, boolean | undefined | null>;

/**
 * HTML style attribute.
 * 
 * @public
 */
export type HTMLStyleAttribute = {
    [K in keyof CSSStyleDeclaration]?: string
} | string;

/**
 * HTML attributes object.
 * 
 * @public
 */
export type HTMLAttributes = Record<string, string>

/**
 * Child element nodes.
 * 
 * @public
 */
export type ElementChildElement = ChildNode | string | undefined | null | false;

/**
 * The options for `el()`.
 * 
 * @public
 */
export type ElementOptions<T> = {
    tagName: T,
    el?: ChildNode | Element | null,
    class?: HTMLClassAttribute,
    style?: HTMLStyleAttribute,
    attrs?: HTMLAttributes,
    children?: (ElementChildElement)[] | ((el: Element) => ElementChildElement[]),
    events?: {
        [K in keyof GlobalEventHandlers]?: GlobalEventHandlers[K]
    }
}

/**
 * Create a document element.
 * 
 * @public
 */
export function el<T extends keyof HTMLElementTagNameMap>(options: ElementOptions<T>): HTMLElementTagNameMap[T] {
    const { el, tagName, attrs, class: classAttr, events, style: styleAttr } = options;

    const subject = el && 'tagName' in el && el?.tagName?.toLowerCase() === tagName.toLowerCase()
        ? el as HTMLElementTagNameMap[T]
        : document.createElement(tagName);

    // Remove the existing attributes
    if (el && 'attributes' in el && el?.attributes) {
        for (const { name } of el.attributes) {
            subject.removeAttribute(name);
        }
    }

    // Add the new attribute
    if (attrs) {
        for (const [key, value] of Object.entries(attrs)) {
            subject.setAttribute(key, value);
        }
    }

    // Set the class attribute.
    if (classAttr) {
        const value = classes(classAttr);

        if (value) {
            subject.setAttribute('class', value);
        }
        else {
            subject.removeAttribute('class');
        }
    }

    // Set the style attribute
    if (styleAttr) {
        subject.setAttribute('style', style(styleAttr));
    }

    // Bind the events
    if (events) {
        for (const key in events) {
            const fn = events[key as keyof GlobalEventHandlers];

            subject.addEventListener(key.replace(/^on/, ''), (event) => {
                // @ts-ignore
                fn.apply(subject, [event]);
            });
        }
    }

    let { children } = options;

    if (typeof children === 'function') {
        children = children(subject);
    }

    const childrenNodes = children?.filter(
        value => typeof value === 'string' || value instanceof Node
    ) as (ChildNode | string)[] | undefined;

    if (childrenNodes && childrenNodes.length) {
        for (let i = 0; i < childrenNodes.length; i++) {
            const child = childrenNodes[i];
            const childNode = subject.childNodes.item(i);

            if (childNode === child) {
                continue;
            }

            if (!subject.childNodes[i]) {
                subject.append(child);
            }
            else {
                childNode.replaceWith(child);
            }
        }

        while (subject.childNodes.length > childrenNodes?.length) {
            subject.childNodes[subject.childNodes.length - 1]?.remove();
        }
    }
    else {
        while (subject.childNodes.length) {
            subject.lastChild?.remove();
        }
    }

    return subject;
}

/**
 * Derive the class attribute value.
 * 
 * @public
 */
export function classes(values?: HTMLClassAttribute): string {
    if (!values) {
        return '';
    }

    const classes: string[] = [];

    if (typeof values === 'string') {
        classes.push(values);
    }
    else if (Array.isArray(values)) {
        classes.push(...values);
    }
    else if (values) {
        for (const [key, value] of Object.entries(values)) {
            if (value) {
                classes.push(...key.split(' '));
            }
        }
    }

    return classes.join(' ');
}

/**
 * Derive the style attribute value.
 * 
 * @public
 */
export function style(value: HTMLStyleAttribute): string {
    if (typeof value === 'string') {
        return value;
    }

    return Object.entries(value).map(([key, value]) => {
        return `${key}:${value}`;
    }).join(';');
}