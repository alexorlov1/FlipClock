import VNode from "../../VNode";
import { DomElement, h } from "../../helpers/dom";

/**
 * The Label class builds a textual label for the UI. The Label doesn't do
 * anything by itself, other than render its own structure. This class is meant
 * to be implemented by the clock face.
 * 
 * @public
 */
export class Label implements DomElement {
    /**
     * The label's value.
     */
    protected readonly value: string;

    /**
     * Construct the Label.
     */
    constructor(value: string) {
        this.value = value;
    }
    
    /**
     * Render the VNode.
     */
    render(): VNode {
        return h('div', {
            class: 'flip-clock-label'
        }, [this.value])
    }
}