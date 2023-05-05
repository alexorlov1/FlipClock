import Face from '../Face';
import { FaceValue } from '../FaceValue';
import FlipClock from '../FlipClock';
// import { duration, formatDuration } from '../functions';
import { prop } from '../functions';
import { Duration } from '../types';
import VNode from '../VNode';

/**
 * This face will show the amount of time elapsed since the given value and
 * display it a specific format. For example 'hh:mm:ss' will show the elapsed
 * time in hours, minutes, seconds.
 * 
 * @public
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
export default class ElapsedTime extends Face {

    /**
     * Should the face count down instead of up.
     */
    countdown: boolean = false;
    
    /**
     * The ending date used to calculate the elsapsed time.
     */
    end: Date;

    /**
     * The string or callback function used to format the value.
     */
    format: string|((value: FaceValue, face: Face) => string) = 'hh:mm:ss A';
    
    /**
     * The starting date used to calculate the elsapsed time.
     */
    start: Date;

    /**
     * Instantiate a Clock face with a given value and attributes.
     */
    constructor(attributes: Partial<ElapsedTime> = {}) {
        super(Object.assign({
            value: FaceValue.make(attributes.end || new Date)
        }, attributes));

        this.start = prop(attributes.start, new Date);
        this.end = prop(attributes.end, this.value);
    }

    /**
     * Get the default value if no value is passed.
     */
    public defaultValue(value: any): FaceValue {
        return super.defaultValue(value || new Date);
    }

    /**
     * Format the face value into a string.
     */
    public formatFaceValue(value: FaceValue): (format: string) => string {
        return (format: string) => {
            const instance: Duration = duration(
                this.start, (<FaceValue>value)?.value, format
            );

            return formatDuration(instance, format, this.dictionary);
        };
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(instance: FlipClock): void {
        const date: Date = new Date(
            (<FaceValue>this.value)?.value.getTime() + instance.timer.elapsedSinceLastLoop
        );

        this.value = (<FaceValue>this.value).copy(date);
    }

    /**
     * Render the clock face.
     */
    public render(): VNode {
        // const prevGroups: Group[] = this.createGroups(
        //     this.prevState?.value || this.state.value
        // );

        // return h('div', {
        //     class: 'flip-clock'
        // }, this.createGroups(
        //     this.state.value, prevGroups
        // ));
    }
}
