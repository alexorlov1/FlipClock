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
     * Instantiate a Divider.
     */
    constructor(
        protected readonly character: string = ':'
    ) {
        //       
    }
    
    /**
     * Render the VNode.
     * 
     * @returns The rendered VNode.
     */
    render(): VNode {
        return h('div', {
            class: 'flip-clock-divider',
            type: 'flip-clock-divider'
        }, [
            h('div', {
                class: 'flip-clock-divider-inner'
            }, [this.character])
        ])
    }
}