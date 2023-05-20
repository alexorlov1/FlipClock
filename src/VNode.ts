import { Attributes } from './helpers/dom';

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
    public attributes: Attributes = {}

    /**
     * The element's text content.
     */
    public readonly textContent?: string|number = undefined

    /**
     * The element's children nodes.
     */
    public readonly childNodes: VNode[] = []

    /**
     * The type of node this is.
     */
    public readonly type: string | undefined = undefined;

    /**
     * Construct the VNode.
     */
    constructor(tagName: string, attributes: Attributes = {}, childNodes: VNode[] = []) {
        // Set the tagname as always lowercase.
        this.tagName = tagName.toLowerCase();

        // Set the child nodes.
        this.childNodes = childNodes;     
        
        // Set the node type.
        this.type = attributes?.type as string | undefined || tagName;

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