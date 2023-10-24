import VNode from "../../VNode";
import { DigitizedValue } from "../../helpers/digitizer";
import { DomElement, h } from "../../helpers/dom";
import { debounce } from "../../helpers/functions";
import CardItem from "./CardItem";

/**
 * The Card class renders a DOM element that has a flipping effect when the
 * number changes.
 */
export default class Card implements DomElement {
    /**
     * Instantiate a new Card.
     */
    constructor(
        public readonly currentDigit: DigitizedValue,
        public readonly lastDigit?: DigitizedValue,
    ) {
        if(this.lastDigit === undefined) {
            this.lastDigit = this.currentDigit;
        }
    }

    /**
     * Render the VNode.
     */
    render(): VNode {
        const debounced = debounce((el: HTMLElement) => {
            el.classList.remove('animate')
        });

        return h('div', {
            class: `flip-clock-card ${this.currentDigit !== this.lastDigit ? 'animate' : ''}`,
            type: 'flip-clock-card',
            ['data-current-digit']: this.currentDigit,
            ['data-last-digit']: this.lastDigit,
            onAnimationend() {
                if (this.classList.contains('animate')) {
                    debounced(this);
                }
            }
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