
import { Face } from '../Face';
import { FaceValue, faceValue } from '../FaceValue';
import { FlipClock } from '../FlipClock';
import { DateFormatOptions, UseDateFormats, useDateFormats } from '../helpers/date';

export type ClockProps = {
    date?: Date,
    format?: string,
    formatter?: UseDateFormats | DateFormatOptions,
}

/**
 * This face will show a clock in a given format.
 * 
 * @example
 * ```html
 * <div id="clock"></div>
 * ```
 * 
 * ```js
 * import { FlipClock, Clock } from 'flipclock';
 * 
 * const instance = new FlipClock({
 *   face: new Clock({
 *     format: 'hh:mm:ss A'
 *   })
 * });
 * 
 * instance.mount(document.querySelector('#clock'));
 * ```
 */
export default class Clock implements Face {

    /**
     * The starting date on the clock. If no date is set, the current time
     * will be used.
     */
    date?: Date

    /**
     * The current formatted value.
     */
    value: FaceValue<string>
    
    /**
     * The format string.
     */
    format: string = 'hh:mm:ss A'

    /**
     * The duration formatter.
     */
    formatter: UseDateFormats

    /**
     * Instantiate the clock face.
     */
    constructor(props?: ClockProps) {
        this.date = props?.date
        this.formatter = props?.formatter && 'format' in props.formatter
            ? props.formatter
            : useDateFormats(props?.formatter as DateFormatOptions);

        if(props?.format) {
            this.format = props.format;
        }

        this.value = faceValue(this.formatter.format(new Date, this.format));
    }

    /**
     * Format the face value to the current date/time.
     */
    public interval(instance: FlipClock<any>): void {
        if(!this.date) {
            this.value.value = this.formatter.format(new Date, this.format)
        }
        else {
            const date = new Date;

            date.setTime(this.date.getTime() + instance.timer.elapsed);

            this.value.value = this.formatter.format(date, this.format);
        }
    }
}

/**
 * Instantiate a new instance of Clock.
 */
export function clock(props: ClockProps) {
    return new Clock(props);
}
