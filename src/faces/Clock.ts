import { Ref } from './../helpers/ref';

import { Face } from '../Face';
import { FaceValue, faceValue } from '../FaceValue';
import { FlipClock } from '../FlipClock';
import { UseDateFormatOptions, UseDateFormats, useDateFormats } from '../helpers/date';
import { ref } from '../helpers/ref';
import { watchEffect } from '../helpers/signal';

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
    public readonly date: Ref<Date|undefined>;

    /**
     * The current formatted value.
     * 
     * @public
     */
    public readonly value: FaceValue<string>;

    /**
     * The format string.
     * 
     * @public
     */
    format: string = '[hh]:[mm]:[ss] [A]';

    /**
     * The duration formatter.
     * 
     * @public
     */
    formatter: UseDateFormats;

    /**
     * Instantiate the clock face.
     * 
     * @public
     */
    constructor(props?: ClockProps) {
        this.date = ref(props?.date);
        this.formatter = props?.formatter && 'format' in props.formatter
            ? props.formatter
            : useDateFormats(props?.formatter as UseDateFormatOptions);

        if (props?.format) {
            this.format = props.format;
        }

        const format = () => {
            return this.formatter.format(this.date?.value ?? new Date, this.format);
        };

        this.value = faceValue('');

        watchEffect(() => {
            this.value.value = format();
        });
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
     * Format the face value to the current date/time.
     * 
     * @public
     */
    public interval(instance: FlipClock<any>): void {
        if (!this.date?.value) {
            this.value.value = this.formatter.format(new Date, this.format);
        }
        else {
            const date = new Date;

            date.setTime(this.date.value.getTime() + instance.timer.elapsed);

            this.value.value = this.formatter.format(date, this.format);
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
