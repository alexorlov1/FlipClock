import { prop } from "../../functions";
import { DomElement, h } from "../../helpers/dom";
import VNode from "../../VNode";

/** 
 * The CardItem generates the top and bottom elements for the parent Card class.
 * 
 * @public 
 */
export default class CardItem implements DomElement {
    /**
     * CSS classes to append to the DOM element.
     */
    public class: string;

    /**
     * The card item's value.
     */
    public value: string;

    /**
     * Instantiate a CardItem
     */
    constructor(value: string = '', attributes: Partial<CardItem> = {}) {
        this.value = value;
        this.class = prop(attributes.class, '');
    }
    
    /**
     * Render the VNode.
     */
    render(): VNode {
        return h('div', {
            class: `flip-clock-card-item ${this.class}`
        }, [
            h('div', {
                class: 'flip-clock-card-item-inner'
            }, [
                h('div', { class: 'top' }, this.value),
                h('div', { class: 'bottom' }, this.value),
            ])
        ])
    }
}