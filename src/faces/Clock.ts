
import { DigitizedValues } from '../..';
import { Face } from '../Face';
import { FaceValue, faceValue } from '../FaceValue';
import { FlipClock } from '../FlipClock';
import { UseDateFormatOptions, UseDateFormats, useDateFormats } from '../helpers/date';

/**
 * The `Clock` face options.
 * 
 * @public
 */
export type ClockProps = {
    date?: Date,
    format?: string,
    formatter?: UseDateFormats | UseDateFormatOptions,
}

/**
 * This face will show a clock in a given format. * 
 * 
 * @public
 */
export class Clock implements Face {

    /**
     * The starting date on the clock. If no date is set, the current time
     * will be used.
     * 
     * @public
     */
    date?: Date

    /**
     * The current formatted value.
     * 
     * @public
     */
    value: FaceValue<DigitizedValues>
    
    /**
     * The format string.
     * 
     * @public
     */
    format: string = '[hh]:[mm]:[ss] [A]'

    /**
     * The duration formatter.
     * 
     * @public
     */
    formatter: UseDateFormats

    /**
     * Instantiate the clock face.
     * 
     * @public
     */
    constructor(props?: ClockProps) {
        this.date = props?.date
        this.formatter = props?.formatter && 'format' in props.formatter
            ? props.formatter
            : useDateFormats(props?.formatter as UseDateFormatOptions);

        if(props?.format) {
            this.format = props.format;
        }

        this.value = faceValue(this.formatter.parse(new Date, this.format));
    }

    /**
     * Format the face value to the current date/time.
     * 
     * @public
     */
    public interval(instance: FlipClock<any>): void {
        if(!this.date) {
            this.value.value = this.formatter.parse(new Date, this.format)
        }
        else {
            const date = new Date;

            date.setTime(this.date.getTime() + instance.timer.elapsed);

            this.value.value = this.formatter.parse(date, this.format);
        }
    }
}

/**
 * Instantiate a new `Clock` instance.
 * 
 * @public
 */
export function clock(props?: ClockProps) {
    return new Clock(props);
}
