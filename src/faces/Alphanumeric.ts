import { Face, FaceState } from '../Face';
import { FaceValue } from '../FaceValue';
import FlipClock from '../FlipClock';
import VNode from '../VNode';
import { SequencerContext, useSequencer } from '../helpers/sequencer';
import { SequencerOptions } from './../helpers/sequencer';
import { Reactive, useState } from './../helpers/state';

export type AlphanumericParams = {
    value?: FaceValue,
    currentValue?: FaceValue,
    targetValue?: FaceValue,
    sequencer?: SequencerContext
    skipChars?: number,
} & SequencerOptions

/**
 * This face is designed to flip through alphanumeric values similar to a flip
 * board at a train station. The value will incrementally/decrementally flip
 * the digits until it reaches the target.
 * 
 * @public
 */
export default class Alphanumeric implements Face {
    /**
     * A callback to override how digits are randomly selected.
     */
    public readonly sequencer: SequencerContext

    /**
     * The number of characters to skip during the incrementing/decrementing.
     */
    public readonly skipChars: number = 1;

    /**
     * The reactive state.
     */
    protected $state: Reactive<FaceState>

    /**
     * Instantiate the clock face.
     */
    constructor(params: AlphanumericParams) {
        this.sequencer = params.sequencer || useSequencer({
            charset: params.charset,
            stopAfter: params.stopAfter,
            stopAfterChanges: params.stopAfterChanges
        });

        if (params.skipChars) {
            this.skipChars = params.skipChars;
        }

        const currentValue = params.currentValue || new FaceValue('');

        this.$state = useState({
            currentValue,
            lastValue: currentValue,
            targetValue: params.targetValue || params.value,
        });

        if(!this.$state.targetValue) {
            throw new Error('You must pass `targetValue` or `value` to `new Alphanumeric(...)`');
        }
    }

    /**
     * Get the protected state property.
     */
    get state() {
        return this.$state
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(instance: FlipClock): void {
        const method = this.$state.currentValue.length() > this.$state.targetValue.length()
            ? 'decrement'
            : 'increment';

        const lastValue = this.$state.currentValue.copy();

        const currentValue = this.sequencer[method](
            this.$state.currentValue, this.$state.targetValue, this.skipChars
        );

        if(currentValue.compare(this.$state.targetValue)) {
            instance.stop();
        }

        this.state.update({ currentValue, lastValue });
    }

    /**
     * Render the clock face.
     */
    public render(instance: FlipClock): VNode {
        return instance.theme.render(instance, this.$state);
    }
}
