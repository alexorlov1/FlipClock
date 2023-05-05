
import Face from '../Face';
import { FaceValue } from '../FaceValue';
import FlipClock from '../FlipClock';
import VNode from '../VNode';
import { prop } from '../functions';
import FormattableFace from './FormattableFace';

/**
 * This face will show a clock in a given format.
 * 
 * @public
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
export default class Clock extends FormattableFace {
    
    /**
     * The string or callback function used to format the value.
     */
    format: string|((value: FaceValue, face: Face) => string) = 'hh:mm:ss A';

    /**
     * Instantiate the clock face.
     */
    constructor(attrs: Partial<Clock> = {}) {
        super()

        this.format = prop(attrs.format, this.format);
    }

    /**
     * Get the default value if no value is passed.
     */
    public defaultValue(value: any): FaceValue {
        if(value instanceof FaceValue) {
            return FaceValue.make(value);
        }

        if(value === undefined) {
            value = new Date();
        }

        return FaceValue.make(new Date(value));
    }

    /**
     * Format the face value into a string.
     */
    public formatFaceValue(value: FaceValue): (format: string) => string {
        return (format: string) => formatDate(
            value.value || new Date, format, this.dictionary
        );
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     */
    public interval(instance: FlipClock): void {
        const interval: number = instance.timer.lastLoop
            ? new Date().getTime() - instance.timer.lastLoop
            : 0;

        this.value = this.value.copy(
            new Date(this.value.value.getTime() + interval)
        );
    }

    /**
     * Render the clock face.
     */
    public render(): VNode {
        // return h('div', { class: 'flip-clock' }, this.createGroups(
        //     this.state.value, this.createGroups(this.prevState?.value || this.state.value)
        // ));
    }
}
