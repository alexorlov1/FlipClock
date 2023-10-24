import { Face } from '../Face';
import { FaceValue, faceValue } from '../FaceValue';
import { DurationFormatOptions, UseDurationFormats, useDurationFormats } from '../helpers/duration';

export type ElapsedTimeProps = {
    end?: Date,
    format: string,
    formatter?: UseDurationFormats | DurationFormatOptions,
    start?: Date
}

/**
 * This face will show the amount of time elapsed since the given value and
 * display it a specific format. For example 'hh:mm:ss' will show the elapsed
 * time in hours, minutes, seconds.
 * 
 * @example
 * ```html
 * <div id="clock"></div>
 * ```
 * 
 * ```js
 * const instance = new FlipClock({
 *   face: new ElapsedTime({
 *      format: 'hh:mm:ss'
 *   })
 * });
 * 
 * instance.mount(document.querySelector('#clock'));
 * ```
 */
export default class ElapsedTime implements Face {

    /**
     * The ending date used to calculate the elsapsed time.
     */
    end?: Date

    /**
     * The format string.
     */
    format: string

    /**
     * The duration formatter.
     */
    formatter: UseDurationFormats
    
    /**
     * The starting date used to calculate the elsapsed time.
     */
    start?: Date;

    /**
     * The current face value.
     */
    public value: FaceValue<string>

    /**
     * Instantiate a Clock face with a given value and attributes.
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
     */
    get span() {
        return {
            start: this.start ?? new Date,
            end: this.end ?? new Date
        }
    }
    
    /**
     * Format the value with the new elapsed time.
     */
    public interval(): void {
        this.value.value = this.formatter.format(this.span.start, this.span.end, this.format);
    }
}

/**
 * Instantiate a new ElapsedTime instance.
 */
export function elapsedTime(props: ElapsedTimeProps) {
    return new ElapsedTime(props);
}