import { Attributes, ChildNode, DomElement, h } from './helpers/dom';

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
    public el: Element | Text | Comment;

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
    public readonly textContent?: string|number = undefined

    /**
     * The element's children nodes.
     */
    public readonly childNodes: VNode[] = []

    /**
     * Construct the VNode.
     */
    constructor(tagName: string, attributes: Attributes = {}, childNodes: ChildNode[] = []) {
        // Set the tagname as always lowercase.
        this.tagName = tagName.toLowerCase();

        // Set the child nodes.
        this.childNodes = childNodes.map(child => {
            if(child instanceof VNode) {
                return child;
            }
            else if (!(typeof child === 'object')) {
                return h('text', { textContent: child });
            }
            else if('render' in child) {
                return (child as DomElement).render()
            }
        }).filter(child => child !== undefined);        

        // Set the propetires and attributes.
        for(const key in attributes) {
            if(this.hasOwnProperty(key)) {
                this[key] = attributes[key];
            }
            else {
                this.attributes[key] = attributes[key];
            }
        }
    }

    get isText(): boolean {
        return this.tagName === 'text';
    }

    get isComment(): boolean {
        return this.tagName === 'comment';
    }

    get isElement(): boolean {
        return !this.isText && !this.isComment;
    }
}