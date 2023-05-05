import { FaceValue } from "../../FaceValue";
import VNode from "../../VNode";
import { DigitizedValue, DigitizedValues } from "../../helpers/digitizer";
import { DomElement, h } from "../../helpers/dom";
import Card from "./Card";
import Group from "./Group";

export type FlipClockThemeLabels = DigitizedValues | Record<string, string>;

export type FlipClockThemeOptions = {
    labels?: FlipClockThemeLabels
}

const pattern: RegExp = /[^\w]+/;

/**
 * The FlipClock theme.
 * 
 * @public
 */
export function useTheme(options: FlipClockThemeOptions = {}) {
    /**
     * Get the label using the given flag.
     */
    function label(format: string | undefined, x: number, y: number): string | undefined {
        // If there are no labels, then just return undefined.
        if (options.labels === undefined) {
            return;
        }

        // If labels is an array, then try to extract the labels from the x,y
        // coordinates of the multi-dimensional array.
        if (Array.isArray(options.labels)
            && options.labels[x]
            && typeof options.labels[x][y] === 'string') {
            return options.labels[x][y] as string;
        }

        // Get the flag groups
        const flagGroups: string[] = String(format).split(/\s+/);

        // Split the flag group using the pattern to match dividers.
        const flagGroup: string[] = flagGroups[x]?.split(pattern);

        // From the flag group, use the offset to get the current flag
        const flag: string = flagGroup[y];

        return options.labels[flag];
    }

    return function render(value: FaceValue, lastValue?: FaceValue): VNode {
        function recurse(digit: DigitizedValues, prevDigits?: DigitizedValue | DigitizedValues, index: number = 0): DomElement {
            if (Array.isArray(digit)) {
                return new Group({
                    items: digit.map((digit, i) => {
                        return recurse(digit, prevDigits?.[i], i)
                    })
                })
            }

            const lastDigit = Array.isArray(prevDigits)
                ? prevDigits[index] as string
                : prevDigits;

            return new Card(digit, lastDigit);
        }

        return h('div', {
            class: 'flip-clock',
        }, [recurse(value.digits, lastValue?.digits)]);
    }
}