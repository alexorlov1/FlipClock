import { Face, FaceState } from '../Face';
import { FaceValue } from '../FaceValue';
import FlipClock from '../FlipClock';
import VNode from '../VNode';
import { SequencerContext, useSequencer } from '../helpers/sequencer';
import { defineState } from '../helpers/signal';
import { WalkerDirection } from '../helpers/walker';
import { SequencerOptions } from './../helpers/sequencer';

export type AlphanumericParams = {
    value?: FaceValue,
    currentValue?: FaceValue,
    direction?: 'auto' | WalkerDirection,
    targetValue: FaceValue,
    sequencer?: SequencerContext
    skipChars?: number | (() => number),
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
     * The flip direction. If auto, the direction is automatically determined
     * based on the current value and target value.
     */
    public readonly direction: 'auto' | WalkerDirection = 'auto';

    /**
     * Override how digits are sequenced.
     */
    public readonly sequencer: SequencerContext

    /**
     * The number of characters to skip during the incrementing/decrementing.
     */
    public readonly skipChars: number|(() => number) = 1;
    
    /**
     * The reactive state.
     */
    protected $state: FaceState & {direction: WalkerDirection}
    
    /**
     * Instantiate the clock face.
     */
    constructor(params: AlphanumericParams) {
        if (params.skipChars) {
            this.skipChars = params.skipChars;
        }

        if (params.direction) {
            this.direction = params.direction;
        }

        this.sequencer = params.sequencer || useSequencer({
            charset: params.charset,
            stopAfter: params.stopAfter,
            stopAfterChanges: params.stopAfterChanges
        });

        const currentValue = params.currentValue || new FaceValue('');
        const targetValue = params.targetValue;

        this.$state = defineState({
            currentValue,
            lastValue: currentValue,
            targetValue: params.targetValue,
            direction: this.direction === 'auto'
                ? this.autoDirection(currentValue, targetValue)
                : this.direction,
        });
    }

    /**
     * Get the protected state property.
     */
    get state() {
        return this.$state
    }

    /**
     * The sequencer method to call.
     */
    get method(): 'increment' | 'decrement' {
        return this.$state.direction === 'backwards'
            ? 'decrement'
            : 'increment';
    }

    /**
     * Set the target value.
     */
    set value(value: FaceValue) {
        this.state.targetValue = value;
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(instance: FlipClock): void {
        const lastValue = this.$state.currentValue;

        const skipChars = typeof this.skipChars === 'function'
            ? this.skipChars()
            : this.skipChars;

        const currentValue = this.sequencer[this.method](
            this.$state.currentValue, this.$state.targetValue, skipChars
        );

        if(currentValue.compare(this.$state.targetValue)) {
            instance.stop();
        }

        this.state.currentValue = currentValue;
        this.state.lastValue = lastValue;
    }

    /**
     * Render the clock face.
     */
    public render(instance: FlipClock): VNode {
        return instance.theme.render(instance, this.$state, {
            direction: this.$state.direction
        });
    }

    /**
     * Update the direction before the interval starts.
     */
    public beforeStart() {
        if(this.direction === 'auto') {
            this.state.direction = this.autoDirection(
                this.$state.currentValue, this.$state.targetValue
            );
        }
    }

    /**
     * Get the direction of the clock face. If the current digit length is 
     * less than the target digit length, then the clock face will be
     * going forwards.
     */
    protected autoDirection(currentValue: FaceValue, targetValue?: FaceValue): WalkerDirection {
        return currentValue.length() <= targetValue.length()
            ? 'forwards'
            : 'backwards';
    }
}
