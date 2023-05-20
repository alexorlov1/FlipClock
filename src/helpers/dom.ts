import VNode from "../VNode";

const pattern: RegExp = /<!--(.+?)-->/gim;

export type Listener = (e: Event) => void;

export type Attributes = Record<string, number | string | Listener>;

export interface DomElement {
    render(): VNode
}

export type ChildNode = VNode | DomElement | string | number;

export type Children = ChildNode[];

// /**
//  * Determines if the given string is a comment.
//  */
// export function isComment(value: number | string | DomElement): boolean {
//     return typeof value === 'string' && !!value.match(pattern);
// }

/**
 * Is the given value a DOM element?
 */
export function isDomElement(value: number | string | DomElement): value is DomElement {
    return value && typeof value === 'object' && 'render' in value;
}

var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;

/**
 * Bind the events from the vnode to the element.
 */
export function bindEvents(el: Element, vnode: VNode) {
    for (let key in vnode.attributes) {
        if (typeof vnode.attributes[key] !== 'function') {
            continue;
        }

        el.addEventListener(
            (key.startsWith('on') ? key.slice(2) : key).toLowerCase(),
            vnode.attributes[key] as Listener
        );
    }
}

/**
 * Unbind the events from the vnode to the element.
 */
export function unbindEvents(el: Element, vnode: VNode) {
    for (const key in vnode.attributes) {
        if (typeof vnode.attributes[key] !== 'function') {
            continue;
        }

        el.removeEventListener(
            (key.startsWith('on') ? key.slice(2) : key).toLowerCase(),
            vnode.attributes[key] as Listener
        );
    }
}

/**
 * Set the attributes from the vnode on the element.
 */
export function setAttributes(el: Element, vnode: VNode) {
    for (const key in vnode.attributes) {
        if (typeof vnode.attributes[key] === 'function') {
            continue;
        }

        el.setAttribute(key, vnode.attributes[key].toString())
    }
}

/**
 * Create a virtual DOM node.
 */
export function h(
    tagName: string | DomElement,
    attrs?: Attributes | Children | string | number,
    children?: Children | string | number
): VNode {
    if(isDomElement(tagName)) {
        return tagName.render();
    }
    
    let $attrs: Attributes = {};
    let $children: Children = typeof children === 'string' || typeof children === 'number'
        ? [ children ]
        : ( children || [] );

    if (typeof attrs === 'string' || typeof attrs === 'number') {
        $children = [attrs];
    }
    else if (Array.isArray(attrs)) {
        $children = attrs;
    }
    else if(attrs) {
        $attrs = attrs;
    }

    return new VNode(tagName, $attrs, $children.filter(value => value !== undefined).map(child => {
        if (child instanceof VNode) {
            return child;
        }
        
        if (isDomElement(child)) {
            return child.render();
        }

        // if (isComment(child)) {
        //     return h('comment', {
        //         textContent: (child as string).replace(pattern, '$1')
        //     });
        // }

        return h('text', {
            textContent: child
        });
    }));
}

/**
 * Creates the DOM element from the VNode.
 */
export function createElement(vnode: VNode): Element {
    const tags = {
        'text': (vnode: VNode): Text => document.createTextNode(String(vnode.textContent)),
        'comment': (vnode: VNode): Comment => document.createComment(String(vnode.textContent)),
        'element': (vnode: VNode): Element => document.createElement(vnode.tagName)
    };

    return tags[vnode.tagName]
        ? tags[vnode.tagName](vnode)
        : tags['element'](vnode);
}

/**
 * Get the type for a node.
 */
export function getNodeType(node: Node): string | null {
    if (node.nodeType === 3) return 'text';
    if (node.nodeType === 8) return 'comment';
    if (node.nodeType === 11) return 'fragment';

    return node instanceof Element
        ? node.tagName.toLowerCase()
        : null;
};

/**
 * Determines if the element should be replaced by checking if the tag names
 * do not match, or if the tag names are text.
 */
export function shouldReplaceElement(el: Node, vnode: VNode): boolean {
    return vnode.tagName !== getNodeType(el)
        || vnode.tagName === 'text' && String(vnode.textContent) !== String(el.textContent);
}

/**
 * Get the interesction of attributes from the vnode and the element.
 */
export function instersectAttributes(el: Element, vnode: VNode) {
    const removed = [], added = [], modified = [];

    for (const i in vnode.attributes) {
        const value = el.getAttribute(i);

        if (typeof vnode.attributes[i] === 'function') {
            continue;
        }
        
        if (!el.hasAttribute(i)) {
            added.push({
                attribute: i,
                value: vnode.attributes[i]
            });
        }
        else if (value !== vnode.attributes[i]) {
            modified.push({
                attribute: i,
                from: value,
                to: vnode.attributes[i]
            });
        }
    }

    // Remove the attributes that are no longer there.
    for (const i of el.getAttributeNames()) {
        if (!vnode.attributes[i]) {
            removed.push({
                attribute: i,
                value: el.getAttribute(i)
            });
        }
    }

    return {
        added, modified, removed
    }
}

/**
 * Sync the attributes from the vnode on the element.
 */
export function diffAttributes(el: Element, vnode: VNode): void {
    const { added, modified, removed } = instersectAttributes(el, vnode);

    // Add the new attributes
    for (const i in added) {
        el.setAttribute(added[i].attribute, added[i].value);
    }

    // Modify the attributes
    for (const i in modified) {
        el.setAttribute(modified[i].attribute, modified[i].to);
    }

    // Remove the attributes that are no longer there.
    for (const i in removed) {
        el.removeAttribute(removed[i].attribute);
    }
}

/**
 * Diff the VNode and Node and sync the changes with the DOM node.
 */
export function diff(el: Node, vnode: VNode, prevNode?: VNode): void {
    // If the element is not the same type, replace with the new element.
    // Since the element is replaced, there is no need to do anything.        
    if (shouldReplaceElement(el, vnode)) {
        el.parentNode?.replaceChild(render(vnode), el);

        return;
    }

    if (el instanceof Element) {
        // Sync the attributes from the vnode instance to the dom element.
        diffAttributes(el, vnode);

        // If there is a prev node, unbind the events from it.
        if (prevNode) {
            unbindEvents(el, prevNode);
        }

        // Bind the events from the vnode to the element.
        bindEvents(el, vnode);
    }

    // If extra elements in DOM, remove them. The children of the vnode and the
    // el should match.
    while (vnode.childNodes.length < el.childNodes.length) {
        el.removeChild(el.childNodes[el.childNodes.length - 1]);
    }

    // Loop through the children to recursively run the sync.
    for(const i in vnode.childNodes) {
        if (!el.childNodes[i]) {
            el.appendChild(render(vnode.childNodes[i]));
        }
        
        diff(el.childNodes[i], vnode.childNodes[i], prevNode?.childNodes[i]);
    }
}

/**
 * Render the VNode as a DOM element.
 */
export function render<T = HTMLElement | Element | Text | Comment>(vnode: VNode): T {
    // Create the DOM element
    const el = createElement(vnode);

    if (vnode.isText) {
        el.textContent = typeof vnode.textContent === 'string'
            ? vnode.textContent
            : vnode.textContent.toString();
    }    
    // Set the attributes on the element.
    else if (vnode.isElement) {
        bindEvents(el, vnode);
        setAttributes(el, vnode);
    }

    // Append the children to the new element
    for (const child of vnode.childNodes) {
        el.appendChild(render(child));
    }

    // Return the new element
    return el as T;
}