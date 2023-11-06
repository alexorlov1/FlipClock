import { differenceInSeconds } from '../..';
import { Ref } from '../../dist/src/helpers/ref';
import { type Face } from '../Face';
import { faceValue, type FaceValue } from '../FaceValue';
import { FlipClock } from '../FlipClock';
import { useDurationFormats, type UseDurationFormatOptions, type UseDurationFormats } from '../helpers/duration';
import { ref } from '../helpers/ref';
import { watchEffect } from '../helpers/signal';

/**
 * The `ElapsedTime` face options.
 * 
 * @public
 */
export type ElapsedTimeProps = {
    end?: Date,
    format: string,
    formatter?: UseDurationFormats | UseDurationFormatOptions,
    start?: Date
}

/**
 * This face will show the amount of time elapsed since the given value and
 * display it a specific format. For example 'hh:mm:ss' will show the elapsed
 * time in hours, minutes, seconds.
 * 
 * @public
 */
export class ElapsedTime implements Face {
    
    /**
     * The date used to calculate the current.
     * 
     * @protected
     */
    protected current: Ref<Date>;

    /**
     * The ending date used to calculate the elsapsed time.
     * 
     * @public
     */
    public end: Ref<Date>;

    /**
     * The format string.
     * 
     * @public
     */
    public format: string;

    /**
     * The duration formatter.
     * 
     * @public
     */
    public formatter: UseDurationFormats;
    
    /**
     * The starting date used to calculate the elsapsed time.
     * 
     * @public
     */
    public start: Ref<Date>;

    /**
     * The current face value.
     * 
     * @public
     */
    public value: FaceValue<string>;

    /**
     * Instantiate a Clock face with a given value and attributes.
     * 
     * @public
     */
    constructor(props: ElapsedTimeProps) {
        this.start = ref(props.start ?? new Date);
        this.current = ref(new Date(this.start.value));
        this.end = ref(props.end ?? this.start.value);
        this.format = props.format;
        this.formatter = props.formatter && 'format' in props.formatter
            ? props.formatter
            : useDurationFormats(props.formatter);

        this.value = faceValue('');
            
        watchEffect(() => {
            this.value.value = this.formatter.format(
                this.current.value, this.end.value, this.format
            );
        });
    }

    /**
     * The face's current value.
     * 
     * @public
     */
    public faceValue(): FaceValue<string> {
        return this.value;
    }
        
    /**
     * Format the value with the new elapsed time.
     * 
     * @public
     */
    public interval(instance: FlipClock<ElapsedTime>): void {
        this.current.value.setTime(
            this.start.value.getTime() + instance.timer.elapsed
        );

        this.current.value = this.current.value;

        if (differenceInSeconds(this.end.value, this.current.value) <= 0) {
            instance.stop();
        }
    }
}

/**
 * Instantiate a new `ElapsedTime` instance.
 * 
 * @public
 */
export function elapsedTime(props: ElapsedTimeProps) {
    return new ElapsedTime(props);
}