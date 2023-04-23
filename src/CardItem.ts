import { h } from "./functions";
import DomElement from "./types/DomElement";
import VNode from "./VNode";

/** 
 * The CardItem generates the top and bottom elements for the parent Card class.
 * 
 * @public 
 */
export default class CardItem implements DomElement {
    /**
     * The card item's value.
     */
    public className: string;

    /**
     * The card item's value.
     */
    public value: string;

    /**
     * Instantiate a CardItem.
     * 
     * @param value - The card value
     * @param className - Additional CSS classes
     */
    constructor(value: string = '', className: string = '') {
        this.value = value;
        this.className = className;
    }
    
    /**
     * Render the VNode.
     * 
     * @returns The rendered VNode.
     */
    render(): VNode {
        return h('div', {
            class: `flip-clock-card-item ${this.className}`
        }, [
            h('div', {
                class: 'flip-clock-card-item-inner'
            }, [
                h('div', { class: 'top' }, [this.value]),
                h('div', { class: 'bottom' }, [this.value]),
            ])
        ])
    }
}