import Group from '../Group';
import Face from '../Face';
import { digitize, formatDate, h, prop } from '../functions';
import FlipClock from '../FlipClock';
import VNode from '../VNode';
import FaceValue from '../FaceValue';
import Divider from '../Divider';
import Attributes from '../types/Attributes';
import Card from '../Card';

/**
 * The flag regex pattern.
 * 
 * @var {RegExp}
 */
 const pattern: RegExp = /[^\w]+/g;

/**
 * This face will show a clock in a given format.
 * 
 * @extends Face
 * @memberof Faces
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
export default class Clock extends Face {
    
    /**
     * The date format to display.
     * 
     * @var {string}
     */
    format: string;

    /**
     * Show the labels on the clock face.
     * 
     * @var {string[]|Function}
     */
    labels: Attributes|Function = [];

    /**
     * Instantiate a Clock face with a given value and attributes.
     * 
     * @param {Attributes} attributes
     */
    constructor(
        attributes: Partial<Clock> = {}
    ) {
        super(attributes);

        this.format = prop(attributes.format, 'hh:mm:ss A');
        this.labels = prop(attributes.labels, this.labels);
    }

    /**
     * Get the default value if no value is passed.
     * 
     * @param {any} value
     * @returns {FaceValue}
     */
    defaultValue(value: any): FaceValue {
        return new FaceValue(new Date);
    }
    
    /**
     * Increment the face value by the given value.
     * 
     * @param {Number} value
     * @return {this}
     */
    increment(value: number = 1000): this {
        this.value = this.value.copy(
            new Date(this.value.value.getTime() + value)
        );

        return this;
    }

    /**
     * This method is called with every interval, or every time the clock
     * should change, and handles the actual incrementing and decrementing the
     * clock's `FaceValue`.
     *
     * @param  {FlipClock} instance
     * @return {void}
     */
    interval(instance: FlipClock): void {
        this.increment(new Date().getTime() - instance.timer.lastLoop);
    }

    /**
     * Render the clock face.
     * 
     * @return {VNode} 
     */
    render(): VNode {
        return h('div', { class: 'flip-clock' }, this.createGroups(
            this.state.value, this.createGroups(this.prevState?.value)
        ));
    }

    /**
     * Create the groups from the given FaceValue.
     * 
     * @param {FaceValue} value 
     * @param {Group[]} prevGroups 
     * @returns {Group[]}
     */
    protected createGroups(value?: FaceValue, prevGroups: Group[] = []): Group[] {
        if(!value) {
            return [];
        }

        const formatted: string = formatDate(
            value?.value, this.format, this.dictionary
        );

        return formatted.split(/\s+/).map((subject: string, x: number) => new Group({
            items: this.createGroup(subject, x, prevGroups)
        }));
    }

    /**
     * Create the groups from given string.
     * 
     * @param {string} subject
     * @param {number} x
     * @param {Group[]} prevGroups 
     * @returns {(Group|Divider)[]}
     */
    protected createGroup(subject: string, x: number, prevGroups: Group[] = []): (Group|Divider)[] {
        const digits: string[] = subject.match(pattern) || [];

        const flagGroups: string[] = this.format.split(/\s+/);

        const parts: any[] = subject.split(pattern).map(group => {
            return digitize(group);
        });
        
        for(let i = 0; i < parts.length - 1; i+=2) {
            parts.splice(i + 1, 0, new Divider(digits.shift()));
        }
        
        let offset: number = 0;

        return parts.map((part, y) => {
            // If the part is a Divider, then add to the offset and return the
            // divider. The offset counts the dividers so the index of the flag
            // can be determined.
            if(part instanceof Divider) {
                offset++;

                return part;
            }

            // Split the flag group using the pattern to match dividers.
            const flagGroup: string[] = flagGroups[x]?.split(pattern);

            // From the flag group, use the offset to get the current flag
            const flag: string = flagGroup[y - offset];

            // Creat the group using the label glag and items.
            return new Group({
                label: this.label(flag),
                items: part.map((digit, z) => {
                    return new Card(digit, (<Card>(<Group>prevGroups[x]?.items[y])?.items[z])?.digit)
                })
            })
        });
    }

    /**
     * Get the label using the given flag.
     * 
     * @param {string|undefined} flag 
     * @returns {string}
     */
    protected label(flag?: string): string {
        let labels: Attributes = this.labels;

        if(this.labels instanceof Function) {
            labels = this.labels(this);
        }
                
        return flag && labels[flag];
    }
}
