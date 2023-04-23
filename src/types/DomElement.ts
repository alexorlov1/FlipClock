import VNode from '../VNode';

/** 
 * The DOMElement interface provides a way to render objects in the DOM.
 * 
 * @public 
 */
export default interface DomElement {
    /**
     * Render the element for the DOM.
     * 
     * @returns The rendered VNode.
     */
    render(): VNode
}