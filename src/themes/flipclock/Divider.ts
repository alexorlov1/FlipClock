import VNode from "../../VNode";
import { DomElement, h } from "../../helpers/dom";

/**
 * The Divider class displays dividers between cards in a clock face. For
 * examples, the 'hh:mm:ss' would have two ":" dividers. The dividers have no
 * corresponding digit.
 * 
 * @public
 */
export default class Divider implements DomElement {
    /**
     * The character used for the divider.
     * 
     * @readonly
     */
    protected readonly character: string;

    /**
     * Instantiate a Divider.
     * 
     * @param character - The character used for the divider.
     */
    constructor(character: string = ':') {
        this.character = character;
    }
    
    /**
     * Render the VNode.
     * 
     * @returns The rendered VNode.
     */
    render(): VNode {
        return h('div', {
            class: 'flip-clock-divider'
        }, [
            h('div', {
                class: 'flip-clock-divider-inner'
            }, [this.character])
        ])
    }
}