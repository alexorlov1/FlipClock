import { DomElement, h } from "../../helpers/dom";
import VNode from "../../VNode";

type CartItemProps = Partial<Pick<CardItem, 'class'>>

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
    constructor(value: string = '', props: CartItemProps = {}) {
        this.value = value;
        this.class = props.class
    }
    
    /**
     * Render the VNode.
     */
    render(): VNode {
        return h('div', {
            class: `flip-clock-card-item ${this.class}`,
            type: 'flip-clock-card-item'
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