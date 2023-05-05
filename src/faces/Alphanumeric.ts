import { Face } from '../Face';
import { FaceValue } from '../FaceValue';
import FlipClock from '../FlipClock';
import VNode from '../VNode';
import { RandomizerFunction, useRandomizer } from '../helpers/randomizer';
import { Reactive, useState } from './../helpers/state';

export type AlphanumericState = {
    initialValue: FaceValue,
    currentValue: FaceValue,
    lastValue?: FaceValue,
    targetValue: FaceValue,
};

export type AlphanumericParams = Partial<Pick<Alphanumeric, 'randomizer' | 'chunkSize'>> & {
    initialValue?: FaceValue,
    value: FaceValue,
    targetValue?: FaceValue
}

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
export default class Alphanumeric implements Face {

    /**
     * The chunkSize for generating random characters. Incease this value to
     * speed up how fast the clock finds the correct value.
     */
    public chunkSize: number = 3;

    /**
     * A callback to override how digits are randomly selected.
     */
    public randomizer?: RandomizerFunction

    /**
     * The reactive state.
     */
    protected $state: Reactive<AlphanumericState>

    /**
     * Instantiate the clock face.
     */
    constructor(params: AlphanumericParams) {
        if (params.chunkSize) {
            this.chunkSize = params.chunkSize;
        }

        this.randomizer = params.randomizer || useRandomizer({
            chunkSize: this.chunkSize
        });

        const initialValue = params.initialValue || new FaceValue('')

        const currentValue = this.randomizer(initialValue, params.value);

        this.$state = useState({
            initialValue,
            currentValue,
            lastValue: undefined,
            targetValue: params.value,
        });
    }

    get state() {
        return this.$state
    }

    // /**
    //  * Get the face value.
    //  */
    // get value(): FaceValue | undefined {
    //     return super.value;
    // }

    // /**
    //  * Set the face value.
    //  */
    // set value(value: FaceValue) {
    //     this.state.value = value;
    // }

    // /**
    //  * Get the face value.
    //  */
    // get targetValue(): FaceValue|undefined {
    //     return this.state.targetValue;
    // }

    // /**
    //  * Set the face value.
    //  */
    // set targetValue(value: FaceValue) {
    //     this.state.targetValue = value
    // }

    // /**
    //  * Define the initial state of the clock. This allows us to watch for
    //  * reactivity changes.
    //  */
    // defineState(): attrs {
    //     return {
    //         value: undefined,
    //         targetValue: undefined
    //     }
    // }

    // /**
    //  * Get the default FaceValue using the instantiated value.
    //  */
    // public defaultValue(value: RawFaceValue, attrs: Partial<FaceValue> = {}): FaceValue {
    //     return FaceValue.make(value, attrs);
    // }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(instance: FlipClock): void {
        // if (this.state.currentValue.compare(this.state.targetValue)) {
        //     return;
        // }

        // const lastValue = this.state.currentValue;

        // const currentValue = this.randomizer(
        //     this.state.currentValue, this.state.targetValue
        // );

        // console.log(currentValue)

        // this.state.update({
        //     lastValue,
        //     currentValue
        // });
    }

    /**
     * Render the clock face.
     */
    public render(instance: FlipClock): VNode {
        return instance.theme(this.state.currentValue, this.state.lastValue);
    }

    // /**
    //  * Bind a watcher function to the state.
    //  */
    // watch(fn: Function): Function {
    //     const unwatch = this.state.watch(fn);

    //     this.watchers.push(unwatch);

    //     return unwatch;
    // }
}
