import VNode from "../../VNode";
import { DigitizedValue } from "../../helpers/digitizer";
import { DomElement, h } from "../../helpers/dom";
import CardItem from "./CardItem";

/**
 * The Card class renders a DOM element that has a flipping effect when the
 * number changes.
 * 
 * @public
 */
export default class Card implements DomElement {
    /**
     * The current digit displayed on the card.
     */
    public readonly currentDigit: string

    /**
     * The last digit, which is used to run the animated if different than the
     * current digit.
     */
    public readonly lastDigit: string

    /**
     * Instantiate a new Card.
     */
    constructor(
        currentDigit: DigitizedValue,
        lastDigit?: DigitizedValue,
    ) {
        this.currentDigit = currentDigit;
        this.lastDigit = lastDigit;
    }

    /**
     * Get the Card's current digit.
     */
    get digit(): string {
        return this.currentDigit;
    }
    
    /**
     * Render the VNode.
     */
    render(): VNode {
        return h('div', {
            class: `flip-clock-card ${this.currentDigit !== this.lastDigit ? 'animate' : ''}`,
        }, [
            h(new CardItem(this.currentDigit, {
                class: 'active'
            })),
            h(new CardItem(this.lastDigit, {
                class: 'before'
            }))
        ])
    }
}