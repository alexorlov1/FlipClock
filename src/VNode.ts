import { diff, render } from './functions';

/** 
 * The Attributes interface defines generic key/value pairs.
 * 
 * @public 
 */
export type Attributes = Record<string, string>;

/** 
 * The DOMElement interface provides a way to render objects in the DOM.
 * 
 * @public 
 */
export interface DomElement {
    /**
     * Render the element for the DOM.
     */
    render(): VNode
}

/** 
 * The ChildNode type defines what is renderable DOM node.
 * 
 * @public 
 */
export type ChildNode = VNode | DomElement | string | number;

/**
 * The VNode is a virtual representation of a DOM element. It is used to diff
 * the DOM to only make updates to the DOM when something changes.
 * 
 * @public
 */
export default class VNode {

    /**
     * The rendered Element.
     */
    public el: Element

    /**
     * The element's tagname.
     */
    public readonly tagName: string

    /**
     * The element's attributes.
     */
    public readonly attributes: Attributes = {}

    /**
     * The element's text content.
     */
    public readonly textContent?: string

    /**
     * The element's children nodes.
     */
    public readonly childNodes: VNode[]

    /**
     * The element's event bindings.
     */
    public readonly on: Attributes = {}

    /**
     * Construct the VNode.
     */
    constructor(tagName: string, attributes: Attributes = {}, childNodes: VNode[] = []) {
        // Set the tagname as always lowercase.
        this.tagName = tagName.toLowerCase();
        this.childNodes = childNodes;
        this.textContent = undefined;
        
        // Set the propetires and attributes.
        for(const [key, value] of Object.entries(attributes)) {
            if(this.hasOwnProperty(key)) {
                this[key] = value;
            }
            else {
                this.attributes[key] = value;
            }
        }
    }

    /**
     * Render the VNode.
     * 
     * @returns The rendered element
     */
    render(): Element {
        return this.el = render(this);
    }

    /**
     * Mount the VNode to the DOM.
     * 
     * @param el - The DOM element used to mount the VNode.
     */
    mount(el: Element): void {
        if(!this.el) {
            this.render();
        }

        diff(this, el);
    }
}