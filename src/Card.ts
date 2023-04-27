import CardItem from "./CardItem";
import VNode, { DomElement } from "./VNode";
import { h, prop } from "./functions";

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
    public readonly lastDigit?: string

    /**
     * The number of milliseconds the animation should run.
     */
    public readonly animationRate: number = 225;

    /**
     * An array of items in the card. This array contains the top and bottom
     * halfs of the card element.
     */
    public readonly items: [CardItem, CardItem];

    /**
     * Instantiate a new Card.
     */
    constructor(
        currentDigit: string,
        lastDigit?: string,
        animationRate: number = 225
    ) {
        this.currentDigit = currentDigit;
        this.lastDigit = lastDigit;
        this.animationRate = animationRate;
        this.items = [
            new CardItem(currentDigit, 'active'),
            new CardItem(prop(lastDigit, currentDigit), 'before')
        ];
    }

    /**
     * Get the Card's current digit.
     * 
     * @readonly
     */
    get digit(): string {
        return this.currentDigit;
    }
    
    /**
     * Render the VNode.
     * 
     * @returns The rendered VNode.
     */
    render(): VNode {
        return h('div', {
            class: `flip-clock-card ${this.currentDigit !== this.lastDigit ? 'animate' : ''}`,
            style: `animation-delay: ${this.animationRate}ms; animation-duration: ${this.animationRate}ms`
        }, this.items)
    }
}