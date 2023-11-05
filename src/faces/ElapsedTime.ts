import { type Face } from '../Face';
import { faceValue, type FaceValue } from '../FaceValue';
import { useDurationFormats, type UseDurationFormatOptions, type UseDurationFormats } from '../helpers/duration';

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
     * The ending date used to calculate the elsapsed time.
     * 
     * @public
     */
    end?: Date;

    /**
     * The format string.
     * 
     * @public
     */
    format: string;

    /**
     * The duration formatter.
     * 
     * @public
     */
    formatter: UseDurationFormats;
    
    /**
     * The starting date used to calculate the elsapsed time.
     * 
     * @public
     */
    start?: Date;

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
        this.start = props.start;
        this.end = props.end;
        this.format = props.format;
        this.formatter = props.formatter && 'format' in props.formatter
            ? props.formatter
            : useDurationFormats(props.formatter);

        this.value = faceValue(
            this.formatter.format(this.span.start, this.span.end, this.format)
        );
    }

    /**
     * Get the start and end date.
     * 
     * @public
     */
    get span() {
        return {
            start: this.start ?? new Date,
            end: this.end ?? new Date
        };
    }

    /**
     * The face's current value.
     * 
     * @public
     */
    faceValue(): FaceValue<string> {
        return this.value;
    }
    
    /**
     * Format the value with the new elapsed time.
     * 
     * @public
     */
    public interval(): void {
        this.value.value = this.formatter.format(
            this.span.start, this.span.end, this.format
        );
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