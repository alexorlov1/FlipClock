import { Face } from '../Face';
import { FaceValue } from '../FaceValue';
import { FlipClock } from '../FlipClock';
import { DigitizedValues } from '../helpers/digitizer';
import { UseSequencer, useSequencer } from '../helpers/sequencer';
import { watchEffect } from '../helpers/signal';
import { SequencerOptions } from './../helpers/sequencer';

/**
 * The `Alphanumeric` face options.
 * 
 * @public
 */
export type AlphanumericProps = {
    value: FaceValue<string | DigitizedValues>,
    direction?: 'auto' | 'forwards' | 'backwards',
    targetValue?: FaceValue<string | DigitizedValues>,
    sequencer?: UseSequencer | SequencerOptions
    skipChars?: number,
}

/**
 * This face is designed to flip through alphanumeric values similar to a flip
 * board at a train station. The value will incrementally/decrementally flip
 * the digits until it reaches the target.
 * 
 * @public
 */
export class Alphanumeric implements Face {
    /**
     * The flip direction. If auto, the direction is automatically determined
     * based on the current value and target value.
     * 
     * @public
     */
    public readonly direction: 'auto' | 'forwards' | 'backwards' = 'auto';

    /**
     * Override how digits are sequenced.
     * 
     * @public
     */
    public readonly sequencer: UseSequencer;

    /**
     * The number of characters to skip during the incrementing/decrementing.
     * 
     * @public
     */
    public skipChars?: number;

    /**
     * The face's current value.
     * 
     * @public
     */
    public readonly value: FaceValue<string | DigitizedValues>;

    /**
     * The face's target value.
     * 
     * @public
     */
    public readonly targetValue: FaceValue<string | DigitizedValues>;

    /**
     * Instantiate the clock face.
     * 
     * @public
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
        this.targetValue = props.targetValue ?? this.value.copy();
    }

    /**
     * The sequencer method to call.
     * 
     * @public
     */
    get backwards(): boolean {
        if (this.direction === 'backwards') {
            return true;
        }

        if (this.direction === 'forwards') {
            return false;
        }

        return this.value.length >= (this.targetValue?.length ?? 0);
    }

    /**
     * The face's current value.
     * 
     * @public
     */
    faceValue(): FaceValue<string | DigitizedValues> {
        return this.value;
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     * 
     * @public
     */
    public interval(instance: FlipClock<Alphanumeric>): void {
        this.sequencer.increment(
            this.value, this.targetValue, this.skipChars, this.backwards
        );

        if (this.value.compare(this.targetValue)) {
            instance.stop();
        }
    }

    /**
     * Update the direction before the interval starts.
     * 
     * @internal
     */
    public afterCreate(instance: FlipClock<Alphanumeric>) {
        watchEffect(() => {
            if (instance.autoStart && instance.timer.isStopped && this.value.value) {
                instance.start();
            }
        });
    }

}

/**
 * Instantiate a new `Alphanumeric` instance.
 * 
 * @public
 */
export function alphanumeric(props: AlphanumericProps) {
    return new Alphanumeric(props);
}
