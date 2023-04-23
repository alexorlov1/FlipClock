import { diff, render } from './functions';
import type Attributes from './types/Attributes';

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
     * 
     * @readonly
     */
    public readonly tagName: string

    /**
     * The element's attributes.
     * 
     * @readonly
     */
    public readonly attributes: Attributes = {}

    /**
     * The element's text content.
     * 
     * @readonly
     */
    public readonly textContent?: string

    /**
     * The element's children nodes.
     * 
     * @readonly
     */
    public readonly childNodes: VNode[]

    /**
     * The element's event bindings.
     * 
     * @readonly
     */
    public readonly on: Attributes = {}

    /**
     * Construct the VNode.
     * 
     * @param tagName - The tagName of the VNode element.
     * @param attributes - The attributes used to create the VNode.
     * @param childNodes - The children elements
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