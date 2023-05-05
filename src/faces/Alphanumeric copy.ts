import Face from '../Face';
import { FaceValue, RawFaceValue } from '../FaceValue';
import FlipClock from '../FlipClock';
import VNode from '../VNode';
import { prop } from '../functions';
import { render } from '../helpers/dom';
import { RandomizerFunction, useRandomizer } from '../helpers/randomizer';
import { attrs } from '../types';

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
export default class Alphanumeric extends Face {

    /**
     * A callback to override how digits are randomly selected.
     */
    public randomizer?: RandomizerFunction

    /**
     * The chunkSize for generating random characters. Incease this value to
     * speed up how fast the clock finds the correct value.
     */
    public chunkSize: number = 3;

    /**
     * Instantiate the clock face.
     */
    constructor(attrs: Partial<Alphanumeric> = {}) {
        super(attrs);

        this.chunkSize = prop(attrs.chunkSize, this.chunkSize);

        this.randomizer = prop(attrs.randomizer, useRandomizer({
            chunkSize: this.chunkSize
        }));
    }

    /**
     * Get the face value.
     */
    get value(): FaceValue | undefined {
        return super.value;
    }

    /**
     * Set the face value.
     */
    set value(value: FaceValue) {
        this.state.value = value;
    }

    /**
     * Get the face value.
     */
    get targetValue(): FaceValue|undefined {
        return this.state.targetValue;
    }

    /**
     * Set the face value.
     */
    set targetValue(value: FaceValue) {
        this.state.targetValue = value
    }

    /**
     * Define the initial state of the clock. This allows us to watch for
     * reactivity changes.
     */
    defineState(): attrs {
        return {
            value: undefined,
            targetValue: undefined
        }
    }

    /**
     * Get the default FaceValue using the instantiated value.
     */
    public defaultValue(value: RawFaceValue, attrs: Partial<FaceValue> = {}): FaceValue {
        return FaceValue.make(value, attrs);
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(instance: FlipClock): void {
        if(!this.value.compare(this.lastValue)) {
            // return;
        
        }

        this.value = this.randomizer(this.value, this.targetValue);
    }

    /**
     * Render the clock face.
     */
    public template(): VNode {
        return render(this.value, this.lastValue);
    }

    /**
     * Bind a watcher function to the state.
     */
    watch(fn: Function): Function {
        const unwatch = this.state.watch(fn);

        this.watchers.push(unwatch);

        return unwatch;
    }
}
