import { prop, h } from "./functions";
import CardItem from "./CardItem";
import DomElement from "./types/DomElement";
import VNode from "./VNode";

/**
 * The Card class renders a DOM element that has a flipping effect when the
 * number changes.
 * 
 * @public
 */
export default class Card implements DomElement {
    /**
     * The current digit displayed on the card.
     * 
     * @readonly
     */
    protected readonly currentDigit: string;

    /**
     * The last digit, which is used to run the animated if different than the
     * current digit.
     * 
     * @readonly
     */
    protected readonly lastDigit?: string;

    /**
     * The number of milliseconds the animation should run.
     * 
     * @readonly
     */
    protected readonly animationRate: number = 225;

    /**
     * An array of items in the card. This array contains the top and bottom
     * halfs of the card element.
     * 
     * @readonly
     */
    protected readonly items: [CardItem, CardItem];

    /**
     * Instantiate a new Card.
     * 
     * @param currentDigit - The card's current digit to display
     * @param lastDigit - The card's previous digit
     * @param animationRate - The number of milliseconds used to the animation rate
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