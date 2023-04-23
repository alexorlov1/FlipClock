import Card from "../Card";
import Divider from "../Divider";
import Face from "../Face";
import FaceValue from "../FaceValue";
import { digitize } from "../functions";
import Group from "../Group";
import { Attributes } from "../types";

/**
 * The flag regex pattern.
 */
const pattern: RegExp = /[^\w]+/;

type Formatter = ((value: FaceValue, face: Face) => (format: string) => string);

export default abstract class FormattableFace extends Face {
    
    /**
     * The string or callback function used to format the value.
     */
    format: string|((value: FaceValue, face: Face) => string);
    
    /**
     * A callback function used to format the value.
     */
    formatter: Formatter;

    /**
     * Show the labels on the clock face.
     */
    labels: Attributes|((face: Face) => Attributes);

    /**
     * Format the face value into a string.
     */
    public abstract formatFaceValue(value: FaceValue): (format: string) => string;

    /**
     * Create the groups from the given FaceValue.
     */
    protected createGroups(value: FaceValue, prevGroups: Group[] = []): Group[] {
        let formatted: string, format: string;

        if(this.format instanceof Function) {
            formatted = this.format(value, this);
        }
        else { 
            const formatter: Formatter = this.formatter || ((value: FaceValue) => {
                return this.formatFaceValue(value);
            });

            formatted = formatter(value, this)(format = this.format);
        }

        return formatted.split(/\s+/).map((subject: string, x: number) => {
            return new Group({
                items: this.createGroup(subject, format, x, prevGroups)
            });
        });
    }

    /**
     * Create the groups from given string.
     */
    protected createGroup(subject: string, format: string|undefined, x: number, prevGroups: Group[] = []): (Group|Divider)[] {
        const digits: string[] = subject.match(pattern) || [];

        const parts: any[] = subject.split(pattern).map(group => {
            return digitize(group);
        });
        
        for(let i = 0; i < parts.length - 1; i+=2) {
            parts.splice(i + 1, 0, new Divider(digits[i]));
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

            // Creat the group using the label glag and items.
            return new Group({
                label: this.label(format, x, y - offset),
                items: part.map((digit, z) => {
                    return new Card(digit, (<Card>(<Group>prevGroups[x]?.items[y])?.items[z])?.digit)
                })
            })
        });
    }

    /**
     * Get the label using the given flag.
     */
    protected label(format: string|undefined, x: number, y: number): string|undefined {
        // Get the labels property. If its a callback, then execute it.
        let labels: Attributes|undefined = this.labels instanceof Function
            ? this.labels(this)
            : this.labels;
        
        // If there are no labels, then just return undefined.
        if(this.labels === undefined) {
            return;
        }
            
        // If labels is an array, then try to extract the labels from the x,y
        // coordinates of the multi-dimensional array.
        if(Array.isArray(labels) && labels[x] && labels[x][y] !== null) {
            return labels[x][y];
        }

        // Get the flag groups
        const flagGroups: string[] = String(format).split(/\s+/);

        // Split the flag group using the pattern to match dividers.
        const flagGroup: string[] = flagGroups[x]?.split(pattern);

        // From the flag group, use the offset to get the current flag
        const flag: string = flagGroup[y];

        return labels[flag];
    }

}