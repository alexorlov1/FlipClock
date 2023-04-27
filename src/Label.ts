import { h } from "./functions";
import { DomElement } from "./types";
import VNode from "./VNode";

/**
 * The Label class builds a textual label for the UI. The Label doesn't do
 * anything by itself, other than render its own structure. This class is meant
 * to be implemented by the clock face.
 * 
 * @public
 */
export default class Label implements DomElement {
    /**
     * The label's value.
     * 
     * @readonly
     */
    protected readonly value: string;

    /**
     * Construct the Label.
     * 
     * @param value - The label's value.
     */
    constructor(value: string) {
        this.value = value;
    }
    
    /**
     * Render the VNode.
     * 
     * @returns The rendered VNode.
     */
    render(): VNode {
        return h('div', {
            class: 'flip-clock-label'
        }, [this.value])
    }
}