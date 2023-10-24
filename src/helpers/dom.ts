
export type HTMLClassAttribute = string | string[] | Record<string,boolean|undefined|null>;

export type HTMLStyleAttribute = {
    [K in keyof CSSStyleDeclaration]?: string
} | string;

export type HTMLAttributes = Record<string,string>

export function classes(values?: HTMLClassAttribute): string {
    if(!values) {
        return '';
    }
    
    const classes: string[] = [];

    if(typeof values === 'string') {
        classes.push(values); 
    }
    else if(Array.isArray(values)) {
        classes.push(...values);
    }
    else if(values) {
        for(const [key, value] of Object.entries(values)) {
            if(value) {
                classes.push(...key.split(' '))
            }
        }
    }

    return classes.join(' ');
}

export function style(value: HTMLStyleAttribute): string {
    if(typeof value === 'string') {
        return value
    }

    return Object.entries(value).map(([key, value]) => {
        return `${key}:${value}`;
    }).join(';')
}

export function attributes(value: HTMLAttributes): Record<string,string> {
    const attributes: Record<string,string> = {}

    return { ...value, ...attributes } as Record<string,string>;
}

export type ElementChildElement = Element|undefined|null|false;
export type ElementChildren = (ElementChildElement)[] | ((el: Element) => ElementChildElement[]);

export type ElementOptions<T> = {
    tagName: T,
    el?: Element | null,
    class?: HTMLClassAttribute,
    style?: HTMLStyleAttribute,
    attrs?: HTMLAttributes,
    textContent?: string,
    children?: ElementChildren,
    events?: {
        [K in keyof GlobalEventHandlers]?: GlobalEventHandlers[K]
    }
}

export function el<T extends keyof HTMLElementTagNameMap>(options: ElementOptions<T>): HTMLElementTagNameMap[T] {
    const { el, tagName, attrs, class: classAttr, events, style: styleAttr, textContent } = options;
    
    const subject = el?.tagName?.toLowerCase() === tagName.toLowerCase()
        ? el as HTMLElementTagNameMap[T]
        : document.createElement(tagName);

    if(classAttr) {
        subject.setAttribute('class', classes(classAttr));
    }

    if(styleAttr) {
        subject.setAttribute('style', style(styleAttr));
    }

    if(attrs) {
        for(const [key, value] of Object.entries(attrs)) {
            subject.setAttribute(key, value);
        }
    }

    if(events) {
        for(const key in events) {
            const fn = events[key as keyof GlobalEventHandlers];

            if(!fn) {
                continue;
            }
            
            subject.addEventListener(key.replace(/^on/, ''), (event) => {
                // @ts-ignore
                fn.apply(subject, [event]);
            })
        }
    }

    if(textContent) {
        subject.textContent = textContent;   
    }

    let { children } = options;

    if(children) {
        if(typeof children === 'function') {
            children = children(subject);
        }
    
        let count = 1;

        if(Array.isArray(children)) {
            for(const child of children) {
                if(!child || child?.parentElement === subject) {
                    continue;
                }

                subject.append(child);
            }

            count = children.length;
        }
        else if(children) {
            subject.append(children);
        }

        while(subject.children.length > count && subject.lastChild) {
            subject.removeChild(subject.lastChild);
        }
    }

    return subject;
}