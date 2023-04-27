import Card from '../Card';
import Face from '../Face';
import FaceValue from '../FaceValue';
import Group from '../Group';
import VNode from '../VNode';
import { h, prop } from '../functions';

/**
 * This face is designed to increment and decrement values. Usually this face
 * is used as a counter for 0, 1, 2, 3, 4 (etc) for something like page views.
 * 
 * @public
 * @example
 * ```html
 * <div id="clock"></div>
 * ```
 * 
 * ```js
 * const instance = new FlipClock({
 *   face: new Counter({
 *     value: new FaceValue(100, {
 *       format: value => value * 100
 *     })
 *   })
 * });
 * 
 * instance.mount(document.querySelector('#clock'));
 * ```
 */
export default class Counter extends Face {

    /**
     * Should the face count down instead of up.
     */
    countdown: boolean = false;
    
    /**
     * The number to increment/decrement in the interval.
     */
    step: number|(() => number) = 1;

    /**
     * Instantiate a Clock face with a given value and attributes.
     */
    constructor(attributes: Partial<Counter> = {}) {
        super(attributes);
    }

    /**
     * Get the default FaceValue using the instantiated value.
     */
    public defaultValue(value: any): FaceValue {
        return FaceValue.make(value || 0);
    }

    /**
     * Decrement the face value by the given value.
     */
    public decrement(value?: number): void {
        const step = prop(value, this.step);

        this.value = this.value.copy(
            this.value.value - (typeof step === 'function' ? step() : step)
        );
    }

    /**
     * Increment the face value by the given value.
     */
    public increment(value?: number): void {
        const step = prop(value, this.step);

        this.value = this.value.copy(
            this.value.value + (typeof step === 'function' ? step() : step)
        );
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(): void {
        if(this.countdown) {
            this.decrement();
        }
        else {
            this.increment();
        }
    }

    /**
     * Render the clock face.
     */
    public render(): VNode {
        const items = this.value.digits.map((digit, i) => new Card(
            digit, this.lastValue?.digits[i] || digit
        ));
        
        return h('div', {
            class: 'flip-clock',
        }, [
            h(new Group({ items }))
        ]);
    }
}
