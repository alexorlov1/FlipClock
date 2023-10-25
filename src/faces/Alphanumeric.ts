import { Face } from '../Face';
import { FaceValue } from '../FaceValue';
import { FlipClock } from '../FlipClock';
import { DigitizedValues } from '../helpers/digitizer';
import { SequencerContext, useSequencer } from '../helpers/sequencer';
import { watchEffect } from '../helpers/signal';
import { SequencerOptions } from './../helpers/sequencer';

export type AlphanumericProps = {
    value: FaceValue<string|DigitizedValues>,
    direction?: 'auto' | 'forwards' | 'backwards',
    targetValue: FaceValue<string|DigitizedValues>,
    sequencer?: SequencerContext | SequencerOptions
    skipChars?: number,
}

/**
 * This face is designed to flip through alphanumeric values similar to a flip
 * board at a train station. The value will incrementally/decrementally flip
 * the digits until it reaches the target.
 */
export default class Alphanumeric implements Face {
    /**
     * The flip direction. If auto, the direction is automatically determined
     * based on the current value and target value.
     */
    public readonly direction: 'auto' | 'forwards' | 'backwards' = 'auto';

    /**
     * Override how digits are sequenced.
     */
    public readonly sequencer: SequencerContext

    /**
     * The number of characters to skip during the incrementing/decrementing.
     */
    public readonly skipChars?: number;

    /**
     * The face's current value.
     */
    public value: FaceValue<string|DigitizedValues>

    /**
     * The face's target value.
     */
    public targetValue: FaceValue<string|DigitizedValues>
    
    /**
     * Instantiate the clock face.
     */
    constructor(props: AlphanumericProps) {
        if (props.skipChars) {
            this.skipChars = props.skipChars;
        }

        if (props.direction) {
            this.direction = props.direction;
        }

        this.sequencer = props.sequencer && 'increment' in props.sequencer
            ? props.sequencer
            : useSequencer(props.sequencer);

        this.value = props.value;
        this.targetValue = props.targetValue;
    }
    
    /**
     * The sequencer method to call.
     */
    get backwards(): boolean {
        if(this.direction === 'backwards') {
            return true;
        }

        if(this.direction === 'forwards') {
            return false;
        }

        return this.value.length >= (this.targetValue?.length ?? 0)
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(instance: FlipClock<any>): void {
        this.sequencer.increment(
            this.value, this.targetValue, this.skipChars, this.backwards
        );

        if(this.value.compare(this.targetValue)) {
            instance.stop();
        }
    }

    /**
     * Update the direction before the interval starts.
     */
    public afterCreate(instance: FlipClock<any>) {
        watchEffect(() => {
            if(instance.autoStart && instance.timer.isStopped && this.value.value) {
                instance.start();
            }
        });
    }

}

/**
 * Instantiate a new instnace of Alphanumeric
 */
export function alphanumeric(props: AlphanumericProps) {
    return new Alphanumeric(props);
}
