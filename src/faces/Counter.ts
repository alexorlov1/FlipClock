import { Face, FaceState } from '../Face';
import { FaceValue } from '../FaceValue';
import FlipClock from '../FlipClock';
import VNode from '../VNode';
import { SequencerContext, SequencerOptions, useSequencer } from '../helpers/sequencer';
import { Reactive, useState } from '../helpers/state';
import { WalkerDirection } from '../helpers/walker';

export type CounterParams = {
    countdown?: boolean,
    currentValue?: FaceValue<number>
    direction?: 'auto' | WalkerDirection
    sequencer?: SequencerContext
    step: number | (() => number)
    targetValue?: FaceValue<number>
} & SequencerOptions

/**
 * This face is designed to increment and decrement values. Usually this face
 * is used as a counter for 0, 1, 2, 3, 4 (etc) for something like page views.
 * 
 * @public
 */
export default class Counter implements Face {

    /**
     * Should the face count down instead of up.
     */
    public countdown: boolean = false;

    /**
     * The purpose of this is to determine if the flip action happens left to
     * right (forwards) or right to left (backwarods). If auto, the direction is
     * automatically determined based on the current value and target value. 
     */
    public readonly direction: 'auto' | WalkerDirection = 'auto';

    /**
     * Override how digits are sequenced.
     */
    public readonly sequencer: SequencerContext

    /**
     * The number to increment/decrement in the interval.
     */
    public step: number | (() => number) = 1;

    /**
     * The reactive state.
     */
    protected $state: Reactive<FaceState<number> & {
        countdown: boolean
        direction: WalkerDirection
        step: number | (() => number)
    }>

    /**
     * Instantiate the clock face.
     */
    constructor(params: CounterParams) {
        if(params.countdown !== undefined) {
            this.countdown = params.countdown;
        }
        
        if(params.step !== undefined) {
            this.step = params.step;
        }

        this.sequencer = params.sequencer || useSequencer({
            charset: params.charset ?? {
                charset: () => [
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
                ]
            }
        });

        const currentValue = params.currentValue || new FaceValue<number>(0);
        const targetValue = params.targetValue;

        this.$state = useState({
            currentValue,
            targetValue,
            lastValue: currentValue,
            countdown: this.countdown,
            direction: this.direction === 'auto'
                ? this.autoDirection(currentValue, targetValue)
                : this.direction,
            step: this.step
        });
    }

    /**
     * Get the protected state property.
     */
    get state() {
        return this.$state
    }

    /**
     * Substract the face value by the given value.
     */
    public decrement(value?: number): void {
        this.$state.currentValue.copy(
            (value ?? this.$state.currentValue.value) - (
                typeof this.step === 'function' ? this.step() : this.step
            )
        );
    }

    /**
     * Add to the face value by the given value.
     */
    public increment(value?: number): void {
        this.$state.currentValue.copy(
            (value ?? this.$state.currentValue.value) + (
                typeof this.step === 'function' ? this.step() : this.step
            )
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
    public render(instance: FlipClock): VNode {
        return instance.theme.render(instance, this.$state, {
            direction: this.$state.direction
        });
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
